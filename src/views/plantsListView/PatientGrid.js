import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory, Route } from "react-router-dom";
import moment from "moment";

//Material UI stuff
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

//Datatable stuff
import MUIDataTable, { TableFilterList } from "mui-datatables";
import { columns } from "./columns";

//firestore data
import dataFeed from '../../services/dataFeed'
//redux stuff
import { getPatients } from "../../redux/actions/patientActions";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/types";

//UI stuff
import Loader from "../Loader";
import PatientDetailDialog from "./Dialogs/PatientDetailDialog";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "10px",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const CustomChip = ({ label, onDelete }) => {
  return (
    <Chip
      variant="outlined"
      color="secondary"
      label={label}
      onDelete={onDelete}
    />
  );
};

const CustomFilterList = (props) => {
  return <TableFilterList {...props} ItemComponent={CustomChip} />;
};

export default function PatientGrid() {
  const classes = useStyles();
  const [patientDialogOpen, setPatientDialogOpen] = useState(false);
  const [PatientId, setPatientId] = useState('');
  const history = useHistory();


  async function onRowClick(rowData, rowMeta) {
    let patient = await dataFeed.getPatient(rowData[0].toString());
    if (patient.EditStatus) {
      history.push('/patient');
      return;
    };
    setPatientId(rowData[0].toString());
    dataFeed.setEditStatus(rowData[0].toString(), true)

    setPatientDialogOpen(!patientDialogOpen);

  }

  function handlePatientDialogClose() {
    setPatientDialogOpen(!patientDialogOpen);
    setPatientId('');
  }

  const options = {
    filter: true,
    filterType: "dropdown",
    onRowClick: onRowClick,
    setRowProps: (row, dataIndex, rowIndex, number) => {
      if (row[4]) {
        return {
          style: { background: "pink" }
        };
      }
    }
  };

  const [loading, setloading] = useState(true);
  const [patients, setpatients] = useState([])

  const onPatientsAction = (Snapshot => {
    let patients = [];
    Snapshot.forEach(doc => {
      let patient = doc.data();
      patient.PatientId = parseInt(patient.PatientId, 10);
      patient.BirthDate = moment(patient.BirthDate).format('DD/MM/YYYY');
      patients.push(patient);
    });
    setpatients(patients);
    setloading(false);
  })


  useEffect(() => {
    setloading(true);
    dataFeed.onPatients(onPatientsAction)
    // dataFeed.getPatients().then(pts => {
    //   setpatients(pts);
    //   setloading(false);
    // }).catch(err => console.log(err));

    return () => {
      dataFeed.offPatients();
    }

  }, [patientDialogOpen]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Card className={classes.card}>
      <MUIDataTable
        title={"Patient List"}
        data={patients}
        columns={columns}
        options={options}
        components={{
          TableFilterList: CustomFilterList,
        }}
      />
      <PatientDetailDialog
        classes={{
          layout: classes.layout,
          paper: classes.paper,
          stepper: classes.stepper,
          buttons: classes.buttons,
          button: classes.button
        }}
        PatientId={PatientId}
        id="patient-detail-dialog"
        open={patientDialogOpen}
        onClose={handlePatientDialogClose}
      />


    </Card>
  );
}

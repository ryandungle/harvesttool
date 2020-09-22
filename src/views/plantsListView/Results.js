import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import Chip from "@material-ui/core/Chip";
import getInitials from 'src/utils/getInitials';

//Datatable stuff
import MUIDataTable, { TableFilterList } from "mui-datatables";
import { columns } from "./columns";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, plants, ...rest }) => {
  const classes = useStyles();

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

  const options = {
    filter: true,
    filterType: "dropdown"
  };


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <MUIDataTable
        title={"Plants List"}
        data={plants}
        columns={columns}
        options={options}
        components={{
          TableFilterList: CustomFilterList,
        }}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  plants: PropTypes.array.isRequired
};

export default Results;

import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import { useDispatch } from 'react-redux';
import * as actions from 'src/redux/types';
import dataFeed from 'src/services/dataFeed'
import Loader from 'src/views/Loader';
import moment from 'moment';
import Room1 from './Room1';
import Room1_v2 from './Room1_v2';
import Phase4 from './Phase4';
import IncomingCapacity from './IncomingCapacity';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    //minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  const onPlantsAction = (Snapshot => {
    let plants = [];
    Snapshot.forEach(doc => {
      let plant = doc.data();
      const now = Date.now();
      const dob = Date.parse(plant.Birthdate);
      const age = Math.floor((now - dob) / 86400000)
      plant.id = doc.id;
      plant.Age = age;
      plants.push(plant);
    });
    dispatch({ type: actions.GET_PLANTS, payload: plants })
    setLoading(false)
  })

  useEffect(() => {
    const unsubscribe = dataFeed.onPlants(onPlantsAction);
    return () => {
      unsubscribe();
    }
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Room1 />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Phase4 />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>

          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <Room1_v2 />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <IncomingCapacity />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;

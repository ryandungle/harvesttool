import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'src/redux/types';


function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const Phase4 = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const plant = useSelector(state => state.plants.plant);

  useEffect(() => {
    dispatch({ type: actions.GET_NUMBER_OF_PHASE4 });
  }, [])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              PHASE 4
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {plant.phase4Num}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Flowering Phase
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};


export default Phase4;

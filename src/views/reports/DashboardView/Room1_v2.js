import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

import Loader from 'src/views/Loader';
//redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { constant } from 'src/redux/constant';
import * as actions from 'src/redux/types';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

export default ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const plant = useSelector(state => state.plants.plant);
  useEffect(() => {
    dispatch({ type: actions.GET_ROOM1_PERCENTAGE })
  }, [])

  const data = {
    datasets: [
      {
        data: [(plant.room1Percenttage), 100 - plant.room1Percenttage],
        backgroundColor: [
          colors.orange[600],
          colors.indigo[500]
        ],
        borderWidth: 0,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Room1', 'Remaining']
  };

  const options = {
    animation: false,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Room #1',
      value: plant.room1Num,
      icon: LaptopMacIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Capacity',
      value: constant.Capacity.Room1,
      icon: TabletIcon,
      color: colors.orange[600]
    }
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Room 1" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Pie
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
              <Box
                key={title}
                p={1}
                textAlign="center"
              >
                <Icon color="action" />
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {title}
                </Typography>
                <Typography
                  style={{ color }}
                  variant="h2"
                >
                  {value}

                </Typography>
              </Box>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};

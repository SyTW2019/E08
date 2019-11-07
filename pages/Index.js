import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import ItemList from '../components/ItemList';
import Money from '../components/Money';
import StatList from '../components/StatList';
import Login from '../components/Login';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div >
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Login />
          <StatList />
          <Paper >Aqui Irian las STATS</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>El video game</Paper>
        </Grid>
        <Grid item xs={3}>
          <Money />
          <ItemList />
        </Grid>
      </Grid>
    </div>
  );
}

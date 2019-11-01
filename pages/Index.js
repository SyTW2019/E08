import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <AccountCircleIcon /> registro
          <Paper className={classes.paper}>Aqui Irian las STATS</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>El video game</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Los objetos o mejoras</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
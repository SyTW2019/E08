import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './App.css';
import StatList from './components/StatList';
import ItemList from './components/ItemList';
import Login from './components/Login';
import Registro from './components/Registro';

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

class App extends Component {


  render() {
    return (
      <div >
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Login />
            <Registro/>
            <Paper >Aqui Irian las STATS</Paper>
            <StatList />
          </Grid>
          <Grid item xs={6}>
            <Paper>El video game</Paper>
          </Grid>
          <Grid item xs={3}>
            <ItemList/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;

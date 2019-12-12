import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './App.css';
import StatList from './components/StatList';
import ItemList from './components/ItemList';
import Login from './components/Login';
import Registro from './components/Registro';
import {connect} from 'react-redux'

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

const mapDispatchToProps = dispatch => ({
  //getProfileFetch: () => dispatch(getProfileFetch())
})

class App extends Component {


  render() {
    return (
      <div >
        <Grid container spacing={3} justify="space-evenly" alignItems="flex-start">
          <Grid item xs={3}>
            <Paper>
              <Grid container>
                <Login />
                <Registro />
              </Grid>
              Aqui Irian las STATS
            </Paper>
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

export default connect(null,mapDispatchToProps)(App);

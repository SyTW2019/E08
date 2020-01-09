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
import Game from './components/Game';

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
  constructor(props){
    super(props);

    this.state = {
      logged: false,
    }
  }

  render() {
    return (
      <div >
        <Grid>
            <Game />
        </Grid>
      </div>
    );
  }
}

export default connect(null,null)(App);

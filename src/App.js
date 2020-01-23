import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';
import {connect} from 'react-redux'
import Game from './components/Game';
import purple from '@material-ui/core/colors/purple';

/*const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));*/

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      logged: false,
    }
  }

  render() {
    return (
      <div style={{backgroundColor:purple[50]}}>
        <Grid>
          <Game />
        </Grid>
      </div>
    );
  }
}

export default connect(null,null)(App);

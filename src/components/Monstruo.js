import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

function LinearDeterminate() {
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);
  
    React.useEffect(() => {
      function progress() {
        setCompleted(oldCompleted => {
          if (oldCompleted === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldCompleted + diff, 100);
        });
      }
  
      const timer = setInterval(progress, 500);
      return () => {
        clearInterval(timer);
      };
    }, []);
}

function CircularDeterminate() {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
  
    React.useEffect(() => {
      function tick() {
        // reset when reaching 100%
        setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
      }
  
      const timer = setInterval(tick, 20);
      return () => {
        clearInterval(timer);
      };
    }, []);
}

class Monstruo extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            
            vida: "",
            oro: "",
            boss: "",
            tiempo: "",
        }

        this.handleChange = this.handleChange.bind(this);
    }

    
    handleChange = event => {
        event.preventDefault();
        
        const target = event.target;
        const value = target.value;
        const name = target.name
        this.setState({
          [name]: value
        });
      }

    matar_mosntruo(){

        if(this.state.vida > 0){
            this.state.vida -= this.props.clicks;
            this.props.clicks = 0;
        }
        else{

            document.getElementById("monstruo").style.display = "none";  //cuando muere el monstruo el contador de vida desaparece
            document.getElementById("vida").style.display = "none";
            document.getElementById("mons").style.display = "none";
        }
        
    }


      render(){
          return (
            <div>
                <h1> Vida Monstruo </h1>
                <h2 id="monstruo"> 10 </h2>
                <LinearProgress id= "vida" variant="determinate" value={completed} color="secondary" />
                <img id="mons" src="./img/monstruo1.png" />
                Dinero
                buscar un dispaly para el dinero 
                <MonetizationOnIcon />
                boss
                <CircularProgress variant="determinate" value={progress} />

            </div>
           
          )
      }

    }

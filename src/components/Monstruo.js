import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function LinearDeterminate() {
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


      render(){
          return (
            <p> Vida Monstruo </p>
            <LinearProgress variant="determinate" value={completed} color="secondary" /> 
          )
      }

}
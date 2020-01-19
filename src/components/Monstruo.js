import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper'
import Monster from '../../public/img/monster.png';

const mapStateToProps = state => {
  return{
    data: state.data,
  }
}

const monsterType = {
  regular: {
    hp: 15,
    gold: 4,
  },
  boss: {
    hp: 35,
    gold: 10 
  }
}

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
    }

    componentDidMount = () =>{      
      this.dps_cycle = setInterval(this.dps_cycle, 1000)
    }

    dps_cycle = () =>{
      console.log("Monster= "+this.props.dps_data.cpower)
      if(monsterType.regular.hp > 0 && this.props.dps_data.current_dps != 0)
        monsterType.regular.hp-=this.props.dps_data.current_dps;
        else{
          monsterType.regular.hp = 15;
          //sumar oro y avanzar nivel
        }
    }

    dmg_monster = () =>{
      //Basado en el current lvl TODO
      //console.log("DMG_MONSTER"+this.props.dps_data.cpower)
      if(monsterType.regular.hp > 0)
        monsterType.regular.hp-=this.props.dps_data.cpower;
      else{
        monsterType.regular.hp = 15;
        //sumar oro y avanzar nivel
      }
    }

    render(){
        return (
          <Paper>
            <h1>VIDA: {monsterType.regular.hp}</h1>
            Aqui podriamos poner la vida del bicho con lo del linear
            <img src={Monster} onClick={this.dmg_monster} alt="BIG SPOOKY MONSTER"/>
          </Paper>
        )
    }

}

export default connect(mapStateToProps)(Monstruo)

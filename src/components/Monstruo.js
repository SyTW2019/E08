import React from 'react';
import {connect} from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
//import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import Paper from '@material-ui/core/Paper'
import Monster from '../../public/img/monster.png';
import PcImg from '../../public/img/pc.png'
import {saveData, saveStats} from '../js/actions/index'

const mapStateToProps = state => {
  return{
    data: state.data,
    stats: state.stats,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    saveData: data => dispatch(saveData(data)),
    saveStats: stats => dispatch(saveStats(stats))
  }
}

const monsterType = {
  regular: {
    hp: 15,
    gold: 4,
    
  },
  boss: {
    hp: 35,
    gold: 10,
    
  }
}

var currentMonster = {...monsterType.regular};




/*
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
}*/


class Monstruo extends React.Component{

    constructor(props){
        super(props)
        this.state = {
          monster_hp: 15,
        }
    }
    componentDidMount = () =>{      
      this.dps_cycle = setInterval(this.dps_cycle, 1000)
    }

    dps_cycle = () =>{
      if(currentMonster.hp > 0){
        currentMonster.hp-=this.props.dps_data.current_dps;
        if(currentMonster.hp < 0)
          currentMonster.hp = 0
      }
      else{
          this.props.saveData({
            currentLvl: this.props.data.currentLvl+=1,
            money: this.props.data.money+=currentMonster.gold,
          })
          this.calc_monster();
          
      }
    }
    calc_monster = () =>{
      currentMonster = (this.props.data.currentLvl%10 === 0)? {...monsterType.boss} : {...monsterType.regular};
      currentMonster.hp*= this.props.data.currentLvl;
      currentMonster.gold*= this.props.data.currentLvl;
      
      this.setState({
        monster_hp: currentMonster.hp, 
      })
    }
    
    

    dmg_monster = () =>{
     
      this.props.saveStats({
        kills: this.props.stats.kills,
        clicks: this.props.stats.clicks +=1,
        tiempo_juego: this.props.stats.tiempo_jugado,
      })
      
      
      
      if(currentMonster.hp > 0)
        currentMonster.hp-=this.props.dps_data.cpower;
      else{
        this.props.saveData({
          currentLvl: this.props.data.currentLvl+=1,
          money: this.props.data.money+=currentMonster.gold,
        })
        this.props.saveStats({
          kills: this.props.stats.kills +=1,
          clicks: this.props.stats.clicks,
          tiempo_juego: this.props.stats.tiempo_jugado,
        })
        this.calc_monster();
        
      }
    }
   
    calc_barra(vida){
     
      return ((vida*100)/this.state.monster_hp);
    }

    render(){
      var vida = currentMonster.hp;
        return (
         <Paper >
            <h1 >VIDA:{vida}</h1>
            <LinearProgress variant="determinate" value={this.calc_barra(vida)} color= "secondary"  style={{width: "50%"}}/>
            {this.props.data.currentLvl%10 === 0 &&(
                          <img src={Monster} onClick={this.dmg_monster} alt="BIG SPOOKY MONSTER"/>

            )}
            {this.props.data.currentLvl%10 != 0 &&(
                          <img src={PcImg} onClick={this.dmg_monster} alt="BIG SPOOKY MONSTER"/>

            )}
          </Paper>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Monstruo)

import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import ItemList from './ItemList';
import StatList from './StatList';
import Login from './Login';
import Registro from './Registro';
import Paper from '@material-ui/core/Paper';
import User from './User';
import Mounstro from './Monstruo';
import Logout from './Logout';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core/styles";


const mapStateToProps = (state) => {
    return {
        user: state.user,
        items: state.items,
        data: state.data,
    }
}

const mapDispatchToProps = (dipatch) =>{
    return{
        //saveStats: stats=> dispatch(saveStats(stats))
    }
}


class Game extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            dps: 0,
            oro: this.props.money,
            i:0,
            currentLvl: 1,
            count:0,
            clickpower:10,
            
        }
        this.output = this.output.bind(this);
    }

    monster = {
        hp: 10,
        oro_monster: 3,
        boss: false,
    }

    componentDidMount = () => {
        this.gameloop = setInterval(this.gameLoop, 1000)
        this.handleclick = setInterval(this.updateData, 33)
    }

    updateData = () => {
        this.setState({
            dps: this.state.dps,
            oro: this.state.oro,
            i:this.state.i,
            currentLvl: this.state.currentLvl,
            hp: this.monster.hp,
            oro_monster: this.monster.oro,
            clickpower: this.state.clickpower,
            
        })
    }

    handleClick = () => {

        /*if(this.state.dps > 0)
            this.state.clickpower = 0.5*this.state.dps;*/
        /*if(this.monster.hp > 0)
        {
            this.monster.hp -= this.state.clickpower;
            this.monster.hp -= this.state.dps;
        }
        else
        {
            //this.state.oro += this.monster.oro_monster;
            console.log(this.state.oro)
            this.setState({
                oro: this.state.oro+this.monster.oro_monster,
            })

            this.state.currentLvl++;
            this.setState({
                currentLvl: this.state.currentLvl,
            })
            this.monster.hp =10; 
        }*/
        //quitarle vida al bicho
    }

    output(evt){
        this.setState({ count: this.state.count+evt})
    }

    calc_dps(){
        var current_dps = 0;
        for(var loop = 0; loop < 4; loop++)
        {
            var specific_dps = 0;
            if(this.props.items[loop].cantidad > 0)
            {
                specific_dps = this.props.items[loop].cantidad*this.props.items[loop].dps
                current_dps += specific_dps;
            }
        }
        this.setState({
            dps: current_dps,
            clickpower: (current_dps >0)?current_dps: 1,
        })
    }

    gameLoop = (event) =>{
        this.calc_dps();
        this.setState({
            i: this.state.i+1
        })
    }

    calc_nivel(level){
        if(level%10===0)
            level = 0
        if(level > 10)
            level -= 10
        return((level*100)/10)
    }
    render(){
      
        //var currentTime = this.state.i++;
        var logged = (localStorage.id ? true:false)
        return(
            <div id="Game">
                <Grid container spacing={2} justify="space-evenly" alignItems="flex-start">
                    <Grid item xs={3}>
                        <Paper>
                            <Grid container>
                                {logged === true && (
                                    <Grid>
                                        <User/>
                                        <Logout/>
                                    </Grid>
                                )}
                                { logged === false && (
                                    <Grid>
                                        <Login/>
                                        <Registro/>
                                    </Grid>
                                )}
                            </Grid>
                            STATS
                        </Paper>
                        <StatList stats_data={{
                            dps: this.state.dps,
                            tiempo: this.state.i
                        }

                        }/>
                    </Grid>
                    <Grid item xs={6}>
                         
                         
                        <CircularProgress variant="static" text={this.props.data.currentLvl} value={this.calc_nivel(this.props.data.currentLvl)}>
                            HOLA
                        </CircularProgress>   
                        
                        <h1>ORO ACTUAL: {this.props.data.money.toFixed(0)} </h1>
                        <h2>NIVEL ACTUAL: {this.props.data.currentLvl}</h2>
                        <h3>DPS: {this.state.dps}</h3>                        
                        <Mounstro 
                            dps_data={{
                                cpower:this.state.clickpower,
                                current_dps:this.state.dps
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <ItemList/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);

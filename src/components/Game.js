import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import ItemList from './ItemList';
import StatList from './StatList';
import Login from './Login';
import Registro from './Registro';
import Logout from './Logout';
import Paper from '@material-ui/core/Paper';
import User from './User';
import Mounstro from './Monstruo';
import Logo from '../../public/img/logo_clicker.png';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core/styles";


const mapStateToProps = (state) => {
    return {
        user: state.user,
        items: state.items,
        data: state.data,
        stats: state.stats
    }
}

const mapDispatchToProps = (dipatch) =>{
    return{
        //saveStats: stats=> dispatch(saveStats(stats))
        //userDataFetch = datos => dispatch(userDataFetch(datos))
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
    }


    componentDidMount = () => {
        this.gameloop = setInterval(this.gameLoop, 1000)
        this.handleclick = setInterval(this.updateData, 33)
    }

    updateData = () => {
        this.setState({
            dps: this.state.dps,
            oro: this.props.money,
            i:this.state.i,
            currentLvl: this.state.currentLvl,
            clickpower: this.state.clickpower,
        })
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
            clickpower: (current_dps >0)?current_dps*0.5: 1,
        })
    }

    gameLoop = (event) =>{
//	console.log('data en game');
//	console.log(this.props.items);
//	console.log('stats en game');
//	console.log(this.props.stats);
        this.calc_dps();
        this.setState({
            i: this.state.i+1
        })
//	console.log('i:' + this.state.i);
    }

   
    render(){
        var logged = (localStorage.id ? true:false)
        return(
            <div id="Game" >
                <Grid container spacing={2} justify="space-evenly" alignItems="flex-start" >
                    <Grid item xs={3}>
                        <Grid container text-align='center'>
                            {logged === true && (
                                <Grid>
                                    <User/>
                                    <Logout/>
                                </Grid>
                            )}
                            {logged === false && (
                                <Grid>
                                    <Login/>
                                    <Registro/>
                                </Grid>
                            )}
                        </Grid>
                        <StatList stats_data={{
                            dps: this.state.dps,
                            tiempo: this.state.i
                        }}/>
                    </Grid>
                    <Grid item xs={6}>
                        
                        <h1>ORO ACTUAL: {this.props.data.money.toFixed(0)} </h1>
                        <h2>NIVEL ACTUAL: {this.props.data.currentLvl}</h2>
                        <h3>DPS: {this.state.dps}</h3>
                        <Mounstro
                            tiempo = {this.state.i}
                            dps_data={{
                                cpower:this.state.clickpower,
                                current_dps:this.state.dps
                            }}
                        />
                        <img src={Logo} align="middle" alt="logo ull clicker"/>
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

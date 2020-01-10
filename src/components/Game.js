import React, {Component, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {saveData} from '../js/actions/index';
import pcimg from '../../public/img/pc.png';
import store from '../js/store/index';
import ItemList from './ItemList';
import StatList from './StatList';
import Login from './Login';
import Registro from './Registro';
import Paper from '@material-ui/core/Paper';
import User from './User';
window.store =store;

console.log(store.users)

function mapStateToProps(state) {
    return {user: state.user}
  }

class Game extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            dps: 0,
            oro: 0,
            i:0,
            currentLvl: 1,
            count:0
        }
        this.output = this.output.bind(this);
    }

    monster = {
        hp: 100,
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

        })
    }

    handleClick = () => {

        if(this.state.dps == 0)
            this.clickpower = 1;
        else    
            this.clickpower = 0.5*this.state.dps;

        if(this.monster.hp > 0)
        {
            this.monster.hp -= this.clickpower;
            
        }
        else
        {
            this.state.oro += this.monster.oro_monster;
            this.setState({
                oro: this.state.oro,
            })

            this.state.currentLvl++;
            this.setState({
                currentLvl: this.state.currentLvl,
            })
        }
            

        //quitarle vida al bicho 
    }

    output(evt){
        console.log("Probando la función");
        this.setState({ count: this.state.count+evt})
    }
    gameLoop = (event) =>{
        this.state.i++;
        this.setState({
            i: this.state.i,
        })
    }

    render(){
        //var currentTime = this.state.i++;
        var logged = (localStorage.id ? true:false)
        return(
            <div id="Game">
                <Grid container spacing={3} justify="space-evenly" alignItems="flex-start">
                    <Grid item xs={3}>
                        <Paper>
                            <Grid container>
                                {logged == false && (
                                    <Grid>
                                        <User/>
                                    </Grid>
                                )}
                                { logged == true && (
                                    <Grid>
                                        <Login/>
                                        <Registro/>
                                    </Grid>
                                )}                                
                            </Grid>
                            STATS
                        </Paper>
                        <StatList />
                    </Grid>
                    <Grid item xs={6}>
                        <p>Contador del juego -> {this.state.i}</p>
                        <h1>ORO ACTUAL: {this.state.oro} </h1>
                        <h2>VIDA: {this.monster.hp}</h2>
                        <img src={pcimg} onClick={this.handleClick} alt="PC"/>
                    </Grid>
                    <Grid item xs={3}>
                        <ItemList
                            func={this.output}
                        />
                        <h1>{this.state.count}</h1>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps,null)(Game);

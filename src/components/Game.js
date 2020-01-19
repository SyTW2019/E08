import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
//import {saveData} from '../js/actions/index';
import pcimg from '../../public/img/pc.png';
import store from '../js/store/index';
import ItemList from './ItemList';
import StatList from './StatList';
import Login from './Login';
import Registro from './Registro';
import Paper from '@material-ui/core/Paper';
import User from './User';
import Mounstro from './Monstruo';
import ItemList2 from './ItemList2';
window.store =store;

console.log(store.users)

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
            clickpower: this.state.clickpower
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
        console.log("Probando la función");
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
        })
        console.log(this.state.dps)
    }

    gameLoop = (event) =>{
        this.state.i++;
        this.setState({
            i: this.state.i,
        })
        this.calc_dps();
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
                                {logged === true && (
                                    <Grid>
                                        <User/>
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
                        <StatList />
                    </Grid>
                    <Grid item xs={6} alignItems='center' >
                        <p>Contador del juego -> {this.state.i}</p>
                        <h1>ORO ACTUAL: {this.state.oro} </h1>
                        <h3>DPS: {this.state.dps}</h3>
                        <h2>VIDA: {this.monster.hp}</h2>
                        <img src={pcimg} onClick={this.handleClick} alt="PC"/>
                        <Mounstro 
                            dps_data={{
                                cpower:this.state.clickpower,
                                current_dps:this.state.dps
                            }}
                        />
                        {this.state.clickpower}
                    </Grid>
                    <Grid item xs={3}>
                        <ItemList/>
                        <h1>{this.state.count}</h1>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);

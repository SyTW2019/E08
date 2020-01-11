import React from 'react';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import configureStore from "../js/store/index";
//import store from "../js/store/index";
var store = configureStore();

//console.log(store.getState().users[1])

class User extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            show_component: false,
        };

        store.subscribe(() => {
            this.setState({
                username: store.getState().users
            });
        });
    	console.log("probando el componente User " + this.state.users)
    }
    render() {
        return(
            <Grid>
                
                <h1><AccountCircle />Hola: {this.state.username}</h1>
            </Grid>
        )
    }
}

export default User;

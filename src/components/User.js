import React from 'react';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import configureStore from "../js/store/index";
import { connect } from 'react-redux';

var store = configureStore();

function mapStateToProps(dispatch) {
    return{
        users: state.username
    }
}

class User extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            show_component: false,
        };

        
    	console.log("probando el componente User " + this.state.users)
    }
    handleChange = (evt) => store.subscribe(() => {
        this.setState({
            username: store.getState().users
        });
    });
    render() {
        return(
            <Grid>
                <h1><AccountCircle />Hola: {this.props.username}</h1>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(User);

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {connect} from 'react-redux';
import {userLogoutFetch} from '../js/actions/index';
import configureStore from "../js/store/index";

var store = configureStore();

function mapDispatchToProps(dispatch) {
  return {
      userLogoutFetch: user => dispatch(userLogoutFetch(user))
  };
}

const mapStateToProps = (state) => {
    return{
        email: state.email
    }
}

class Logout extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            emailValue: "",
            logout: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }



    handleChange = event => {
        store.subscribe(() => {
          this.setState({
            emailValue: store.getState().email
          });
        });
      }

      handleClick = event => {
        console.log('En el handle click');
        this.setState({
          logout: true
        })
      }

      render() {
        return(
          <Grid>
            <Button variant="outlined" color="primary" value={this.state.logout} onCLick={this.handleClick}>
              Cerrar sesión
            </Button>
          </Grid>
        )
      }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Logout);

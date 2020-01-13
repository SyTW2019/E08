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
        email: state.email,
        token: state.token
    }
}

class Logout extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            emailValue: "",
            tokenValue: "",
            logout: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }



    handleChange = event => {
        store.subscribe(() => {
          this.setState({
            emailValue: store.getState().email,
            tokenValue: store.getState().token
          });
        });
        console.log('Valores de logout');
        console.log(this.state.emailValue);
        console.log(this.state.tokenValue);
      }

      handleClick = event => {
        console.log('En el handle click');
        this.setState({
          logout: true
        })

        this.props.userLogoutFetch({ email: this.state.emailValue,
                                    token: this.state.tokenValue
        })
        .then((success) => {


            if(localStorage.id == 1)
              console.log("Usuario logeado correctamente");
            else if(localStorage.id == 2)
            {
              console.log("Contraseña mal puesta")
            }
            else if(localStorage.id == 0)
              console.log("Email mal");
            else
              console.log("Error desconocido");
            })
      }

      render() {
        return(
          <Grid>
            <Button variant="outlined" color="primary" value={this.state.logout} onClick={this.handleClick}>
              Cerrar sesión
            </Button>
          </Grid>
        )
      }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Logout);

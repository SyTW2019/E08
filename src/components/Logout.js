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
import {userLoginFetch} from '../js/actions/index';
import configureStore from "../js/store/index";

var store = configureStore();

function mapDispatchToProps(dispatch) {
  return {
      userLogoutFetch: user => dispatch(userLogoutFetch(user))
  };
}

const mapStateToProps = (state) => {
    return{
        users: state.users
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
        this.handleError = this.handleError.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }



    handleChange = event => {
        store.subscribe(() => {
          this.setState({
            emailValue: store.getState().users
          });
        });

        event.preventDefault();

        const target = event.target;
        const value = target.value;
        const name = target.name
        this.setState({
          [name]: value
        });
      }

      handleError = event => {
        if(this.get_value()){
          this.setState({
            emailError:false,
          })

          event.preventDefault()
          this.props.userLogoutFetch({ email: this.state.emailValue,
                                      token: this.state.token
          }).then((success) => {


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
        else
          this.setState({
            emailError:true,
          })
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

    export default Logout;

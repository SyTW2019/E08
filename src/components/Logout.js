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


class Logout extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            emailValue: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleError = this.handleError.bind(this);
    }



    handleChange = event => {
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
          //this.props.userLoginFetch(this.state)
          this.props.userLoginFetch({ email: this.state.emailValue,
                                      contrasena: this.state.pwdValue
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

      render() {
        return(
          <Grid>
          <Button variant="outlined" color="primary">
            Cerrar sesión
          </Button>
          </Grid>
        )
      }
    }

    export default Logout;

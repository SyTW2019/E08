import React, {Component, useState} from 'react';
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


function mapDispatchToProps(dispatch) {
  return {
      userLoginFetch: user => dispatch(userLoginFetch(user))
  };
}

function mapStateToProps(state) {
  return {user: state.user}
}


class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            emailValue: "",
            pwdValue: "",
            open: "",
            emailError: "",
            pwdError: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
                                      contraseña: this.state.pwdValue
          })
          if(localStorage.id == 2)
            console.log("Usuario logeado correctamente");
          else if(localStorage.id)
          {
            console.log("Contraseña mal puesta")
          }
          else
            console.log("Email mal");
        }
        else
          this.setState({
            emailError:true,
          })
      }
    
      handleOpen = event => {
        this.setState({
          open: true,
        })
        
        

      }
      handleClose = event => {
        this.setState({
          open: false,
        })
      }

      validateEmail(){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailValue))
          return true;
        else 
          return false;
      }
    
      get_value(){
        
        
        if(this.validateEmail())
        {
          if(this.state.emailValue)
            return true;
          else
            return false
        }   
      }

      render() {
        return(
          <Grid>
            <Button variant="outlined" color="primary" value={this.state.open} onClick={this.handleOpen}>
              <AccountCircle />
              iniciar sesión prueba
            </Button>
            <Dialog
              open ={this.state.open}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="iniciar_sesion"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="iniciar_sesion">{"Inicio de sesión"}</DialogTitle>
              <DialogContent>
              <Grid>
              <TextField
                required
                id="email"
                name='emailValue'
                label="Email"
                value={this.state.emailValue}
                ref={(input) => this.input = input}
                onChange={this.handleChange}
                error={this.state.emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              </Grid>
              <Grid>
              <TextField
                required
                id="password"
                label="Contraseña"
                type="password"
                name='pwdValue'
                value={this.state.pwdValue}
                ref={(input) => this.input = input}
                onChange={this.handleChange}
                //error={this.handleError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              </Grid>
              </DialogContent>
              <DialogActions>
                <Button  onClick={this.handleClose} color="primary">
                  Cancelar
                </Button>
                <Button onClick={this.handleError} color="primary">
                  Continuar
                </Button>
              </DialogActions>
              </Dialog>
            </Grid>
        )
      }
    } 
      
    export default connect(mapStateToProps,mapDispatchToProps)(Login);

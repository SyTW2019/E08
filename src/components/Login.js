import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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

        /*this.error_state = {
            emailError: "",
            pwdError: "",
        }*/

        /*this.dialog = {
            open: "",
        }*/

        this.handleChange = this.handleChange.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = event => {
        event.preventDefault();
        
        const target = event.target;
        const value = target.value;
        const name = target.name
        this.setState({
          [name]: value
        });
        console.log("en el handleChange " + event.target.value)
      }
    
      handleError = event => {
        this.get_value()
        console.log("en el handleError")
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
    
      handleSubmit = event => {
        event.preventDefault()
        
        this.props.userPostFetch(this.state);
      }

      validateEmail(){
        console.log(this.state.emailValue)
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailValue))
        {
          this.setState({emailError: false})
          //setEmailError(false);
          return true;
        }
        else 
        {
          this.setState({emailError: true})
          //setEmailError(true);
          return false;
        }
      }
    
      get_value(){
        console.log("en get_values")
        
        if(validateEmail())
        {
          //console.log(this.state.emailValue)
          if(this.state.emailValue)
          {
            console.log("algo")
            this.setState({emailError: false})
            //setPwdError(false);
            console.log("Trying to log in")
            //handleClose()
          }
          else
            this.setState({emailError: true})
            //setPwdError(true);
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
                //error={this.handleError}
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
                <Button  value={this.state.open} onClick={this.handleClose} color="primary">
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
      
    export default Login;

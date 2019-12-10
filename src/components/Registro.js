import React from 'react';
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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { connect } from "react-redux";
import { addUser } from "../js/actions/index";

function mapDispatchToProps(dispatch) {
    return {
        addUser: user => dispatch(addUser(user))
    };
}



class Registro extends React.Component{
    
    constructor(props){
        super(props);

        this.state={
            emailValue: "",
            userValue: "",
            pwdValue: "",
            pwdConfValue: "",
            emailError: "",
            pwdError: "",
            open: "",
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleErrorEmail = this.handleErrorEmail.bind(this);
        this.handleErrorPwd = this.handleErrorPwd.bind(this);

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

    handleSubmit = event => {
        event.preventDefault();
    }



    handleError= event =>{
        console.log("Errores")
        this.handleErrorEmail()
        this.handleErrorPwd()
    }

    handleErrorEmail = event => {
        if(this.validateEmail())
            this.setState({
                emailError:false,
               
            })
        else
            this.setState({
                emailError:true,
                
            })
        
    }
    handleErrorPwd = event => {
        if(this.check_pwd())
            this.setState({
               
                pwdError:false,
            })
        else
            this.setState({
                
                pwdError:true,
            })
        
    }

    handleClickOpen = event => {
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
        console.log(this.state.emailValue)
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailValue))
          return true;
        else 
          return false;
      }

    check_pwd(){
        console.log("en el check")
        if(this.state.pwdValue === this.state.pwdConfValue){
            if(this.state.pwdValue.length >= 8)
                if((/^(?=.*[a-z])(?=.*[A-Z])/).test(this.state.pwdValue)){
                    return true;
                }
                else{
                    console.log("Error mayuscula y minuscula")
                    return false;
                }
            else{
                console.log("Error tamaño contraseña")
                return false;
            }
        }
        else if(this.state.pwdValue && this.state.pwdConfValue){
            return false;
        }
    }

   /* get_values(){
        console.log("en el get_values")
        if(this.validateEmail()&& this.check_pwd()){

            if(this.state.emailValue&&this.state.pwdValue)
                return true;
            else
                return false;
           
        }
            
    }*/

    render() {
    return (
        <Grid>
          <Button variant="outlined" color="primary" value={this.state.open} onClick={this.handleClickOpen}>
            <AssignmentIndIcon/>
                Registrarse
            </Button>
            <Dialog
                open={this.state.open}
                //TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="iniciar_sesion"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="Registro">{"Registro"}</DialogTitle>
                <DialogContent>
                <Grid>
                <TextField
                required
                id="email"
                name = "emailValue"
                label="Correo Electrónico"
                value={this.state.emailValue}
                ref={(input) => this.input = input}
                onChange={this.handleChange}
                error={this.state.emailError}
                helperText="Correo Electrónico Incorrecto"
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
                id="username"
                label="Nombre de Usuario"
                name = "userValue"
                value={this.state.userValue}
                ref={(input) => this.input = input}
                onChange={this.handleChange}
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
                name = "pwdValue"
                label="Contraseña"
                type="password"
                value={this.state.pwdValue}
                ref={(input) => this.input = input}
                onChange={this.handleChange}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <LockOutlinedIcon />
                    </InputAdornment>
                    ),
                }}
                />
                </Grid>
                <Grid>
                <TextField
                required
                id="password_verify"
                name= "pwdConfValue"
                label="Verificación de contraseña"
                type="password"
                value={this.state.pwdConfValue}
                error={this.state.pwdError}
                ref={(input) => this.input = input}
                onChange={this.handleChange}
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
                <Button onClick={this.handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={this.handleError} color="primary">
                    Registrarse
                </Button>
                </DialogActions>
            </Dialog>
            </Grid>
      )
    }
}

export default connect(null, mapDispatchToProps)(Registro);
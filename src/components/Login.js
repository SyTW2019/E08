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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  //Variables para coger datos del formulario
  const [emailValue, setEmailValue] = React.useState('');
  const [pwdValue, setPwdValue] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [pwdError, setPwdError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue))
    {
      setEmailError(false);
      return true;
    }
    else 
    {
      setEmailError(true);
      return false;
    }
  }

  const get_values = () => {
      if(validateEmail())
        if(pwdValue)
        {
          setPwdError(false);
          console.log("Trying to log in")
          //handleClose()
        }
        else
          setPwdError(true);
    
  }

  //TO-DO => Función pa conectarse con el servidor 

  return (
    <Grid>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      <AccountCircle />
        iniciar sesión
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="iniciar_sesion"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="iniciar_sesion">{"Inicio de sesión"}</DialogTitle>
        <DialogContent>
        <Grid>
        <TextField
          required
          id="email"
          label="Email"
          value={emailValue}
          onChange={(e)=> setEmailValue(e.target.value)}
          error={emailError}
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
          value={pwdValue}
          onChange={(e)=> setPwdValue(e.target.value)}
          error={pwdError}
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
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={get_values} color="primary">
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

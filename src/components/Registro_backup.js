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
  //Variables para los datos de los usuarios
  const [emailValue, setEmailValue] = React.useState('');
  const [userValue, setUserValue] = React.useState('');
  const [pwdValue, setPwdValue] = React.useState('');
  const [pwdConfValue, setPwdConfValue] = React.useState('');


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

  const check_pwd = () => {
    if(pwdValue != pwdConfValue)
    {
      setPwdError(true);
      return false;
    }
    else if(pwdValue && pwdConfValue)
    {
      setPwdError(false);
      return true;
    }
      
  }

  const get_values = () => {
    if(validateEmail())
      if(check_pwd())
      {
        console.log("Esta todo bien");
        //handleClose()
      }
    else
      console.log("Something went wrong");
  }

  return (
    <Grid>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      <AssignmentIndIcon/>
        Registrarse
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="iniciar_sesion"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="Registro">{"Registro"}</DialogTitle>
        <DialogContent>
        <Grid>
        <TextField
          required
          id="email"
          label="Correo Electrónico"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          error={emailError}
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
          value={userValue}
          onChange={(e) => setUserValue(e.target.value)}
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
          onChange={(e) => setPwdValue(e.target.value)}
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
          label="Verificación de contraseña"
          type="password"
          value={pwdConfValue}
          error={pwdError}
          onChange={(e) => setPwdConfValue(e.target.value)}
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
            Registrarse
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
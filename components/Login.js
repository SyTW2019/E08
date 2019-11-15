import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
<<<<<<< HEAD
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
=======
>>>>>>> 67635e1f1d2f9ebd6b3510e02a4b6feabff3c146

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
<<<<<<< HEAD
      <AssignmentIndIcon/>
        Registrarse
=======
      <AccountCircle />
        iniciar sesión
>>>>>>> 67635e1f1d2f9ebd6b3510e02a4b6feabff3c146
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="iniciar_sesion"
        aria-describedby="alert-dialog-slide-description"
      >
<<<<<<< HEAD
        <DialogTitle id="Registro">{"Registro"}</DialogTitle>
=======
        <DialogTitle id="iniciar_sesion">{"Inicio de sesión"}</DialogTitle>
>>>>>>> 67635e1f1d2f9ebd6b3510e02a4b6feabff3c146
        <DialogContent>
        <Grid>
        <TextField
          id="email"
          label="Email"
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
          id="password"
          label="Contraseña"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        </Grid>
<<<<<<< HEAD
        <Grid>
        <TextField
          id="password_verify"
          label="Repita la contraseña"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        </Grid>
=======
>>>>>>> 67635e1f1d2f9ebd6b3510e02a4b6feabff3c146
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
<<<<<<< HEAD
            Registrarse
=======
            Continuar
>>>>>>> 67635e1f1d2f9ebd6b3510e02a4b6feabff3c146
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

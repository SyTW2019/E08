import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    
  },
}));

function createData(name, precio, cantidad) {
  return { name, precio,cantidad };
}

const rows = [
  createData('Bebida Energética', 10, 0),
  createData('Colegas', 20, 0),
  createData('Asistir a Clase', 30, 0),
  createData('Tutorias', 50, 0),
];

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <AccountCircleIcon /> Registro
          <Paper className={classes.paper}>Aqui Irian las STATS</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>El video game</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.precio}</TableCell>
                    <TableCell align="right">{row.cantidad}</TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </Paper>
          <Paper className={classes.paper}>Los objetos o mejoras</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const tableStyle = {

};

function createData(name, precio, cantidad) {
  return { name, precio,cantidad };
}

const rows = [
  createData('Bebida Energética', 10, 0),
  createData('Colegas', 20, 0),
  createData('Asistir a Clase', 30, 0),
  createData('Tutorias', 50, 0),
];

class ItemList extends React.Component{
    render()
    {
        return(
            <div>
                <Paper >
                    <Table >
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
            </div>
        )
    }
}

export default ItemList;

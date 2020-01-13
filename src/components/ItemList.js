import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import configureStore from "../js/store/index";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return{
        items: state.items
    }
}
function createData(name, precio, cantidad, id) {
  return { name, precio,cantidad, id };
}

const rows = [
  createData('Bebida Energética', 10, 0, 1),
  createData('Colegas', 20, 0, 2),
  createData('Asistir a Clase', 30, 0, 3),
  createData('Tutorias', 50, 0, 4)
];

class ItemList extends React.Component{
    constructor(props){
        super(props);
    }
    render()
    {
        return(
            <div>
                <button onClick={(evt) => this.props.func(1)}>
                    Testme
                </button>
                <Paper >
                    <Table >
                        <TableHead>
                            <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        <Button color= "primary">
                                            {row.name}
                                        </Button>
                                    </TableCell>
                                    <TableCell>{row.precio}</TableCell>
                                    <TableCell>{row.cantidad}</TableCell>
                                    <TableCell>{row.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ItemList);

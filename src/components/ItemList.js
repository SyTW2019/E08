import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


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
                            	<Button color= "primary">
				    <TableRow key={row.name}>
                                	<TableCell component="th" scope="row">
                                	{row.name}
                                	</TableCell>
                                	<TableCell>{row.precio}</TableCell>
                                	<TableCell>{row.cantidad}</TableCell>
                            	    </TableRow>
				 </Button>

                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default ItemList;

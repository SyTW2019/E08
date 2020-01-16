import React from 'react';
import Item from './Item';
import { ListItem } from '@material-ui/core';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
    return{

    }
}

function mapStateToProps(state) {
    return{ rows: state.items}
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


function comprar(id){
    console.log("en la funcion comprar " + id);
   rows.map(function(row){
    if(row.id === id){
        console.log("comparando los id " + row.id)
    
        row.cantidad += 1;
        console.log("cantidad " + row.cantidad);
    }
    
   })
}


class ItemList2 extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                {rows.map(row => (
                    <div>
                        <Grid onClick={()=>comprar(row.id)}>
                            <Paper>
                                <Item name={row.name} precio={row.precio} cantidad={row.cantidad} />
                            </Paper>
                        </Grid>
                    </div>
                    ))
                }
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemList2);
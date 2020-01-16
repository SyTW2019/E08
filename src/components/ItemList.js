import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Item from './Item';


const mapStateToProps = (state) => {
    return{
        items: state.items
    }
}

/*function comprar(id){
    console.log("en la funcion comprar " + id);
   rows.map(function(row){
    if(row.id === id){
        console.log("comparando los id " + row.id)
    
        row.cantidad += 1;
        console.log("cantidad " + row.cantidad);
    }
    
   })

}*/

class ItemList extends React.Component{
    constructor(props){
        super(props);
    }
    render()
    {
        console.log("This props item "+this.props.items[0].cantidad)
        var current_item;
        return(
            <Grid>
                <Item id={this.props.items[0].id}/>
            </Grid>
        )
    }
}

export default connect(mapStateToProps,null)(ItemList);

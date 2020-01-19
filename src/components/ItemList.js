import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Item from './Item';


const mapStateToProps = (state) => {
    return{
        items: state.items
    }
}

class ItemList extends React.Component{
    
    render()
    {
        return(
            <Grid>
                <Item id={this.props.items[0].id}/>
                <Item id={this.props.items[1].id}/>
                <Item id={this.props.items[2].id}/>
                <Item id={this.props.items[3].id}/>
            </Grid>
        )
    }
}

export default connect(mapStateToProps,null)(ItemList);

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {addItem} from '../js/actions/index';

function mapDispatchToProps(dispatch) {
    return {
        addItem: items => dispatch(addItem(items))
    };
  }

const mapStateToProps = (state) => {
    return{
        items: state.items
    }
}

class Item extends React.Component{

    constructor(props){
        super(props);
        this.additem = this.additem.bind(this);
    }

    additem(){
        this.props.items[this.props.id].cantidad+=1;
        this.props.addItem(this.props.items)
    }

    render(){
        return(
            <Grid onClick={this.additem} Item alignContent='stretch'>
                <Paper>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.items[this.props.id].name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        -{this.props.items[this.props.id].precio}-
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                    {this.props.items[this.props.id].cantidad}
                    </Typography>
                </Paper>
            </Grid>
        )
    }

    
}
export default connect(mapStateToProps,mapDispatchToProps)(Item);
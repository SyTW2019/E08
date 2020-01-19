import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
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
        this.state = {
            items: this.props.items,
        } 
    }
    
    additem(){
        this.props.items[this.props.id].cantidad+=1;
        this.props.items[this.props.id].precio*=1.5;
        this.setState({
            items: this.props.items
        })
        this.props.addItem(this.state.items)
    }

    render(){
        return(
            <Grid onClick={this.additem} Item direction='row' >
                <Paper >
                    {console.log("STATE INICIAL"+this.state.items)}
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.items[this.props.id].name}-
                        {(this.props.items[this.props.id].precio).toFixed(0)}
                        -{this.props.items[this.props.id].cantidad}
                    </Typography>
                </Paper>
            </Grid>
        )
    }

    
}
export default connect(mapStateToProps,mapDispatchToProps)(Item);
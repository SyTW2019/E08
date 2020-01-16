import React from 'react';
import Button from '@material-ui/core/Button';
import { ListItem } from '@material-ui/core';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  });
class Item extends React.Component{

    constructor(props){
        super(props);
    
        this.state = {

            name: "",
            precio: "",
            cantidad: "",
            id: "",
        }


    
    
    
    }

    

    render(){
        return(

            <div>
                <List >
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary = {this.props.name}  
                            secondary={this.props.cantidad}
                           
                        ></ListItemText>
                       
                    </ListItem>    
                </List>
            </div>   
          
            
           
           
           
        )
    }

    
}
export default withStyles(styles) (Item);
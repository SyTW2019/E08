
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import {userDataFetch} from '../js/actions/index';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  function mapDispatchToProps(dispatch) {
      return {
          userDataFetch: user => dispatch(userDataFetch(user))
      }
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  class StatList extends React.Component {
      constructor(props){
          super(props);

          this.state = {
              bichos: "",
              //poner mas estados: tiempo jugado, clicks por segundo, etc

          }

          this.handleChange = this.handleChange.bind(this);
      }

      handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name
        this.setState({
          [name]: value
        });
      }
      render(){
          return(
            <div>
                <List component="nav">
                    <ListItem>
                        <ListItemText primary="Numero de Bichos Matados" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Stat nº2"/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Stat nº3"/>
                    </ListItem>
                </List>
            </div>
          )
      }
  }

export default connect(null, mapDispatchToProps)(StatList);

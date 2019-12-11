
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  class StatList extends React.Component {
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

  export default StatList;

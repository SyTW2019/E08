
import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import {saveStats} from '../js/actions/index';

/*const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));*/

const mapStateToProps = state => {
  return{
    stats: state.stats,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveStats: stats => dispatch(saveStats(stats))
  }
}

class StatList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bichos: "",
      dps: "",
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
            <ListItemText primary="Numero de Bichos Matados" secondary={this.props.stats.kills} />
          </ListItem>
          <ListItem>
            <ListItemText primary="DPS" secondary={this.props.stats_data.dps}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Número de clicks" secondary={this.props.stats.clicks}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Tiempo jugado" secondary={this.props.stats_data.tiempo}/>
          </ListItem>
        </List>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatList);

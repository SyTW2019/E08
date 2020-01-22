import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {addItem,saveData} from '../js/actions/index';
import purple from '@material-ui/core/colors/purple';

function mapDispatchToProps(dispatch) {
  return {
    addItem: items => dispatch(addItem(items)),
    saveData: data => dispatch(saveData(data))
  };
}

const mapStateToProps = (state) => {
  return{
    items: state.items,
    data: state.data
  }
}

class Item extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      items: this.props.items,
      animation: false,
      elevation: 1,
    }
  }

  additem = () =>{
    if(this.props.data.money >= this.props.items[this.props.iden].precio)
    {
      console.log('Valores antes: ');
      console.log('Nombre');
      console.log(this.props.items[this.props.iden].name);
      console.log('Precio');
      console.log(this.props.items[this.props.iden].precio);
      console.log('Cantidad');
      console.log(this.props.items[this.props.iden].cantidad);
      console.log('DPS');
      console.log(this.props.items[this.props.iden].dps);

      //Descontar el dinero
      this.props.data.money -= this.props.items[this.props.iden].precio;
      this.props.saveData(this.props.data);

      console.log('Valores despues: ');
      onsole.log('Nombre');
      console.log(this.props.items[this.props.iden].name);
      console.log('Precio');
      console.log(this.props.items[this.props.iden].precio);
      console.log('Cantidad');
      console.log(this.props.items[this.props.iden].cantidad);
      console.log('DPS');
      console.log(this.props.items[this.props.iden].dps);

      //Aumentar el precio y la cantidad del item comprado
      this.props.items[this.props.iden].cantidad+=1;
      this.props.items[this.props.iden].precio*=1.5;
      this.setState({
        items: this.props.items
      })
      this.props.addItem(this.state.items)
    }
  }

  mouseEnter = () =>{
    this.setState({
      animation:'pulse',
      elevation:20,
    })
  }

  mouseLeave = ()=>{
    this.setState({
      animation:false,
      elevation:1,
    })
  }

  render(){
    return(
      <Grid onClick={this.additem}>
        <Skeleton animation={this.state.animation} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} >
          <Paper variant="outlined" elevation={this.state.elevation} style={{backgroundColor:purple[100]}}>
            <Typography gutterBottom variant="h4" component="h2">
              {this.props.items[this.props.iden].name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              DPS:{this.props.items[this.props.iden].dps}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Precio:{(this.props.items[this.props.iden].precio).toFixed(0)}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Cantidad:{this.props.items[this.props.iden].cantidad}
            </Typography>
          </Paper>
        </Skeleton>
      </Grid>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Item);

import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {userLogoutFetch, userDataFetch} from '../js/actions/index';
//import configureStore from "../js/store/index";

//var store = configureStore();

function mapDispatchToProps(dispatch) {
  return {
      userLogoutFetch: user => dispatch(userLogoutFetch(user)),
      userDataFetch: user => dispatch(userDataFetch(user))
  };
}

const mapStateToProps = (state) => {
    return{
        email: state.email,
        token: state.token,
        items: state.items,
        data: state.data,
        stats: state.stats
    }
}

class Logout extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            emailValue: this.props.email,
            tokenValue: this.props.token,
            logout: false
        }

//        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    // handleChange = event => {
    //     store.subscribe(() => {
    //       this.setState({
    //         emailValue: store.getState().email,
    //         tokenValue: store.getState().token
    //       });
    //     });
    //     console.log('Valores de logout');
    //     console.log(this.state.emailValue);
    //     console.log(this.state.tokenValue);
    //   }

      handleClick = event => {
        console.log('En el handle click');
/*        console.log('Valores de logout');
        console.log(this.state.emailValue);
        console.log(this.state.tokenValue);
        console.log(this.props.email);
        console.log(this.props.token);*/
        this.setState({
          logout: true
        })
//        console.log(this.state.tokenValue);
	console.log('Valor de items');
	console.log(this.props.items);
	console.log('Valor de data');
        console.log(this.props.data);
	console.log('Valor de stats');
        console.log(this.props.stats);
	console.log('Valor de token');
        console.log(this.props.tokenValue);
        this.props.userDataFetch({ items : this.props.items,
                                   data: this.props.data,
                                   stats : this.props.stats,
                                   token: this.state.tokenValue

        })
        .then((success) => {
          console.log('BIEEEEEEEEEEEN');
        })
        this.props.userLogoutFetch({ email: this.state.emailValue,
                                    token: this.state.tokenValue
        })
        .then((success) => {


            // if(localStorage.id == 1)
            //   console.log("Usuario logeado correctamente");
            // else if(localStorage.id == 2)
            // {
            //   console.log("Contraseña mal puesta")
            // }
            // else if(localStorage.id == 0)
            //   console.log("Email mal");
            // else
            //   console.log("Error desconocido");
            // })
            console.log('BIEEEEEEEEEEEN pero del logaut');
      })
    }

      render() {
        return(
          <Grid>
            <Button variant="outlined" color="primary" value={this.state.logout} onClick={this.handleClick}>
              Cerrar sesión
            </Button>
          </Grid>
        )
      }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Logout);

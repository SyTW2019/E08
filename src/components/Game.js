import React, {Component, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';

var FPSProduce = 1;
var FPS = 30;

class Game extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            dps: 0,

        }
    }

    
    render(){
        return(
            <div id="Game" onLoad={}>
                <Grid >

                </Grid>
            </div>
        )
    }
}
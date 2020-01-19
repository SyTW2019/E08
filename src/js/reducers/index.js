//import { ADD_USER } from "../constants/action-types";

const initialState = {
    users: [],
    items: [
        {name:"Bebida Energetica",precio:10,cantidad:0,id:0,dps:3},
        {name:"Colegas",precio:20,cantidad:0,id:1,dps:5},
        {name:"Asistir a Clase",precio:30,cantidad:0,id:2,dps:8},
        {name:"Tutorias",precio:50,cantidad:0,id:3,dps:12},
    ],
    data: {
        currentLvl: 1,
        money: 0        
    },
    stats: {
        kills: 0,
        clicks: 0,
        tiempo_juego: 0,
    },
    logged: false,
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case 'ADD_USER':
            return {...state, users: action.payload}
        case 'LOGIN_USER':
            return {...state, users: action.payload}
        case 'SAVE_DATA':
            return {...state, data: action.payload}
        case 'ADD_ITEM':
            return {...state, items: action.payload}
        case 'ADD_STATS':
            return {...state, stats: action.payload}
        default:
            return state;
    }
}

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
        currentLvl: 0,
        money: 0,
        kills: 0,
    },
    logged: false,
    email: [],
    token: []
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case 'ADD_USER':
            return {...state, users: action.payload}
        case 'LOGIN_USER':
            return {...state, users: action.payload}
        case 'GET_DATA':
            return {...state, items: action.payload}
        case 'SAVE_DATA':
            return {...state, users: action.payload}
        case 'UPDATE_LOGGED':
            return {...state, logged: action.payload}
        case 'ADD_EMAIL':
            return {...state, email: action.payload}
        case 'ADD_TOKEN':
            return {...state, token: action.payload}
        case 'GET_LOGGED':
            return {...state, }
        case 'ADD_ITEM':
            return {...state, items: action.payload}
        default:
            return state;
    }
}

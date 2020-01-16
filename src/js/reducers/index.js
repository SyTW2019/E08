//import { ADD_USER } from "../constants/action-types";

const initialState = {
    users: [],
    items: [
        {name:"Bebida Energetica",precio:10,cantidad:0,id:0},
        {name:"Colegas",precio:20,cantidad:0,id:1},
        {name:"Asistir a Clase",precio:30,cantidad:0,id:2},
        {name:"Tutorias",precio:50,cantidad:0,id:3},
    ],
    logged: false,
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
            return {...state, logged: true}
        case 'GET_LOGGED':
            return {...state, }
        case 'ADD_ITEM':
            return {...state,items: action.payload}
        default:
            return state;
    }
}

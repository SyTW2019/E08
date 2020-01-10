//import { ADD_USER } from "../constants/action-types";

const initialState = {
    users: [],
    items: [0,0,0,0],
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
        default:
            return state;
    }
}

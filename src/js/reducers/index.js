//import { ADD_USER } from "../constants/action-types";

const initialState = {
    users: []
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case 'ADD_USER':
            return {...state, users: action.payload}
        
        case 'LOGIN_USER':
            return {...state, users: action.payload}
        
        case 'GET_DATA':
            return {...state, users: action.payload}
        case 'SAVE_DATA':
            return {...state, users: action.payload}
        default:
            return state;
    }
}



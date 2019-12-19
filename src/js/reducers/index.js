//import { ADD_USER } from "../constants/action-types";

const initialState = {
    users: [],
<<<<<<< HEAD
    logged: false,
=======
    items: [0,0,0,0],

>>>>>>> 93e95932c0c050bda6d23c5403c5635d62859419
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case 'ADD_USER':
            return {...state, users: action.payload}
        
        case 'LOGIN_USER':
            return {...state, users: action.payload, logged:true}
        
        case 'GET_DATA':
            return {...state, users: action.payload}
        case 'SAVE_DATA':
            return {...state, users: action.payload}
        
<<<<<<< HEAD
        case 'GET_LOGGED':
            return {...state, logged: action.payload}
=======
>>>>>>> 93e95932c0c050bda6d23c5403c5635d62859419
        default:
            return state;
    }
}



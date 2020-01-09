//import { ADD_USER } from "../constants/action-types";

const initialState = {
    users: [],
<<<<<<< HEAD
    logged: false,
=======
    items: [0,0,0,0],
<<<<<<< HEAD
    logged: false,
=======

>>>>>>> 93e95932c0c050bda6d23c5403c5635d62859419
>>>>>>> 52ae8c5eb77e1d7adc625011056c39ea87c86aee
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
        case 'UPDATE_LOGGED':
            return {...state, logged: true}
=======
        
<<<<<<< HEAD
        case 'GET_LOGGED':
            return {...state, logged: action.payload}
=======
>>>>>>> 93e95932c0c050bda6d23c5403c5635d62859419
>>>>>>> 52ae8c5eb77e1d7adc625011056c39ea87c86aee
        default:
            return state;
    }
}



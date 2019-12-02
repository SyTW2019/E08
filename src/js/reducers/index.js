//import { ADD_USER } from "../constants/action-types";

const initialState = {
    users: []
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case 'ADD_USER':
            return {...state, users: action.payload}
        default:
            return state;
    }
}

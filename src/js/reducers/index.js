//import { ADD_USER } from "../constants/action-types";

const initialState = {
  users: [],
  items: [
    { name:"Bebida Energetica", precio:10 ,cantidad:0 ,iden:0 ,dps:3 },
    { name:"Colegas", precio:250, cantidad:0, iden:1, dps:8 },
    { name:"Asistir a Clase", precio:750, cantidad:0, iden:2, dps:15 },
    { name:"Tutorias", precio:3000, cantidad:0, iden:3, dps:20 },
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
  email: [],
  token: []
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
	  case 'ADD_EMAIL':
	    return {...state, email: action.paylaod}
    case 'ADD_TOKEN':
      return {...state, token: action.payload}
    case 'UPDATE_LOGGED':
      return {...state, logged: action.payload}
    default:
      return state;
  }
}

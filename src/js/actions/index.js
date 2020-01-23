//import { ADD_USER } from "../constants/action-types";

export const userPostFetch = user => {
  console.log("Entro a peticion");
  return async function (dispatch){
    const resp = await fetch("/user/registro", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user)
    })
    const data = await resp.json()
    console.log("Datos recibidos");
    console.log(data.token);
    console.log(data.id);
    console.log(data.user);
    if(data.id == 1)
    {
      localStorage.setItem("id", data.id);
      localStorage.setItem("user", data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      dispatch(registUser(data.user));
      dispatch(registEmail(data.email));
      dispatch(registToken(data.token));
    }
    else
    {
      localStorage.setItem("id", data.id);
    }
  }
}

const registUser = userObj => ({
  type: 'ADD_USER',
  payload: userObj
})

const registEmail = userObj => ({
  type: 'ADD_EMAIL',
  payload: userObj
})

const registToken = userObj => ({
  type: 'ADD_TOKEN',
  payload: userObj
})

//Login -> recibir los datos del juego guardados en la BBDD

export const userLoginFetch = user => {
  return async function (dispatch){
    const resp = await fetch("/user/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user)
    })
    const data = await resp.json()

    if(data.id == 1)
    {
      localStorage.setItem("id", data.id);
	    localStorage.setItem("user", data.user);
	    localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      dispatch(loginUser(data.user))
      dispatch(registEmail(data.email));
      dispatch(registToken(data.token));
      dispatch(addItemIndex(data.items));
      dispatch(currentData(data.data));
      dispatch(userStats(data.stats))

	    return true;
    }
    else
    {
      //0 Email no existe 1 Constraseña mal puesta
      localStorage.setItem("id", data.id);
	    return false;
    }
    //Pendiente lo del token para el localStorage
    //Gestionar los datos del juego para actualizarlos
    //Petición de los datos guardados a la base de datos
  }
}


const loginUser = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj
})

export const userLogoutFetch = user => {
  return async function (dispatch){
    console.log('Valor del token en la accion');
    console.log(user.token);
    const resp = await fetch("/user/logout", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
        Accept: 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.id == 1)
      {
        console.log('Logout hecho satisfactoriamente.');
        localStorage.setItem("id", "");
        localStorage.setItem("user", []);
        localStorage.setItem("token", "");
        localStorage.setItem("items", [0,0,0,0]);
        localStorage.setItem("email", "");
      }
    })
    dispatch(logoutUser(false));
    dispatch(registUser(""));
    dispatch(registEmail(""));
    dispatch(registToken(""));
    return true;
  }
}

const logoutUser = userObj => ({
  type: 'UPDATE_LOGGED',
  payload: userObj
})

export const userDataFetch = user => {
  console.log('Valor del user en la accion');
  console.log(user);
  return async function (dispatch){
    const resp = await fetch("/user/save", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
        Accept: 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.message)
      {
        //Comparar si lo q devuelve el servidor es lo mismo q el usuario metio.
      }
      else
      {
        localStorage.setItem("token", data.jwt)
        dispatch(userData(data.user))
      }
    })

    const data = await resp.json()
    localStorage.setItem("token", data.jwt)
    dispatch(userData(data.user))
    return true;
  }
}

export const saveStats = gameStats => {
  return function(dispatch){
    dispatch(userStats(gameStats))
  }
}

const userStats = dataObj => ({
  type: 'ADD_STATS',
  payload: dataObj
})

const userData = dataObj => ({
  type: 'GET_DATA',
  payload: dataObj
})

export const saveData = gameData => {
  return function(dispatch){
    dispatch(currentData(gameData))
  }
}

const currentData = dataObj => ({
  type: 'SAVE_DATA',
  payload: dataObj
})

const addItemIndex = dataObj => ({
  type: 'ADD_ITEM',
  payload: dataObj
})

export const addItem = itemData =>{
  return function(dispatch)
  {
    dispatch(addItemIndex(itemData));
  }
}

export const updateLogged = boolLogged => {
  return function (dispatch) {
    dispatch(logoutUser(logoutUser));
  }
}

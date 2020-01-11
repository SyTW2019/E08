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
            localStorage.setItem("token", data.jwt)
            dispatch(registUser(data.user))
        }
        else
        {
            localStorage.setItem("id", data.id);
        }

    }

}

const updateLogged = userobj => ({
    type: 'UPDATE_LOGGED',
    payload: userobj
})

const registUser = userObj => ({
    type: 'ADD_USER',
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
        console.log("Datos recibidos");
        console.log(data.token);
        console.log(data.id);
        console.log(data.user);
        if(data.id === 1)
        {
            localStorage.setItem("id", data.id);
	        localStorage.setItem("user", data.user);
	        localStorage.setItem("token", data.jwt);

            dispatch(loginUser(data.user))
            //dispatch(userData(user))
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

export const userDataFetch = user => {
    return async function (dispatch){
        const resp = await fetch("/user/save", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({user})
        })

            .then(resp => resp.json())
            .then(data => {
                if(data.message)
                {
                    //Comparar si lo q devuelve el servidor es lo mismo q el usuario metio.
                } else {
                    localStorage.setItem("token", data.jwt)
                    dispatch(userData(data.user))
                }
            })

        const data = await resp.json()
        localStorage.setItem("token", data.jwt)
        dispatch(userData(data.user))
    }
}
const userData = dataObj => ({
    type: 'GET_DATA',
    payload: dataObj
})

export const saveData = gameData => {
    return async function(dispatch){
        const resp = await fetch("/user/save", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ gameData })
        })
        const data = await resp.json()
        localStorage.setItem("token", data.jwt)
        dispatch(gameSave(data.gameData))
    }
}

const gameSave = dataObj => ({
    type: 'SAVE_DATA',
    payload: dataObj
})

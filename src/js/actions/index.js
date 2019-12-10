//import { ADD_USER } from "../constants/action-types";

export const userPostFetch = user => {
    return async function (dispatch){
        const resp = await fetch("10.6.128.58:8080/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ user })
        })
        const data = await resp.json()
        localStorage.setItem("token", data.jwt)
        dispatch(registUser(data.user))
    }
}

const registUser = userObj => ({
    type: 'ADD_USER',
    payload: userObj
})


export const userLoginFetch = user => {
    return async function (dispatch){
        const resp = await fetch("10.6.128.58:8080/login", {
            method: "POST",
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
                    dispatch(loginUser(data.user))
                }
            })
        const data = await resp.json()
        localStorage.setItem("token", data.jwt)
        dispatch(loginUser(data.user))

    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

export const userDataFetch = user => {
    return async function (dispatch){
        const resp = await fetch("10.6.128.58:8080/login", {
            method: "POST",
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
                    dispatch(UserData(data.user))
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
        const resp = await fetch("10.6.128.58:8080/user", {
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
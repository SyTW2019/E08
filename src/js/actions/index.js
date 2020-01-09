//import { ADD_USER } from "../constants/action-types";

export const userPostFetch = user => {
    return async function (dispatch){
        const resp = await fetch("/user/registro", {
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
        dispatch(updateLogged(data.user))
    }
        
}

const updateLogged = userObj => ({
    type: 'UPDATE_LOGGED',
    payload: userObj
})

const registUser = userObj => ({
    type: 'ADD_USER',
    payload: userObj
})


export const userLoginFetch = user => {
    return async function (dispatch){
        const resp = await fetch("/user/login", {
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

<<<<<<< HEAD
export const getLogged = Logged => {
    return async function(dispatch){
        let test;
        dispatch(getLogged(test))
    }
}

const getLogged = dataObj => ({
    type: 'GET_LOGGED',
    payload: test,
})
=======
export const saveDataTest = gameData => {
    return function(dispatch){


    }
}
>>>>>>> 52ae8c5eb77e1d7adc625011056c39ea87c86aee

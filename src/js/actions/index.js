//import { ADD_USER } from "../constants/action-types";

export const userPostFetch = user => {
    return dispatch => {
        return fetch("10.6.128.58:8080/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({user})
        })

        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            dispatch(registUser(data.user))
        })
    }
}

const registUser = userObj => ({
    type: 'ADD_USER',
    payload: userObj
})


export const userLoginFetch = user => {
    return dispatch => {
        return fetch("10.6.128.58:8080/login", {
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
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})
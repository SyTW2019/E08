//import { ADD_USER } from "../constants/action-types";

export const userPostFetch = user => {
    return dispatch => {
        return fetch("http://localhost:3000/users", {
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

import axios from "axios"
import * as actionTypes from "./actionTypes"

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

//時間到自動登出
export const logout = () => {
  console.log("登出")

  localStorage.removeItem("token")
  localStorage.removeItem("expirationDate")
  localStorage.removeItem("userId")
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
//讓token失效
export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}
export const auth = (email, password, signupMethod) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcxRB6GwParC7wx93E1GVO0rbaFHPYg3k"
    if (!signupMethod) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcxRB6GwParC7wx93E1GVO0rbaFHPYg3k"
    }
    axios
      .post(url, authData)
      .then(response => {
        console.log(response)
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        )
        localStorage.setItem("token", response.data.idToken)
        localStorage.setItem("expirationDate", expirationDate)
        localStorage.setItem("userId", response.data.localId)

        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err.response.data.error))
      })
  }
}

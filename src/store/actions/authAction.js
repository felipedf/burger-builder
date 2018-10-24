import axios from 'axios';

import * as actionType from './actionTypes';

const authStart = () => (
  {
    type: actionType.AUTH_START
  }
);

const authSuccess = (token, userId) => (
  {
    type: actionType.AUTH_SUCCESS,
    token: token,
    userId: userId
  }
);

const authFail = error => (
  {
    type: actionType.AUTH_FAIL,
    error: error
  }
);

const logout = () => (
  {
    type: actionType.AUTH_LOGOUT
  }
)

const checkAuthTimeout = expirationTime => (
  dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
)

export const auth = (email, password, isSignUp) => (
  dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBMfqmgujBd_Ruyl7QuxOj4UlgfxMPv5pY';
    if (!isSignUp) url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBMfqmgujBd_Ruyl7QuxOj4UlgfxMPv5pY'
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error.message));
      })
  }
);

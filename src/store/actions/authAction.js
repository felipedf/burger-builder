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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return {
    type: actionType.AUTH_LOGOUT
  }
}

const checkAuthTimeout = expirationTime => (
  dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
)

export const authCheckState = () => (
  dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationTime'));
      if (expirationTime > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout( (expirationTime.getTime() - new Date().getTime()) / 1000 ));
      } else {
        dispatch(logout());
      }
    }
  }
)

export const setAuthRedirectPath = (path = '/') => (
  {
    type: actionType.SET_AUTH_REDIRECT_PATH,
    path: path
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
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationTime', expirationTime);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error.message));
      })
  }
);

import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectPath: '/'
};

const authStart = state => updateObject(state, { error: null, loading: true });

const authSuccess = (state, action) => (
  updateObject(state, {
    token: action.token,
    userId: action.userId,
    loading: false,
    error: null
  })
);

const authFail = (state, action) => updateObject(state, { error: action.error, loading: false });

const authLogout = (state, action) => (
  updateObject(state, { token: null, userId: null })
);

const authRedirect = (state, action) => updateObject(state, { authRedirectPath: action.path })

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START: return authStart(state);
    case actionType.AUTH_SUCCESS: return authSuccess(state, action);
    case actionType.AUTH_FAIL: return authFail(state, action);
    case actionType.AUTH_LOGOUT: return authLogout(state, action);
    case actionType.SET_AUTH_REDIRECT_PATH: return authRedirect(state, action)
    default: return state;
  }
};

export default authReducer;

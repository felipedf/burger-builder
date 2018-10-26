import reducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: '/'
    })
  });

  it('should store the token upon login', () => {
    expect(reducer(undefined, {
      type: actionTypes.AUTH_SUCCESS,
      token: 'Random',
      userId: 'RandomId'
    })).toEqual({
      token: 'Random',
      userId: 'RandomId',
      loading: false,
      error: null,
      authRedirectPath: '/'
    })
  });
});

import { server } from '../store';

import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    console.log('email', email, 'password', password);

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );

    console.log('here 2');

    console.log(data);

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    console.log('error', error);
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

// register
export const register = formdata => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, formdata, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log(data);

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    console.log('error', error);
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};

// get profile
export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });
    console.log('here 1');

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );

    console.log('here 2');

    console.log(data);

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};
export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });
    console.log('here 1');

    const { data } = await axios.get(
      `${server}/logout`,

      {
        withCredentials: true,
      }
    );

    console.log('here 2');

    console.log(data);

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};
export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });
    console.log('here 1');

    const { data } = await axios.get(
      `${server}/subscribe`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'buySubscriptionFail',
      payload: error.response.data.message,
    });
  }
};
export const cancelSubscription = () => async dispatch => {
  try {
    console.log('cancel');
    dispatch({ type: 'cancelSubscriptionRequest' });
    console.log('here 1');

    const { data } = await axios.delete(
      `${server}/subscribe/cancel`,

      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'cancelSubscriptionSuccess',
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'cancelSubscriptionFail',
      payload: error.response.data.message,
    });
  }
};

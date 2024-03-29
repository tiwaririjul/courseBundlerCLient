import { server } from '../store';
import axios from 'axios';

export const getAllCourses =
  (category = '', keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });

      console.log('course requested');

      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`
      );

      console.log('course actions ', data);

      await dispatch({ type: 'allCoursesSuccess', payload: data.courses });
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response.data.message,
      });
    }
  };

export const getCourseLectures = id => async dispatch => {
  try {
    dispatch({ type: 'getCoursesRequest' });
    console.log('lecture request');

    const { data } = await axios.get(`${server}/courses/${id}`, {
      withCredentials: true,
    });

    console.log('lecture data ', data);

    await dispatch({ type: 'getCoursesSuccess', payload: data.lectures });
  } catch (error) {
    dispatch({
      type: 'getCoursesFail',
      payload: error.response.data.message,
    });
  }
};

import { server } from '../store';
import axios from 'axios';

export const createCourse = formData => async dispatch => {
  console.log('frmdata ', formData);
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    };
    // title, description, category, createdBy
    dispatch({ type: 'createCourseRequest' });

    const { data } = await axios.post(
      `${server}/createcourse`,
      formData,
      config
    );

    await dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFail ',
      payload: error.response.data.message,
    });
  }
};

export const addLecture = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    // title, description, category, createdBy
    dispatch({ type: 'addLectureRequest' });

    const { data } = await axios.post(
      `${server}/course/${id}`,
      formData,
      config
    );

    await dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addLectureFail ',
      payload: error.response.data.message,
    });
  }
};

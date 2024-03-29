import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import introVideo from '../../asset/videos/sample1.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../layout/Loader/Loader';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(1);

  const { lectures, loading } = useSelector(state => state.courses);

  console.log('lectures ', lectures);

  // const lectures = [
  //   {
  //     _id: 'sjsjsjsjsj',
  //     title: 'sample1',
  //     description: 'sample jffhf hufyguygrufgurgy',
  //     video: {
  //       url: 'ihrr ucythugyt',
  //     },
  //   },
  //   {
  //     _id: 'sjsjsjsjsj',
  //     title: 'sample2',
  //     description: 'sample jffhf hufyguygrufgurgy',
  //     video: {
  //       url: 'ihrr ucythugyt',
  //     },
  //   },
  //   {
  //     _id: 'sjsjsjsjsj',
  //     title: 'sample3',
  //     description: 'sample jffhf hufyguygrufgurgy',
  //     video: {
  //       url: 'ihrr ucythugyt',
  //     },
  //   },
  //   {
  //     _id: 'sjsjsjsjsj',
  //     title: 'sample4',
  //     description: 'sample jffhf hufyguygrufgurgy',
  //     video: {
  //       url: 'ihrr ucythugyt',
  //     },
  //   },
  //   {
  //     _id: 'sjsjsjsjsj',
  //     title: 'sample5',
  //     description: 'sample jffhf hufyguygrufgurgy',
  //     video: {
  //       url: 'ihrr ucythugyt',
  //     },
  //   },
  //   {
  //     _id: 'sjsjsjsjsj',
  //     title: 'sample6',
  //     description: 'sample jffhf hufyguygrufgurgy',
  //     video: {
  //       url: 'ihrr ucythugyt',
  //     },
  //   },
  // ];

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    console.log('paramss ', params.id);
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width={'100%'}
              autoplay
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>
            <Heading
              m="4"
              children={`${lectureNumber} ${lectures[lectureNumber].title}`}
            />
            <Text m="4" children={lectures[lectureNumber].description} />
          </Box>
          <VStack>
            {lectures.map((element, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={element._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0, 0 , 0 , 0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Heading chidren="No lectures" />
      )}
    </Grid>
  );
};

export default CoursePage;

import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/Register';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandler,
  courseTitle,
  lectures = [],
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };

  //   const courseTitle = 'React course';
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="full"
        oClose={handleClose}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          {' '}
          {/* This is an empty ModalContent */}
          <ModalHeader>{courseTitle}</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody p="16">
            <Grid templateColumns={['1fr', '3fr', '1fr']}>
              <Box px={['0', '16']}>
                <Box my="5">
                  <Heading children={courseTitle} />
                  <Heading children={`#${id}`} size="sm" opacity={0.4} />
                </Box>
                <Heading children={'Lectures'} size="lg" />
                <VideoCard
                  title="React Intro"
                  description="This is a intro lecture , where you will know the basizs of react"
                  num={1}
                  lectureId="qwefeghjkwlskjdhdhjs"
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                />
              </Box>
              <Box>
                <form
                  onSubmit={e =>
                    addLectureHandler(e, id, title, description, video)
                  }
                >
                  <VStack spacing={'4'}>
                    <Heading
                      children="Add Lecture"
                      size={'md'}
                      textTransform="uppercase"
                    />

                    <Input
                      focusBorderColor="purple.300"
                      placeholder="Title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                    <Input
                      focusBorderColor="purple.300"
                      placeholder="Description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                    <Input
                      accept="video/mp4"
                      type={'file'}
                      focusBorderColor="purple.500"
                      css={{
                        '&::file-selector-button': {
                          ...fileUploadCss,
                          color: 'purple',
                        },
                      }}
                      onChange={changeVideoHandler}
                    ></Input>
                    {videoPrev && (
                      <video
                        controlsList="nodownoad"
                        controls
                        src={videoPrev}
                      ></video>
                    )}

                    <Button w="full" colorSchema={'purple'} type="submit">
                      Upload video
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107 , 70 , 193 , 0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button color={'purple.600'}>
        <RiDeleteBin7Fill
          onClick={() => deleteButtonHandler(courseId, lectureId)}
        />
      </Button>
    </Stack>
  );
}

import React from 'react';
import {
  Heading,
  Stack,
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
import vg from '../../src/asset/images/bg.gif';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import introVideo from '../../src/asset/videos/sample1.mp4';

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="container">
          <Stack
            direction={['column', 'row']}
            height="100%"
            justifyContent={['center', 'space-between']}
            alignItems="center"
            spacing={['16', '56']}
          >
            {/* ["for phone"   , for big screen] */}
            {/* stack is a component having feature of flex */}

            {/* VStack: used to stack elements in the vertical direction */}
            <VStack
              width={'full'}
              alignItems={['center', 'flex-end']}
              spacing="6"
            >
              <Heading children="LEARN FROM THE EXPERTS" size={'2xl'} />
              <Text
                textAlign={['center', 'left']}
                fontFamily="cursive"
                children="Find the valuable content at reasonable price"
              />
              <Link to="/courses">
                <Button size={'lg'} colorScheme="yellow">
                  Explore Now
                </Button>
              </Link>
            </VStack>
            <Image
              boxSize={'md'}
              src={vg}
              objectFit="contain"
              className="vector-graphics"
            />
          </Stack>
        </div>
        <Box padding={'8'} bg="blackAlpha.800">
          <Heading
            textAlign={'center'}
            fontFamily="body"
            color={'yellow.400'}
            children="OUR BRANDS"
          />

          <HStack
            className="brandsBanner"
            justifyContent={'space-evenly'}
            marginTop="4"
          >
            <CgGoogle />
            <CgYoutube />
            <DiAws />
            <SiCoursera />
            <SiUdemy />
          </HStack>
        </Box>
        <div className="container2">
          <video
            autoplay
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}
          ></video>
        </div>
      </section>
    </>
  );
};

export default Home;

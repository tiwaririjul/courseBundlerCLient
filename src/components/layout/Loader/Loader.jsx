import { Spinner, VStack } from '@chakra-ui/react';
import React from 'react';

const Loader = ({ color = 'yellow.500' }) => {
  return (
    <VStack h="100vh" justifyContent={'center'}>
      <div>
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="transparent"
          size="xl"
          color={color}
        />
      </div>
    </VStack>
  );
};

export default Loader;

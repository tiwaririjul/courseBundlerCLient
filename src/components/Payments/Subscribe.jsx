import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();

  const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.courses);

  const subscribeHandler = async () => {
    console.log('address ', `${server}/razorpaykey`);

    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);

    console.log('hello');

    console.log('key ', key);

    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }

    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'CourseBundler',
          description: 'Get access to all premium content',
          image:
            'https://yt3.ggpht.com/g3IqVjrfuD4tufX8d5hUq27FgdvK6r7zra5_GtSMlQw5H50oK2zkdp3z98bG22Ry-sCWtSRk=s48-c-k-c0x00ffffff-no-rj',
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Rijul programmer',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [dispatch, error, user.name, user.email, key, subscriptionId]);

  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg="yellow.400" p={'4'} css={{ borderRadius: '8px 8px 0 0 ' }}>
          <Text children={`Pro Pack - R299.00`} />
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
            <Text
              children={`Join pro pack and get access to all the content `}
            />
            <Heading size="md" children={'R299 Only'} />
          </VStack>

          <Button
            my="8"
            w="full"
            colorScheme={'yellow'}
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>
        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            color={'white'}
            size="sm"
            children={'100% refund at cancellation'}
          />

          <Text
            fontSize={'xs'}
            color="white"
            children={'terms and Condition apply'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;

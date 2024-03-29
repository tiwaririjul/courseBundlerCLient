import {
  Container,
  FormLabel,
  Heading,
  VStack,
  Input,
  Box,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const googleSuccess = response => {
    console.log(response);
  };

  const googleError = error => {
    console.log(error);
  };

  // const

  return (
    <>
      <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <Heading children={'Welcome to CourseBundler'} />
          <form style={{ width: '100%' }} onSubmit={submitHandler}>
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Email Address" />
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type={'email'}
                focusBorderColor="yellow.500"
              ></Input>
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="password" children="Password" />
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type={'password'}
                focusBorderColor="yellow.500"
              ></Input>
            </Box>
            <Box>
              <Link to="/forgetpassword">
                <Button fontSize={'sm'} variant="link">
                  Forget Password
                </Button>
              </Link>
            </Box>
            <Box>
              <Button my="4" colorScheme={'yellow'} type="submit">
                Login
              </Button>

              <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
            </Box>

            <Box my="4">
              New User?{' '}
              <Link to="/register">
                <Button colorScheme={'yellow'} variant="link">
                  Sign Up
                </Button>{' '}
                {''}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Login;

import React from 'react';
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Assets
import signInImage from 'assets/img/signInImage.png';

function Login() {
  // Chakra color mode
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.400', 'white');

  const schema = yup
    .object({
      email: yup
        .string()
        .required('Email is a required field')
        .email('Email is invalid'),
      password: yup.number().positive().integer().required(),
    })
    .required();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(values) {
    console.log('the submit values:', values);

    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }
  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: 'initial', md: '75vh', lg: '85vh' }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: '100px', md: '0px' }}
      >
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: 'none' }}
          w={{ base: '100%', md: '50%', lg: '42%' }}
        >
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: '150px', lg: '80px' }}
          >
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Welcome Back
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'
            >
              Enter your email and password to sign in
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email}>
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'
                  htmlFor='email'
                >
                  Email
                </FormLabel>
                <Input
                  mb={`${!errors.email ? '24px' : '0px'}`}
                  borderRadius='15px'
                  fontSize='sm'
                  type='text'
                  placeholder='Your email adress'
                  size='lg'
                  id='email'
                  {...register('email')}
                />
                <FormErrorMessage mb='24px'>
                  {errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'
                  htmlFor='password'
                >
                  Password
                </FormLabel>
                <Input
                  borderRadius='15px'
                  mb={`${!errors.password ? '36px' : '0px'}`}
                  fontSize='sm'
                  type='password'
                  placeholder='Your password'
                  size='lg'
                  id='password'
                  {...register('password')}
                />
                <FormErrorMessage mb='36px'>
                  {errors.password?.message}
                </FormErrorMessage>
                <FormControl display='flex' alignItems='center'>
                  <Switch id='remember-login' colorScheme='teal' me='10px' />
                  <FormLabel
                    htmlFor='remember-login'
                    mb='0'
                    ms='1'
                    fontWeight='normal'
                  >
                    Remember me
                  </FormLabel>
                </FormControl>
                <Button
                  fontSize='10px'
                  type='submit'
                  bg='teal.300'
                  w='100%'
                  h='45'
                  mb='20px'
                  color='white'
                  mt='20px'
                  _hover={{
                    bg: 'teal.200',
                  }}
                  _active={{
                    bg: 'teal.400',
                  }}
                  isLoading={isSubmitting}
                >
                  LOGIN
                </Button>
              </FormControl>
            </form>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'
            >
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Link color={titleColor} as='span' ms='5px' fontWeight='bold'>
                  Register
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: 'none', md: 'block' }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'
        >
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Login;

import React from 'react';
import {apiFactory} from '../../api_factory/index.ts';
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
import {useForm} from 'react-hook-form';
// Assets
import signInImage from 'assets/img/signInImage.png';
import {useHistory} from 'react-router-dom';

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.400', 'white');

  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm();

  // const getUser = async () => {
  //   const user = await apiFactory().data.account().getUser();
  //   console.log(user);
  // };

  const tryLogin = async (values) => {
    try {
      const token = await apiFactory().data.account().login({
        email: values.email,
        password: values.password,
      });
      if (typeof token === 'string') {
        localStorage.setItem('token', token);
        const userDataArray = await apiFactory()
          .data.account()
          .getCurrentUser();
        const userData = userDataArray[0];
        console.log(userData);
        if (userData.roleId === 1) {
          history.push('/wholesale/profile');
        } else if (userData.roleId === 2) {
          history.push('/producer/profile');
        } else throw new Error('User role not found');
      } else throw new Error('Date Invalide');
    } catch (error) {
      console.log(error);
    }
  };

  function onSubmit(values) {
    // getUser();

    console.log('the submit values:', values);
    tryLogin(values);
  }
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{sm: 'initial', md: '75vh', lg: '85vh'}}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{sm: '100px', md: '0px'}}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{userSelect: 'none'}}
          w={{base: '100%', md: '50%', lg: '42%'}}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{md: '150px', lg: '80px'}}
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.email}>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="email"
                >
                  Email
                </FormLabel>
                <Input
                  mb={`${!errors.email ? '24px' : '0px'}`}
                  borderRadius="15px"
                  fontSize="sm"
                  type="text"
                  placeholder="Your email adress"
                  size="lg"
                  id="email"
                  {...register('email', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage mb="24px">
                  {errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="password"
                >
                  Password
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb={`${!errors.password ? '36px' : '0px'}`}
                  fontSize="sm"
                  type="password"
                  placeholder="Your password"
                  size="lg"
                  id="password"
                  {...register('password', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage mb="36px">
                  {errors.password?.message}
                </FormErrorMessage>

                <Button
                  fontSize="10px"
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: 'teal.200',
                  }}
                  _active={{
                    bg: 'teal.400',
                  }}
                  isLoading={isSubmitting}
                >
                  SIGN IN
                </Button>
              </FormControl>
            </form>
          </Flex>
        </Flex>
        <Box
          display={{base: 'none', md: 'block'}}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;

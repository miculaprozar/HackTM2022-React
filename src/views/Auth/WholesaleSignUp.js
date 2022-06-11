// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
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
import BgSignUp from 'assets/img/BgSignUp.png';
import React, { useEffect, useState, useCallback } from 'react';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { apiFactory } from '../../api_factory/index.ts';
import { useHistory } from 'react-router-dom';
import Map from 'components/Map/map';
import _ from 'lodash';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyAaTB74UBsFLP-FWRQ3yaXKwOgs2TDYNfI');
Geocode.setLanguage('en');

function SignUp() {
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const bgIcons = useColorModeValue('teal.200', 'rgba(255, 255, 255, 0.5)');

  const history = useHistory();

  const validationSchema = yup.object({
    firstName: yup.string().required('First name is a required field'),
    lastName: yup.string().required('Last name is a required field'),
    companyName: yup.string().required('Company name is a required field'),
    companyVAT: yup.string().required('Company VAT is a required field'),
    companyRegNumber: yup
      .string()
      .required('Register number is a required field'),
    companyIBAN: yup.string().required(' Iban is a required field'),

    details: yup.string().required('Details is a required field'),

    email: yup
      .string()
      .required('Email is a required field')
      .email('Email is invalid'),
    password: yup
      .string()
      .required('Password is a required field')
      .min(6, 'Minim 6 characters'),
    seccondPassword: yup
      .string()
      .oneOf([yup.ref('password')], "The two passwords doesn't match"),
  });

  const [markerLocation, setMarkerLocation] = useState({
    lat: 45.944,
    lng: 25.009,
  });

  const handleSetPosition = _.debounce(function (position) {
    Geocode.fromLatLng(position.latitude, position.longitude).then(
      (response) => {
        const address = response.results[1].formatted_address;
        console.log(position)
        setCurrentAdress(address);
        setMarkerLocation({
          lat: Number(position.latitude),
          lng: Number(position.longitude),
        });
      },
      (error) => {
        console.error(error);
      },
    );
  }, 500);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const setUser = async (values) => {
    const user = await apiFactory()
      .data.account()
      .register({ ...values, roleId: 1 });
    const login = await apiFactory().data.account().login({
      email: values.email,
      password: values.password,
    });
    localStorage.setItem('token', login);
    const userDataArray = await apiFactory()
      .data.account()
      .getCurrentUser();
    const userData = userDataArray[0];
    localStorage.setItem('userData', JSON.stringify(userData));

    if (
      localStorage.getItem('token') &&
      localStorage.getItem('locationToAdd')
    ) {
      //json to object
      const locationToAdd = {
        longitude: markerLocation.lng,
        latitude: markerLocation.lat,
        details: values.address,
      };
      console.log(locationToAdd);
      const addLocationResponse = await apiFactory()
        .data.account()
        .insertLocations(locationToAdd);
      console.log(addLocationResponse);
    }

    user && history.push('/wholesale/profile');
  };

  function onSubmit(values) {
    console.log('the submit valuessssssssssss:', values);
    setUser(values);
  }

  const [currentAdress, setCurrentAdress] = useState('');

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: '70vh', md: '50vh' }}
        w={{ md: 'calc(100vw - 50px)' }}
        borderRadius={{ md: '15px' }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: 'auto' }}
        mt={{ md: '14px' }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Welcome!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: '90%', sm: '60%', lg: '40%', xl: '30%' }}
        >
          Sign up to start your business as a wholesale distributor.
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="1000px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: '100px' }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Register
          </Text>

          <Text
            fontSize="lg"
            color="gray.400"
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            or
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex justify="space-between" align="center" wrap="wrap">
              <FormControl
                isInvalid={errors.firstName}
                width="48%"
                minWidth={'300px'}
              >
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="firstName"
                >
                  First Name
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  placeholder="Your first name"
                  mb={`${!errors.firstName ? '24px' : '0px'}`}
                  size="lg"
                  id="firstName"
                  {...register('firstName')}
                />
                <FormErrorMessage mb="24px">
                  {errors.firstName?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email} width="48%">
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="email"
                >
                  Email
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  placeholder="Your email address"
                  mb={`${!errors.email ? '24px' : '0px'}`}
                  size="lg"
                  id="email"
                  {...register('email')}
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
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="password"
                  placeholder="Your password"
                  mb={`${!errors.password ? '24px' : '0px'}`}
                  size="lg"
                  id="password"
                  {...register('password')}
                />
                <FormErrorMessage mb="24px">
                  {errors.password?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.seccondPassword}>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="seccondPassword"
                >
                  Confirm password
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="password"
                  placeholder="Your seccond password"
                  mb={`${!errors.seccondPassword ? '24px' : '0px'}`}
                  size="lg"
                  id="seccondPassword"
                  {...register('seccondPassword')}
                />
                <FormErrorMessage mb="24px">
                  {errors.seccondPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.lastName}>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="lastName"
                >
                  Last name
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="lastName"
                  placeholder="Your lastName"
                  mb={`${!errors.lastName ? '24px' : '0px'}`}
                  size="lg"
                  id="lastName"
                  {...register('lastName')}
                />
                <FormErrorMessage mb="24px">
                  {errors.lastName?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.companyName}>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="companyName"
                >
                  Company Name
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  placeholder="Your companyName"
                  mb={`${!errors.companyName ? '24px' : '0px'}`}
                  size="lg"
                  id="companyName"
                  {...register('companyName')}
                />
                <FormErrorMessage mb="24px">
                  {errors.companyName?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.companyVAT}>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="companyVAT"
                >
                  Company Vat
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  placeholder="Your companyVAT"
                  mb={`${!errors.companyVAT ? '24px' : '0px'}`}
                  size="lg"
                  id="companyVAT"
                  {...register('companyVAT')}
                />
                <FormErrorMessage mb="24px">
                  {errors.companyVAT?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.companyRegNumber}>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="companyRegNumber"
                >
                  Register Number
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  placeholder="Your Register Number"
                  mb={`${!errors.companyRegNumber ? '24px' : '0px'}`}
                  size="lg"
                  id="companyRegNumber"
                  {...register('companyRegNumber')}
                />
                <FormErrorMessage mb="24px">
                  {errors.companyRegNumber?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.companyIBAN}>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="companyIBAN"
                >
                  Company IBAN
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  placeholder="Your company IBAN"
                  mb={`${!errors.companyIBAN ? '24px' : '0px'}`}
                  size="lg"
                  id="companyIBAN"
                  {...register('companyIBAN')}
                />
                <FormErrorMessage mb="24px">
                  {errors.companyIBAN?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.details}>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="details"
                >
                  Details
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  placeholder="Your details"
                  mb={`${!errors.password ? '24px' : '0px'}`}
                  size="lg"
                  id="details"
                  {...register('details')}
                />
                <FormErrorMessage mb="24px">
                  {errors.details?.message}
                </FormErrorMessage>
              </FormControl>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="normal"
                htmlFor="Address"
              >
                Address
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                placeholder="Address"
                mb={`24px`}
                size="lg"
                id="address"
                value={currentAdress}
              />
              <Map
                isMarkerShown
                handleSetPosition={handleSetPosition}
                markerLocation={markerLocation}
              />

              <Button
                type="submit"
                bg="teal.300"
                fontSize="10px"
                color="white"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                mt="14px"
                _hover={{
                  bg: 'teal.200',
                }}
                _active={{
                  bg: 'teal.400',
                }}
              >
                SIGN UP
              </Button>
            </Flex>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <Link
                color={titleColor}
                as="span"
                ms="5px"
                href="/auth/signin"
                fontWeight="bold"
              >
                Sign In
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;

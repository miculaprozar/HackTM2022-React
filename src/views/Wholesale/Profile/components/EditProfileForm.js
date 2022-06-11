import React from "react";
import {
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  FormErrorMessage,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { apiFactory } from "../../../../api_factory/index.ts";

const EditProfileForm = ({ setRefetchUserInformation }) => {
  const textColor = useColorModeValue("gray.700", "white");

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is a required field"),
    lastName: yup.string().required("Last name is a required field"),
    companyName: yup.string().required("Company name is a required field"),
    companyVAT: yup.string().required("Company VAT is a required field"),
    companyRegNumber: yup
      .string()
      .required("Register number is a required field"),
    companyIBAN: yup.string().required(" Iban is a required field"),

    details: yup.string().required("Details is a required field"),

    email: yup
      .string()
      .required("Email is a required field")
      .email("Email is invalid"),
    // password: yup
    //   .string()
    //   .required("Password is a required field")
    //   .min(6, "Minim 6 characters"),
    // seccondPassword: yup
    //   .string()
    //   .required("Second Password is a required field")
    //   .oneOf([yup.ref("password")], "The two passwords doesn't match"),
  });

  const updateUser = async (values) => {
    const updatedUser = await apiFactory()
      .data.account()
      .setUserInformation(values);

    setRefetchUserInformation(updatedUser);
  };

  function onSubmit(values) {
    updateUser(values);
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Edit profile
        </Text>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="space-between" align="center" wrap="wrap">
          <FormControl
            isInvalid={errors.firstName}
            width="48%"
            minWidth={"300px"}
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
              mb={`${
                !errors.firstName && errors.email
                  ? "48.8px"
                  : !errors.firstName
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="firstName"
              {...register("firstName")}
            />
            <FormErrorMessage mb="24px">
              {errors.firstName?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} width="48%" minWidth={"300px"}>
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
              mb={`${
                !errors.email && errors.firstName
                  ? "48.8px"
                  : !errors.email
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="email"
              {...register("email")}
            />
            <FormErrorMessage mb="24px">
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          {/* <FormControl
            isInvalid={errors.password}
            width="48%"
            minWidth={"300px"}
          >
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
              mb={`${
                !errors.password && errors.seccondPassword
                  ? "48.8px"
                  : !errors.password
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="password"
              {...register("password")}
            />
            <FormErrorMessage mb="24px">
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.seccondPassword}
            width="48%"
            minWidth={"300px"}
          >
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
              mb={`${
                !errors.seccondPassword && errors.password
                  ? "48.8px"
                  : !errors.seccondPassword
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="seccondPassword"
              {...register("seccondPassword")}
            />
            <FormErrorMessage mb="24px">
              {errors.seccondPassword?.message}
            </FormErrorMessage>
          </FormControl> */}

          <FormControl
            isInvalid={errors.lastName}
            width="48%"
            minWidth={"300px"}
          >
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
              mb={`${
                !errors.lastName && errors.companyName
                  ? "48.8px"
                  : !errors.lastName
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="lastName"
              {...register("lastName")}
            />
            <FormErrorMessage mb="24px">
              {errors.lastName?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.companyName}
            width="48%"
            minWidth={"300px"}
          >
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
              mb={`${
                !errors.companyName && errors.lastName
                  ? "48.8px"
                  : !errors.companyName
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="companyName"
              {...register("companyName")}
            />
            <FormErrorMessage mb="24px">
              {errors.companyName?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.companyVAT}
            width="48%"
            minWidth={"300px"}
          >
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
              mb={`${
                !errors.companyVAT && errors.companyRegNumber
                  ? "48.8px"
                  : !errors.companyVAT
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="companyVAT"
              {...register("companyVAT")}
            />
            <FormErrorMessage mb="24px">
              {errors.companyVAT?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.companyRegNumber}
            width="48%"
            minWidth={"300px"}
          >
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
              mb={`${
                !errors.companyRegNumber && errors.companyVAT
                  ? "48.8px"
                  : !errors.companyRegNumber
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="companyRegNumber"
              {...register("companyRegNumber")}
            />
            <FormErrorMessage mb="24px">
              {errors.companyRegNumber?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.companyIBAN}
            width="48%"
            minWidth={"300px"}
          >
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
              mb={`${
                !errors.companyIBAN && errors.details
                  ? "48.8px"
                  : !errors.companyIBAN
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="companyIBAN"
              {...register("companyIBAN")}
            />
            <FormErrorMessage mb="24px">
              {errors.companyIBAN?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.details}
            width="48%"
            minWidth={"300px"}
          >
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
              mb={`${
                !errors.details && errors.companyIBAN
                  ? "48.8px"
                  : !errors.details
                  ? "24px"
                  : "0px"
              }`}
              size="lg"
              id="details"
              {...register("details")}
            />
            <FormErrorMessage mb="24px">
              {errors.details?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            bg="teal.300"
            fontSize="10px"
            color="white"
            fontWeight="bold"
            w="100%"
            h="45"
            mb="24px"
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
          >
            Change profile
          </Button>
        </Flex>
      </form>
    </Card>
  );
};

export default EditProfileForm;

// Chakra Imports
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Select,
} from "@chakra-ui/react";
import GitHubButton from "react-github-btn";
import { Separator } from "components/Separator/Separator";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiFactory } from "../../../../api_factory/index.ts";
import * as yup from "yup";

export default function AddProductModal(props) {
  const { secondary, isOpen, onClose, fixed, ...rest } = props;
  const [switched, setSwitched] = useState(props.isChecked);

  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  let fixedDisplay = "flex";
  if (props.secondary) {
    fixedDisplay = "none";
  }

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  let colorButton = useColorModeValue("white", "gray.700");
  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");
  const settingsRef = React.useRef();

  const validationSchema = yup.object({
    name: yup.string().required("Name is a required field"),
    description: yup.string().required("Description is a required field"),
    quantity: yup.string().required("Quantity is a required field"),
    price: yup.string().required("Price is a required field"),
    measurementUnitId: yup
      .string()
      .required("Mearument Unit is a required field"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const postUserProduct = async (body) => {
    const product = await apiFactory().data.account().postUserProduct(body);
  };

  function onSubmit(values) {
    postUserProduct({ ...values, currency: "lei" });
    onClose();
  }
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              Add product
            </Text>
            <Text fontSize="md" mb="16px">
              Add the product that you desire.
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w="380px" ps="24px" pe="40px">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name} width="100%">
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="name"
                >
                  Name
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  placeholder="Name"
                  mb={`${!errors.name ? "24px" : "0px"}`}
                  size="lg"
                  id="name"
                  width="90%"
                  {...register("name")}
                />
                <FormErrorMessage mb="24px">
                  {errors.name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description} width="100%">
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="description"
                >
                  Description
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  placeholder="Description"
                  mb={`${!errors.name ? "24px" : "0px"}`}
                  size="lg"
                  id="description"
                  width="90%"
                  {...register("description")}
                />
                <FormErrorMessage mb="24px">
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.quantity} width="100%">
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="quantity"
                >
                  Quantity
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  placeholder="Quantity"
                  mb={`${!errors.quantity ? "24px" : "0px"}`}
                  size="lg"
                  id="quantity"
                  width="90%"
                  {...register("quantity")}
                />
                <FormErrorMessage mb="24px">
                  {errors.quantity?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.price} width="100%">
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="price"
                >
                  Price
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  placeholder="Price"
                  mb={`${!errors.price ? "24px" : "0px"}`}
                  size="lg"
                  id="price"
                  width="90%"
                  {...register("price")}
                />
                <FormErrorMessage mb="24px">
                  {errors.price?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.measurementUnitId} width="100%">
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  htmlFor="measurementUnitId"
                >
                  Measurement Unit Id
                </FormLabel>
                <Select
                  placeholder="Select option"
                  w={"90%"}
                  mb={`${!errors.measurementUnitId ? "24px" : "0px"}`}
                  {...register("measurementUnitId")}
                >
                  <option value={1}>Kilograms</option>
                  <option value={2}>Grams</option>
                  <option value="3">Tones</option>
                </Select>
                <FormErrorMessage mb="24px">
                  {errors.measurementUnitId?.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                bg="teal.300"
                fontSize="10px"
                color="white"
                fontWeight="bold"
                w="90%"
                h="45"
                mb="24px"
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
              >
                Add product
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
AddProductModal.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
};

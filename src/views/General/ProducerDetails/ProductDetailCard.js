// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const ProjectCard = ({ product, image, handleAddProduct }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column">
      <Box mb="20px" position="relative" borderRadius="15px">
        <Image
          src={image}
          borderRadius="15px"
          height="200px"
          objectFit="cover"
          width="100%"
        />
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top="0"
          borderRadius="15px"
          bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
        ></Box>
      </Box>
      <Flex direction="column">
        <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
          {product.name}
        </Text>
        <Text fontSize="xl" color={textColor} fontWeight="bold" mb="10px">
          {product.price + "" + product.currency}
        </Text>
        <Text
          fontSize="md"
          color="gray.500"
          fontWeight="400"
          mb="20px"
          height="60px"
        >
          {product.description}
        </Text>
        <Text fontSize="xl" color={textColor} fontWeight="bold" mb="10px">
          {product.quantity + " kg"}
        </Text>
        <Flex justifyContent="space-between">
          <Button
            variant="outline"
            colorScheme="teal"
            minW="110px"
            h="36px"
            fontSize="xs"
            px="1.5rem"
            onClick={() => {
              handleAddProduct(product);
            }}
          >
            Add to buy list!
          </Button>
          {/* <AvatarGroup size='xs'>
            {avatars.map((el, idx) => {
              return <Avatar src={el} key={idx} />;
            })}
          </AvatarGroup> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectCard;

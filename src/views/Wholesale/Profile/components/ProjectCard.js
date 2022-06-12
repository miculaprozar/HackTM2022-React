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

const ProjectCard = ({
  image,
  name,
  category,
  avatars,
  description,
  price,
  productId,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column">
      <Box mb="20px" position="relative" borderRadius="15px">
        <Image
          src={`https://storage.googleapis.com/farmtofork/${productId}`}
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
          {"Nume:" + " " + name}
        </Text>
        <Text fontSize="xl" color={textColor} fontWeight="bold" mb="10px">
          {"Price/Quantity :" + " " + price + "/" + category}
        </Text>
        <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
          {"Descriere:" + " " + description}
        </Text>
        <Flex justifyContent="space-between">
          <Button
            variant="outline"
            colorScheme="teal"
            minW="110px"
            h="36px"
            fontSize="xs"
            px="1.5rem"
          >
            Edit Product
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectCard;

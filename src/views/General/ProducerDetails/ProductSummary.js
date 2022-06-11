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
} from '@chakra-ui/react';
import React from 'react';

const ProductSummary = ({ product }) => {
  // Chakra color mode
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Flex direction='column'>
      <Flex direction='column'>
        <Text fontSize='md' color='gray.500' fontWeight='600' mb='10px'>
          {product.name}
        </Text>
        <Text fontSize='xl' color={textColor} fontWeight='bold' mb='10px'>
          {product.price + '' + product.currency}
        </Text>
        <Text fontSize='md' color='gray.500' fontWeight='400' mb='20px'>
          {product.description}
        </Text>
        <Text fontSize='xl' color={textColor} fontWeight='bold' mb='10px'>
          {product.quantity + ' kg'}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProductSummary;

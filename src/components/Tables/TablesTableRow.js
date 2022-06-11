import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TablesTableRow(props) {
  const { logo, firstName, lastName, companyName, email, deliveryDate, locationDetails, status, products, AIScoreAverage } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {companyName}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {firstName + " " + lastName}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {locationDetails}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {locationDetails}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={status === "Refuzat" ? "red.400" : bgStatus}
          color={status === "In Procesare" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {deliveryDate ? deliveryDate : "-"}
        </Text>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover">
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {AIScoreAverage}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;

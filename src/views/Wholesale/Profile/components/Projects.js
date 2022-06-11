// Chakra imports
import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import imageArchitect1 from "assets/img/ImageArchitect1.png";
import imageArchitect2 from "assets/img/ImageArchitect2.png";
import imageArchitect3 from "assets/img/ImageArchitect3.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import { apiFactory } from "../../../../api_factory/index.ts";

const Projects = ({
  title,
  description,
  setOpenAddProductModal,
  reloadProducts,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const [userProducts, setUserProducts] = useState(null);

  const getUser = async () => {
    const user = await apiFactory().data.account().getCurrentUser();
    const userProducts = await apiFactory()
      .data.account()
      .getUserProducts(user[0].id);

    console.log("THE USER PRODUCTS:", userProducts);

    setUserProducts(userProducts);
  };

  useEffect(() => {
    getUser();
  }, [reloadProducts]);

  return (
    <Card p="16px" my="24px">
      <CardHeader p="12px 5px" mb="12px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="400">
            {description}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody px="5px">
        <Grid
          templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
          templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
          gap="24px"
        >
          {userProducts?.map(({ name, description, quantity, price }) => (
            <ProjectCard
              image={imageArchitect1}
              name={quantity}
              price={price}
              category={name}
              description={description}
              avatars={[avatar2, avatar4, avatar6]}
            />
          ))}

          <Button
            p="0px"
            bg="transparent"
            color="gray.500"
            border="1px solid lightgray"
            borderRadius="15px"
            minHeight={{ sm: "200px", md: "100%" }}
            onClick={() => setOpenAddProductModal(true)}
          >
            <Flex direction="column" justifyContent="center" align="center">
              <Icon as={FaPlus} fontSize="lg" mb="12px" />
              <Text fontSize="lg" fontWeight="bold">
                Add new product
              </Text>
            </Flex>
          </Button>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Projects;

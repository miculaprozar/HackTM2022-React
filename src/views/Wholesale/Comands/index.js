// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Commands from "./components/Commands";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";
import { apiFactory } from "../../../api_factory/index.ts";

function Tables() {
  const [orders, setOrders] = useState(null);

  const getComands = async () => {
    const userData = localStorage.getItem("userData");

    const { id } = JSON.parse(userData);

    const order = await apiFactory().data.account().getOrderBySeller(id);
    setOrders(order);
  };

  useEffect(() => {
    getComands();
  }, []);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Commands
        title={"Commands"}
        captions={["Seller", "Location", "Status", "Delivery", "AI Rating"]}
        data={orders}
      />
    </Flex>
  );
}

export default Tables;

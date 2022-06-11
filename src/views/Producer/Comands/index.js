// Chakra imports
import { Flex } from '@chakra-ui/react';
import React from 'react';
import Commands from './components/Commands';
import Projects from './components/Projects';
import { tablesTableData, dashboardTableData } from 'variables/general';

function Tables() {
  return (
    <Flex direction='column' pt={{ base: '120px', md: '75px' }}>
      <Commands
        title={'Commands'}
        captions={['Customer', 'Location', 'Status', 'Delivery', 'AI Rating']}
        data={[
          {
            "id": 41,
            "customerId": 1,
            "sellerId": 11,
            "details": "",
            "locationId": 1,
            "statusId": 1,
            "deliveryDate": null,
            "customerEmail": "tudor@gmail.com",
            "customerFirstName": "Test",
            "customerLastName": "Test",
            "customerCompanyName": "test",
            "customerVAT": "test",
            "customerRegNumber": "test nr",
            "customerIBAN": "test",
            "sellerFirstName": "Test",
            "sellerLastName": "Test",
            "sellerCompanyName": null,
            "sellerVAT": null,
            "sellerRegNumber": null,
            "sellerIBAN": null,
            "longitude": 1.1,
            "latitude": 1.2,
            "locationDetails": "Test schimbat",
            "status": "In procesare",
            "products": [
              {
                "productId": 11,
                "productName": "Test Product",
                "productDescription": "test test 2 10",
                "quantity": 1.2,
                "measurementUnit": "Kg",
                "price": 1,
                "currency": "euro",
                "AIScore": null,
                "AIDetails": null
              }
            ]
          },
          {
            "id": 51,
            "customerId": 1,
            "sellerId": 11,
            "details": "",
            "locationId": 1,
            "statusId": 2,
            "deliveryDate": null,
            "customerEmail": "tudor@gmail.com",
            "customerFirstName": "Test",
            "customerLastName": "Test",
            "customerCompanyName": "test",
            "customerVAT": "test",
            "customerRegNumber": "test nr",
            "customerIBAN": "test",
            "sellerFirstName": "Test",
            "sellerLastName": "Test",
            "sellerCompanyName": null,
            "sellerVAT": null,
            "sellerRegNumber": null,
            "sellerIBAN": null,
            "longitude": 1.1,
            "latitude": 1.2,
            "locationDetails": "Test schimbat",
            "status": "Refuzat",
            "products": [
              {
                "productId": 11,
                "productName": "Test Product",
                "productDescription": "test test 2 10",
                "quantity": 1.2,
                "measurementUnit": "Kg",
                "price": 1,
                "currency": "euro",
                "AIScore": 2.1,
                "AIDetails": "test"
              }
            ]
          }
        ]}
      />
      {/* <Projects
        title={"Projects Table"}
        captions={["Companies", "Budget", "Status", "Completion", ""]}
        data={dashboardTableData}
      /> */}
    </Flex>
  );
}

export default Tables;

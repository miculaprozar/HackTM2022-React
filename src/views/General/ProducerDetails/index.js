// Chakra imports
import { Flex, Grid, Image, Text, Button, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { apiFactory } from '../../../api_factory/index.ts';
import ProducerCard from '../LocalFarmers/components/ProducerCard';
import ProductDetailCard from './ProductDetailCard';
import ProductSummary from './ProductSummary';

import { useParams } from 'react-router-dom';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

function ProducerDetails() {
  const { producerId } = useParams();
  const [producer, setProducer] = useState(null);

  const [buyProducts, setBuyProducts] = useState([]);
  const [location, setLocation] = useState(null);

  const getLocalFarmers = async () => {
    const producerAPI = await apiFactory()
      .data.account()
      .getUsersById(producerId);
    setProducer(producerAPI[0]);
    console.log(producerAPI[0]);
  };

  useEffect(() => {
    getLocalFarmers();
  }, []);

  const handleAddProduct = (product) => {
    const newProductList = [...buyProducts, product];
    setBuyProducts(newProductList);
  };

  const handleCreateOrder = async () => {
    console.log(location);
    if (!location) return null;
    const userData = localStorage.getItem('userData');
    const user = JSON.parse(userData);
    const order = {
      customerId: user.id,
      sellerId: producer.id,
      products: buyProducts,
      locationId: location,
    };
    console.log(order);
    const producerAPI = await apiFactory().data.account().postOrder(order);
    setBuyProducts([]);
  };

  return (
    <Flex direction='column' pt={{ base: '120px', md: '75px' }}>
      {producer && (
        <>
          <ProducerCard
            title={producer.email}
            name={producer.companyName}
            description={producer.details}
            farmer={producer}
            image={
              <Image
                src={
                  'https://www.thebalancesmb.com/thmb/fBooQREfkLJuFmEBwZqOre-uaJU=/2047x1151/smart/filters:no_upscale()/GettyImages-493617395-572a515f3df78c038e23836d.jpg'
                }
                alt='chakra image'
                minWidth={{ md: '300px', lg: 'auto' }}
              />
            }
          />
          <Card p='16px' my='24px'>
            <CardHeader p='12px 5px' mb='12px'>
              <Flex direction='column'>
                <Text fontSize='lg' color={'gray.700'} fontWeight='bold'>
                  Produse
                </Text>
                <Text fontSize='sm' color='gray.500' fontWeight='400'>
                  Produsele acestui producator local
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Grid
                templateColumns={{
                  sm: '1fr',
                  md: '1fr 1fr',
                  xl: 'repeat(4, 1fr)',
                }}
                templateRows={{
                  sm: '1fr 1fr 1fr auto',
                  md: '1fr 1fr',
                  xl: '1fr',
                }}
                gap='24px'
              >
                {producer.products.map((product) => {
                  return (
                    <ProductDetailCard
                      product={product}
                      image={
                        'https://storage.googleapis.com/farmtofork/' +
                        product.id
                      }
                      handleAddProduct={handleAddProduct}
                    />
                  );
                })}
              </Grid>
            </CardBody>
          </Card>

          <Card p='16px' my='24px'>
            <CardHeader p='12px 5px' mb='12px'>
              <Flex direction='column'>
                <Text fontSize='lg' color={'gray.700'} fontWeight='bold'>
                  Comanda produse
                </Text>
                <Text fontSize='sm' color='gray.500' fontWeight='400'>
                  Lista comanda produse
                </Text>
              </Flex>
            </CardHeader>
            <CardBody>
              {buyProducts.length > 0 ? (
                <Grid
                  templateColumns={{
                    sm: '1fr',
                    md: '1fr 1fr',
                    xl: 'repeat(8, 1fr)',
                  }}
                  templateRows={{
                    sm: '1fr 1fr 1fr auto',
                    md: '1fr 1fr',
                    xl: '1fr',
                  }}
                  gap='24px'
                >
                  {buyProducts.map((product) => {
                    return <ProductSummary product={product} />;
                  })}
                </Grid>
              ) : (
                <>
                  <Text fontSize='lg' color='gray.500' fontWeight='400'>
                    Comanda din nou!
                  </Text>
                </>
              )}
            </CardBody>
            <Flex justifyContent='end'>
              <Select
                placeholder='Select option'
                w={'90%'}
                maxWidth='300px'
                mr='30px'
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              >
                {producer.locations.map((location) => {
                  return (
                    <option value={location.id}>{location.details}</option>
                  );
                })}
              </Select>
              <Button
                //   variant='outline'
                colorScheme='teal'
                minW='110px'
                h='36px'
                fontSize='xs'
                px='1.5rem'
                onClick={handleCreateOrder}
                disabled={buyProducts.length === 0}
              >
                Comanda acum!
              </Button>
            </Flex>
          </Card>
        </>
      )}
    </Flex>
  );
}

export default ProducerDetails;

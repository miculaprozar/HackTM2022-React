// Chakra imports
import { Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { apiFactory } from '../../../api_factory/index.ts';
import ProducerCard from '../LocalFarmers/components/ProducerCard';

import { useParams } from 'react-router-dom';

function ProducerDetails() {
  const { producerId } = useParams();
  const [producer, setProducer] = useState(null);

  const getLocalFarmers = async () => {
    const producerAPI = await apiFactory()
      .data.account()
      .getUsersById(producerId);
    setProducer(producerAPI[0]);
  };

  useEffect(() => {
    getLocalFarmers();
  }, []);

  return (
    <Flex direction='column' pt={{ base: '120px', md: '75px' }}>
      {producer && (
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
      )}
    </Flex>
  );
}

export default ProducerDetails;

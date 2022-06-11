// Chakra imports
import { Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { apiFactory } from '../../../api_factory/index.ts';
import ProducerCard from './components/ProducerCard';

function LocalFarmers() {
  const [localFarmers, setLocalFarmers] = useState(null);
  console.log('localFarmers');

  const getLocalFarmers = async () => {
    const localFarmersAPI = await apiFactory().data.account().getUsersByRole(2);
    setLocalFarmers(localFarmersAPI);
  };

  useEffect(() => {
    getLocalFarmers();
  }, []);

  return (
    <Flex direction='column' pt={{ base: '120px', md: '75px' }}>
      {localFarmers &&
        localFarmers.map((localFarmer) => {
          return (
            <ProducerCard
              title={localFarmer.email}
              name={localFarmer.companyName}
              description={localFarmer.details}
              farmer={localFarmer}
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
          );
        })}
    </Flex>
  );
}

export default LocalFarmers;

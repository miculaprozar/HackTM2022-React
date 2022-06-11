import {apiFactory} from '../../../api_factory/index.ts';
import Map from 'components/Map/map';
import React, {useState, useEffect} from 'react';

const ProducersMap = (props) => {
  const [localFarmers, setLocalFarmers] = useState(null);

  const getLocalFarmers = async () => {
    const localFarmersAPI = await apiFactory().data.account().getUsersByRole(2);
    setLocalFarmers(localFarmersAPI);
  };

  useEffect(() => {
    getLocalFarmers();
  }, []);

  useEffect(() => {
    console.log(localFarmers);
  }, [localFarmers]);

  return (
    <div style={{marginTop: '70px'}}>
      <Map
        localFarmers={localFarmers}
        isProducerMap={true}
        mapHeight="720px"
      ></Map>
    </div>
  );
};

export default ProducersMap;

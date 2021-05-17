import React from 'react';
import countryFlags from './index';

const Flag = (countryCode) => {
  const theFlagName = countryFlags[countryCode.toString()];
  // console.log(countryCode.toString(), "the Country code");
  // console.log(theFlagName, "theFlagName");
  return (
    theFlagName? 
    <div>
      <img src={theFlagName} alt="country_flag" />
    </div>
    : <div><img className='welcome-img' src="https://dummyimage.com/40x30/000/fff"/></div>
  );
};

export default Flag;
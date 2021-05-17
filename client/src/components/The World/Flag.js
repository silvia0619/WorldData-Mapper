import React from 'react';
import countryFlags from './index';

const Flag = (props) => {
  const theFlagName = countryFlags[props.name.toString()];
  console.log(props.name, "the Country code");
  console.log(theFlagName, "theFlagName");
  if (theFlagName) {
    return (
      <>
        {props.from === "sp" ?
          <div>
            <img src={theFlagName} alt="country_flag" style={{ width: 40, height: 30 }} />
          </div>
          : <div>
            <img src={theFlagName} alt="country_flag" style={{ width: 370, height: 250 }} />
          </div>}
      </>
    );
  } else {
    return (
      <>
        {props.from === "sp" ?
          <div><img className='welcome-img' src="https://dummyimage.com/40x30/000/fff" /></div>
        : <div><img className='welcome-img' src="https://dummyimage.com/370x250/000/fff" /></div>}
      </>
    );
  }
};

export default Flag;
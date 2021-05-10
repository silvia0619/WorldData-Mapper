import React  from 'react';

const LandmarkTableEntry = (props) => {
    return (
        <div>{props.name}-{props.regionName}</div>
    );
};

export default LandmarkTableEntry;
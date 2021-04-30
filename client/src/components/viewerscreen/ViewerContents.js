import React            from 'react';
import RegionInfo       from './RegionInfo';

const SelectMapContents = (props) => {
    return (
        <>
            <RegionInfo
                listIDs={props.listIDs} createNewRegion={props.createNewRegion} 
                updateRegionField={props.updateRegionField} deleteRegion={props.deleteRegion}
            />
        </>
    );
};

export default SelectMapContents;
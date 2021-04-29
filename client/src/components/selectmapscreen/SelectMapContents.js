import React            from 'react';
import SelectMapTableContents    from './SelectMapTableContents';

const SelectMapContents = (props) => {
    return (
        <>
            <SelectMapTableContents
                listIDs={props.listIDs} createNewRegion={props.createNewRegion} 
                updateRegionField={props.updateRegionField} deleteRegion={props.deleteRegion}
            />
        </>
    );
};

export default SelectMapContents;
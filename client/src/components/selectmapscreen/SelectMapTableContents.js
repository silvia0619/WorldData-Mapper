import React        from 'react';
import SelectMapTableEntry from './SelectMapTableEntry';

const SelectMapTableContents = (props) => {
    let tempID = 0
    return (
        <>
            {
                props.listIDs &&
                props.listIDs.map(entry => (
                    <SelectMapTableEntry
                        id={tempID++} name={entry.name} _id={entry._id} 
                        updateRegionField={props.updateRegionField} deleteRegion={props.deleteRegion}
                    />
                ))
            }
        </>
    );
};

export default SelectMapTableContents;
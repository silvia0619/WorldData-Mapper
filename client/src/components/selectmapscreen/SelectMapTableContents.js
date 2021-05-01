import React        from 'react';
import SelectMapTableEntry from './SelectMapTableEntry';
import { WCard } from 'wt-frontend';


const SelectMapTableContents = (props) => {
    let tempID = 0
    return (
        <WCard className="map-table" style={{paddingTop: 15 + 'px'}}>
            {
                props.listIDs &&
                props.listIDs.map(entry => (
                    <SelectMapTableEntry
                        id={tempID++} name={entry.name} _id={entry._id} 
                        updateRegionField={props.updateRegionField} deleteRegion={props.deleteRegion}
                    />
                ))
            }
        </WCard>
    );
};

export default SelectMapTableContents;
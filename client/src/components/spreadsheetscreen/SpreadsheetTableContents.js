import React        from 'react';
import SpreadsheetTableEntry from './SpreadsheetTableEntry';

const SpreadsheetTableContents = (props) => {
    let tempID = 0
    return (
        <>
            {
                props.listIDs &&
                props.listIDs.map(entry => (
                    <SpreadsheetTableEntry
                        id={tempID++} name={entry.name} _id={entry._id} landmarks={entry.landmarks}
                        updateRegionField={props.updateRegionField} deleteRegion={props.deleteRegion}
                    />
                ))
            }
        </>
    );
};

export default SpreadsheetTableContents;
import React        from 'react';
import SpreadsheetTableEntry from './SpreadsheetTableEntry';

const SpreadsheetTableContents = (props) => {
    let tempID = 0
    let entries = props.activeRegions ? props.activeRegions : null;
    return (
        <>
            {
                entries &&
                entries.map(entry => (
                    <SpreadsheetTableEntry
                        id={tempID++} name={entry.name} _id={entry._id}
                        capital={entry.capital} leader={entry.leader} landmarks={entry.landmarks}
                        deleteRegion={props.deleteRegion} editRegion={props.editRegion}
                    />
                ))
            }
        </>
    );
};

export default SpreadsheetTableContents;
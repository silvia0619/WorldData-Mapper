import React            from 'react';
import SpreadsheetTableContents    from './SpreadsheetTableContents';

const SpreadsheetContents = (props) => {
    return (
        <>
            <SpreadsheetTableContents
                listIDs={props.listIDs} createNewRegion={props.createNewRegion} 
                updateRegionField={props.updateRegionField} deleteRegion={props.deleteRegion}
            />
        </>
    );
};

export default SpreadsheetContents;
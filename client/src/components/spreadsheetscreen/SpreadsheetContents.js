import React                        from 'react';
import SpreadsheetTableContents     from './SpreadsheetTableContents';
import SpreadTopContent             from './SpreadTopContent';

const SpreadsheetContents = (props) => {
    return (
        <>
            <SpreadTopContent listIDs={props.listIDs} createNewRegion={props.createNewRegion} selectedMapName={props.selectedMapName}></SpreadTopContent>
            <SpreadsheetTableContents
                listIDs={props.listIDs} createNewRegion={props.createNewRegion} 
                updateRegionField={props.updateRegionField} deleteRegion={props.deleteRegion}
            />
        </>
    );
};

export default SpreadsheetContents;
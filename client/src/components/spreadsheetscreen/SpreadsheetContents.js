import React                        from 'react';
import SpreadsheetTableContents     from './SpreadsheetTableContents';
import SpreadsheetTableHeader       from './SpreadsheetTableHeader';
import SpreadTopContent             from './SpreadTopContent';


const SpreadsheetContents = (props) => {
    return (
        <>
            <SpreadTopContent listIDs={props.listIDs} createNewRegion={props.createNewRegion} selectedMapName={props.selectedMapName}></SpreadTopContent>
            <table>
                <SpreadsheetTableHeader/>
                <SpreadsheetTableContents
                    listIDs={props.listIDs} createNewRegion={props.createNewRegion} 
                    updateRegionField={props.updateRegionField} deleteRegion={props.deleteRegion}
                />
            </table>
        </>
    );
};

export default SpreadsheetContents;
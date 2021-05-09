import React                        from 'react';
import SpreadsheetTableContents     from './SpreadsheetTableContents';
import SpreadsheetTableHeader       from './SpreadsheetTableHeader';
import SpreadTopContent             from './SpreadTopContent';


const SpreadsheetContents = (props) => {
    return (
        <>
            <SpreadTopContent listIDs={props.listIDs} createNewRegion={props.createNewRegion} 
                selectedMapName={props.selectedMapName} undo={props.undo} redo={props.redo}/>
            <table>
                <SpreadsheetTableHeader sortRegions={props.sortRegions}/>
                <SpreadsheetTableContents
                    listIDs={props.listIDs} createNewRegion={props.createNewRegion} editRegion={props.editRegion}
                    deleteRegion={props.deleteRegion}
                />
            </table>
        </>
    );
};

export default SpreadsheetContents;
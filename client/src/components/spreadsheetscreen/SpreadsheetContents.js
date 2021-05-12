import React                        from 'react';
import SpreadsheetTableContents     from './SpreadsheetTableContents';
import SpreadsheetTableHeader       from './SpreadsheetTableHeader';
import SpreadTopContent             from './SpreadTopContent';


const SpreadsheetContents = (props) => {
    return (
        <>
            <SpreadTopContent createNewRegion={props.createNewRegion} 
                selectedMapName={props.selectedMapName} undo={props.undo} redo={props.redo}/>
            <table>
                <SpreadsheetTableHeader sortRegions={props.sortRegions}/>
                <SpreadsheetTableContents
                    editRegion={props.editRegion} 
                    deleteRegion={props.deleteRegion} activeRegions={props.activeRegions}
                />
            </table>
        </>
    );
};

export default SpreadsheetContents;
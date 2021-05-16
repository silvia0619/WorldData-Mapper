import React from 'react';
import SpreadsheetTableContents from './SpreadsheetTableContents';
import SpreadsheetTableHeader from './SpreadsheetTableHeader';
import SpreadTopContent from './SpreadTopContent';


const SpreadsheetContents = (props) => {
    return (
        <>
            <SpreadTopContent createNewRegion={props.createNewRegion} theParentId={props.theParentId}
                selectedMapName={props.selectedMapName} undo={props.undo} redo={props.redo}
                canRedo={props.canRedo} canUndo={props.canUndo} />
            <div className="spreadsheet-table">
                <table>
                    <SpreadsheetTableHeader sortRegions={props.sortRegions} />
                    <SpreadsheetTableContents
                        editRegion={props.editRegion}
                        deleteRegion={props.deleteRegion} activeRegions={props.activeRegions}
                    />
                </table>
            </div>
        </>
    );
};

export default SpreadsheetContents;
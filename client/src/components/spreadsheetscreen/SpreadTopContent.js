import React            from 'react';
import { Link } from "react-router-dom";
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadTopContent = (props) => {
    const clickDisabled = () => { };
    
    const undoOptions = {
        className: !props.canUndo ? 'table-header-button-disabled' : 'table-header-button',
        onClick: !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: !props.canRedo ? 'table-header-button-disabled' : 'table-header-button',
        onClick: !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    return (
        <>
            <div className="modal-spacer">&nbsp;</div>
            <WRow>
                <WCol size="1"><WButton className="add-region-icon" onClick={props.createNewRegion} wType="texted" style={{color: "green"}}>
                    <i class="fas fa-plus"></i></WButton></WCol>
                <WCol size="1">
                    {/* <WButton className="add-region-icon" onClick={props.undo}wType="texted" style={{color: "white"}}> */}
                    <WButton {...undoOptions}>
                    <i class="fas fa-arrow-left"></i></WButton></WCol>
                <WCol size="1">
                    {/* <WButton className="add-region-icon" onClick={props.redo} wType="texted" style={{color: "white"}}> */}
                    <WButton {...redoOptions}>
                    <i class="fas fa-arrow-right"></i></WButton></WCol>
                <WCol size="1"></WCol>
                <WCol size="2" style={{color: "white"}}>Region Name:</WCol>
                <Link style={{textDecoration: 'none', color: "#4D84A3"}} to={"/viewer/" + props.theParentId}>{props.selectedMapName}</Link>
                {/* <WCol size="3" style={{color: "#4D84A3"}}>{props.selectedMapName}</WCol> */}
            </WRow>
        </>
    );
};

export default SpreadTopContent;
import React            from 'react';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadTopContent = (props) => {
    return (
        <>
            <div className="modal-spacer">&nbsp;</div>
            <WRow>
                <WCol size="2"></WCol>
                <WCol size="1"><WButton className="add-region-icon" onClick={props.createNewRegion} wType="texted" style={{color: "green"}}>
                    <i class="fas fa-plus"></i></WButton></WCol>
                <WCol size="1"><WButton className="add-region-icon" wType="texted" style={{color: "white"}}>
                    <i class="fas fa-arrow-left"></i></WButton></WCol>
                <WCol size="1"><WButton className="add-region-icon" onClick={props.createNewRegion} wType="texted" style={{color: "white"}}>
                    <i class="fas fa-arrow-right"></i></WButton></WCol>
                <WCol size="2" style={{color: "white"}}>Region Name:</WCol>
                <WCol size="1" style={{color: "#4D84A3"}}>{props.selectedMapName}</WCol>
            </WRow>
        </>
    );
};

export default SpreadTopContent;
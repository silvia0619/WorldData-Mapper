import React            from 'react';
import { WRow, WCol, WButton } from 'wt-frontend';

const SpreadTopContent = (props) => {
    return (
        <WRow>
            <WCol size="1"><WButton className="add-region-icon" onClick={props.createNewRegion} wType="texted">
                <i class="fas fa-plus"></i></WButton></WCol>
            <WCol size="1"><WButton className="add-region-icon" wType="texted">
                <i class="fas fa-arrow-left"></i></WButton></WCol>
            <WCol size="1"><WButton className="add-region-icon" onClick={props.createNewRegion} wType="texted">
                <i class="fas fa-arrow-right"></i></WButton></WCol>
            <WCol size="2">Region Name:</WCol>
            <WCol size="2">{props.selectedMapName}</WCol>
        </WRow>
    );
};

export default SpreadTopContent;
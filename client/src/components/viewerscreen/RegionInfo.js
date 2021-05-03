import React            from 'react';
import { Link } from "react-router-dom";
import { WRow, WCol, WButton } from 'wt-frontend';

const RegionInfo = (props) => {
    const theId = "/spreadsheet/" + props.selectedRegion.parentId;
    let parentRName = "";
    for (let region of props.RegionTableData) {
        if (region._id == props.selectedRegion.parentId) {
            parentRName = region.name;
        }
    }
    return (
        <>
            <div className="modal-spacer">&nbsp;</div>
            <WRow>
                <WCol size="1"><WButton className="add-region-icon" wType="texted" style={{color: "white"}}>
                    <i class="fas fa-arrow-left"></i></WButton></WCol>
                <WCol size="1"><WButton className="add-region-icon" wType="texted" style={{color: "white"}}>
                    <i class="fas fa-arrow-right"></i></WButton></WCol>
            </WRow>
            <img className='welcome-img' src="https://dummyimage.com/370x250/000/fff"/>
            <WRow>
                <WCol size="12">Region Name: {props.selectedRegion.name}</WCol>
            </WRow>
            <WRow>
                <WCol size="12">Parent Region: 
                    <Link style={{textDecoration: 'none', color: '#4D84A3'}} to={theId}>{parentRName}</Link>
                </WCol>
            </WRow>
            <WRow>
                <WCol size="12">Region Capital: {props.selectedRegion.capital}</WCol>
            </WRow>
            <WRow>
                <WCol size="12">Region Leader: {props.selectedRegion.leader}</WCol>
            </WRow>
            <WRow>
                <WCol size="12"># of sub Regions: {props.selectedRegion.subregions}</WCol>
            </WRow>
        </>
    );
};

export default RegionInfo;
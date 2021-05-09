import React                from 'react';
import RegionInfo           from './RegionInfo';
import LandmarkTableContent from './LandmarkTableContent';

import { WRow, WCol } from 'wt-frontend';


const SelectMapContents = (props) => {
    return (
        <WRow>
            <WCol size="6" className="region-info">                
                <RegionInfo RegionTableData={props.RegionTableData}selectedRegion={props.selectedRegion} editRegion={props.editRegion}/>
            </WCol>
            <WCol size="6" className="landmark">
                <WRow style={{color: 'white', tetextAlign: 'center'}}><WCol size="12">Region Landmarks:</WCol></WRow>
                <LandmarkTableContent landmarks={props.selectedRegion.landmarks}/>
            </WCol>
        </WRow>
    );
};

export default SelectMapContents;
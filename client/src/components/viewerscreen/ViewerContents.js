import React                from 'react';
import RegionInfo           from './RegionInfo';
import LandmarkTableContent from './LandmarkTableContent';

import { WLMain, WLSide, WRow, WCol } from 'wt-frontend';


const SelectMapContents = (props) => {
    return (
        <>
            <WLSide className="region-info">
                <RegionInfo selectedRegion={props.selectedRegion}/>
            </WLSide>
            <WLMain className="landmark">
                <WRow style={{color: 'white', tetextAlign: 'center'}}><WCol size="12">Region Landmarks:</WCol></WRow>
                <LandmarkTableContent landmarks={props.selectedRegion.landmarks}/>
            </WLMain>
        </>
    );
};

export default SelectMapContents;
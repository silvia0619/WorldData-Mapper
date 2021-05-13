import React                from 'react';
import RegionInfo           from './RegionInfo';
import LandmarkTableContent from './LandmarkTableContent';

import { WRow, WCol } from 'wt-frontend';


const SelectMapContents = (props) => {
    return (
        <WRow>
            <WCol size="6" className="region-info">                
                <RegionInfo regions={props.regions} selectedRegion={props.selectedRegion} 
                    undo={props.undo} redo={props.redo} editRegion={props.editRegion}/>
            </WCol>
            <WCol size="6" className="landmark">
                <WRow style={{color: 'white', tetextAlign: 'center'}}><WCol size="12">Region Landmarks:</WCol></WRow>
                <LandmarkTableContent landmarks={props.allLandmarks} editLandmarks={props.editLandmarks}/>
            </WCol>
        </WRow>
    );
};

export default SelectMapContents;
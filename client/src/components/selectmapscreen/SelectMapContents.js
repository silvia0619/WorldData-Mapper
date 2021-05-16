import React            from 'react';
import { WRow, WCol, WButton } from 'wt-frontend';
import SelectMapTableContents    from './SelectMapTableContents';
import Globe from '../globe.jpg';
const SelectMapContents = (props) => {
    return (
        <>
            <WRow className="map-header-red"></WRow>
            <WRow className="map-header-black"><WCol size="12">Your Maps</WCol></WRow>
            <WRow>
                <WCol size="6">
                    <SelectMapTableContents
                        listIDs={props.listIDs} createNewRegion={props.createNewRegion} 
                        updateRegionField={props.updateRegionField} deleteRegion={props.deleteRegion}
                    />
                </WCol>
                <WCol size="6">
                    <WRow><WCol size="12"><img src={Globe} alt="globe" width="100%" height="100%"/></WCol></WRow>
                    <WRow><WCol size="12"><WButton className="create-map-button" onClick={props.createNewRegion} style={{paddingLeft: 130 + 'px'}}>
                        Create New Map</WButton></WCol></WRow>
                </WCol>
            </WRow>
        </>
    );
};

export default SelectMapContents;
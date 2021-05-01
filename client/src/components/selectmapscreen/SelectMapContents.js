import React            from 'react';
import { WRow, WCol, WButton } from 'wt-frontend';
import SelectMapTableContents    from './SelectMapTableContents';

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
                    <WRow><img className='welcome-img' src="https://dummyimage.com/370x370/000/fff"/></WRow>
                    <WRow><WButton className="create-map-button" onClick={props.createNewRegion} style={{paddingLeft: 130 + 'px'}}>
                        Create New Map</WButton></WRow>
                </WCol>
            </WRow>
        </>
    );
};

export default SelectMapContents;
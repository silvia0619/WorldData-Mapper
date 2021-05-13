import React, { useState } from 'react';
import { WInput, WButton, WRow } from 'wt-frontend';

const LandmarkTableEntry = (props) => {
    const [editingLandmark, toggleLandmarkEdit] = useState(false);
    const handleEditLandmark = (e) => {
        toggleLandmarkEdit(false);
        const newLandmark = e.target.value ? e.target.value : 'No Landmark';
        const prevLandmark = props.name;
        if(newLandmark !== prevLandmark) {
            props.editLandmarks(props._id, 3, newLandmark, prevLandmark);
        }
    };
    const handleDeleteLandmark = () => {
        props.editLandmarks(props._id, 2, props.name, "");
    };
    return (
        <>
            {
                editingLandmark
                    ?<WRow>
                        <WButton className="remove-region-icon" onClick={() => handleDeleteLandmark()} wType="texted" style={{color: "red"}}>
                            <i class="fas fa-times"></i></WButton> 
                        <WInput
                            className='table-input' onBlur={handleEditLandmark}
                            onKeyDown={(e) => { if (e.keyCode === 13) handleEditLandmark(e) }}
                            autoFocus={true} defaultValue={props.name} type='text'
                            inputClass="table-input-class"
                        />
                    </WRow>
                    : <div onClick={() => toggleLandmarkEdit(!editingLandmark)}>{props.name}-{props.regionName}</div>
            }
        </>
    );
};

export default LandmarkTableEntry;
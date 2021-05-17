import React, { useState } from 'react';
import { WInput, WButton, WRow, WCol } from 'wt-frontend';

const LandmarkTableEntry = (props) => {
    const [editingLandmark, toggleLandmarkEdit] = useState(false);
    const handleEditLandmark = (e) => {
        toggleLandmarkEdit(false);
        const newLandmark = e.target.value ? e.target.value : 'No Landmark';
        const prevLandmark = props.name;
        if (newLandmark !== prevLandmark) {
            props.editLandmarks(props._id, 3, newLandmark, prevLandmark);
        }
    };
    const handleDeleteLandmark = () => {
        console.log("how many delete??");
        props.editLandmarks(props._id, 2, props.name, "");
    };
    return (
        <>
            {
                editingLandmark
                    ? <WRow>
                        <WCol size='1'>
                            <WButton className="remove-region-icon" onMouseDown={() => handleDeleteLandmark()} wType="texted" style={{ color: "red" }}>
                                <i class="fas fa-times"></i></WButton>
                        </WCol>
                        <WCol size='11'>
                            <WInput
                                className='table-input' onBlur={handleEditLandmark}
                                onKeyDown={(e) => { if (e.keyCode === 13) handleEditLandmark(e) }}
                                autoFocus={true} defaultValue={props.name} type='text'
                                inputClass="table-input-class"
                            />
                        </WCol>
                    </WRow>
                    : <div onClick={() => toggleLandmarkEdit(!editingLandmark)}>{props.name}-{props.regionName}</div>
            }
        </>
    );
};

export default LandmarkTableEntry;
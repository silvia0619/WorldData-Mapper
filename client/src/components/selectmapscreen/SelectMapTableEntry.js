import React, { useState }  from 'react';
import { WRow, WCol, WInput, WButton } from 'wt-frontend';
import { Link } from "react-router-dom";
import Delete from '../modals/Delete';

const SelectMapTableEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const theId = "/spreadsheet/" + props._id;

    const handleEditing = (e) => {
        e.stopPropagation();
        toggleEditing(!editing);
    };

    const handleDeleting = () => {
        props.deleteRegion(props._id);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateRegionField(props._id, name, value);
    };

    const [showDelete, toggleShowDelete] = useState(false);
    const setShowDelete = () => {
		toggleShowDelete(!showDelete);
	};

    return (
        <WRow>
            <WCol size="10" style={{paddingLeft: 15 + 'px'}}>
                {
                    editing ?   <WInput className="map-edit" inputClass="map-edit-input"
                                    onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}} wType="lined"
                                    name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                                />
                            :<Link to={theId} style={{ textDecoration: 'none', color: 'black', fontSize: '25px'}}>{props.name}</Link>   
                }
            </WCol>
            <WCol size="1"><WButton className="map-table-icons" onClick={handleEditing} wType="texted"><i class="fas fa-pen"></i></WButton></WCol>
            <WCol size="1"><WButton className="map-table-icons" onClick={setShowDelete} wType="texted"><i class="fas fa-trash-alt"></i></WButton></WCol>
            {showDelete && (<Delete setShowDelete={setShowDelete} handleDeleting={handleDeleting}/>)}
        </WRow>
    );
};

export default SelectMapTableEntry;
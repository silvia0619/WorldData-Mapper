import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';
import { Link } from "react-router-dom";

const SpreadsheetTableEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const theId = "/spreadsheet/" + props._id;
    const selectedRegionId = "/viewer/" + props._id;

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

    return (
        <WNavItem>
           {
                editing ?   <WInput className="list-item-edit" inputClass="list-item-edit-input"
                                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                            />
                        :<li><Link to={theId}>{props.name}</Link><Link to={selectedRegionId}>{props.landmarks}</Link></li>   
            }
           <WButton onClick={handleEditing}>edit</WButton>
           <WButton onClick={handleDeleting}>delete</WButton>
        </WNavItem>
    );
};

export default SpreadsheetTableEntry;
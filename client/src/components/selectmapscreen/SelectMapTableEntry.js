import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';

const SelectMapTableEntry = (props) => {
    const [editing, toggleEditing] = useState(false);

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
                        :   <div className='list-text'>
                                {props.name}
                            </div>
            }
           <WButton onClick={handleEditing}>edit</WButton>
           <WButton onClick={handleDeleting}>delete</WButton>
        </WNavItem>
    );
};

export default SelectMapTableEntry;
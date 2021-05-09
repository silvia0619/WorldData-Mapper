import React, { useState }  from 'react';
import { WInput, WButton } from 'wt-frontend';
import { Link } from "react-router-dom";
import Delete from '../modals/Delete';

const SpreadsheetTableEntry = (props) => {
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    const theId = "/spreadsheet/" + props._id;
    const selectedRegionId = "/viewer/" + props._id;

    const name = props.name;
    const capital = props.capital;
    const leader = props.leader;
    const landmarks = props.landmarks;

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        if(newName !== prevName) {
            props.editRegion(props._id, 'name', newName, prevName);
        }
    };

    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = capital;
        if(newCapital !== prevCapital) {
            props.editRegion(props._id, 'capital', newCapital, prevCapital);
        }
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = leader;
        if(newLeader !== prevLeader) {
            props.editRegion(props._id, 'leader', newLeader, prevLeader);
        }
    };

    const handleDeleting = () => {
        props.deleteRegion(props._id);
    };

    const [showDelete, toggleShowDelete] = useState(false);

    const setShowDelete = () => {
		toggleShowDelete(!showDelete);
	};

    return (
        <tr className="spreadsheet-entry">
            <td>
                <WButton className="remove-region-icon" onClick={setShowDelete} wType="texted">
                <i class="fas fa-times"></i></WButton>
                {showDelete && (<Delete setShowDelete={setShowDelete} handleDeleting={handleDeleting}/>)}
                <WButton className="remove-region-icon" onClick={() => toggleNameEdit(!editingName)} wType="texted">
                <i class="fas fa-pen"></i></WButton>
                {
                    editingName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleNameEdit(e)}}
                            autoFocus={true} defaultValue={name} type='text'
                            inputClass="table-input-class"
                        />
                        : <Link style={{textDecoration: 'none', color: "#4D84A3"}} to={theId}>{name}</Link>
                }
            </td>
            <td>
                {
                    editingCapital || capital === ''
                        ? <WInput
                            className='table-input' onBlur={handleCapitalEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleCapitalEdit(e)}}
                            autoFocus={true} defaultValue={capital} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleCapitalEdit(!editingCapital)}
                        >{capital}
                        </div>
                }
            </td>
            <td>
                {
                    editingLeader || leader === ''
                        ? <WInput
                            className='table-input' onBlur={handleLeaderEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleLeaderEdit(e)}}
                            autoFocus={true} defaultValue={leader} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleLeaderEdit(!editingLeader)}
                        >{leader}
                        </div>
                }
            </td>
            <td><img className='welcome-img' src="https://dummyimage.com/40x30/000/fff"/></td>
            <td>
                <Link style={{textDecoration: 'none', color: "#4D84A3"}} to={selectedRegionId}>{landmarks}</Link></td>
        </tr>
    );
};

export default SpreadsheetTableEntry;
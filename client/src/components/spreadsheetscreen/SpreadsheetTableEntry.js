import React, { useState } from 'react';
import { WInput, WButton } from 'wt-frontend';
import { Link } from "react-router-dom";
import Delete from '../modals/Delete';
import Flag from '../The World/Flag'

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
        if (newName !== prevName) {
            props.editRegion(props._id, 'name', newName, prevName);
        }
    };

    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = capital;
        if (newCapital !== prevCapital) {
            props.editRegion(props._id, 'capital', newCapital, prevCapital);
        }
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = leader;
        if (newLeader !== prevLeader) {
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
                {showDelete && (<Delete setShowDelete={setShowDelete} handleDeleting={handleDeleting} />)}
                {
                    editingName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            onKeyDown={(e) => { if (e.keyCode === 13) handleNameEdit(e) }}
                            autoFocus={true} defaultValue={name} type='text' wType="lined"
                            inputClass="table-input-class"
                        />
                        : <div>
                            <WButton className="delete-region-button" onClick={setShowDelete} wType="texted" style={{ color: "red" }}>
                                <i class="fas fa-times"></i></WButton>
                            <WButton className="edit-region-button" onClick={() => toggleNameEdit(!editingName)} wType="texted">
                                <i class="fas fa-pen"></i></WButton>
                            <Link style={{ textDecoration: 'none', color: "#4D84A3" }} to={theId}>{name}</Link>
                        </div>
                }
            </td>
            <td>
                {
                    editingCapital || capital === ''
                        ? <WInput
                            className='table-input' onBlur={handleCapitalEdit}
                            onKeyDown={(e) => { if (e.keyCode === 13) handleCapitalEdit(e) }}
                            autoFocus={true} defaultValue={capital} type='text' wType="lined"
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
                            onKeyDown={(e) => { if (e.keyCode === 13) handleLeaderEdit(e) }}
                            autoFocus={true} defaultValue={leader} type='text' wType="lined"
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleLeaderEdit(!editingLeader)}
                        >{leader}
                        </div>
                }
            </td>
            <td><Flag name={name} from={"sp"}></Flag></td>
            <td>
                <Link style={{ textDecoration: 'none', color: "#4D84A3" }} to={selectedRegionId}>{landmarks}</Link></td>
        </tr>
    );
};

export default SpreadsheetTableEntry;
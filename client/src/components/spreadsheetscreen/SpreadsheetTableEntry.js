import React, { useState }  from 'react';
import { WRow, WCol, WInput, WButton } from 'wt-frontend';
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
        <tr className="spreadsheet-entry">
            <td>
                <WButton className="remove-region-icon" onClick={handleDeleting} wType="texted">
                <i class="fas fa-times"></i></WButton>
                <Link style={{textDecoration: 'none', color: 'black'}} to={theId}>{props.name}</Link></td>
            <td>{props.capital}</td>
            <td>{props.leader}</td>
            <td><img className='welcome-img' src="https://dummyimage.com/40x30/000/fff"/></td>
            <td>
                <Link style={{textDecoration: 'none', color: 'black'}} to={selectedRegionId}>{props.landmarks}</Link></td>
        </tr>
    );
};

export default SpreadsheetTableEntry;
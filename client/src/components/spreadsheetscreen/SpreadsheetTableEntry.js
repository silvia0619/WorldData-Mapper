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
        <WRow style={{border: '1px solid black'}}>
            <WCol size="1"><WButton className="remove-region-icon" onClick={handleDeleting} wType="texted">
                <i class="fas fa-times"></i></WButton></WCol>
            <WCol size="2" style={{border: '1px solid black', textDecoration: 'none', color: 'black'}}>
                <Link to={theId}>{props.name}</Link></WCol>
            <WCol size="2" style={{border: '1px solid black'}}>{props.capital}</WCol>
            <WCol size="2" style={{border: '1px solid black'}}>{props.leader}</WCol>
            <WCol size="2" style={{border: '1px solid black'}}><img className='welcome-img' src="https://dummyimage.com/40x30/000/fff"/></WCol>
            <WCol size="3" style={{border: '1px solid black', textDecoration: 'none', color: 'black'}}>
                <Link to={selectedRegionId}>{props.landmarks}</Link></WCol>
        </WRow>
    );
};

export default SpreadsheetTableEntry;
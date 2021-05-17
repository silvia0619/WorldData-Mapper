import React, {useState}            from 'react';
import { Link }                     from "react-router-dom";
import { WRow, WCol, WButton }      from 'wt-frontend';

const RegionInfo = (props) => {
    const theId = "/spreadsheet/" + props.selectedRegion.parentId;
    let parentRName = "";
    let grandParentRId = "";
    let parentsOptions = [];
    const [editingParentRegion, toggleParentEdit] = useState(false);
    const clickDisabled = () => { };

    const undoOptions = {
        className: !props.canUndo ? 'table-header-button-disabled' : 'table-header-button',
        onClick: !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: !props.canRedo ? 'table-header-button-disabled' : 'table-header-button',
        onClick: !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }


    for (let region of props.regions) {
        if (region._id == props.selectedRegion.parentId) {
            parentRName = region.name;
            grandParentRId = region.parentId;
        }
    }
    for (let region of props.regions) {
        if (region.parentId == grandParentRId) {
            parentsOptions.push(region);
        }
    }

    const handleParentEdit = async (e) => {
        toggleParentEdit(false);
        let newParent = "";
        const newParentName = e.target.value ? e.target.value : false;
        for (let region of props.regions) {
            if (region.name == newParentName) {
                newParent = region._id;
            }
        }
        const prevParent = props.selectedRegion.parentId;
        console.log(newParent, newParentName);
        if(newParent !== prevParent) {
            props.editRegion(props.selectedRegion._id, 'parentId', newParent, prevParent);
        }
    }
    return (
        <>
            <div className="modal-spacer">&nbsp;</div>
            <WRow>
                <WCol size="1"><WButton {...undoOptions}>
                    <i class="fas fa-arrow-left"></i></WButton></WCol>
                <WCol size="1"><WButton {...redoOptions}>
                    <i class="fas fa-arrow-right"></i></WButton></WCol>
            </WRow>

            <img className='welcome-img' src="https://dummyimage.com/370x250/000/fff"/>
            <div className="modal-spacer">&nbsp;</div>
            <WRow>
                <WCol size="12">Region Name: &nbsp; {props.selectedRegion.name}</WCol>
            </WRow>
            <div className="modal-spacer">&nbsp;</div>
            <WRow>
                <WCol size="12">Parent Region: &nbsp;
                    {
                        editingParentRegion ? 
                        <select onBlur={handleParentEdit} autoFocus={true} defaultValue={parentRName}>
                        {parentsOptions.map((e) => {
                            return <option value={e.name}>{e.name}</option>;
                        })}
                    </select>
                        : <Link style={{textDecoration: 'none', color: '#4D84A3'}} to={theId}>{parentRName}</Link>
                    }
                    <WButton className="map-table-icons" wType="texted" style={{color: "orange"}}
                        onClick={() => toggleParentEdit(!editingParentRegion)}>
                            <i class="fas fa-pen"></i></WButton>
                </WCol>
            </WRow>
            <div className="modal-spacer">&nbsp;</div>
            <WRow>
                <WCol size="12">Region Capital: &nbsp; {props.selectedRegion.capital}</WCol>
            </WRow>
            <div className="modal-spacer">&nbsp;</div>
            <WRow>
                <WCol size="12">Region Leader: &nbsp; {props.selectedRegion.leader}</WCol>
            </WRow>
            <div className="modal-spacer">&nbsp;</div>
            <WRow>
                <WCol size="12"># of sub Regions: &nbsp; {props.selectedRegion.subregions.length}</WCol>
            </WRow>
        </>
    );
};

export default RegionInfo;
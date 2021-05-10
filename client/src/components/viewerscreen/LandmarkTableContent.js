import React, {useState}        from 'react';
import LandmarkTableEntry from './LandmarkTableEntry';
import { WCard, WInput, WRow, WCol, WButton } from 'wt-frontend';

const LandmarkTableContent = (props) => {
    const [input, setInput] = useState({ name: '' });
    const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};
    const createNewLandmark = () => {
        for (let field in input) {
			if (!input[field]) {
				return;
			}
		}
        console.log(input.name);
        props.editLandmarks("", 1, input.name, "");
    }
    return (
        <WCard className="landmark-table">
            {
                props.landmarks &&
                props.landmarks.map(entry => (
                    <LandmarkTableEntry className="landmark-table-entry"
                        _id={entry._id} regionName={entry.regionName} name={entry.name}
                    />
                ))
            }
            <WRow>
                <WCol size="1">
                    <WButton className="add-region-icon" onClick={createNewLandmark} wType="texted" style={{color: "green"}}>
                    <i class="fas fa-plus"></i></WButton>
                </WCol>
                <WCol size="10">
                    <WInput className="modal-input" onBlur={updateInput} name="name" labelAnimation="up"
                    barAnimation="solid"  wType="outlined" inputType="text"/>
                </WCol>
            </WRow>
            
        </WCard>
    );
};

export default LandmarkTableContent;
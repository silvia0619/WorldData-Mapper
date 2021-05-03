import React, { useState } from 'react';
import { UPDATE_USER_FIELD } from '../../cache/mutations';
import { useMutation } from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const Update = (props) => {
	const bcrypt = require('bcryptjs');
	const [input, setInput] = useState({ email: '', password: '', name: '' });
	const [loading, toggleLoading] = useState(false);
    const [UpdateUserField] = useMutation(UPDATE_USER_FIELD);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateUser = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to update');
				return;
			}
		}
		const newName = input.name == "" ? props.user.name:input.name;
		const newEmail = input.email == "" ? props.user.email:input.email;
		
		const { data } = await props.fetchUser();
		const hashed = await bcrypt.hash(input.password, 10);
		await UpdateUserField({ variables: { _id: data.getCurrentUser._id, email: newEmail, password: hashed, name: newName }});
		await props.fetchUser();
		props.setShowUpdate(false)
	};

	return (
		<WModal className="signup-modal" cover="true" visible={props.setShowUpdate}>
			<WMHeader className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Enter Updated Account Information
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="3">
								<div className="input-label">Name:</div>
							</WCol>
							<WCol size="7">
								<WInput
									className="modal-input" onBlur={updateInput} name="name" labelAnimation="up"
									barAnimation="solid" wType="outlined" inputType="text"
								/>
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="3">
								<div className="input-label">Email:</div>
							</WCol>
							<WCol size="7">
								<WInput
									className="modal-input" onBlur={updateInput} name="email" labelAnimation="up"
									barAnimation="solid" wType="outlined" inputType="text"
								/>
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="3">
								<div className="input-label">Password:</div>
							</WCol>
							<WCol size="7">
								<WInput
									className="modal-input" onBlur={updateInput} name="password" labelAnimation="up"
									barAnimation="solid" wType="outlined" inputType="password"
								/>
							</WCol>
						</WRow>
					</WMMain>
			}
			<WMFooter>
				<WRow>
					<WCol size="6">
						<WButton className="modal-button" onClick={handleUpdateUser} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
							Update
						</WButton>
					</WCol>
					<WCol size="6">
						<WButton className="modal-button" onClick={() => props.setShowUpdate(false)} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
							Cancel
						</WButton>
					</WCol>
				</WRow>

			</WMFooter>

		</WModal>
	);
}

export default Update;

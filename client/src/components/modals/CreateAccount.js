import React, { useState } from 'react';
import { REGISTER } from '../../cache/mutations';
import { useMutation } from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: '' });
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);


	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if (data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.setShowCreate(false);
		};
	};

	return (
		<WModal className="signup-modal" cover="true" visible={props.setShowCreate}>
			<WMHeader className="modal-header" onClose={() => props.setShowCreate(false)}>
				Create A New Account
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="2"></WCol>
							<WCol size="3">
								<div className="input-label">Name:</div>
							</WCol>
							<WCol size="7">
								<WInput
									className="modal-input" onBlur={updateInput} name="name" labelAnimation="up"
									barAnimation="solid" placeholderText="*Enter Name Here*" wType="outlined" inputType="text"
								/>
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="2"></WCol>
							<WCol size="3">
								<div className="input-label">Email:</div>
							</WCol>
							<WCol size="7">
								<WInput
									className="modal-input" onBlur={updateInput} name="email" labelAnimation="up"
									barAnimation="solid" placeholderText="*Enter Email Here*" wType="outlined" inputType="text"
								/>
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap signup-modal">
							<WCol size="2"></WCol>
							<WCol size="3">
								<div className="input-label">Password:</div>
							</WCol>
							<WCol size="7">
								<WInput
									className="modal-input" onBlur={updateInput} name="password" labelAnimation="up"
									barAnimation="solid" placeholderText="*Enter Password Here*" wType="outlined" inputType="password"
								/>
							</WCol>
						</WRow>
					</WMMain>
			}
			<WMFooter float="center">
				<WRow className="modal-footer">
					<WCol size="2"></WCol>
					<WCol size="4">
						<WButton className="modal-button" onClick={handleCreateAccount} span size="small" clickAnimation="ripple-light" hoverAnimation="darken" color="rgb(195,195,195)">
							Create Account
						</WButton>
					</WCol>
					<WCol size="1"></WCol>
					<WCol size="4">
						<WButton className="modal-button" onClick={() => props.setShowCreate(false)} span size="small" clickAnimation="ripple-light" hoverAnimation="darken" color="rgb(195,195,195)">
							Cancel
						</WButton>
					</WCol>
					<WCol size="2"></WCol>
				</WRow>

			</WMFooter>

		</WModal>
	);
}

export default CreateAccount;

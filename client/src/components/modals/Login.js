import React, { useState } 	from 'react';
import { LOGIN } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { useHistory } from 'react-router-dom';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WCol, WRow } from 'wt-frontend';

const Login = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);

	let history = useHistory();

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {
		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			props.fetchUser();
			props.rRefetch();
			history.replace("/select-map");
			toggleLoading(false)
			props.setShowLogin(false)
		};
	};


	return (
		<WModal className="login-modal" cover="true" visible={props.setShowLogin}>
			<WMHeader  className="modal-header" onClose={() => props.setShowLogin(false)}>
				Login
			</WMHeader >

			{
				loading ? <div />
					: <WMMain className="main-login-modal">
						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap login-modal">
							<WCol size="2"></WCol>
							<WCol size="3"><div className="input-label">Email:</div></WCol>
							<WCol size="7">
								<WInput className="modal-input" onBlur={updateInput} name='email' 
									labelAnimation="up" barAnimation="solid" 
									wType="outlined" inputType='text' />
							</WCol>
						</WRow>
						<div className="modal-spacer">&nbsp;</div>
						<WRow className="modal-col-gap login-modal">
								<WCol size="2"></WCol>
								<WCol size="3"><div className="input-label">Password:</div></WCol>
								<WCol size="7">
									<WInput className="modal-input" onBlur={updateInput} name='password' 
										labelAnimation="up" barAnimation="solid" 
										wType="outlined" inputType='password' />

								</WCol>
							</WRow>

						{
							showErr ? <div className='modal-error'>
								{errorMsg}
							</div>
								: <div className='modal-error'>&nbsp;</div>
						}

					</WMMain >
			}
			<WMFooter>
				<WRow className="modal-footer">
					<WCol size="2"></WCol>
					<WCol size="4">
						<WButton className="modal-button" onClick={handleLogin} span size="small" clickAnimation="ripple-light" hoverAnimation="darken" color="rgb(195,195,195)">
							Login
						</WButton>
					</WCol>
					<WCol size="1"></WCol>
					<WCol size="4">
						<WButton className="modal-button" onClick={() => props.setShowLogin(false)} span size="small" clickAnimation="ripple-light" hoverAnimation="darken" color="rgb(195,195,195)">
							Cancel
						</WButton>
					</WCol>
					<WCol size="2"></WCol>
				</WRow>
			</WMFooter>
		</WModal >
	);
}

export default Login;
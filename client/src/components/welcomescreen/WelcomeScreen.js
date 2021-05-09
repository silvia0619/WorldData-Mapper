import React from 'react';
import { WLayout, WLMain, WRow, WCol } from 'wt-frontend';
import Globe from '../globe.jpg';

const WelcomeScreen = (props) => {

	const auth = props.user === null ? false : true;

	return (
		<WLayout wLayout="lside-rside">
			<WLMain>
				<div className="modal-spacer">&nbsp;</div>
				<WRow>
					<WCol size="3"></WCol>
					<WCol size="5"><img src={Globe} alt="globe" width="400" height="400"/></WCol>
				</WRow>
		
				<WRow>
					<WCol size="4"></WCol>
					<WCol size="5" className='welcome-text'>Welcome To The World Data Mapper</WCol>
				</WRow>

			</WLMain>
		</WLayout>
	);
};

export default WelcomeScreen;

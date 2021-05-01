import React from 'react';
import { WLayout, WLMain, WRow, WCol } from 'wt-frontend';

const Welcomescreen = (props) => {

	const auth = props.user === null ? false : true;

	return (
		<WLayout wLayout="header-lside-rside">
			<WLMain>
				<div className="modal-spacer">&nbsp;</div>
				<WRow>
					<WCol size="2"></WCol>
					<WCol size="3"><img style={{margin: 30 + 'px'}, {marginTop: 30 + 'px'}} src="https://dummyimage.com/400x400/000/fff"/></WCol>
				</WRow>
		
				<WRow>
					<WCol size="3"></WCol>
					<WCol size="3" className='welcome-text'>Welcome To The World Data Mapper</WCol>
				</WRow>

			</WLMain>
		</WLayout>
	);
};

export default Welcomescreen;
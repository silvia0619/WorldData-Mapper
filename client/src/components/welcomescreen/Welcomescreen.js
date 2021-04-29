import Logo from '../navbar/Logo';
import Login from '../modals/Login';
import Update from '../modals/Update';
import CreateAccount from '../modals/CreateAccount';
import NavbarOptions from '../navbar/NavbarOptions';
import * as mutations from '../../cache/mutations';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { WNavbar, WNavItem } from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WRow, WCol } from 'wt-frontend';

const Welcomescreen = (props) => {

	const auth = props.user === null ? false : true;

	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);

	const setShowLogin = () => {
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
	};

	return (
		<WLayout wLayout="header-lside">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth} user={props.user}
							setShowCreate={setShowCreate} setShowLogin={setShowLogin} setShowUpdate={setShowUpdate}
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			<WLMain>
				<div className="modal-spacer">&nbsp;</div>
				<WRow>
					<WCol size="2"></WCol>
					<WCol size="3"><img src="https://dummyimage.com/400x400/000/fff"/></WCol>
				</WRow>
		
				<WRow>
					<WCol size="3"></WCol>
					<WCol size="3" className='welcome-text'>Welcome To The World Data Mapper</WCol>
				</WRow>

			</WLMain>

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} />)
			}

			{
				showUpdate && (<Update fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
			}

		</WLayout>
	);
};

export default Welcomescreen;
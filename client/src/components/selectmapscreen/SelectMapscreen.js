import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Update 							from '../modals/Update';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import SelectMapContents 				from './SelectMapContent'
import * as mutations 					from '../../cache/mutations';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WRow, WCol, WCard, WCHeader } from 'wt-frontend';

const SelectMapscreen = (props) => {

	const auth = props.user === null ? false : true;
	let regions = [];
	let RegionTableData = [];

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
		<WLayout wLayout="header-lside-rside">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth}
							setShowCreate={setShowCreate} setShowLogin={setShowLogin} setShowUpdate={setShowUpdate}
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			<WLMain w="30">
				
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

export default SelectMapscreen;
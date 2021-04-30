import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Update 							from '../modals/Update';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WButton } from 'wt-frontend';

import { useHistory, Link } from 'react-router-dom';

const Viewerscreen = (props) => {

	const auth = props.user === null ? false : true;
	let regions = [];
	let RegionTableData = [];
    let pathname = useHistory().location.pathname;
    let selectedId = pathname.substring(8, pathname.length);


	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);

	const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists 
		for(let region of data.getAllRegions) {
			if(region._id == selectedId) {
				regions.push(region)
			}
		}
		// create data for sidebar links
		for(let region of regions) {
			if(region) {
				RegionTableData.push({_id: region._id, name: region.name});
			}	
		}
		refetch();
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }], 
		awaitRefetchQueries: true,
		onCompleted: () => refetch()
	}

	const [UpdateRegionField] 	= useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);

	const updateRegionField = async (_id, field, value) => {
		const { data } = await UpdateRegionField({ variables: { _id: _id, field: field, value: value }});
	};

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
							fetchUser={props.fetchUser} auth={auth} user={props.user}
							setShowCreate={setShowCreate} setShowLogin={setShowLogin} 
							setShowUpdate={setShowUpdate}
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			<WLMain w="30">
				<li><Link to={"/spreadsheet/" + regions[0].parentId}>{regions[0].name}</Link></li>
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

export default Viewerscreen;
import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Update 							from '../modals/Update';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import SpreadsheetContents 				from './SpreadsheetContents'
import * as mutations 					from '../../cache/mutations';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WButton } from 'wt-frontend';

import { useHistory } from 'react-router-dom';

const Spreadsheetscreen = (props) => {

	const auth = props.user === null ? false : true;
	let regions = [];
	let RegionTableData = [];
    let pathname = useHistory().location.pathname;
    let theParentId = pathname.substring(13, pathname.length);


	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);

	const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists 
		for(let region of data.getAllRegions) {
			if(region.parentId == theParentId) {
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

	const [AddRegion] 			= useMutation(mutations.ADD_REGION, mutationOptions);
	const [UpdateRegionField] 	= useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);
	const [DeleteRegion]		= useMutation(mutations.DELETE_REGION, mutationOptions);



	const createNewRegion = async () => {
		let newRegion = {
			_id: '',
        	parentId: theParentId,
			name: 'undefined',
			owner: props.user._id,
        	capital: '',
			leader: '',
        	landmarks: []
		}
		const { data } = await AddRegion({ variables: { region: newRegion }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if(data) {
			// loadTodoList(data.addTodolist);
		} 	
	};

	const updateRegionField = async (_id, field, value) => {
		const { data } = await UpdateRegionField({ variables: { _id: _id, field: field, value: value }});
	};

	const deleteRegion = async (_id) => {
		DeleteRegion({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGIONS }] });
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
                <SpreadsheetContents auth={auth} listIDs={RegionTableData} createNewRegion={createNewRegion} 
									updateRegionField={updateRegionField} deleteRegion={deleteRegion}/>
				<WButton onClick={createNewRegion}>createNewRegion</WButton>
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

export default Spreadsheetscreen;
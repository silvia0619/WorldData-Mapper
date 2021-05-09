import React, { useState } from 'react';
import WelcomeScreen from './components/welcomescreen/WelcomeScreen';
import SelectMapScreen from './components/selectmapscreen/SelectMapScreen';
import SpreadsheetScreen from './components/spreadsheetscreen/SpreadsheetScreen';
import ViewerScreen from './components/viewerscreen/ViewerScreen';
import NavbarOptions from './components/navbar/NavbarOptions';
import Navigator from './components/navbar/Navigator';
import Logo from './components/navbar/Logo';
import Login from './components/modals/Login';
import Update from './components/modals/Update';
import CreateAccount from './components/modals/CreateAccount';
import { useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import * as queries from './cache/queries';
import { jsTPS } from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import { WLayout, WLHeader, WNavbar, WNavItem } from 'wt-frontend';

const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	let refreshTps = false;
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);
	let history = useHistory();
	let pathname = "";
	if (history) {
		pathname = history.location.pathname;
	}

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
		// console.log("history", history);
		// history.replace("/select-map");
    }

	const auth = user === null ? false : true;

	let regions = [];
	let RegionTableData = [];

	const { loading: rLoading, error: rError, data: rData, refetch: rRefetch } = useQuery(queries.GET_DB_REGIONS);

	if(rLoading) { console.log(rLoading, 'loading'); }
	if(rError) { console.log(rError, 'error'); }
	if(rData) { 
		// Assign regions 
		for(let region of rData.getAllRegions) {
			if(region) {
				regions.push(region)
			}
		}
		for(let region of regions) {
			if(region) {
				RegionTableData.push({
					_id: region._id,
					parentId: region.parentId, 
					name: region.name, 
					capital: region.capital, 
					leader: region.leader,
					landmarks: region.landmarks,
					subregions: region.subregions
				});
			}	
		}
	}

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
		<BrowserRouter>
			<WLayout wLayout="header">
				<WLHeader>
					<WNavbar color="colored">
						<ul>
							<WNavItem>
								<Logo className='logo' RegionTableData={RegionTableData} rRefetch={rRefetch}
									pathname={pathname} />
							</WNavItem>
						</ul>
						<ul>
							<WNavItem>
								<Navigator RegionTableData={RegionTableData} rRefetch={rRefetch} regions={regions}
									pathname={pathname} />
							</WNavItem>
						</ul>
						<ul>
							<NavbarOptions
								fetchUser={refetch} auth={auth} user={user} 
								setShowCreate={setShowCreate} setShowLogin={setShowLogin} setShowUpdate={setShowUpdate}
							/>
						</ul>
					</WNavbar>
				</WLHeader>
				<Switch>
				<Redirect exact from="/" to={ {pathname: "/welcome"} } />
					<Route
						path="/welcome"
						name="welcome"
						render={() =>
							<WelcomeScreen fetchUser={refetch} user={user} refreshTps={refreshTps} />
						}
					/>
					<Route
						path="/select-map"
						name="select-map"
						render={() =>
							<SelectMapScreen RegionTableData={RegionTableData} rRefetch={rRefetch}
								fetchUser={refetch} user={user} refreshTps={refreshTps} />
						}
					/>
					<Route
						path="/spreadsheet"
						name="spreadsheet"
						render={() =>
							<SpreadsheetScreen regions={regions} rRefetch={rRefetch} tps={transactionStack}
								fetchUser={refetch} user={user} refreshTps={refreshTps} />
						}
					/>
					<Route
						path="/viewer"
						name="viewer"
						render={() =>
							<ViewerScreen regions={regions} rRefetch={rRefetch} RegionTableData={RegionTableData}
								tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} />
						}
					/>
					<Route />
					<Route path="/spreadsheet/:id" children={<Child />} />
					<Route path="/viewer/:id" children={<Child />} />
				</Switch>
				{showCreate && (<CreateAccount fetchUser={refetch} setShowCreate={setShowCreate} />)}
				{showLogin && (<Login fetchUser={refetch} setShowLogin={setShowLogin} rRefetch={rRefetch}/>)}
				{showUpdate && (<Update user={user} fetchUser={refetch} setShowUpdate={setShowUpdate} />)}
			</WLayout>
		</BrowserRouter>
	);
}
function Child() {
	// We can use the `useParams` hook here to access
	// the dynamic pieces of the URL.
	let { id } = useParams();

	return (
		<div>
			<h3>ID: {id}</h3>
		</div>
	);
}

export default App;
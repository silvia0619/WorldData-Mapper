import React, { useState } from 'react';
import Welcomescreen from './components/welcomescreen/Welcomescreen';
import SelectMapscreen from './components/selectmapscreen/SelectMapscreen';
import Spreadsheetscreen from './components/spreadsheetscreen/Spreadsheetscreen';
import Viewerscreen from './components/viewerscreen/Viewerscreen';
import NavbarOptions from './components/navbar/NavbarOptions';
import Logo from './components/navbar/Logo';
import Login from './components/modals/Login';
import Update from './components/modals/Update';
import CreateAccount from './components/modals/CreateAccount';

import { useQuery } from '@apollo/client';
import * as queries from './cache/queries';
import { jsTPS } from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import { WLayout, WLHeader, WNavbar, WNavItem } from 'wt-frontend';

const App = () => {
	let user = null;
	const auth = user === null ? false : true;
	let transactionStack = new jsTPS();
	let refreshTps = false;
	const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

	if (error) { console.log(error); }
	if (loading) { console.log(loading); }
	if (data) {
		let { getCurrentUser } = data;
		if (getCurrentUser !== null) { user = getCurrentUser; }
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
								<Logo className='logo' />
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
					<Route
						path="/welcome"
						name="welcome"
						render={() =>
							<Welcomescreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} />
						}
					/>
					<Route
						path="/select-map"
						name="select-map"
						render={() =>
							<SelectMapscreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} />
						}
					/>
					<Route
						path="/spreadsheet"
						name="spreadsheet"
						render={() =>
							<Spreadsheetscreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} />
						}
					/>
					<Route
						path="/viewer"
						name="viewer"
						render={() =>
							<Viewerscreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} />
						}
					/>
					<Route />
					<Route path="/spreadsheet/:id" children={<Child />} />
					<Route path="/viewer/:id" children={<Child />} />
				</Switch>
				{showCreate && (<CreateAccount fetchUser={refetch} setShowCreate={setShowCreate} />)}
				{showLogin && (<Login fetchUser={refetch} setShowLogin={setShowLogin} />)}
				{showUpdate && (<Update fetchUser={refetch} setShowUpdate={setShowUpdate} />)}
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
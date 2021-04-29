import React 			from 'react';
import Welcomescreen 		from './components/welcomescreen/Welcomescreen';
import SelectMapscreen 		from './components/selectmapscreen/SelectMapscreen';
import Spreadsheetscreen 		from './components/spreadsheetscreen/Spreadsheetscreen';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
 
const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	let refreshTps = false;
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }
	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/welcome"} } />
				<Route 
					path="/welcome" 
					name="welcome" 
					render={() => 
						<Welcomescreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps}/>
					} 
				/>
				<Route 
					path="/select-map" 
					name="select-map" 
					render={() => 
						<SelectMapscreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps}/>
					} 
				/>
				<Route 
					path="/spreadsheet" 
					name="spreadsheet" 
					render={() => 
						<Spreadsheetscreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps}/>
					} 
				/>
				<Route/>
				<Route path="/spreadsheet/:id" children={<Child />} />
			</Switch>
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
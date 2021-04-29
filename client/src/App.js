import React 			from 'react';
import Welcomescreen 		from './components/welcomescreen/Welcomescreen';
import SelectMapscreen 		from './components/selectmapscreen/SelectMapscreen';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
 
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
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
import ViewerContents 				from './ViewerContents'
import * as mutations 					from '../../cache/mutations';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WLayout } from 'wt-frontend';

import { useHistory, Link } from 'react-router-dom';

const ViewerScreen = (props) => {

	const auth = props.user === null ? false : true;
	let selectedRegion;
	let RegionTableData = [];
    let pathname = useHistory().location.pathname;
    let selectedId = pathname.substring(8, pathname.length);

	const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists 
		for(let region of data.getAllRegions) {
			if(region._id == selectedId) {
				selectedRegion = region;
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


	return (
		<WLayout wLayout="lside">
			<ViewerContents selectedRegion={selectedRegion}/>
		</WLayout>
	);
};

export default ViewerScreen;
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
    let pathname = useHistory().location.pathname;
    let selectedId = pathname.substring(8, pathname.length);

	for(let region of props.regions) {
		if(region._id == selectedId) {
			selectedRegion = region;
		}
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }], 
		awaitRefetchQueries: true,
		onCompleted: () => props.rRefetch()
	}

	const [UpdateRegionField] 	= useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);

	const updateRegionField = async (_id, field, value) => {
		const { data } = await UpdateRegionField({ variables: { _id: _id, field: field, value: value }});
	};


	return (
		<WLayout wLayout="lside">
			<ViewerContents selectedRegion={selectedRegion} RegionTableData={props.RegionTableData}/>
		</WLayout>
	);
};

export default ViewerScreen;
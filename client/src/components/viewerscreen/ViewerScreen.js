import * as mutations 					from '../../cache/mutations';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WLayout, WLMain, WButton } from 'wt-frontend';

import { useHistory, Link } from 'react-router-dom';

const ViewerScreen = (props) => {

	const auth = props.user === null ? false : true;
	let regions = [];
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


	return (
		<WLayout wLayout="header-lside-rside">
			<WLMain w="30">
				<li><Link to={"/spreadsheet/" + regions[0].parentId}>{regions[0].name}</Link></li>
			</WLMain>
		</WLayout>
	);
};

export default ViewerScreen;
import SelectMapContents 				from './SelectMapContents'
import * as mutations 					from '../../cache/mutations';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import * as queries from '../../cache/queries';
import { WLayout, WLMain } from 'wt-frontend';

const SelectMapScreen = (props) => {

	const auth = props.user === null ? false : true;
	let MapTableData = [];
	let regions = [];

	const { loading, error, data, refetch } = useQuery(queries.GET_DB_REGIONS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign regions 
		for(let region of data.getAllRegions) {
			if(region) {
				regions.push(region)
			}
		}
		for(let region of regions) {
			if(region.parentId == "") {
				MapTableData.push({
					_id: region._id,
					name: region.name, 
					capital: region.capital, 
					leader: region.leader,
					landmarks: region.landmarks
				})
			}	
		}
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }], 
		awaitRefetchQueries: true,
		// onCompleted: () => refetch()
	}

	const [AddRegion] 			= useMutation(mutations.ADD_REGION, mutationOptions);
	const [UpdateRegionField] 	= useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);
	const [DeleteRegion]		= useMutation(mutations.DELETE_REGION, mutationOptions);

	const createNewRegion = async () => {
		let newRegion = {
			_id: '',
        	parentId: '',
			name: 'undefined',
			owner: props.user._id,
        	capital: '',
			leader: '',
        	landmarks: [],
			subregions: []
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


	return (
		<WLayout wLayout="lside-rside">
			<WLMain>
				<SelectMapContents auth={auth} listIDs={MapTableData} createNewRegion={createNewRegion} 
									updateRegionField={updateRegionField} deleteRegion={deleteRegion}/>
			</WLMain>
		</WLayout>
	);
};

export default SelectMapScreen;

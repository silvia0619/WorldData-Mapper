import SelectMapContents 				from './SelectMapContents'
import * as mutations 					from '../../cache/mutations';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WLayout, WLMain, WButton } from 'wt-frontend';

const SelectMapScreen = (props) => {

	const auth = props.user === null ? false : true;
	let MapTableData = [];

	for(let map of props.RegionTableData) {
		if(map.parentId == "") {
			MapTableData.push({
				_id: map._id, 
				name: map.name, 
				capital: map.capital, 
				leader: map.leader,
				landmarks: map.landmarks
			})
		}
	}


	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }], 
		awaitRefetchQueries: true,
		onCompleted: () => props.rRefetch()
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

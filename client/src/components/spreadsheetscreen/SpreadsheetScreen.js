import SpreadsheetContents from './SpreadsheetContents'
import * as mutations from '../../cache/mutations';
import { GET_DB_REGIONS } from '../../cache/queries';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { WLayout, WLMain } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import { EditRegion_Transaction, UpdateRegions_Transaction, SortRegions_Transaction } from '../../utils/jsTPS';
import * as queries from '../../cache/queries';

const SpreadsheetScreen = (props) => {
	const auth = props.user === null ? false : true;
	let RegionTableData = [];
	let pathname = useHistory().location.pathname;
	let theParentId = pathname.substring(13, pathname.length);
	let selectedMapName = "";
	let seletedMapSubRegions = [];

	const { loading, error, data, refetch} = useQuery(queries.GET_DB_REGIONS);

	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		// Assign regions 
		for (let region of data.getAllRegions) {
			if (region._id == theParentId) {
				selectedMapName = region.name;
				seletedMapSubRegions = region.subregions;
			}
		}
		for (let regionId of seletedMapSubRegions){
			for (let region of data.getAllRegions) {
				if (regionId == region._id){
					RegionTableData.push({
						_id: region._id,
						name: region.name,
						capital: region.capital,
						leader: region.leader,
						landmarks: region.landmarks
					});
				}
			}
		}
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }],
		awaitRefetchQueries: true,
		// onCompleted: () => refetch()
	}

	const [AddRegion] = useMutation(mutations.ADD_REGION, mutationOptions);
	const [UpdateRegionField] = useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);
	const [DeleteRegion] = useMutation(mutations.DELETE_REGION, mutationOptions);
	const [SortRegions] = useMutation(mutations.SORT_REGIONS, mutationOptions);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if (ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if (ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const editRegion = async (_id, field, value, prev) => {
		let transaction = new EditRegion_Transaction(_id, field, prev, value, UpdateRegionField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const createNewRegion = async () => {
		let newRegion = {
			_id: '',
			parentId: theParentId,
			name: 'undefined',
			owner: props.user._id,
			capital: 'capital',
			leader: 'leader',
			landmarks: ["landmark"],
			subregions: []
		}
		let transaction = new UpdateRegions_Transaction('', newRegion, 1, AddRegion, DeleteRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const deleteRegion = async (_id) => {
		let transaction = new UpdateRegions_Transaction(_id, "", 0, AddRegion, DeleteRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const sortRegions = (criteria) => {
		let transaction = new SortRegions_Transaction(theParentId, criteria, SortRegions);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}


	return (
		<WLayout>
			<WLMain className="spreadsheet-main">
				<SpreadsheetContents auth={auth} listIDs={RegionTableData} selectedMapName={selectedMapName}
					createNewRegion={createNewRegion} editRegion={editRegion} sortRegions={sortRegions}
					deleteRegion={deleteRegion} undo={tpsUndo} redo={tpsRedo} />
			</WLMain>
		</WLayout>
	);
};

export default SpreadsheetScreen;
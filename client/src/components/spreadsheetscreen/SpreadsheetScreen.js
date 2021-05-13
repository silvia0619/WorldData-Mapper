import SpreadsheetContents from './SpreadsheetContents'
import * as mutations from '../../cache/mutations';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { WLayout, WLMain } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import { EditRegion_Transaction, UpdateRegions_Transaction, SortRegions_Transaction } from '../../utils/jsTPS';
import * as queries from '../../cache/queries';

const SpreadsheetScreen = (props) => {
	const auth = props.user === null ? false : true;
	let allRegions = [];
	let RegionTableData = [];

	let pathname = useHistory().location.pathname;
	let theParentId = pathname.substring(13, pathname.length);

	let selectedMapName = "";
	let selectedMapSubRegions = [];

	const { loading, error, data, refetch } = useQuery(queries.GET_DB_REGIONS);

	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		// Assign regions 
		for (let region of data.getAllRegions) {
			allRegions.push(region);
			if (region._id == theParentId) {
				selectedMapName = region.name;
				selectedMapSubRegions = region.subregions;
			}
		}
		for (let regionId of selectedMapSubRegions) {
			for (let region of data.getAllRegions) {
				if (regionId == region._id) {
					RegionTableData.push(region);
				}
			}
		}
	}

	const mutationOptions =  {
		refetchQueries: [{ query: queries.GET_DB_REGIONS }], 
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
		let oldValue = [...selectedMapSubRegions];
		let newValue = [];
		let newValueRegion = [...RegionTableData];
		console.log(newValueRegion, "newValueRegion?????????????????????????????");
		switch(criteria) {
			case 'name':
				newValueRegion.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case 'capital':
				newValueRegion.sort((a, b) => a.capital.localeCompare(b.capital));
				break;
			case 'leader':
				newValueRegion.sort((a, b) => a.leader.localeCompare(b.leader));
				break;
			default:
				return oldValue;
		}
		for (let i = 0; i < newValueRegion.length; i++) {
			newValue.push(newValueRegion[i]._id);
		}
		let transaction = new SortRegions_Transaction(theParentId, oldValue, newValue, SortRegions);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}


	return (
		<WLayout>
			<WLMain className="spreadsheet-main">
				<SpreadsheetContents auth={auth} selectedMapName={selectedMapName}
					createNewRegion={createNewRegion} editRegion={editRegion} sortRegions={sortRegions}
					deleteRegion={deleteRegion} undo={tpsUndo} redo={tpsRedo} activeRegions={RegionTableData}/>
			</WLMain>
		</WLayout>
	);
};

export default SpreadsheetScreen;
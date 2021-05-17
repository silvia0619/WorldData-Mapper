import ViewerContents from './ViewerContents'
import * as mutations from '../../cache/mutations';
import { GET_DB_REGIONS } from '../../cache/queries';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { EditRegion_Transaction, EditLandmarks_Transaction } from '../../utils/jsTPS';
import { removeConnectionDirectiveFromDocument } from '@apollo/client/utilities';

const ViewerScreen = (props) => {
	const auth = props.user === null ? false : true;
	let selectedRegion;
	let pathname = useHistory().location.pathname;
	let selectedId = pathname.substring(8, pathname.length);
	let allLandmarks = [];
	let regions = [];

	const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);

	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		// Assign regions 
		for (let region of data.getAllRegions) {
			if (region) {
				regions.push(region)
			}
		}
	}
	//get the seleted region's landmarks
	for (let region of regions) {
		if (region._id == selectedId) {
			selectedRegion = region;
			for (let i = 0; i < selectedRegion.landmarks.length; i++) {
				allLandmarks.push({ _id: selectedRegion._id, regionName: selectedRegion.name, name: selectedRegion.landmarks[i] })
			}
		}
	}
	//get the region's subrigion's landmarks
	for (let i = 0; i < selectedRegion.subregions.length; i++) {
		for (let region of regions) {
			if (region._id == selectedRegion.subregions[i]) {
				for (let j = 0; j < region.landmarks.length; j++) {
					allLandmarks.push({ _id: region._id, regionName: region.name, name: region.landmarks[j] })
				}
			}
		}
	}
	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }],
		awaitRefetchQueries: true,
		// onCompleted: () => refetch()
	}

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

	const [UpdateRegionField] = useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);
	const [UpdateLandmarksField] = useMutation(mutations.UPDATE_LANDMARKS_FIELD, mutationOptions);

	const editRegion = async (_id, field, value, prev) => {
		let transaction = new EditRegion_Transaction(_id, field, prev, value, UpdateRegionField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	//opcode 1: add, 2: delete, 3: edit
	const editLandmarks = async (_id, opcode, value, prev) => {
		var theRegion;
		var theId = _id ? _id : selectedId;
		for (let region of regions) {
			if (region._id == theId) {
				theRegion = region;
				console.log("found");
			}
		}
		for (let landmark of theRegion.landmarks) {
			if (opcode !== 2 && landmark === value) {
				alert("Already Exist!!");
				return;
			}
		}
		//add
		if (opcode === 1) {
			let newLandmarks = Object.assign([], selectedRegion.landmarks);
			newLandmarks.push(value);
			var transaction = new EditLandmarks_Transaction(selectedId, selectedRegion.landmarks, newLandmarks, UpdateLandmarksField);
		}
		//delete, edit
		else {
			let newLandmarks = theRegion ? Object.assign([], theRegion.landmarks) : [];
			//delete
			if (opcode === 2) {
				newLandmarks = newLandmarks.filter(function (ele) { return ele != value; });
				var transaction = new EditLandmarks_Transaction(_id, theRegion.landmarks, newLandmarks, UpdateLandmarksField);
			}
			//edit
			else if (opcode === 3) {
				newLandmarks = newLandmarks.map(function (ele) {
					if (ele == prev) return value;
					else return ele;
				});
				var transaction = new EditLandmarks_Transaction(_id, theRegion.landmarks, newLandmarks, UpdateLandmarksField);

			}
		}
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	return (
		<ViewerContents regions={regions} undo={tpsUndo} redo={tpsRedo} editRegion={editRegion} editLandmarks={editLandmarks}
			selectedRegion={selectedRegion} allLandmarks={allLandmarks} canUndo={canUndo} canRedo={canRedo} />
	);
};

export default ViewerScreen;
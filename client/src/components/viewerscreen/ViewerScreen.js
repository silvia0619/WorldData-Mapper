import ViewerContents 				from './ViewerContents'
import * as mutations 					from '../../cache/mutations';
import { GET_DB_REGIONS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation } 		from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { EditRegion_Transaction} 			from '../../utils/jsTPS';

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

	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const [UpdateRegionField] 	= useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);

	const editRegion = async (_id, field, value, prev) => {
		let transaction = new EditRegion_Transaction(_id, field, prev, value, UpdateRegionField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};


	return (
		<ViewerContents selectedRegion={selectedRegion} RegionTableData={props.RegionTableData} editRegion={editRegion}/>
	);
};

export default ViewerScreen;
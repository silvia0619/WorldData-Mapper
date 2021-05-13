import React, { useEffect } from 'react';
import { WButton } from 'wt-frontend';
import { useHistory, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import * as queries from '../../cache/queries';

const Navigator = (props) => {
    let history = useHistory();
    let pathname = useHistory().location.pathname;
    let theId = "";
    let ancestor = "";
    let regions = [];
    let RegionTableData = [];

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
			if(region) {
				RegionTableData.push({
					_id: region._id,
					parentId: region.parentId, 
					name: region.name, 
					capital: region.capital, 
					leader: region.leader,
					landmarks: region.landmarks,
					subregions: region.subregions
				});
			}	
		}
    }
    useEffect(() => {
        refetch();
    },[]);
    if (pathname.substring(0, 3) == "/sp") {
        theId = pathname.substring(13, pathname.length);
    }
    if (pathname.substring(0, 3) == "/vi") {
        theId = pathname.substring(8, pathname.length);
    }

    let theRegion;
    for (let region of RegionTableData) {
        if (region._id == theId) {
            theRegion = region;
        }
    }
    while (theRegion && theRegion.parentId != "") {
        // console.log("inside of the while loop");
        for (let r of RegionTableData) {
            if (r._id == theRegion.parentId) {
                // console.log("There is a ancestor");
                ancestor = ancestor ? r.name + " > " + ancestor : r.name;
                // console.log(ancestor, "the ancestor");
                theRegion = r;
                // console.log(theRegion, "the Region");
            }
        }
    }
    let prevSibling = "";
    let nextSibling = "";
    for (let region of RegionTableData) {
        if (theRegion && region._id == theRegion.parentId) {
            console.log(region.subregions);
            if (region.subregions.length > 1) {
                for (let i = 0; i < region.subregions.length; i++) {
                    if (region.subregions[i] == theId) {
                        if (i == 0) {
                            nextSibling = region.subregions[i + 1];
                        }
                        else if (i == region.subregions.length - 1) {
                            prevSibling = region.subregions[i - 1];
                        }
                        else {
                            prevSibling = region.subregions[i - 1];
                            nextSibling = region.subregions[i + 1];
                        }
                    }
                }
            }
        }
    }


    return (
        <>
            <div style={{ color: "white" }}>{ancestor}</div>
            <Link to={"/viewer/" + prevSibling} style={{ textDecoration: 'none', color: 'white', fontSize: '25px' }}>
                <i class="fas fa-arrow-left"></i>
            </Link>
            <Link to={"/viewer/" + nextSibling} style={{ textDecoration: 'none', color: 'white', fontSize: '25px' }}>
                <i class="fas fa-arrow-right"></i>
            </Link>
            {/* <WButton className="add-region-icon" onClick={props.undo}wType="texted" style={{color: "white"}}>
                <i class="fas fa-arrow-left"></i>
            </WButton>
            <WButton className="add-region-icon" onClick={props.undo}wType="texted" style={{color: "white"}}>
                <i class="fas fa-arrow-right"></i>
            </WButton> */}
        </>

    );
};

export default Navigator;
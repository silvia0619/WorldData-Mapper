import React, { useEffect } from 'react';
import { WButton } from 'wt-frontend';
import { useHistory, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import * as queries from '../../cache/queries';

const Navigator = (props) => {
    let pathname = useHistory().location.pathname;
    let theId = "";
    let ancestor = "";
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
    }

    useEffect(() => {
        console.log(pathname, "pathname");
        refetch();
    },[]);

    if (pathname.substring(0, 3) == "/sp") {
        theId = pathname.substring(13, pathname.length);
        console.log("theId: spreadsheet", theId);
    }
    if (pathname.substring(0, 3) == "/vi") {
        theId = pathname.substring(8, pathname.length);
        console.log("theId: viewer", theId);
    }

    let theRegion;
    for (let region of regions) {
        if (region._id == theId) {
            theRegion = region;
        }
    }
    while (theRegion && theRegion.parentId != "") {
        for (let r of regions) {
            if (r._id == theRegion.parentId) {
                ancestor = ancestor ? r.name + " > " + ancestor : r.name;
                theRegion = r;
            }
        }
    }
    let prevSibling = "";
    let nextSibling = "";
    for (let region of regions) {
        if (theRegion && region._id == theRegion._id) {
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
        </>

    );
};

export default Navigator;
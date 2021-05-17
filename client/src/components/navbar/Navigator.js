import React, { useEffect } from 'react';
import { WRow } from 'wt-frontend';
import { useHistory, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import * as queries from '../../cache/queries';

const Navigator = (props) => {
    let pathname = useHistory().location.pathname;
    let theId = "";
    let ancestor = [];
    let regions = [];
    let theLocation = "";

    const { loading, error, data, refetch } = useQuery(queries.GET_DB_REGIONS);

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

    useEffect(() => {
        console.log(pathname, "pathname");
        refetch();
    });

    // const history = useHistory()

    // useEffect(() => {
    //     return history.listen((location) => {
    //         refetch();
    //         console.log(`You changed the page to: ${location.pathname}`)
    //     })
    // }, [history])

    if (pathname.substring(0, 3) == "/sp") {
        theLocation = "sp";
        theId = pathname.substring(13, pathname.length);
    }
    if (pathname.substring(0, 3) == "/vi") {
        theLocation = "vi";
        theId = pathname.substring(8, pathname.length);
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
                ancestor.push({ _id: r._id, name: r.name });
                theRegion = r;
            }
        }
    }
    let prevSibling = "";
    let nextSibling = "";
    let theSubRegions = theRegion ? theRegion.subregions : [];
    if (theSubRegions.length > 1) {
        for (let i = 0; i < theSubRegions.length; i++) {
            if (theSubRegions[i] == theId) {
                if (i == 0) {
                    nextSibling = theSubRegions[i + 1];
                }
                else if (i == theSubRegions.length - 1) {
                    prevSibling = theSubRegions[i - 1];
                }
                else {
                    prevSibling = theSubRegions[i - 1];
                    nextSibling = theSubRegions[i + 1];
                }
            }
        }
    }

    return (
        <>
            <WRow className="ancestor-row">
                {ancestor.reverse().map((a) => {
                    return <Link to={"/spreadsheet/" + a._id} style={{ textDecoration: 'none', color: 'white', fontSize: '15px' }}>
                        {a.name}
                    </Link>;
                })}
            </WRow>
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
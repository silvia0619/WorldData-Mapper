import React, { useEffect, useState } from 'react';
import { WRow, WCol } from 'wt-frontend';
import { useHistory, Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import * as queries from '../../cache/queries';

const Navigator = (props) => {
    let pathname = useHistory().location.pathname;
    let theId = "";
    let ancestor = [];
    let regions = [];

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

    if (pathname.substring(0, 3) == "/sp") {
        theId = pathname.substring(13, pathname.length);
        console.log("theId: spreadsheet", theId);
    }
    if (pathname.substring(0, 3) == "/vi") {
        theId = pathname.substring(8, pathname.length);
        console.log("theId: viewer", theId);
    }
    const [canGoPrev, setCanGoPrev] = useState(false);
    const [canGoNext, setCanGoNext] = useState(false);

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
    for (let region of regions) {
        if (theRegion && region._id == theRegion._id) {
            console.log(region.subregions);
            if (region.subregions.length > 1) {
                for (let i = 0; i < region.subregions.length; i++) {
                    if (region.subregions[i] == theId) {
                        if (i == 0) {
                            setCanGoNext(true);
                            nextSibling = region.subregions[i + 1];
                        }
                        else if (i == region.subregions.length - 1) {
                            setCanGoPrev(true);
                            prevSibling = region.subregions[i - 1];
                        }
                        else {
                            console.log("case else");
                            setCanGoPrev(true);
                            setCanGoNext(true);
                            prevSibling = region.subregions[i - 1];
                            nextSibling = region.subregions[i + 1];
                        }
                    }
                }
            }
        }
    }
    // const clickDisabled = () => { };

    // const goprevOptions = {
    //     className: !canGoPrev ? 'table-header-button-disabled' : 'table-header-button',
    //     to: !canGoPrev   ? clickDisabled : "/viewer/" + prevSibling
    // }

    // const gonextOptions = {
    //     className: !canGoNext ? 'table-header-button-disabled' : 'table-header-button',
    //     to: !canGoNext   ? clickDisabled : "/viewer/" + nextSibling
    // }


    return (
        <>
            <WRow className="ancestor-row">
                {ancestor.reverse().map((a) => {
                    return <Link to={"/spreadsheet/" + a._id} style={{ textDecoration: 'none', color: 'white', fontSize: '15px' }}>
                        {a.name}
                    </Link>;
                })}
            </WRow>
            {/* {
                canGoPrev ? <Link to={"/viewer/" + prevSibling} style={{ textDecoration: 'none', color: 'white', fontSize: '25px' }}>
                    <i class="fas fa-arrow-left"></i>
                </Link> : <div style={{ color: "grey" }}><i class="fas fa-arrow-left"></i></div>
            } */}
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
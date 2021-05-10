import React, { useState } from 'react';
import { WButton } from 'wt-frontend';
import { useHistory, Link } from 'react-router-dom';

const Navigator = (props) => {
    let history = useHistory();
    let pathname = useHistory().location.pathname;
    let theId = "";
    let ancestor = "";


    if (pathname !== props.pathname) {
        //props.rRefetch(); //**************need to be fixed*************infinite loop************
    }
    if (pathname.substring(0, 3) == "/sp") {
        theId = pathname.substring(13, pathname.length);
    }
    if (pathname.substring(0, 3) == "/vi") {
        theId = pathname.substring(8, pathname.length);
    }

    let theRegion;
    for (let region of props.RegionTableData) {
        if (region._id == theId) {
            theRegion = region;
        }
    }
    while (theRegion && theRegion.parentId != "") {
        console.log("inside of the while loop");
        for (let r of props.RegionTableData) {
            if (r._id == theRegion.parentId) {
                console.log("There is a ancestor");
                ancestor = ancestor ? r.name + " > " + ancestor : r.name;
                console.log(ancestor, "the ancestor");
                theRegion = r;
                console.log(theRegion, "the Region");
            }
        }
    }
    let prevSibling = "";
    let nextSibling = "";
    for (let region of props.RegionTableData) {
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
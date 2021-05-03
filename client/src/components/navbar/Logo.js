import React from 'react';
import { WButton } from 'wt-frontend';
import { useHistory } from 'react-router-dom';

const Logo = (props) => {
    let history = useHistory();
    let pathname = useHistory().location.pathname;
    let theId = "";
    let ancestor = "";

    if (pathname !== props.pathname) {
        props.rRefetch(); //**************need to be fixed*************infinite loop************
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
            console.log("theRegion", theRegion);
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


    const handleLogo = async (e) => {
        history.replace("/select-map");
    }

    return (
        <>
            <WButton className='logo' onClick={handleLogo} wType="texted" color="primary">
                World Data Mapper
            </WButton>
            <div style={{ color: "white" }}>{ancestor}</div>
        </>

    );
};

export default Logo;
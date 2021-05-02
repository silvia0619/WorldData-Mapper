import React        from 'react';
import LandmarkTableEntry from './LandmarkTableEntry';
import { WCard } from 'wt-frontend';

const LandmarkTableContent = (props) => {
    let tempID = 0
    return (
        <WCard className="landmark-table">
            {
                props.landmarks &&
                props.landmarks.map(entry => (
                    <LandmarkTableEntry className="landmark-table-entry"
                        name={entry}
                    />
                ))
            }
        </WCard>
    );
};

export default LandmarkTableContent;
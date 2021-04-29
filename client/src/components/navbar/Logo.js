import React from 'react';
import { WButton } from 'wt-frontend';
import { useHistory } from 'react-router-dom';

const Logo = (props) => {
    let history = useHistory();
    const handleLogo = async (e) => {
        history.replace("/select-map");
    }

    return (
        <WButton className='logo' onClick={handleLogo} wType="texted" color="primary">
            World Data Mapper
        </WButton>
    );
};

export default Logo;
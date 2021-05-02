import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const SpreadsheetTableHeader = (props) => {
    return (
        <tr className="spreadsheet-header">
            <td size="3">
                <WButton className='spreadsheet-header-section' wType="texted" >Name<i class="fas fa-arrow-down"></i></WButton>
            </td>

            <td size="2">
                <WButton className='spreadsheet-header-section' wType="texted">Capital<i class="fas fa-arrow-down"></i></WButton>
            </td>

            <td size="2">
                <WButton className='spreadsheet-header-section' wType="texted" >Leader<i class="fas fa-arrow-down"></i></WButton>
            </td>
            <td size="2">
                <WButton className='spreadsheet-header-section' wType="texted" >Flag<i class="fas fa-arrow-down"></i></WButton>
            </td>
            <td size="3">
                <WButton className='spreadsheet-header-section' wType="texted" >Landmarks<i class="fas fa-arrow-down"></i></WButton>
            </td>
        </tr>
    );
};

export default SpreadsheetTableHeader;
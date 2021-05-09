import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const SpreadsheetTableHeader = (props) => {
    return (
        <tr className="spreadsheet-header">
            <td size="3">
                <div className='spreadsheet-header-section'>
                    Name<WButton wType="texted" onClick={() => props.sortRegions("name")}><i class="fas fa-arrow-down"></i></WButton>
                </div>
            </td>

            <td size="2">
                <div className='spreadsheet-header-section'>
                    Capital<WButton wType="texted" onClick={() => props.sortRegions("capital")}><i class="fas fa-arrow-down"></i></WButton>
                </div>            
            </td>

            <td size="2">
                <div className='spreadsheet-header-section'>
                    Leader<WButton wType="texted" onClick={() => props.sortRegions("leader")}><i class="fas fa-arrow-down"></i></WButton>
                </div>            
            </td>

            <td size="2">
                <div className='spreadsheet-header-section'>
                    Flag
                </div>            
            </td>

            <td size="3">
                <div className='spreadsheet-header-section'>
                    Landmarks
                </div>            
            </td>
        </tr>
    );
};

export default SpreadsheetTableHeader;
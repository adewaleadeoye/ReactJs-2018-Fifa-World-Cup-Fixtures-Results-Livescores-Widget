import React from "react";
const tableStyle = {
    width:'100%',
}
const Commentary = ({commentary}) => (
    <table className='w3-table w3-bordered'>
        <tbody>
            {commentary.map(action=>
            <tr><td><b>{action.action_minute}</b></td><td>{action.commentary_text}</td></tr>
            )}
        </tbody>
    </table>
);
export default Commentary
import React from "react";
const tableStyle = {
    width:'100%',
}
const Stats = ({stats}) => (
    <table className='w3-table w3-bordered' style={tableStyle}>
       {stats.map(stats=> 
        <tbody>  
            <tr><td>{stats.h_shots_on_goal}</td><td>Shots on Goal</td><td>{stats.a_shots_on_goal}</td></tr>
            <tr><td>{stats.h_total_shots}</td><td>Total Shots</td><td>{stats.a_total_shots}</td></tr>
            <tr><td>{stats.h_fouls}</td><td>Fouls</td><td>{stats.a_fouls}</td></tr>
            <tr><td>{stats.h_corners}</td><td>Corner Kicks</td><td>{stats.a_corners}</td></tr>
            <tr><td>{stats.h_offsides}</td><td>Offsides</td><td>{stats.a_offsides}</td></tr>
            <tr><td>{stats.h_possestiontime}%</td><td>Possession</td><td>{stats.a_possestiontime}%</td></tr>
            <tr><td>{stats.h_yellowcards}</td><td>Yellow Cards</td><td>{stats.a_yellowcards}</td></tr>
            <tr><td>{stats.h_redcards}</td><td>Red Cards</td><td>{stats.a_redcards}</td></tr>
            <tr><td>{stats.h_saves}</td><td>Saves</td><td>{stats.a_saves}</td></tr>
        </tbody>
       )}
    </table>
);
export default Stats
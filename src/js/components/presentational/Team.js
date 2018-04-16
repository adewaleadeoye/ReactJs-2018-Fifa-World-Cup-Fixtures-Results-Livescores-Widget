import React from "react";
const flagStyle = {
    width: '80%',
};
const teamNameHeaderStyle={
    margin:'0px',
    fontSize:'15px'
}
const Team = ({ team_flag, team_name}) => (
    <div className="w3-row">
        <div className="w3-col s2 l2">
        <img 
            src={team_flag} 
            className="w3-bar-item" 
            style={flagStyle}
        />
        </div>
        <div className="w3-col s10 l10">
            <h4 className="teamNameHeader">
                {team_name}
            </h4>
        </div>
    </div>
);

export default Team;
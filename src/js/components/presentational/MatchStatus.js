import React from "react";
const textStyle = {
    color: 'red',
  };
const MatchStatus = ({match_status}) => (
    <p className="w3-center w3-padding teamNameHeader" style={textStyle}>{match_status}</p>
);
export default MatchStatus
import React from "react";
const textStyle = {
  fontSize: '12px',
};
const MatchDateTime = ({match_date, match_time}) => (
    <div className="w3-row">
      <div className="w3-col s6 textStyle">{match_date}</div>
      <div className="w3-col s3 w3-right textStyle">{match_time}</div>
    </div>
);
export default MatchDateTime
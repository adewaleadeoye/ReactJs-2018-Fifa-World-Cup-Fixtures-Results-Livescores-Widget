import React from "react";

const LineUp = ({home_line_up,away_line_up}) => (
    <div>
        <div className="w3-row w3-border-bottom">
            <div className="w3-col l6 s6 w3-left-align">
                {home_line_up.map(home_player=>
                    <p>{home_player.playerName}</p>
                )}
            </div>
            <div className="w3-col l6 s6 w3-left-align">
                    {away_line_up.map(away_player=>
                        <p>{away_player.playerName}</p>
                    )}
            </div>
        </div>
    </div>
);
export default LineUp
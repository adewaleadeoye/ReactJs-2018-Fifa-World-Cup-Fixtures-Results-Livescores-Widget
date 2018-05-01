import React from "react";
import { isNull, isUndefined } from "util";
import EventTile from "./EventTile";
import { isNullOrUndefined } from "util";

const evenType = (event)=>{
    if(isNull(event) || isUndefined(event) || event.length < 1){
        return;
    }
    switch(event[0].event_type){
        case 'goal':
            return 'ball.png';
        case 'yellowcard':
           return 'yc.png';
        case 'yellowred':
            return 'rc.png';
        case 'redcard':
            return 'rc.png';
        case 'subst':
            return 'sub-in.png';
    }
}
const event_player =(player)=>{
    if(isNull(player) || isUndefined(player) || player.length < 1){
        return;
    }
    if(!isNullOrUndefined(player[0].assist_name))
    return player[0].player_name+' '+player[0].assist_name;

    return player[0].player_name;
}
const createMarkUp =(html)=>{
    return {__html: html};
}

const DivCell = (props) =>{
    console.log(props)
    let item = <div>&nbsp;</div>
    if(!isNullOrUndefined(props.match_event)){
        item = <div><img src={'http://366football.com/images/'+props.match_event} className='flag' /> {props.player}</div>
    }
    return (
        // <td dangerouslySetInnerHTML={createMarkUp({item})}></td>
        <div className='w3-col l5 m5 s5'>{item}</div>
    )
}

const topPad ={
    paddingTop:'4px',
}  
const MatchInfo = ({match_info}) => (
    
    <div className='w3-bordered w3-striped w3-margin-bottom'>
            {match_info.map(info =>
                <div className="w3-row w3-border-bottom">
                    <DivCell player={event_player(info.home_event)}  match_event={evenType(info.home_event)} />
                    <div className='w3-col l2 m2 s2' style={topPad}>{info.action_min}'</div>
                    <DivCell player={event_player(info.away_event)}  match_event={evenType(info.away_event)} />
                </div>
            )}
    </div>
);
export default MatchInfo;
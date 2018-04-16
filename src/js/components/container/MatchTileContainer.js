import React, { Component } from "react";
import ReactDOM from "react-dom";
import Team from "../presentational/Team";
import MatchDateTime from "../presentational/MatchDateTime";
import ScoreBoard from "../presentational/ScoreBoard";
import MatchStatus from "../presentational/MatchStatus";
import DateSelect from "../presentational/DateSelect";
import 'react-day-picker/lib/style.css';


class MatchTileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedDay: undefined,
        fixtures: []
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
  }

  fetchFirst(sel_date) {
    var that = this;

      fetch('http://fcnaija.com/world-cup-2018/fixtures?match_date='+sel_date).then(function (response) {
        return response.json();
      }).then(function (result) {
        console.log(JSON.stringify(result.fixtures));
        that.setState({ fixtures: result.fixtures});
        //console.log(that.state.posts);
      });

  } 
  
  handleDayChange(day) {
    this.setState({ selectedDay: day });
    console.log(this.formatDate(day));
    this.fetchFirst(this.formatDate(day));
  }
  handleDateSelect(val){
    this.fetchFirst(this.formatDate(val));
  }

  getAdate(ddate){
    var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var x_date = new Date(ddate);
    var x_day = x_date.getDate();
    var x_weekday = weekday[x_date.getDay()];
    return {"x_day":x_day,"x_weekday":x_weekday,"x_date":x_date}
  }
  generateWeekDate(){
    var d = new Date();
    var today = this.getAdate(d);

    var yday = this.getAdate(d.setDate(d.getDate() - 1));
    d = new Date();
    var two_days_ago = this.getAdate(d.setDate(d.getDate() - 2));
    d = new Date();
    var three_days_ago = this.getAdate(d.setDate(d.getDate() - 3));
    d = new Date();
    var tmrw = this.getAdate(d.setDate(d.getDate() + 1));
    d = new Date();
    var nxt_tmrw = this.getAdate(d.setDate(d.getDate() + 2));
    d = new Date();
    var nxt_tmrw_ = this.getAdate(d.setDate(d.getDate() + 3));

    return <DateSelect three_days_ago={three_days_ago} two_days_ago={two_days_ago} 
            yday={yday} today={today} tmrw={tmrw} nxt_tmrw={nxt_tmrw} nxt_tmrw_={nxt_tmrw_} 
            handleDateSelect={this.handleDateSelect} handleDayChange={this.handleDayChange}/>
  }
  
  formatDate(a_date){
    return a_date.getFullYear()+'-'+('0' + (a_date.getMonth()+1)).slice(-2)+'-'+('0' +a_date.getDate()).slice(-2);
  }
  
  componentDidMount() {
    var d = new Date('2018-06-16');
    this.fetchFirst(this.formatDate(d));
  }    
  render() {
    const { selectedDay } = this.state;
    return (
        <div>
            <div className="w3-row">
              {this.generateWeekDate()}
          </div>
        {this.state.fixtures.map(fixture =>
        <div className="w3-border-bottom w3-padding">
             <MatchDateTime match_date={fixture.match_date} match_time={fixture.match_time} />
             <div className="w3-row">
                 <div className="w3-col s7">
                 <Team team_name={fixture.home_team} team_flag={fixture.home_flag} />
                 <Team team_name={fixture.away_team} team_flag={fixture.away_flag} />
                 </div>
                 <div className="w3-col s2">
                 <MatchStatus match_status={fixture.match_staus}/>
                 </div>
                 <div className="w3-col s2">
                 <ScoreBoard score={fixture.home_score}/>
                 <ScoreBoard score={fixture.away_score}/>
                 </div>
                 <div className="w3-col s1">
                    <i className="fa fa-angle-right w3-padding"></i>
                 </div>
             </div>
         </div>
     )}
 </div>
    );
  }
}
export default MatchTileContainer;
const wrapper = document.getElementById("match-tile");
wrapper ? ReactDOM.render(<MatchTileContainer />, wrapper) : false;
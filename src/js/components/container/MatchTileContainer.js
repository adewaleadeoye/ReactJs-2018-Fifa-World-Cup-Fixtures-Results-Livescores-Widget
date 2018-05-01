import React, { Component } from "react";
import ReactDOM from "react-dom";
import Team from "../presentational/Team";
import MatchDateTime from "../presentational/MatchDateTime";
import ScoreBoard from "../presentational/ScoreBoard";
import MatchStatus from "../presentational/MatchStatus";
import DateSelect from "../presentational/DateSelect";
import 'react-day-picker/lib/style.css';
import LineUp from "../presentational/LineUp";
import MatchInfo from "../presentational/MatchInfo";
import Stats from "../presentational/Stats";
import Commentary from "../presentational/Commentary";

class MatchTileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedDay: '',                          //selected day on calendar
        fixtures: [],                            //holds fixtures for a day
        get_match_details:false,                //check if a match is clicked for details
        tab_type:'match_info_tab',             //Default match details tab
        loading:'Loading...',                 //Default text while fixtures are fetched
        match_info:[],                       //information about match
        match_commentary:[],                //match commentaries
        match_stats:[],                    //match statistics
        match_away_lineup:[],             //Away team lineup
        match_home_lineup:[]             //Home team lineup

    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleMatchClick = this.handleMatchClick.bind(this);
    this.handleMatchTabClick = this.handleMatchTabClick.bind(this);
    this.handleMatchesBackClick = this.handleMatchesBackClick.bind(this);
  }
  
  //Fetch matches for chosen date
  fetchFirst(sel_date) {
    var that = this;
    fetch('http://fcnaija.com/world-cup-2018/fixtures?match_date='+sel_date).then(function (response) {
      if(response.ok) { 
        return response.json();
      }
      throw new Error('No response was received due to slow connection.');
    }).then(function (result) {
      //console.log(JSON.stringify(result.fixtures));
      that.setState({ fixtures: result.fixtures});
      //console.log(that.state.posts);
    }).catch(function(error) {
      console.log('Problem with match schedule fetch operation: ', error.message);
    });

  } 
  
  //Respond to calendar date changes
  handleDayChange(day) {
    this.setState({ selectedDay: day });
    this.fetchFirst(this.formatDate(day));
  }
  //respond to date selection
  handleDateSelect(val){
    this.fetchFirst(this.formatDate(val));
  }
  //Display match details when a match is clicked
  handleMatchClick(match_id){
    var that = this;
    fetch('http://localhost:1000/fcnaija/fcnaija/public/world-cup-2018/fixtures/'+match_id).then(function (response) {
      if(response.ok) { 
        return response.json();
      }
      throw new Error('No response was received due to slow connection.');
    }).then(function (result) {
      //console.log(JSON.stringify(result.match_info));
      that.setState({get_match_details:true})
      that.setState({ match_info: result.match_info});
      that.setState({ match_commentary: result.match_commentary});
      that.setState({ match_stats: result.match_stats});
      that.setState({ match_home_lineup: result.home_line_up});
      that.setState({ match_away_lineup: result.away_line_up});
    }).catch(function(error) {
      console.log('Problem with match schedule fetch operation: ', error.message);
    });
  }
  //Respond to back button
  handleMatchesBackClick(){
    this.setState({get_match_details:false})
    this.setState({tab_type:'match_info_tab'})
    var d = new Date('2018-06-16');
    this.fetchFirst(this.formatDate(d));
  }
  //Format date
  getAdate(ddate){
    var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var x_date = new Date(ddate);
    var x_day = x_date.getDate();
    var x_weekday = weekday[x_date.getDay()];
    return {"x_day":x_day,"x_weekday":x_weekday,"x_date":x_date}
  }
  //Generate days before and after today
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

    //Return Date component showing weekly date (3 days before and after today)
    return <DateSelect three_days_ago={three_days_ago} two_days_ago={two_days_ago} 
            yday={yday} today={today} tmrw={tmrw} nxt_tmrw={nxt_tmrw} nxt_tmrw_={nxt_tmrw_} 
            handleDateSelect={this.handleDateSelect} handleDayChange={this.handleDayChange}/>
  }
  
  formatDate(a_date){
    //return formatted date - y-(0)m-(0)d
    return a_date.getFullYear()+'-'+('0' + (a_date.getMonth()+1)).slice(-2)+'-'+('0' +a_date.getDate()).slice(-2);
  }
  
  componentDidMount() {
    //Get match dates from the day worldcup starts
    var d1 = new Date();
    var d2 = new Date('2018-06-16');
    if(d1 >= d2){
      this.fetchFirst(this.formatDate(d1));
    }else{
      this.fetchFirst(this.formatDate(d2));
    }
  }
  handleMatchTabClick(clicked_tab){
    //Set active tab in match details
    this.setState({tab_type:clicked_tab})
  }    
  render() {
    const iconFont = { fontSize:'24px'}
    const { selectedDay } = this.state;
    let matches = <div>this.state.loading</div>;
    if(!this.state.get_match_details){
      matches=<div>
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
                        <div className="w3-col s1" onClick={()=>{this.handleMatchClick(fixture.match_id)}}>
                            <i className="fa fa-angle-right w3-padding"></i>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
    }else{
      let match_i=<div>{this.state.loading}</div>
      switch(this.state.tab_type){
        case 'lineup_tab':
          match_i=<LineUp home_line_up={this.state.match_home_lineup} away_line_up={this.state.match_away_lineup}/>
        break;
        case 'match_info_tab':
          match_i=<MatchInfo match_info={this.state.match_info}/>
        break;
        case 'stats_tab':
          match_i=<Stats stats={this.state.match_stats}/>
        break;
        case 'commentary_tab':
          match_i=<Commentary commentary={this.state.match_commentary}/>
        break;
      }
      matches=<div className="w3-padding textStyle">
                <button onClick={() => this.handleMatchesBackClick()} className="w3-btn"><i className="fa fa-angle-left" style={iconFont}></i></button>
                <div className="w3-row w3-border-bottom">
                  <div className="w3-col l3 s3 selectCursor w3-center" onClick={() => this.handleMatchTabClick('lineup_tab')}>Line Ups</div>
                  <div className="w3-col l3 s3 selectCursor  w3-center" onClick={() => this.handleMatchTabClick('match_info_tab')}>Match Info</div>
                  <div className="w3-col l3 s3 selectCursor w3-center" onClick={() => this.handleMatchTabClick('stats_tab')}>Stats</div>
                  <div className="w3-col l3 s3 selectCursor w3-center" onClick={() => this.handleMatchTabClick('commentary_tab')}>Commentary</div>
                </div>
                {match_i}
              </div>
    }
    return (
        <div>{matches}</div>      
    );
  }
}
export default MatchTileContainer;
const wrapper = document.getElementById("match-tile");
wrapper ? ReactDOM.render(<MatchTileContainer />, wrapper) : false;
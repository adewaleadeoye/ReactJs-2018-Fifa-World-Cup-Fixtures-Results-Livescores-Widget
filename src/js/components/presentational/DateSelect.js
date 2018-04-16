import React from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';


const DateSelect = ({three_days_ago, two_days_ago, yday, today, tmrw, nxt_tmrw, nxt_tmrw_,handleDateSelect,handleDayChange}) => (
    <div>
        <div className="w3-col s1 selectCursor w3-padding" onClick={() => handleDateSelect(three_days_ago.x_date)}><span className="dayText">{three_days_ago.x_day}</span><span className="weekDayText">{three_days_ago.x_weekday}</span></div>
        <div className="w3-col s1 selectCursor w3-padding" onClick={() => handleDateSelect(two_days_ago.x_date)}><span className="dayText">{two_days_ago.x_day}</span><span className="weekDayText">{two_days_ago.x_weekday}</span></div>
        <div className="w3-col s1 selectCursor w3-padding" onClick={() => handleDateSelect(yday.x_date)}><span className="dayText">{yday.x_day}</span><span className="weekDayText">{yday.x_weekday}</span></div>
        <div className="w3-col s1 selectCursor w3-padding" onClick={() => handleDateSelect(today.x_date)}><span className="dayText">{today.x_day}</span><span className="weekDayText">{today.x_weekday}</span></div>
        <div className="w3-col s1 selectCursor w3-padding" onClick={() => handleDateSelect(tmrw.x_date)}><span className="dayText">{tmrw.x_day}</span><span className="weekDayText">{tmrw.x_weekday}</span></div>
        <div className="w3-col s1 selectCursor w3-padding" onClick={() => handleDateSelect(nxt_tmrw.x_date)}><span className="dayText">{nxt_tmrw.x_day}</span><span className="weekDayText">{nxt_tmrw.x_weekday}</span></div>
        <div className="w3-col s1 selectCursor w3-padding" onClick={() => handleDateSelect(nxt_tmrw_.x_date)}><span className="dayText">{nxt_tmrw_.x_day}</span><span className="weekDayText">{nxt_tmrw_.x_weekday}</span></div>
        <div className="w3-col s1 w3-center w3-padding">
              <DayPickerInput onDayChange={handleDayChange} />
        </div>
    </div>
);
export default DateSelect
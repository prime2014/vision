import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import NavigtionBar from "../../Common/Navigation/NavigationBar";
import '../../index.css';

class Calendar extends Component {
    render() {
        return (
            <NavigtionBar>
                <div className="card my-4 px-3 py-3 calendar">
                    <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
                </div>
            </NavigtionBar>
        );
    }
}

export default Calendar;


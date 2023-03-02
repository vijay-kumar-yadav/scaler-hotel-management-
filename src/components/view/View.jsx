import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

const View = ({ reservationList }) => {
  return (
    <>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={reservationList}
        defaultDate={new Date()}
        style={{ height: 500 }}
      />
    </>
  );
};

export default View;

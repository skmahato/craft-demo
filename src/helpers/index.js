import moment from "moment";
import { INCOMING_DATE_FORMAT, REQUIRED_FORMAT } from "../constants";

export const getTimeRange = (event) => {
  return `${moment(event.start_time, INCOMING_DATE_FORMAT).format(
    REQUIRED_FORMAT
  )} - ${moment(event.end_time, INCOMING_DATE_FORMAT).format(REQUIRED_FORMAT)}`;
};

export const eventOverlap = (event, selectedEvents) => {
  for (let index = 0; index < selectedEvents.length; index++) {
    const element = selectedEvents[index];

    const isAnyEventInTheRange =
      moment(element.start_time, INCOMING_DATE_FORMAT).isBetween(
        moment(event.start_time, INCOMING_DATE_FORMAT),
        moment(event.end_time, INCOMING_DATE_FORMAT),
        undefined,
        "[]"
      ) ||
      moment(element.end_time, INCOMING_DATE_FORMAT).isBetween(
        moment(event.start_time, INCOMING_DATE_FORMAT),
        moment(event.end_time, INCOMING_DATE_FORMAT),
        undefined,
        "(]"
      );

    if (isAnyEventInTheRange) {
      return true;
    }
  }

  return false;
};

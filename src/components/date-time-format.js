import {data} from "./data.js";

const MONTHS = [`JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`];

const getTimePeriod = (hour) => (hour >= 12) ? `PM` : `AM`;
const getHourIn12hFormat = (hour) => (hour >= 12) ? (hour -= 12) : hour;

export const dateTimeFormatted = {
  month: MONTHS[data.dueDate.getMonth()],
  minutes: data.dueDate.getMinutes(),
  period: getTimePeriod(data.dueDate.getHours()),
  hours: getHourIn12hFormat(data.dueDate.getHours())
};

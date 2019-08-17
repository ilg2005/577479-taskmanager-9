const MONTHS = [`JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`];

const getTimePeriod = (hour) => (hour >= 12) ? `PM` : `AM`;
const getHourIn12hFormat = (hour) => (hour > 12) ? (hour - 12) : hour;

const checkRepeats = (daysWithRepeats) => Object.keys(daysWithRepeats).some((day) => daysWithRepeats[day]) ? `card--repeat` : ``;

const checkOverdue = (deadline) => (deadline <= new Date()) ? `card--deadline` : ``;

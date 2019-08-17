export const utils = {
  MONTHS: [`JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`],
  getTimePeriod: (hour) => (hour >= 12) ? `PM` : `AM`,
  getHourIn12hFormat: (hour) => (hour > 12) ? (hour - 12) : hour,

  checkRepeats: (daysWithRepeats) => Object.keys(daysWithRepeats).some((day) => daysWithRepeats[day]) ? `repeat` : ``,

  checkOverdue: (deadline) => (deadline <= new Date()) ? `card--deadline` : ``,
};
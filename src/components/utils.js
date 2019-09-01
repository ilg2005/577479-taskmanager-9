export const utils = {
  MONTHS: [`JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`],
  COLORS: [`black`, `yellow`, `blue`, `green`, `pink`],

  getTimePeriod: (hour) => (hour >= 12) ? `PM` : `AM`,
  getHourIn12hFormat: (hour) => (hour > 12) ? (hour - 12) : hour,

  checkRepeats: (daysWithRepeats) => Object.keys(daysWithRepeats).some((day) => daysWithRepeats[day]) ? `repeat` : ``,

  checkOverdue: (deadline) => (deadline <= new Date()) ? `card--deadline` : ``,
  hideElement: (element) => element.classList.add(`hidden`),

  createElement: (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  },

  render: (container, element, place) => {
    switch (place) {
      case `afterbegin`:
        container.prepend(element);
        break;
      case `beforeend`:
        container.append(element);
        break;
    }
  },

  unrender: (element) => {
    if (element) {
      element.remove();
    }
  },
};

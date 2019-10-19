export const utils = {
  MONTHS: [`JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`, `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`],
  COLORS: [`black`, `yellow`, `blue`, `green`, `pink`],

  checkRepeats: (daysWithRepeats) => Object.keys(daysWithRepeats).some((day) => daysWithRepeats[day]) ? `repeat` : ``,

  checkOverdue: (deadline) => (deadline <= new Date() && deadline !== null) ? `card--deadline` : ``,
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

  renderErrorMessage: (message, element) => {
    const errorMessageElement = document.createElement(`div`);
    errorMessageElement.classList.add(`error`);
    errorMessageElement.textContent = message;
    element.insertAdjacentElement(`afterend`, errorMessageElement);
  },

};


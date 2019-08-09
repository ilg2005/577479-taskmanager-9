import {getMenuMarkup} from './js/components/menu.js';
import {getSearchFieldMarkup} from './js/components/searchfield.js';
import {getFiltersMarkup} from './js/components/filter.js';
import {getTaskboardContainerMarkup} from './js/components/taskboard-container.js';
import {getCardEditFormMarkup} from './js/components/card-edit-form.js';
import {getCardMarkup} from './js/components/card.js';
import {getLoadMoreBtnMarkup} from './js/components/load-more-btn.js';

const renderElement = (element, markup, renderingCount = 1) => {
  for (let i = 1; i <= renderingCount; i++) {
    element.insertAdjacentHTML(`beforeend`, markup);
  }
};

const mainElement = document.querySelector(`.main`);
const menuContainerElement = document.querySelector(`.main__control`);

renderElement(menuContainerElement, getMenuMarkup());
renderElement(mainElement, getSearchFieldMarkup());
renderElement(mainElement, getFiltersMarkup());
renderElement(mainElement, getTaskboardContainerMarkup());

const taskboardContainerElement = document.querySelector(`.board`);
const tasksContainerElement = taskboardContainerElement.querySelector(`.board__tasks`);

renderElement(tasksContainerElement, getCardEditFormMarkup());

const TASK_COUNT_TO_RENDER = 3;
renderElement(tasksContainerElement, getCardMarkup(), TASK_COUNT_TO_RENDER);
renderElement(taskboardContainerElement, getLoadMoreBtnMarkup());

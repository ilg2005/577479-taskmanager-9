import Menu from "./components/menu.js";
import SearchField from "./components/searchfield.js";
import Filters from "./components/filters.js";
import TaskboardContainer from "./components/taskboard-container.js";
import {TASKS} from "./components/data.js";
import NoTasks from "./components/no-tasks.js";
import TaskEdit from "./components/task-edit.js";
import Task from "./components/task.js";
import LoadMoreBtn from "./components/load-more-btn.js";
import {utils} from "./components/utils.js";

const mainElement = document.querySelector(`.main`);
const menuContainerElement = document.querySelector(`.main__control`);

const menu = new Menu();
utils.render(menuContainerElement, menu.getElement(), `beforeend`);

const searchField = new SearchField();
utils.render(mainElement, searchField.getElement(), `beforeend`);

const filters = new Filters(TASKS);
utils.render(mainElement, filters.getElement(), `beforeend`);

if (TASKS.length === 0 || filters._filtersCounts.all === filters._filtersCounts.archive) {
  const noTask = new NoTasks();
  utils.render(mainElement, noTask.getElement(), `beforeend`);
} else {

  const taskBoardContainer = new TaskboardContainer();
  utils.render(mainElement, taskBoardContainer.getElement(), `beforeend`);


  const taskboardContainerElement = document.querySelector(`.board`);
  const tasksContainerElement = taskboardContainerElement.querySelector(`.board__tasks`);

  const renderTask = (taskMock) => {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);

    const escKeyDownHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        if (evt.target !== document.querySelector(`.card__text`)) {
          tasksContainerElement.replaceChild(task.getElement(), taskEdit.getElement());
          document.removeEventListener(`keydown`, escKeyDownHandler);
        }
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        tasksContainerElement.replaceChild(taskEdit.getElement(), task.getElement());
        document.addEventListener(`keydown`, escKeyDownHandler);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, escKeyDownHandler);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, escKeyDownHandler);
      });

    const submitCardElement = taskEdit.getElement().querySelector(`.card__save`);

    const submitCardClickHandler = () => {
      tasksContainerElement.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, escKeyDownHandler);
      submitCardElement.removeEventListener(`submit`, submitCardClickHandler);
    };

    submitCardElement.addEventListener(`submit`, submitCardClickHandler);

    utils.render(tasksContainerElement, task.getElement(), `beforeend`);
  };

  const renderLoadMoreBtn = () => {
    const loadMoreBtn = new LoadMoreBtn();
    utils.render(taskboardContainerElement, loadMoreBtn.getElement(), `beforeend`);
  };

  renderLoadMoreBtn();

  const tasksLoaderElement = taskboardContainerElement.querySelector(`.load-more`);

  const TASKS_TO_SHOW = 8;
  let restTasksArray;
  const tasksLoaderElementClickHandler = () => showTasks(restTasksArray);

  const showTasks = (currentTasksArray) => {
    if (currentTasksArray.length > TASKS_TO_SHOW) {
      const currentTasksArrayClone = currentTasksArray.slice(0);
      restTasksArray = currentTasksArrayClone.splice(TASKS_TO_SHOW);
      currentTasksArrayClone.forEach((taskMock) => renderTask(taskMock));
      tasksLoaderElement.addEventListener(`click`, tasksLoaderElementClickHandler);
    } else {
      currentTasksArray.forEach((taskMock) => renderTask(taskMock));
      utils.hideElement(tasksLoaderElement);
      tasksLoaderElement.removeEventListener(`click`, tasksLoaderElementClickHandler);
    }
  };

  showTasks(TASKS);

}

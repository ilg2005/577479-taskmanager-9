import {utils} from "./utils.js";
import Task from "./task";
import TaskEdit from "./task-edit";
import LoadMoreBtn from "./load-more-btn";

export default class BoardController {
  constructor(taskboardContainer, taskContainer, tasks) {
    this._taskboardContainer = taskboardContainer;
    this._taskContainer = taskContainer;
    this._tasks = tasks;
  }

  init() {
    const renderTask = (taskMock) => {
      const task = new Task(taskMock);
      const taskEdit = new TaskEdit(taskMock);

      const escKeyDownHandler = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          if (evt.target !== document.querySelector(`.card__text`)) {
            this._taskContainer.replaceChild(task.getElement(), taskEdit.getElement());
            document.removeEventListener(`keydown`, escKeyDownHandler);
          }
        }
      };

      task.getElement()
        .querySelector(`.card__btn--edit`)
        .addEventListener(`click`, () => {
          this._taskContainer.replaceChild(taskEdit.getElement(), task.getElement());
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

      const submitCardElement = taskEdit.getElement().querySelector(`.card__form`);

      const submitCardHandler = (evt) => {
        evt.preventDefault();
        this._taskContainer.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, escKeyDownHandler);
        submitCardElement.removeEventListener(`submit`, submitCardHandler);
      };

      submitCardElement.addEventListener(`submit`, submitCardHandler);

      utils.render(this._taskContainer, task.getElement(), `beforeend`);
    };

    const renderLoadMoreBtn = () => {
      const loadMoreBtn = new LoadMoreBtn();
      utils.render(this._taskboardContainer, loadMoreBtn.getElement(), `beforeend`);
    };

    renderLoadMoreBtn();

    const tasksLoaderElement = this._taskboardContainer.querySelector(`.load-more`);

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

    showTasks(this._tasks);
  }

}

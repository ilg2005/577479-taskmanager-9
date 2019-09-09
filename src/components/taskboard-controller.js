import {utils} from "./utils.js";
import Task from "./task.js";
import TaskEdit from "./task-edit.js";
import LoadMoreBtn from "./load-more-btn.js";
import NoTasks from "./no-tasks.js";
import {TASKS} from "./data.js";

export default class TaskboardController {
  constructor(taskboardContainer, tasksContainer, tasks) {
    this._taskboardContainer = taskboardContainer;
    this._tasksContainer = tasksContainer;
    this._tasks = tasks;
    this.TASKS_TO_SHOW = 8;
    this._restTasks = null;
    this._loadMoreBtn = new LoadMoreBtn();
  }

  _renderTasksPortion(tasksArray) {
    const renderTask = (taskCard) => {
      const task = new Task(taskCard);
      utils.render(this._tasksContainer, task.getElement(), `beforeend`);
      task.getElement().id = taskCard.id;
    };
    const tasksArrayClone = tasksArray.slice();
    const tasksToRender = tasksArrayClone.splice(0, this.TASKS_TO_SHOW);
    for (let task of tasksToRender) {
      renderTask(task);
    }
    return tasksArrayClone;
  }

  _editTask() {
    const tasksContainerClickHandler = (evt) => {
      if (evt.target.className === `card__btn card__btn--edit`) {
        const taskIndex = evt.target.closest(`article`).id;
        const taskEdit = new TaskEdit(TASKS[taskIndex]);
        const article = document.querySelector(`[id="${taskIndex}"]`);
        article.replaceWith(taskEdit.getElement());

        const escKeyDownHandler = (e) => {
          if (e.key === `Escape` || e.key === `Esc`) {
            if (e.target !== document.querySelector(`.card__text`)) {
              taskEdit.getElement().replaceWith(article);
              document.removeEventListener(`keydown`, escKeyDownHandler);
              this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);
            }
          }
        };
        this._tasksContainer.removeEventListener(`click`, tasksContainerClickHandler);

        document.addEventListener(`keydown`, escKeyDownHandler);

        taskEdit.getElement().querySelector(`textarea`)
          .addEventListener(`focus`, () => {
            document.removeEventListener(`keydown`, escKeyDownHandler);
          });

        taskEdit.getElement().querySelector(`textarea`)
          .addEventListener(`blur`, () => {
            document.addEventListener(`keydown`, escKeyDownHandler);
          });
      }
    };
    this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);

  }

  init() {
    if (!this._tasks.length) {
      const noTasks = new NoTasks();
      utils.render(this._tasksContainer, noTasks.getElement(), `beforeend`);
    } else {
      this._restTasks = this._renderTasksPortion(this._tasks);

      if (this._restTasks.length) {
        const loadMoreBtnElement = this._loadMoreBtn.getElement();
        utils.render(this._taskboardContainer, loadMoreBtnElement, `beforeend`);
        const loadMoreBtnElementClickHandler = () => {
          this._restTasks = this._renderTasksPortion(this._restTasks);
          if (!this._restTasks.length) {
            loadMoreBtnElement.classList.add(`hide`);
          }
        };
        loadMoreBtnElement.addEventListener(`click`, loadMoreBtnElementClickHandler);
      }
      this._editTask();
    }
  }
}

/* const renderTask = (taskMock) => {
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

    task.getElement().querySelector(`.card__btn--edit`)
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
*/


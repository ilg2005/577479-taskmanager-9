import {utils} from "./utils.js";
import Task from "./task.js";
import TaskEdit from "./task-edit.js";
import LoadMoreBtn from "./load-more-btn.js";
import NoTasks from "./no-tasks.js";
import Sort from "./sort.js";
import {TASKS} from "./data.js";

export default class TaskboardController {
  constructor(taskboardContainer, tasks) {
    this._taskboardContainer = taskboardContainer;
    this._tasksContainer = this._taskboardContainer.querySelector(`.board__tasks`);
    this._tasks = tasks;
    this.TASKS_TO_SHOW = 8;
    this._restTasks = null;
    this._loadMoreBtn = new LoadMoreBtn();
    this._sort = new Sort();
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

        const submitCardElement = taskEdit.getElement().querySelector(`.card__form`);

        const submitCardHandler = (ev) => {
          ev.preventDefault();
          taskEdit.getElement().replaceWith(article);
          document.removeEventListener(`keydown`, escKeyDownHandler);
          submitCardElement.removeEventListener(`submit`, submitCardHandler);
          this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);
        };

        submitCardElement.addEventListener(`submit`, submitCardHandler);

      }
    };
    this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);

  }

  _implementSorting() {
    const sortElement = this._sort.getElement();
    utils.render(this._taskboardContainer, sortElement, `afterbegin`);

    const sortElementClickHandler = (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      sortElement.querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      this._tasksContainer.innerHTML = ``;


      this._loadMoreBtn.getElement().classList.remove(`hide`);
      switch (evt.target.getAttribute(`data-sort`)) {
        case `dateUp`:
          evt.target.classList.add(`sort__button--active`);
          const tasksByDateUp = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          this._restTasks = this._renderTasksPortion(tasksByDateUp);
          break;
        case `dateDown`:
          evt.target.classList.add(`sort__button--active`);
          const tasksByDateDown = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
          this._restTasks = this._renderTasksPortion(tasksByDateDown);
          break;
        case `default`:
          evt.target.classList.add(`sort__button--active`);
          this._restTasks = this._renderTasksPortion(this._tasks);
          break;
      }
    };

    sortElement.addEventListener(`click`, sortElementClickHandler);
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
      this._implementSorting();
    }
  }
}


import TaskEdit from "./task-edit.js";
import {TASKS} from "./data.js";
import Task from "./task.js";
import {utils} from "./utils.js";
import Hashtag from "./hashtag.js";

export default class TaskEditController {
  constructor(taskboardContainer) {
    this._tasksContainer = taskboardContainer.querySelector(`.board__tasks`);
  }

  _toggleDateStatus(editedTask) {
    const dateToggleElement = editedTask.getElement().querySelector(`.card__dates`);
    const statusElement = dateToggleElement.querySelector(`.card__date-status`);
    const deadlineFieldElement = editedTask.getElement().querySelector(`.card__date-deadline`);

    const currentDeadline = editedTask._dueDate;
    const dateToggleElementClickHandler = () => {
      deadlineFieldElement.classList.toggle(`hide`);
      statusElement.innerHTML = (statusElement.innerHTML === `no`) ? `yes` : `no`;
      editedTask._dueDate = (statusElement.innerHTML === `no`) ? null : currentDeadline;
      console.log(editedTask._dueDate);
      return (statusElement.innerHTML !== `no`);
    };
    dateToggleElement.addEventListener(`click`, dateToggleElementClickHandler);
  }

  _changeColor(editedTask) {
    const colorBoxElementClickHandler = (evt) => {
      if (evt.target.name === `color`) {
        const initialColor = `card--${editedTask._color}`;
        const newColor = `card--${evt.target.value}`;
        editedTask._color = evt.target.value;
        editedTask.getElement().classList.remove(initialColor);
        editedTask.getElement().classList.add(newColor);
      }
    };
    editedTask.getElement().querySelector(`.card__colors-inner`).addEventListener(`click`, colorBoxElementClickHandler);
  }

  _changeHashtags(editedTask) {
    const hashtagsElement = editedTask.getElement().querySelector(`.card__hashtag`);
    const hashtagsListElement = hashtagsElement.querySelector(`.card__hashtag-list`);
    const hashtagsInputElement = hashtagsElement.querySelector(`.card__hashtag-input`);

    const hashtagsInputElementKeydownHandler = (evt) => {
      if (evt.key === `Space` || evt.keyCode === 32 || evt.key === `Enter` || evt.keyCode === 13) {
        evt.preventDefault();
        const striptags = require(`striptags`);
        const hashtagInput = hashtagsInputElement.value;
        const strippedHashtag = striptags(hashtagInput).trim();
        const newHashtag = new Hashtag(strippedHashtag, hashtagsInputElement, editedTask);
        if (newHashtag._validateHashtag()) {
          utils.render(hashtagsListElement, newHashtag.getElement(), `beforeend`);
          editedTask._tags.add(strippedHashtag);
          hashtagsInputElement.value = ``;
        }
      } else {
        hashtagsInputElement.setCustomValidity(``);
      }
    };

    const hashtagsElementClickHandler = (evt) => {
      if (evt.target.className === `card__hashtag-delete`) {
        const tagContainer = evt.target.closest(`.card__hashtag-inner`);
        const tag = tagContainer.querySelector(`.card__hashtag-name`).innerHTML;
        const strippedTag = tag.trim().replace(/#/, ``);
        editedTask._tags.delete(strippedTag);
        utils.unrender(tagContainer);
        hashtagsInputElement.setCustomValidity(``);
      }
    };

    hashtagsElement.addEventListener(`click`, hashtagsElementClickHandler);
    hashtagsInputElement.addEventListener(`keydown`, hashtagsInputElementKeydownHandler);
  }

  _editTask() {
    const tasksContainerClickHandler = (evt) => {
      if (evt.target.className === `card__btn card__btn--edit`) {
        const taskIndex = evt.target.closest(`article`).id;
        const taskEdit = new TaskEdit(TASKS[taskIndex]);
        const article = document.querySelector(`[id="${taskIndex}"]`);
        article.replaceWith(taskEdit.getElement());
        this._changeColor(taskEdit);
        this._changeHashtags(taskEdit);
        this._toggleDateStatus(taskEdit);

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

        const formElement = taskEdit.getElement().querySelector(`.card__form`);

        const formSubmitHandler = (ev) => {
          ev.preventDefault();
          const task = new Task(TASKS[article.id]);
          const formData = new FormData(formElement);
          const entry = {
            description: formData.get(`text`),
            color: formData.get(`color`),
            tags: new Set(formData.getAll(`hashtag`)),
            dueDate: formData.get(`date`),
          };

          task._color = entry.color;
          TASKS[article.id].color = entry.color;

          task._description = entry.description;
          TASKS[article.id].description = entry.description;

          task._tags = entry.tags;
          TASKS[article.id].tags = entry.tags;

          console.log(entry.dueDate);
          task._dueDate = new Date(entry.dueDate);
          TASKS[article.id].dueDate = new Date(entry.dueDate);

          task.getElement().id = article.id;
          taskEdit.getElement().replaceWith(task.getElement());
          formElement.removeEventListener(`submit`, formSubmitHandler);
          this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);
        };

        formElement.addEventListener(`submit`, formSubmitHandler);
      }
    };
    this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);
  }

  _init() {
    this._editTask();
  }
}

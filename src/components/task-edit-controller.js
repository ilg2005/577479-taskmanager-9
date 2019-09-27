import TaskEdit from "./task-edit.js";
import {TASKS} from "./data.js";
import Task from "./task.js";
import {utils} from "./utils.js";
import Hashtag from "./hashtag.js";
import TaskboardController from "./taskboard-controller";
import TaskboardContainer from "./taskboard-container";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export default class TaskEditController {
  constructor(taskboardContainer) {
    this._tasksContainer = taskboardContainer.querySelector(`.board__tasks`);
  }

  _rerenderBoard() {
    utils.unrender(this._tasksContainer.parentElement);
    const taskBoardContainer = new TaskboardContainer();
    utils.render(document.querySelector(`.main`), taskBoardContainer.getElement(), `beforeend`);

    const BoardController = new TaskboardController(document.querySelector(`.board`), TASKS);
    BoardController.init();
  }

  _toggleFavorites(editedTask) {
    const favoritesBtnElement = editedTask.getElement().querySelector(`.card__btn--favorites `);
    const favoritesBtnElementClickHandler = () => {
      favoritesBtnElement.classList.toggle(`card__btn--disabled`);
      editedTask._isFavorite = (!favoritesBtnElement.classList.contains(`card__btn--disabled`));
    };
    favoritesBtnElement.addEventListener(`click`, favoritesBtnElementClickHandler);
  }

  _toggleDateRepeatStatus(editedTask) {
    const dateElement = editedTask.getElement().querySelector(`.card__dates`);
    const dateToggleElement = dateElement.querySelector(`.card__date-deadline-toggle`);
    const dateStatusElement = dateElement.querySelector(`.card__date-status`);
    const repeatToggleElement = dateElement.querySelector(`.card__repeat-toggle`);
    const repeatStatusElement = dateElement.querySelector(`.card__repeat-status`);
    const cardDateElement = dateElement.querySelector(`.card__date`);

    const deadlineFieldElement = editedTask.getElement().querySelector(`.card__date-deadline`);
    const repeatFieldElement = editedTask.getElement().querySelector(`.card__repeat-days`);

    if (dateStatusElement.innerHTML === `no`) {
      deadlineFieldElement.classList.add(`hide`);
    }

    if (repeatStatusElement.innerHTML === `no`) {
      repeatFieldElement.classList.add(`hide`);
    }

    const currentDeadline = cardDateElement.value;
    const dateToggleElementClickHandler = () => {
      deadlineFieldElement.classList.toggle(`hide`);
      dateStatusElement.innerHTML = (dateStatusElement.innerHTML === `no`) ? `yes` : `no`;
      if (dateStatusElement.innerHTML === `yes`) {
        repeatFieldElement.classList.add(`hide`);
        repeatStatusElement.innerHTML = `no`;
      }
      editedTask._dueDate = (dateStatusElement.innerHTML === `no`) ? null : currentDeadline;
      editedTask.getElement().querySelector(`.card__date`).value = (dateStatusElement.innerHTML === `no`) ? null : currentDeadline;
    };

    const repeatToggleElementClickHandler = () => {
      repeatFieldElement.classList.toggle(`hide`);
      repeatStatusElement.innerHTML = (repeatStatusElement.innerHTML === `no`) ? `yes` : `no`;
      if (repeatStatusElement.innerHTML === `yes`) {
        deadlineFieldElement.classList.add(`hide`);
        dateStatusElement.innerHTML = `no`;
        Object.keys(editedTask._repeatingDays).map((day) => {
          if (editedTask._repeatingDays[day]) {
            repeatFieldElement.querySelector(`#repeat-${day}-4`).setAttribute(`checked`, `checked`);
          }
        });
        editedTask.getElement().classList.add(`card--repeat`);
      } else {
        repeatFieldElement.querySelectorAll(`input`).forEach((input)=> {
          input.removeAttribute(`checked`);
        });
        editedTask.getElement().classList.remove(`card--repeat`);
      }
    };

    const cardDateElementClickHandler = () => {
      flatpickr(cardDateElement, {
        altInput: true,
        allowInput: true,
        altFormat: `j F`,
        defaultDate: editedTask._dueDate,
      });

      const cardDateElementChangeHandler = () => {
        editedTask.getElement().classList.remove(`card--deadline`);
        if (new Date(cardDateElement.value) <= new Date()) {
          editedTask.getElement().classList.add(`card--deadline`);
        }
      };

      cardDateElement.addEventListener(`change`, cardDateElementChangeHandler);
    };

    dateToggleElement.addEventListener(`click`, dateToggleElementClickHandler);
    repeatToggleElement.addEventListener(`click`, repeatToggleElementClickHandler);
    cardDateElement.addEventListener(`click`, cardDateElementClickHandler);
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

  _closeEditing(editedCardElement) {
    const task = new Task(TASKS[editedCardElement.id]);
    editedCardElement.replaceWith(task.getElement());
  }

  _editTask() {
    const tasksContainerClickHandler = (evt) => {
      if (evt.target.className === `card__btn card__btn--edit`) {
        const editedTaskElement = document.querySelector(`.card--edit`);
        if (editedTaskElement) {
          this._closeEditing(editedTaskElement);
        }
        const taskIndex = evt.target.closest(`article`).id;
        const taskEdit = new TaskEdit(TASKS[taskIndex]);
        const article = document.querySelector(`[id="${taskIndex}"]`);
        article.replaceWith(taskEdit.getElement());
        taskEdit.getElement().setAttribute(`id`, taskIndex);
        this._changeColor(taskEdit);
        this._changeHashtags(taskEdit);
        this._toggleDateRepeatStatus(taskEdit);
        this._toggleFavorites(taskEdit);

        const escKeyDownHandler = (e) => {
          if (e.key === `Escape` || e.key === `Esc`) {
            if (e.target !== document.querySelector(`.card__text`)) {
              taskEdit.getElement().replaceWith(article);
              document.removeEventListener(`keydown`, escKeyDownHandler);
              this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);
            }
          }
        };
        //    this._tasksContainer.removeEventListener(`click`, tasksContainerClickHandler);

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
        const formDeleteElement = taskEdit.getElement().querySelector(`.card__delete`);

        const formSubmitHandler = (ev) => {
          ev.preventDefault();
          const task = new Task(TASKS[article.id]);
          const formData = new FormData(formElement);
          const entry = {
            description: formData.get(`text`),
            color: formData.get(`color`),
            tags: new Set(formData.getAll(`hashtag`)),
            dueDate: formData.get(`date`),
            isFavorite: taskEdit._isFavorite,
            repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
              acc[it] = true;
              return acc;
            }, {
              Mo: false,
              Tu: false,
              We: false,
              Th: false,
              Fr: false,
              Sa: false,
              Su: false,
            }),
          };

          task._color = entry.color;
          TASKS[article.id].color = entry.color;

          task._description = entry.description;
          TASKS[article.id].description = entry.description;

          task._tags = entry.tags;
          TASKS[article.id].tags = entry.tags;

          task._isFavorite = entry.isFavorite;
          TASKS[article.id].isFavorite = entry.isFavorite;

          task._repeatingDays = entry.repeatingDays;
          TASKS[article.id].repeatingDays = entry.repeatingDays;

          if (!entry.dueDate) {
            task._dueDate = null;
            TASKS[article.id].dueDate = null;
          } else {
            task._dueDate = new Date(entry.dueDate);
            TASKS[article.id].dueDate = new Date(entry.dueDate);
          }

          task.getElement().id = article.id;
          // taskEdit.getElement().replaceWith(task.getElement());
          this._rerenderBoard();


          formElement.removeEventListener(`submit`, formSubmitHandler);
          this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);
        };

        const formDeleteElementClickHandler = () => {
          taskEdit.getElement().replaceWith(article);
          this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);
        };

        formElement.addEventListener(`submit`, formSubmitHandler);
        formDeleteElement.addEventListener(`click`, formDeleteElementClickHandler);

      }
    };
    this._tasksContainer.addEventListener(`click`, tasksContainerClickHandler);
  }

  _init() {
    this._editTask();
  }
}

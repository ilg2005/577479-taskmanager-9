import TaskEdit from "./task-edit.js";
import {TASKS} from "./data.js";
import Task from "./task.js";
import {utils} from "./utils.js";
import Hashtags from "./hashtags";

export default class TaskEditController {
  constructor(taskboardContainer) {
    this._tasksContainer = taskboardContainer.querySelector(`.board__tasks`);
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
    const hashtagsContainer = editedTask.getElement().querySelector(`.card__details`);
    const hashtags = new Hashtags(editedTask);
    utils.render(hashtagsContainer, hashtags.getElement(), `beforeend`);
    const hashtagsElement = hashtagsContainer.querySelector(`.card__hashtag`);

    const hashtagsInputElement = hashtagsElement.querySelector(`.card__hashtag-input`);
    if (editedTask._tags.size) {
      const hashtagsElementClickHandler = (evt) => {
        if (evt.target.className === `card__hashtag-delete`) {
          utils.unrender(evt.target.closest(`.card__hashtag-inner`));
          console.log(evt.target.previousElementSibling.innerText);
        }
      };

      const hashtagsInputElementKeydownHandler = (evt) => {
        if (evt.key === `Space` || evt.keyCode === 32) {
          editedTask._tags.add(hashtagsInputElement.value);
          hashtags.removeElement();
          hashtagsElement.replaceWith(hashtags.getElement());
        }
      };

      hashtagsElement.addEventListener(`click`, hashtagsElementClickHandler);
      hashtagsInputElement.addEventListener(`keydown`, hashtagsInputElementKeydownHandler);
    }
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

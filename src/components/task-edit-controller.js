export default class TaskEditController {
  constructor(editedTask) {
    this._task = editedTask;
  }

  _changeColor() {
    const colorBoxElementClickHandler = (evt) => {
      if (evt.target.name === `color`) {
        const initialColor = `card--${this._task._color}`;
        const newColor = `card--${evt.target.value}`;
        this._task._color = evt.target.value;
        this._task.getElement().classList.remove(initialColor);
        this._task.getElement().classList.add(newColor);
      }
    };
    this._task.getElement().querySelector(`.card__colors-inner`).addEventListener(`click`, colorBoxElementClickHandler);
  }


  _init() {
    console.log(`editingTask`);
    this._changeColor();
  }
}

import Abstract from "../abstract";
import CardWrapper from "./card-controllers/card-wrapper";
import CardControl from "./card-controllers/card-control";
import CardColorBar from "./card-controllers/card-color-bar";
import CardTextarea from "./card-controllers/card-textarea";
import CardSettings from "./card-controllers/card-settings";
import CardDates from "./card-controllers/card-dates";
import CardHashtags from "./card-controllers/card-hashtags";
import CardColors from "./card-controllers/card-colors";
import CardBtns from "./card-controllers/card-btns";

export default class CardRenderer extends Abstract {
  constructor(task, mode = ``) {
    super();
    this._cardWrapper = new CardWrapper(task.color, task.dueDate, task.repeatingDays, task.id, mode);
    this._cardControl = new CardControl(task.isArchive, task.isFavorite, mode);
    this._cardColorBar = new CardColorBar();
    this._cardTextarea = new CardTextarea(task.description);
    this._cardSettings = new CardSettings();
    this._cardDates = new CardDates(task.dueDate, task.repeatingDays);
    this._cardHashtags = new CardHashtags(task.tags);
    this._cardColors = new CardColors(task.color);
    this._cardBtns = new CardBtns();
  }

  _renderCard(container) {
    const cardInnerWrapElement = this._cardWrapper.getElement().querySelector(`.card__inner`);

    this._cardControl.render(cardInnerWrapElement);
    this._cardColorBar.render(cardInnerWrapElement);
    this._cardTextarea.render(cardInnerWrapElement);
    this._cardSettings.render(cardInnerWrapElement);
    this._cardBtns.render(cardInnerWrapElement);

    const cardSettingsElement = this._cardSettings.getElement();
    const cardDetailsElement = cardSettingsElement.querySelector(`.card__details`);

    this._cardDates.render(cardDetailsElement);
    this._cardHashtags.render(cardDetailsElement);
    this._cardColors.render(cardSettingsElement);

    this._cardWrapper.render(container, `afterbegin`);
  }
}

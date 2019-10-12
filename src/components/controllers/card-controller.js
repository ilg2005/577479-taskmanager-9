import Abstract from "../abstract";
import CardWrapper from "../card/card-wrapper";
import CardControl from "../card/card-control";
import CardColorBar from "../card/card-color-bar";
import CardTextarea from "../card/card-textarea";
import CardSettings from "../card/card-settings";
import CardDates from "../card/card-dates";
import CardHashtags from "../card/card-hashtags";
import CardColors from "../card/card-colors";
import CardBtns from "../card/card-btns";

export default class CardController extends Abstract {
  constructor(task) {
    super();
    this._cardWrapper = new CardWrapper(task);
    this._cardControl = new CardControl(task);
    this._cardColorBar = new CardColorBar();
    this._cardTextarea = new CardTextarea(task);
    this._cardSettings = new CardSettings();
    this._cardDates = new CardDates(task);
    this._cardHashtags = new CardHashtags(task);
    this._cardColors = new CardColors(task);
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

  _changeCard() {
    this._cardColors._changeColor(document.querySelector(`[data-card]`));
    this._cardHashtags._changeHashtags(document.querySelector(`[data-card]`));
  }

}

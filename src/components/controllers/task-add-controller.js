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

export default class TaskAddController extends Abstract {
  _combineCard(container) {
    const newCardWrapper = new CardWrapper();
    const newCardControl = new CardControl();
    const newCardColorBar = new CardColorBar();
    const newCardTextarea = new CardTextarea();
    const newCardSettings = new CardSettings();
    const newCardDates = new CardDates();
    const newCardHashtags = new CardHashtags();
    const newCardColors = new CardColors();
    const newCardBtns = new CardBtns();

    const cardInnerWrapElement = newCardWrapper.getElement().querySelector(`.card__inner`);

    newCardControl.render(cardInnerWrapElement);
    newCardColorBar.render(cardInnerWrapElement);
    newCardTextarea.render(cardInnerWrapElement);
    newCardSettings.render(cardInnerWrapElement);
    newCardBtns.render(cardInnerWrapElement);

    const cardSettingsElement = newCardSettings.getElement();
    const cardDetailsElement = cardSettingsElement.querySelector(`.card__details`);
    newCardDates.render(cardDetailsElement);
    newCardHashtags.render(cardDetailsElement);
    newCardColors.render(cardSettingsElement);

    newCardWrapper.render(container, `afterbegin`);
  }
}

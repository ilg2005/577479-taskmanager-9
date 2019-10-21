import Abstract from "../../abstract.js";
import {utils} from "../../utils";
const striptags = require(`striptags`);

export default class CardHashtags extends Abstract {
  constructor(tags) {
    super();
    this._tags = tags;
    this._inputContainer = this.getElement().querySelector(`.card__hashtag-input`);
    this._tagsNumber = tags.size;
    this._changeHashtags();
  }

  _validateHashtag(hashtag) {
    const MAX_HASHTAG_LENGTH = 15;
    const MIN_HASHTAG_LENGTH = 2;
    const MAX_HASHTAGS_NUMBER_PER_TASK = 5;

    const hashtagChars = hashtag.split(``);

    const rules = {
      tooLong: hashtagChars.length > MAX_HASHTAG_LENGTH,
      tooShort: hashtagChars.length < MIN_HASHTAG_LENGTH,
      tooMuch: this._tagsNumber >= MAX_HASHTAGS_NUMBER_PER_TASK,
      doubleOccurrence: Array.from(this._tags).includes(hashtag),
    };

    const descriptions = {
      tooLong: `Hashtag's maximum length should be 16 chars including #`,
      tooShort: `Hashtag's minimum length should be 3 chars including #`,
      tooMuch: `No more than 5 hashtags per task`,
      doubleOccurrence: `This tag already exists. Please, change it.`,
    };

    for (let [rule, value] of Object.entries(rules)) {
      if (value) {
        this._inputContainer.setCustomValidity(` `);
        utils.renderErrorMessage(descriptions[rule], this._inputContainer);
        return false;
      }
    }
    return true;
  }

  _changeHashtags() {
    const hashtagsInputElementKeydownHandler = (evt) => {
      utils.unrender(document.querySelector(`.error`));
      this._inputContainer.setCustomValidity(``);
      if (evt.key === `Space` || evt.keyCode === 32 || evt.key === `Enter` || evt.keyCode === 13) {
        evt.preventDefault();
        let hashtagInput = this._inputContainer.value;
        const strippedHashtag = striptags(hashtagInput).trim().replace(/^#+/, ``);
        if (this._validateHashtag(strippedHashtag)) {
          this._tags.add(strippedHashtag);
          const newTagsElement = new CardHashtags(this._tags);
          this.replace(newTagsElement);
        }
      }
    };

    const hashtagsElementClickHandler = (evt) => {
      if (evt.target.className === `card__hashtag-delete`) {
        const tagContainer = evt.target.closest(`.card__hashtag-inner`);
        const tag = tagContainer.querySelector(`.card__hashtag-name`).innerHTML;
        const strippedTag = tag.trim().replace(/^#+/, ``);
        this._tags.delete(strippedTag);
        this._tagsNumber = this._tags.size;
        utils.unrender(tagContainer);
        this._inputContainer.setCustomValidity(``);
        utils.unrender(document.querySelector(`.error`));
      }
    };

    this.getElement().addEventListener(`click`, hashtagsElementClickHandler);
    this._inputContainer.addEventListener(`keydown`, hashtagsInputElementKeydownHandler);
  }

  getTemplate() {
    return `<div class="card__hashtag">
                      <div class="card__hashtag-list">
                      ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value=${tag}
                            class="card__hashtag-hidden-input"
                          />
                          <p class="card__hashtag-name">
                            #${tag}
                          </p>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>`).join(``)}
                      </div>

                      <label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="Type new hashtag here"
                          autocomplete="off"
                        />
                      </label>
                    </div>`;
  }
}


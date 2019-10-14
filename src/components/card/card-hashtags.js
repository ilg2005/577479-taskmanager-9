import Abstract from "../abstract.js";
import {utils} from "../utils";
const striptags = require(`striptags`);

export default class CardHashtags extends Abstract {
  constructor(task) {
    super();
    this._task = task;
    this._tags = task.tags;
    this._container = this.getElement().querySelector(`input`);
    this._tagsNumber = task.tags.size;
    this._changeHashtags();
  }

  _validateHashtag(hashtag) {
    const MAX_HASHTAG_LENGTH = 16;
    const MIN_HASHTAG_LENGTH = 3;
    const MAX_HASHTAGS_NUMBER_PER_TASK = 5;

    const hashtagChars = hashtag.split(``);

    const tooLong = hashtagChars.length > MAX_HASHTAG_LENGTH;
    const tooShort = hashtagChars.length < MIN_HASHTAG_LENGTH;
    const tooMuch = this._tagsNumber >= MAX_HASHTAGS_NUMBER_PER_TASK;
    const doubleOccurrence = Array.from(this._task.tags).includes(hashtag);

    const validationRules = {
      [tooLong]: `Hashtag's maximum length should be 16 chars including #`,
      [tooShort]: `Hashtag's minimum length should be 3 chars including #`,
      [tooMuch]: `No more than 5 hashtags per task`,
      [doubleOccurrence]: `This tag already exists. Please, change it.`,
    };

    for (let [rule, description] of Object.entries(validationRules)) {
      if (rule === true) {
        this._container.setCustomValidity(`${description}`);
        break;
      }
    }

    return this._container.validity.valid;
  }


  _changeHashtags() {
    const hashtagsElement = this.getElement();
    // const hashtagsListElement = hashtagsElement.querySelector(`.card__hashtag-list`);
    const hashtagsInputElement = hashtagsElement.querySelector(`.card__hashtag-input`);

    const hashtagsInputElementKeydownHandler = (evt) => {
      if (evt.key === `Space` || evt.keyCode === 32 || evt.key === `Enter` || evt.keyCode === 13) {
        evt.preventDefault();
        const hashtagInput = hashtagsInputElement.value;
        const strippedHashtag = striptags(hashtagInput).trim();
        if (this._validateHashtag(strippedHashtag)) {
          this._tags.add(strippedHashtag);
          const newTagsElement = new CardHashtags(this._task);
          this.replace(newTagsElement);

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
        this._tags.delete(strippedTag);
        utils.unrender(tagContainer);
        hashtagsInputElement.setCustomValidity(``);
      }
    };

    hashtagsElement.addEventListener(`click`, hashtagsElementClickHandler);
    hashtagsInputElement.addEventListener(`keydown`, hashtagsInputElementKeydownHandler);
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
                        />
                      </label>
                    </div>`;
  }
}

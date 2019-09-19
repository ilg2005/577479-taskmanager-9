import AbstractComponent from "./abstract-component.js";

export default class Hashtag extends AbstractComponent {
  constructor(tag, container, editedTask) {
    super();
    this._tag = tag.trim();
    this._container = container;
    this._tagsNumber = editedTask._tags.size;
  }

  _validateHashtag() {
    const MAX_HASHTAG_LENGTH = 16;
    const MIN_HASHTAG_LENGTH = 3;
    const MAX_HASHTAGS_NUMBER_PER_TASK = 5;

    const checkTooLong = () => {
      const hashtagChars = this._tag.split(``);
      if (hashtagChars.length > MAX_HASHTAG_LENGTH) {
        this._container.setCustomValidity(`Hashtag's maximum length should be 16 chars including #`);
      }
    };

    const checkTooShort = () => {
      const hashtagChars = this._tag.split(``);
      if (hashtagChars.length < MIN_HASHTAG_LENGTH) {
        this._container.setCustomValidity(`Hashtag's minimum length should be 3 chars including #`);
      }
    };

    const checkHashtagsNumberPerTask = () => {
      if (this._tagsNumber >= MAX_HASHTAGS_NUMBER_PER_TASK) {
        this._container.setCustomValidity(`No more than 5 hashtags per task`);
      }
    };

    const hashtagValidation = () => {
      checkTooLong();
      checkTooShort();
      checkHashtagsNumberPerTask();
    };

    hashtagValidation();

    return this._container.validity.valid;
  }


  getTemplate() {
    return `<span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value=${this._tag}
                            class="card__hashtag-hidden-input"
                          />
                          <p class="card__hashtag-name">
                            #${this._tag}
                          </p>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>`;
  }
}

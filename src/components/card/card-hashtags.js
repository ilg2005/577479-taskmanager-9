import Abstract from "../abstract.js";
import Hashtag from "../hashtag";
import {utils} from "../utils";

export default class CardHashtags extends Abstract {
  constructor(task) {
    super();
    this._task = task;
    this._tags = task.tags;
  }

  _changeHashtags(cardElement) {
    const hashtagsElement = cardElement.querySelector(`.card__hashtag`);
    const hashtagsListElement = hashtagsElement.querySelector(`.card__hashtag-list`);
    const hashtagsInputElement = hashtagsElement.querySelector(`.card__hashtag-input`);

    const hashtagsInputElementKeydownHandler = (evt) => {
      if (evt.key === `Space` || evt.keyCode === 32 || evt.key === `Enter` || evt.keyCode === 13) {
        evt.preventDefault();
        const striptags = require(`striptags`);
        const hashtagInput = hashtagsInputElement.value;
        const strippedHashtag = striptags(hashtagInput).trim();
        const newHashtag = new Hashtag(strippedHashtag, hashtagsInputElement, this._task);
        if (newHashtag._validateHashtag()) {
          utils.render(hashtagsListElement, newHashtag.getElement(), `beforeend`);
          this._tags.add(strippedHashtag);
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

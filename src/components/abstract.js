export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  getElement() {
    if (!this._element) {
      this._element = this._createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented`);
  }

  replace(newElement) {
    this.getElement().parentNode.replaceChild(newElement.getElement(), this.getElement());
    this._element = newElement.getElement();
  }

  render(container, place = `beforeend`) {
    if (place === `afterbegin`) {
      container.prepend(this.getElement());
    } else {
      container.append(this.getElement());
    }
  }
}

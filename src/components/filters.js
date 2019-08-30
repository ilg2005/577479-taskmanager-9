import {TASKS} from "./data.js";
import {utils} from "./utils.js";

export default class Filters {
  constructor() {
    this._filtersCounts = this.getCountsForFilters(TASKS);
  }

  getCountsForFilters(tasksArray) {
    let countOverdue = 0; let countToday = 0; let countFavorite = 0; let countRepeating = 0; let countTags = 0; let countArchive = 0;
    for (const task of tasksArray) {
      if (task.isFavorite) {
        countFavorite++;
      }
      if (task.isArchive) {
        countArchive++;
      }
      if (task.tags.size) {
        countTags++;
      }
      if (task.dueDate <= new Date()) {
        countOverdue++;
      }
      if (task.dueDate.toDateString() === (new Date()).toDateString()) {
        countToday++;
      }
      if (Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day])) {
        countRepeating++;
      }
    }
    return {
      favorites: countFavorite,
      archive: countArchive,
      repeating: countRepeating,
      tags: countTags,
      overdue: countOverdue,
      today: countToday,
      all: tasksArray.length - countArchive,
    };
  }

  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
        ${Object.entries(this._filtersCounts).forEach(([title, count]) => `<input
    type="radio"
    id="filter__${title}"
    class="filter__input visually-hidden"
    name="filter"
      ${(count === 0) ? `disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count ? count : 0}</span></label
    >`)}
      </section>`;
  }
}

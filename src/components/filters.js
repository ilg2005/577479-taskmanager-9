import {utils} from "./utils";

export default class Filters {
  constructor(taskArray) {
    this._FILTERS = [
      {
        title: `all`,
        count: this.getCountsForFilters(taskArray).countAll
      },
      {
        title: `overdue`,
        count: this.getCountsForFilters(taskArray).countOverdue
      },
      {
        title: `today`,
        count: this.getCountsForFilters(taskArray).countToday
      },
      {
        title: `favorites`,
        count: this.getCountsForFilters(taskArray).countFavorite
      },
      {
        title: `repeating`,
        count: this.getCountsForFilters(taskArray).countRepeating
      },
      {
        title: `tags`,
        count: this.getCountsForFilters(taskArray).countTags
      },
      {
        title: `archive`,
        count: this.getCountsForFilters(taskArray).countArchive
      },
    ];
  }

  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
        ${this._FILTERS.map((filter) => `
        <input
          type="radio"
          id="filter__${filter.title}"
          class="filter__input visually-hidden"
          name="filter"
          ${(filter.count === 0) ? `disabled` : ``}
        />
        <label for="filter__${filter.title}" class="filter__label">
          ${filter.title} <span class="filter__${filter.title}-count">${filter.count ? filter.count : 0}</span></label
        >`).join(``)}
      </section>`;
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
      countFavorite,
      countArchive,
      countRepeating,
      countTags,
      countOverdue,
      countToday,
      countAll: tasksArray.length - countArchive,
    };
  }
}

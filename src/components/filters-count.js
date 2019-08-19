import {TASKS} from "./data.js";

const getCountsForFilters = (tasksArray) => {
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
};

const filterCounts = getCountsForFilters(TASKS);

export const FILTERS = [
  {
    title: `all`,
    count: filterCounts.countAll
  },
  {
    title: `overdue`,
    count: filterCounts.countOverdue
  },
  {
    title: `today`,
    count: filterCounts.countToday
  },
  {
    title: `favorites`,
    count: filterCounts.countFavorite
  },
  {
    title: `repeating`,
    count: filterCounts.countRepeating
  },
  {
    title: `tags`,
    count: filterCounts.countTags
  },
  {
    title: `archive`,
    count: filterCounts.countArchive
  },
];


const DESCRIPTION_LINES = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const MIN_TAGS_NUMBER = 0;
const MAX_TAGS_NUMBER = 3;

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const WEEK_DAYS = [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`];

export const TASKS = [];
const TASKS_COUNT = 8;

const MSEC_IN_A_WEEK = 7 * 24 * 60 * 60 * 1000;
const weekBehindNow = new Date() - MSEC_IN_A_WEEK;
const weekAheadNow = weekBehindNow + 2 * MSEC_IN_A_WEEK;

const getRandomElementFromArray = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getTagsSet = (tagsList, min, max) => {
  const tagsQuantity = getRandomInRange(min, max);
  const tagsSet = new Set(tagsList);
  while (tagsSet.size > tagsQuantity) {
    tagsSet.delete(getRandomElementFromArray(tagsList));
  }
  return tagsSet;
};

const getRepeatingDaysObject = (weekDays) => {
  const repeatingDays = {};
  for (let day of weekDays) {
    repeatingDays[day] = Boolean(Math.round(Math.random()));
  }
  return repeatingDays;
};

const getTask = () => (
  {
    description: getRandomElementFromArray(DESCRIPTION_LINES),
    dueDate: new Date(getRandomInRange(weekBehindNow, weekAheadNow)),
    tags: getTagsSet(TAGS, MIN_TAGS_NUMBER, MAX_TAGS_NUMBER),
    repeatingDays: getRepeatingDaysObject(WEEK_DAYS),
    color: getRandomElementFromArray(COLORS),
    isFavorite: Boolean(Math.round(Math.random())),
    isArchive: Boolean(Math.round(Math.random())),
  }
);

const getTasksData = () => {
  for (let i = 0; i <= TASKS_COUNT; i++) {
    TASKS.push(getTask());
  }
};

getTasksData();

console.log(TASKS);
console.log(`okay`);

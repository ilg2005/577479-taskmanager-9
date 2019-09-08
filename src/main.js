import Menu from "./components/menu.js";
import SearchField from "./components/searchfield.js";
import Filters from "./components/filters.js";
import TaskboardContainer from "./components/taskboard-container.js";
import {TASKS} from "./components/data.js";
import NoTasks from "./components/no-tasks.js";
import TaskboardController from "./components/taskboard-controller.js";
import {utils} from "./components/utils.js";

const mainElement = document.querySelector(`.main`);
const menuContainerElement = document.querySelector(`.main__control`);

const menu = new Menu();
utils.render(menuContainerElement, menu.getElement(), `beforeend`);

const searchField = new SearchField();
utils.render(mainElement, searchField.getElement(), `beforeend`);

const filters = new Filters(TASKS);
utils.render(mainElement, filters.getElement(), `beforeend`);

if (TASKS.length === 0 || filters._filtersCounts.all === filters._filtersCounts.archive) {
  const noTask = new NoTasks();
  utils.render(mainElement, noTask.getElement(), `beforeend`);
} else {

  const taskBoardContainer = new TaskboardContainer();
  utils.render(mainElement, taskBoardContainer.getElement(), `beforeend`);


  const taskboardContainerElement = document.querySelector(`.board`);
  const tasksContainerElement = taskboardContainerElement.querySelector(`.board__tasks`);

  const boardController = new TaskboardController(taskboardContainerElement, tasksContainerElement, TASKS);
  boardController.init();

}

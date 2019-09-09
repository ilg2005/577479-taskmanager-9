import Menu from "./components/menu.js";
import SearchField from "./components/searchfield.js";
import Filters from "./components/filters.js";
import TaskboardContainer from "./components/taskboard-container.js";
import {TASKS} from "./components/data.js";
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

const taskBoardContainer = new TaskboardContainer();
utils.render(mainElement, taskBoardContainer.getElement(), `beforeend`);


const taskboardContainerElement = document.querySelector(`.board`);
const tasksContainerElement = taskboardContainerElement.querySelector(`.board__tasks`);

const boardController = new TaskboardController(taskboardContainerElement, tasksContainerElement, TASKS);
boardController.init();



import Menu from "./components/menu.js";
import SearchField from "./components/searchfield.js";
import Filters from "./components/filters.js";
import TaskboardContainer from "./components/taskboard-container.js";
import {TASKS} from "./components/data.js";
import TaskboardController from "./components/controllers/taskboard-controller.js";
import {utils} from "./components/utils.js";
import TaskAdd from "./components/card/card-wrapper";
import TaskAddController from "./components/controllers/task-add-controller";

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

const boardController = new TaskboardController(taskboardContainerElement, TASKS);
boardController.init();

const addNewTask = (addElement) => {
  const addNewTaskElementClickListener = () => {
    const newTaskDefault = new TaskAddController();
    const newCombinedCard = newTaskDefault._combineCard(taskboardContainerElement);
    /*utils.render(taskboardContainerElement, newTaskDefault.getElement(), `afterbegin`);*/
  };
  addElement.addEventListener(`click`, addNewTaskElementClickListener);
};

const addNewTaskElement = document.querySelector(`.control__label--new-task`);
addNewTask(addNewTaskElement);

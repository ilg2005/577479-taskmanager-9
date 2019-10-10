import Abstract from "./abstract";

export default class NoTasks extends Abstract {
  getTemplate() {
    return `<section class="board container">
        <p class="board__no-tasks">
          Congratulations, all tasks were completed! To create a new click on
          «add new task» button.
        </p>
      </section>`;
  }
}


import AbstractComponent from "./abstract-component";

export default class TaskboardContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="board container">
        
        <div class="board__tasks">
        </div>
    </section>`;
  }
}

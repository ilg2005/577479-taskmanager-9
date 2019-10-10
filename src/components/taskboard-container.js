import Abstract from "./abstract";

export default class TaskboardContainer extends Abstract {
  getTemplate() {
    return `<section class="board container">
        
        <div class="board__tasks">
        </div>
    </section>`;
  }
}

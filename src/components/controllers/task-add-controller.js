import Abstract from "../abstract";
import CardWrapper from "../card/card-wrapper";
import CardControl from "../card/card-control";

export default class TaskAddController extends Abstract {
  _combineCard(container) {
    const newCardWrapper = new CardWrapper();
    const renderedWrapper = newCardWrapper.render(container);
    console.log(renderedWrapper);



  }
}

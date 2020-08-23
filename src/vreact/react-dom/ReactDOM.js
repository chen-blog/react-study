
import { TAG_ROOT } from '../shared/ReactSymbols';
import scheduleRoot from "./scheduleRoot";
function render(element, contanier) {
  // contanier.innerHTML = `<pre>${JSON.stringify(vdom,null,2)}</pre>`;
  console.log(element);
  let rootFiber = {
    tag: TAG_ROOT,
    stateNode: contanier,
    props: {
      children: [element],
    },
  };
  scheduleRoot(rootFiber);
}

export default {
  render,
};

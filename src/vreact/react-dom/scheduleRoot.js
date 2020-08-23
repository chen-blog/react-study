import {
  TAG_ROOT,
  ELEMENT_TEXT,
  TAG_HOST,
  TAG_TEXT,
  PLACEMENT,
} from "../shared/ReactSymbols";

let nextUnitOfWork = null;
let workInProgressRoot = null;
function scheduleRoot(rootFiber) {
  workInProgressRoot = rootFiber;
  nextUnitOfWork = rootFiber;
}

function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);
    console.log("currentFiber", currentFiber.child);
    if (currentFiber.child) {
        return currentFiber.child;
    }

    while (currentFiber) {
        completeUnitOfWork(currentFiber); 
        if(currentFiber.sibling){
            return currentFiber.sibling;
        }
        currentFiber = currentFiber.return
    }

}

function completeUnitOfWork(currentFiber) {}
// 搜集子fiber
//创建真实DOM
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber);
    }else if (currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber);
    }else if(currentFiber.tag === TAG_HOST){
        updateHost(currentFiber);
    }
}

function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.text);
  } else if (currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type);
    return stateNode;
  }
}
//更新 Root
function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children;
  //调度子阶段
  reconcileChildren(currentFiber, newChildren);
}

//更新 Text 
function updateHostText(currentFiber) {
    if(!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);
    }
}
//更新 Dom
function updateHost(currentFiber) {
    if(!currentFiber.stateNode) {
      currentFiber.stateNode = createDOM(currentFiber);
    }
    let newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}

function reconcileChildren(currentFiber, newChildren) {
  let newChildrenIndex = 0;
  let prevSibling = null;
  while (newChildrenIndex < newChildren.length) {
    let newChild = newChildren[newChildrenIndex];
    let tag;

    if (newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT;
    } else if (typeof newChild.type === "string") {
      tag = TAG_HOST;
    }
    let newFiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      stateNode: null,
      return: currentFiber,
      effectTag: PLACEMENT,
    };
    // console.log("newFiber", newFiber);
    if (newFiber) {
      if (newChildrenIndex === 0) {
        currentFiber.child = newFiber;
      } else {
        prevSibling.sibling = newFiber;
      }
      prevSibling = newFiber;
    }
    newChildrenIndex++;
  }
}

function workLoop(deadline) {
  //是否要让出时间片控制权
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork) {
    console.log("render 结束");
  }
  requestIdleCallback(workLoop, { timeout: 500 });
}

requestIdleCallback(workLoop, { timeout: 500 });

export default scheduleRoot;

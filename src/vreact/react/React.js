import { ELEMENT_TEXT } from "../shared/ReactSymbols";

function createElement(type, props,...children) {
    console.log("createElement",type, props,children);
    delete props.__self;
    delete props.__source;
    return {
      type,
      props: {
        ...props,
        children: children.map(child=>{
          return typeof child === "object"
            ? child
            : {
                type: ELEMENT_TEXT,
                props: { text: child},
              };
        })
      },
    };
}

export default {
  createElement,
};
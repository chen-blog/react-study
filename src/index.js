// import React from 'react';
import React from './vreact/react/React';
import ReactDOM from "./vreact/react-dom/ReactDOM";

const ck =()=>{
  alert()
}
const jsx = <div className="app">
  <div id="box1" onClick={ck} >hello vreact<span>2222</span></div>
  <p>hi</p>
  <ul>
    <li className="li-1"></li>
    <li className="li-2"></li>
    <li className="li-3"></li>
    <li className="li-4"></li>
    <li className="li-5"></li>
  </ul>
</div>

ReactDOM.render(
  jsx,
  document.getElementById('root')
);


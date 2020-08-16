import React from './vreact/React';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const ck =()=>{
  alert()
}
const jsx = <div className="app">
  <div id="box1" onClick={ck} >hello vreact<span>2222</span></div>
  <p>hi</p>
</div>

ReactDOM.render(
  jsx,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

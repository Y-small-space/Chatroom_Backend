import React from "react";
import ReactDOM from "react-dom/client";
import Counter1 from "./component/Counter1";
import Counter2 from "./component/Counter2";
// import { Provider } from 'react-redux'
// import store from './store'; 

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <div>
      <Counter1 />
      <Counter2 />
    </div>
  );

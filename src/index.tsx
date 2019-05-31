import React from "react";
import ReactDOM from "react-dom";
import App from "./Game/App";
import * as serviceWorker from "./serviceWorker";
import jss from "jss";
import { ThemeProvider } from "react-jss";
import "react-app-polyfill/ie11";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Game/store";

const jsspreset = require("jss-preset-default");

jss.use(jsspreset);

const store = createStore(
  rootReducer,
  //@ts-ignore - for react devtools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={{}}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

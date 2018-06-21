import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from "redux-thunk";
import Main from "./main";
import rootReducer from "./rootreducer";
// import './styles/bootstrap.min.css';
// import './styles/app.css';

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

ReactDom.render(<Provider store={store}><Main /></Provider>, document.getElementById("container"));

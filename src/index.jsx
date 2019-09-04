import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import UserForm from "./components/UserForm";

const rootEl = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <div style={{ padding: 15 }}>
            <h2>Registration Form</h2>
            <UserForm />
        </div>
    </Provider>,
    rootEl
);

import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import UserForm from "./components/UserForm";
import 'bootstrap/dist/css/bootstrap.css';

const rootEl = document.getElementById("root");

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Fragment>
            <div className="col-md-6">
            <h2>Registration Form</h2>
                <UserForm />
                </div>
        </Fragment>
    </Provider>,
    rootEl
);

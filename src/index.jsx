import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Switch, Redirect, Route, BrowserRouter as Router, } from "react-router-dom";
//import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import UserForm from "./components/UserForm";
import OtherDetailsForm from "./components/OtherDetailsForm";
import Details from "./components/Details";
import FilePondEx from './components/FilePondEx';
import 'bootstrap/dist/css/bootstrap.css';

const rootEl = document.getElementById("root");

rootEl.style.position = 'relative';

const divStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-250px',
};

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Fragment>
            <div className="col-md-4" style={divStyle}>
                <h2>Registration Form</h2>
                <Router>
                    <Redirect from="/" exact to="/registration" />
                    <Route path="/registration" component={UserForm} />
                    <Route path="/otherDetails" component={OtherDetailsForm} />
                    <Route path="/details" component={Details} />
                    <Route path="/filePond" component={FilePondEx} />
                </Router>
                </div>
        </Fragment>
    </Provider>,
    rootEl
);

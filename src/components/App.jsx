import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserForm from './UserForm';

class App extends React.Component {
    static propTypes = {
        onMount: PropTypes.func.isRequired,
    }

    render() {
        return (
            <Switch>
                
                <Route path="/"  component={UserForm} />
            </Switch>
        );
    }
}

export default App;

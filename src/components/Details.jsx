import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

const selector = formValueSelector('userForm');


const Details = ({ zipCode, firstName, lastName, email, phone, city, state }) => (
        <React.Fragment>
            <div>
            <h3>Details</h3>
            
            <p> First Name: {firstName}</p>
            <p> Last Name: {lastName}</p>
            <p> Email Id: {email}</p>
            <p> Telephone: {phone}</p>
            <p> City: {city}</p>
            <p> State: {state}</p>
            <p> Country: USA</p>
            <p> Zipcode: {zipCode}</p>
            </div>
        </React.Fragment>
);

const mapStateToProps = state => ({
    zipCode: selector(state, 'zip'),
    firstName: selector(state, 'firstName'),
    lastName: selector(state, 'lastName'),
    email: selector(state, 'email'),
    phone: selector(state, 'phone'),
    city: selector(state, 'city'),
    state: selector(state, 'state'),
});


export default connect(mapStateToProps)(Details);

import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Table } from 'react-bootstrap';

const selector = formValueSelector('userForm');
const productDetailsSelector = formValueSelector('otherDetailsForm');


const Details = ({ zipCode, firstName, lastName, email, phone, city, state, customersList, purchasePrice, storeName, productType }) => (
        <React.Fragment>
             <div>
                <h3>Recently Submitted Details</h3>
            
                <p> First Name: {firstName}</p>
                <p> Last Name: {lastName}</p>
                <p> Email Id: {email}</p>
                <p> Telephone: {phone}</p>
                <p> City: {city}</p>
                <p> State: {state}</p>
                <p> Country: USA</p>
                <p> Zipcode: {zipCode}</p>
                <p> Product Type: {productType} </p>
                <p> Store Name: {storeName} </p>
                <p> Purchase Price: {purchasePrice} </p>
            </div>
            <div>
               <h3> All Submitted Details </h3>

                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Id</th>
                            <th>Product Type</th>
                            <th>Product Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {customersList && customersList.map((customer, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.product_type}</td>
                                <td>{customer.purchase_price}</td>
                            </tr>

                        ))}
                    </tbody>
                 </Table>
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
    productType: productDetailsSelector(state, 'productType'),
    storeName: productDetailsSelector(state, 'storeName'),
    purchasePrice: productDetailsSelector(state, 'purchasePrice'),
    customersList: state.user.registeredDetails,
});


export default connect(mapStateToProps)(Details);

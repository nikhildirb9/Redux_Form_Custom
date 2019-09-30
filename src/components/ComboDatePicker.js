/*
 * reactComboDatePicker v1.0.1
 * http://github.com/jfmdev/reactComboDatePicker
 * «Copyright 2016 Jose F. Maldonado»
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import moment from 'moment';

const getErrorMessage = (errorMessages, errorKey) => {
    const errorDescription = errorMessages[errorKey];
    return errorDescription || 'Error';
};
export default class ComboDatePicker extends React.Component {
    // ----- Main methods ----- //

    /**
     * Constructor function.
     */
    constructor(props) {
        super(props);
        this.state = {};

        // Save callback.
        this.changeCallback = props.input.onChange;

        // Initialize model.
        this.model = ComboDatePicker.parseDate(props.input.value);

        // Initialize attributes variables.
        this.attrsDate = props.attrsDate || {};
        this.attrsMonth = props.attrsMonth || {};
        this.attrsYear = props.attrsYear || {};

        // Initialize order.
        if (typeof props.order !== 'string') {
            this.order = 'dmy';
        } else {
            this.order = props.order.toLowerCase();
        }

        // Initialize minimal and maximum values.
        this.minDate = ComboDatePicker.parseDate(props.minDate);
        if (this.minDate == null) {
            const now = moment.utc();
            this.minDate = now.subtract(100, 'years');
        }
        this.maxDate = ComboDatePicker.parseDate(props.maxDate);
        if (this.maxDate == null) {
            this.maxDate = moment.utc();
        }

        // Verify if selected date is in the valid range.
        if (this.model != null && this.model < this.minDate) this.model = this.minDate;
        if (this.model != null && this.model > this.maxDate) this.model = this.maxDate;

        // Initialize place holders.
        this.placeHolders = [null, null, null];
        if (props.placeholder !== undefined && props.placeholder !== null && (typeof props.placeholder === 'string' || Array.isArray(props.placeholder))) {
            const holders = typeof props.placeholder === 'string' ? props.placeholder.split(',') : props.placeholder;
            if (holders.length == 3) { this.placeHolders = holders; }
        }

        // Initialize list of months names.
        this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (props.months !== undefined && props.months !== null) {
            if (typeof props.months === 'string') {
                const months = props.months.split(',');
                if (months.length == 12) this.monthNames = months;
            }
            if (Array.isArray(props.months) && props.months.length == 12) {
                this.monthNames = props.months;
            }
        }

        // Initialize list of years.
        this.yearList = [];
        for (let i = this.minDate.year(); i <= this.maxDate.year(); i++) {
            this.yearList.push({ value: i, name: i });
        }

        // Verify if the order of the years must be reversed.
        if (typeof props.yearOrder === 'string' && props.yearOrder.indexOf('des') == 0) {
            this.yearList.reverse();
        }

        // Invoke callback.
        if (this.changeCallback) {
            this.changeCallback(this.model);
        }
    }

    focusDefault1950 = () => {
        this._year.value = this._year.value || 1950;
        this.updateModel();
    }
    /**
     * Rendering function.
     *
     * @return {object} A React element.
     */
    render() {
        const {
            className, labelClassName, label, input: {
                name, value, onChange, onFocus, onBlur,
            },
            meta: { active, touched, error }, errorMessages, ...other
        } = this.props;

        // Generate list of days and months.
        const monthList = this.getMonthList();
        const dateList = this.getDateList();

        // Define child select elements.
        const selects = {
            d: (<ComboDatePicker.MySelect
                attrs={this.attrsDate}
                type="date"
                model={this.model}
                items={dateList}
                placeholder={this.placeHolders[2]}
                ref={c => this._date = c}
                onChange={this.updateModel.bind(this)}
            />),
            m: (<ComboDatePicker.MySelect
                attrs={this.attrsMonth}
                type="month"
                model={this.model}
                items={monthList}
                placeholder={this.placeHolders[1]}
                ref={c => this._month = c}
                onChange={this.updateModel.bind(this)}
            />),
            y: (<ComboDatePicker.MySelect
                // add onFocus event as to focus default to 1950 year.
                attrs={{ ...this.attrsYear, onFocus: _ => this.focusDefault1950(this) }}
                type="year"
                model={this.model}
                items={this.yearList}
                placeholder={this.placeHolders[0]}
                ref={c => this._year = c}
                onChange={this.updateModel.bind(this)}
            />),
        };

        // Return result.
        return (
            <div
                className={classNames(className)
                }
                name={name}
                onFocus={onFocus}
                onBlur={_ => onBlur(this.model)}
            >
                <div className={labelClassName}>{label}</div>
                {selects[this.order.charAt(0)]}
                {selects[this.order.charAt(1)]}
                {selects[this.order.charAt(2)]}
                {!active && touched && error && <div className="validation-error">{getErrorMessage(errorMessages, error)}</div>}
            </div>
        );
    }

    // ---- Misc methods ----- //

    /**
     * Get a list of valid dates to be picked according to the current selections of month and year.
     *
     * @return {array} An arrays of objects with the properties 'value' and 'name'.
     */
    getDateList() {
        // Start date is 1, unless the selected month and year matchs the minimum date.
        let start = 1;
        if (this.model != null && this.model.month() == this.minDate.month() && this.model.year() == this.minDate.year()) {
            start = this.minDate.date();
        }

        // End date is 30 or 31 (28 or 29 in February), unless the selected month and year matchs the maximum date.
        let end = this.model != null ? ComboDatePicker.maxDate(this.model.month() + 1, this.model.year()) : 31;
        if (this.model != null && this.model.month() == this.maxDate.month() && this.model.year() == this.maxDate.year()) {
            end = this.maxDate.date();
        }

        // Generate list.
        const dates = [];
        for (let i = start; i <= end; i++) {
            dates.push({ value: i, name: i });
        }
        return dates;
    }

    /**
     * Get a list of valid months to be picked according to the current selection of year.
     *
     * @return {array} An arrays of objects with the properties 'value' and 'name'.
     */
    getMonthList() {
        // Some months can not be choosed if the year matchs with the year of the minimum or maximum dates.
        const start = this.model != null && this.model.year() == this.minDate.year() ? this.minDate.month() : 0;
        const end = this.model != null && this.model.year() == this.maxDate.year() ? this.maxDate.month() : 11;

        // Generate list.
        const months = [];
        for (let i = start; i <= end; i++) {
            months.push({ value: i, name: this.monthNames[i] });
        }
        return months;
    }

    /**
     * Updates the model when one of the child components changes.
     */
    updateModel() {
        // Get combo boxes values.
        let date = this._date.getValue();
        const month = this._month.getValue();
        const year = this._year.getValue();

        // Verify all values are defined.
        if (ComboDatePicker.isValidValue(date) && ComboDatePicker.isValidValue(month) && ComboDatePicker.isValidValue(year)) {
            // Validate max day of month.
            const maxDate = ComboDatePicker.maxDate(month + 1, year);
            if (date > maxDate) { date = maxDate; }

            // Update model.
            this.model = moment.utc();
            this.model.year(year);
            this.model.month(month);
            this.model.date(date);

            // Validate min and max dates.
            if (this.model < this.minDate) this.model = this.minDate;
            if (this.model > this.maxDate) this.model = this.maxDate;
        } else {
            // Reset model.
            this.model = null;
        }

        // Hide or show days and months according to the min and max dates.
        this._date.setItems(this.getDateList());
        this._month.setItems(this.getMonthList());
        this._year.forceUpdate(); // Force update in order to remove/disable the placeholder.

        // Invoke callback.
        if (this.changeCallback) {
            this.changeCallback(this.model);
        }
    }

    /**
     * Gets the element's current value.
     *
     * @return {Date} A date.
     */
    getValue() {
        return this.model;
    }

    // ----- Static methods ----- //

    /**
     * Verifies if a option value is valid.
     *
     * @param {string} myValue The value to test.
     * @return {boolean} A boolean indicating if is valid or not.
     */
    static isValidValue(myValue) {
        return myValue !== undefined && myValue !== null && myValue !== '' && !isNaN(myValue);
    }

    /**
     * Function for parse a date.
     *
     * @param {string|number} myDate A string or a number representing a date.
     * @param {number} myTimezone A number indicating the timezone offset.
     * @return {Date} The parsed date.
     */
    static parseDate(myDate, myTimezone) {
        let res = null;
        if (myDate !== undefined && myDate !== null) {
            if (myDate instanceof Date) {
                res = myDate;
            } else if (typeof myDate === 'number' || typeof myDate === 'string') {
                // Parse date.
                // res = new Date(isNaN(myDate) ? myDate : parseInt(myDate, 10));
                res = moment.utc(myDate);
                // Adjust timezone.
                // res = this.adjustTimezone(res, 0);
            }
        }
        return res;
    }

    /**
     * Get the number of days of a month (in a particular year).
     *
     * @param {number} month The month's number.
     * @param {number} year The year
     * @return {number} The number of days of a month.
     */
    static maxDate(month, year) {
        let res = 31;
        if (month != null) {
            if (month == 4 || month == 6 || month == 9 || month == 11) {
                res = 30;
            }
            if (year != null && month == 2) {
                res = year % 4 == 0 && year % 100 != 0 ? 29 : 28;
            }
        }
        return res;
    }
}

ComboDatePicker.MySelect = class extends React.Component {
    /**
     * Constructor function.
     */
    constructor(props) {
        super(props);
        this.state = {};

        // Set list of items.
        this.state.items = props.items || [];

        // Set type and value.
        this.value = null;
        if (props.model) {
            if (props.type == 'd' || props.type == 'date') this.value = props.model.date();
            if (props.type == 'm' || props.type == 'month') this.value = props.model.month();
            if (props.type == 'y' || props.type == 'year') this.value = props.model.year();
        }
        this.type = props.type;

        // Set placeholder.
        this.placeholder = props.placeholder ? props.placeholder : null;

        // Set attributes.
        this.attributes = props.attrs || {};

        // Set callback.
        this.changeCallback = props.onChange;

        // Bind event listener.
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Rendering function.
     *
     * @return {object} A React element.
     */
    render() {
        // Verify min and max values.
        if (this.value && this.state.items) {
            // Get min and max values (which are at the extremes).
            let min = this.state.items[0].value;
            let max = this.state.items[this.state.items.length - 1].value;
            if (min > max) { const auxi = min; min = max; max = auxi; }

            // Compare value with max and min.
            if (this.value < min) this.value = min;
            if (this.value > max) this.value = max;
        }

        // Generate options.
        const options = [];
        for (let i = 0; i < this.state.items.length; i++) {
            options.push(<option
                key={i}
                value={this.state.items[i].value}
                selected={this.state.items[i].value == this.value}
            >
                {this.state.items[i].name}
            </option>);
        }

        // Add empty value if need.
        if (this.placeholder) {
            options.unshift(<option value="" {...this.value ? { disabled: true } : {}}>{this.placeholder}</option>);
        } else if (!this.value) { options.unshift(<option value="" />); }

        return (<Select
            {...this.attributes}
            clearable={false}
            searchable={false}
            value={this.value}
            onChange={this.handleChange}
            options={this.state.items.map(i => ({
                value: i.value,
                label: i.name,
            }))}
        />);
    }

    /**
     * Handles the onChange event from the element.
     *
     * @param {object} ev The event properties.
     */
    handleChange(option) {
        // Update value.
        this.value = parseInt(option.value, 10);

        // Invoke callback.
        if (this.changeCallback) {
            this.changeCallback(this);
        }
    }

    /**
     * Gets the element's current value.
     *
     * @return {number} The current selected value.
     */
    getValue() {
        return this.value;
    }

    /**
     * Update the list of items.
     *
     * @param {array} items A list of items.
     */
    setItems(items) {
        this.setState({ items });
    }
};

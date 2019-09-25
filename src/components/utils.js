import validator from 'validator';
import accounting from 'accounting';

export const requiredError = "Please Enter Required Filed";

export const required = (value) => {
    if (value === undefined || value === '' || value === null) {
        return 'required';
    }
    return undefined;
};

export const email = value =>
    (value && !validator.isEmail(value)
        ? 'invalid'
        : undefined);

export const validUSZipCode = value =>
    (value && !validator.isPostalCode(value, 'US')
        ? 'invalid' : undefined);

export const minLength = min => value =>
    (value && value.length < min ? 'invalid' : undefined);

export const minLength12 = minLength(12);

export const normalizePhone = (value) => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) {
        return onlyNums;
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
        6,
        10,
    )}`;
};

export const formatCurrency = (value, precision) => accounting.formatMoney(value, {
    symbol: '$',
    precision: precision || 0,
});

export const normalizeAmount = (value) => {
    return value.replace(/,/g, '');
}


export const stateList =
    [
        {
            label: 'Alabama',
            value: 'AL',
        },
        {
            label: 'Alaska',
            value: 'AK',
        },
        {
            label: 'Arizona',
            value: 'AZ',
        },
        {
            label: 'Arkansas',
            value: 'AR',
        },
        {
            label: 'California',
            value: 'CA',
        },
        {
            label: 'Colorado',
            value: 'CO',
        },
        {
            label: 'Connecticut',
            value: 'CT',
        },
        {
            label: 'Delaware',
            value: 'DE',
        },
        {
            label: 'Florida',
            value: 'FL',
        },
        {
            label: 'Georgia',
            value: 'GA',
        },
        {
            label: 'Hawaii',
            value: 'HI',
        },
        {
            label: 'Idaho',
            value: 'ID',
        },
        {
            label: 'Illinois',
            value: 'IL',
        },
        {
            label: 'Indiana',
            value: 'IN',
        },
        {
            label: 'Iowa',
            value: 'IA',
        },
        {
            label: 'Kansas',
            value: 'KS',
        },
        {
            label: 'Kentucky',
            value: 'KY',
        },
        {
            label: 'Louisiana',
            value: 'LA',
        },
        {
            label: 'Maine',
            value: 'ME',
        },
        {
            label: 'Maryland',
            value: 'MD',
        },
        {
            label: 'Massachusetts',
            value: 'MA',
        },
        {
            label: 'Michigan',
            value: 'MI',
        },
        {
            label: 'Minnesota',
            value: 'MN',
        },
        {
            label: 'Mississippi',
            value: 'MS',
        },
        {
            label: 'Missouri',
            value: 'MO',
        },
        {
            label: 'Montana',
            value: 'MT',
        },
        {
            label: 'Nebraska',
            value: 'NE',
        },
        {
            label: 'Nevada',
            value: 'NV',
        },
        {
            label: 'New Hampshire',
            value: 'NH',
        },
        {
            label: 'New Jersey',
            value: 'NJ',
        },
        {
            label: 'New Mexico',
            value: 'NM',
        },
        {
            label: 'New York',
            value: 'NY',
        },
        {
            label: 'North Carolina',
            value: 'NC',
        },
        {
            label: 'North Dakota',
            value: 'ND',
        },
        {
            label: 'Ohio',
            value: 'OH',
        },
        {
            label: 'Oklahoma',
            value: 'OK',
        },
        {
            label: 'Oregon',
            value: 'OR',
        },
        {
            label: 'Pennsylvania',
            value: 'PA',
        },
        {
            label: 'Rhode Island',
            value: 'RI',
        },
        {
            label: 'South Carolina',
            value: 'SC',
        },
        {
            label: 'South Dakota',
            value: 'SD',
        },
        {
            label: 'Tennessee',
            value: 'TN',
        },
        {
            label: 'Texas',
            value: 'TX',
        },
        {
            label: 'Utah',
            value: 'UT',
        },
        {
            label: 'Vermont',
            value: 'VT',
        },
        {
            label: 'Virginia',
            value: 'VA',
        },
        {
            label: 'Washington',
            value: 'WA',
        },
        {
            label: 'West Virginia',
            value: 'WV',
        },
        {
            label: 'Wisconsin',
            value: 'WI',
        },
        {
            label: 'Wyoming',
            value: 'WY',
        }
    ];

export const productList = [
    {
        label: 'Mattress',
        value: 'Mattress',
    },
    {
        label: 'Foundation',
        value: 'Foundation',
    },
    {
        label: 'Item',
        value: 'Item',
    }
];

export const productSizes = [
        {
            label: 'Twin',
            value: 'Twin',
        },
        {
            label: 'Double/Full',
            value: 'Double/Full',
        },
        {
            label: 'Queen',
            value: 'Queen',
        },
        {
            label: 'King',
            value: 'King',
        },
        {
            label: 'Twin Long/ Twin XL',
            value: 'Twin Long / Twin XL',
        },
        {
            label: 'Double Long/ Full XL',
            value: 'Double Long/ Full XL',
        },
        {
            label: 'Split Queen',
            value: 'Split Queen',
        },
        {
            label: 'CA King',
            value: 'CA King',
        },
        {
            label: 'Split CA King/ CA Twin',
            value: 'Split CA King/ CA Twin',
        },
        {
            label: 'Other',
            value: 'Other',
        }
];
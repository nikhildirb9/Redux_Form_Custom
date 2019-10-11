const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: './bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                    plugins: [
                        'es6-promise',
                        'transform-object-rest-spread',
                        'transform-class-properties',
                    ],
                },
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            _domainUrl_: JSON.stringify('https://localhost:3000'),
        }),
    ],
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.tsx',
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@commonStyles': path.resolve(__dirname, 'src', 'commonStyles'),
            '@components': path.resolve(__dirname, 'src', 'components'),
            '@models': path.resolve(__dirname, 'src', 'models'),
            '@services': path.resolve(__dirname, 'src', 'services'),
            '@utils': path.resolve(__dirname, 'src', 'utils'),
            '@assets': path.resolve(__dirname, 'src', 'assets'),
            '@redux': path.resolve(__dirname, 'src', 'redux'),
            '@ammojs': path.resolve(__dirname, 'src', 'ammojs'),
        }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { // tsx code
                exclude: [
                    /node_modules/,
                ],
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-typescript'],
                            ['@babel/preset-env'],
                            ['@babel/preset-react']
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    }
                }
            },
            { // scss
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            { // fonts
                test: /\.woff2?$/,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: path.join('public', 'favicon.ico')},
            ],
        }),
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'build'),
        publicPath: '/',
        hot: true,
        historyApiFallback: true,
    }
}

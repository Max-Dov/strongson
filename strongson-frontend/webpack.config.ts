import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyPlugin from 'copy-webpack-plugin';
import 'webpack-dev-server';
const portFinderSync = require('portfinder-sync');

const PORT = 3002;

const config: webpack.Configuration = {
    mode: 'development',
    stats: 'errors-warnings',
    infrastructureLogging: {level: 'warn'},
    entry: './src/main.tsx',
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@commonStyles': path.resolve(__dirname, 'src', 'commonStyles'),
            '@components': path.resolve(__dirname, 'src', 'components'),
            '@models': path.resolve(__dirname, 'src', 'models'),
            '@constants': path.resolve(__dirname, 'src', 'constants'),
            '@services': path.resolve(__dirname, 'src', 'services'),
            '@utils': path.resolve(__dirname, 'src', 'utils'),
            '@redux': path.resolve(__dirname, 'src', 'redux'),
        },
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
                            ['@babel/preset-react'],
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            { // scss
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'sass-loader',
                ],
            },
            { // fonts
                test: /\.woff2?$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {from: path.join('public', 'favicon.ico')},
                {from: path.join('public', 'assets', 'city-lvl-1')},
                {from: path.join('public', 'assets', 'forest')},
                {from: path.join('public', 'assets', 'hills')},
                {from: path.join('public', 'assets', 'grassland')},
                {from: path.join('public', 'assets', 'shore-water')},
                {from: path.join('public', 'assets', 'mountains')},
            ],
        }),
    ],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        /**
         * If you are using LAN cable instead of Wi-Fi connection, you might want to switch to Wi-Fi if you want
         * Strongson app to be accessible on other devices.
         */
        host: 'local-ip',
        // host: '192.168.100.xx', // Wi-Fi IPV4 override in case you use both Wi-Fi + LAN.
        port: portFinderSync.getPort(PORT),
        open: true,
        https: false,
        allowedHosts: 'all',
        hot: true,
        historyApiFallback: true,
        setupMiddlewares: function (middlewares, devServer) {
            console.log('\n');
            console.log('Strongson Frontend');
            console.log('Project is running on your local network at:');
            console.log(`http://${devServer.options.host}:${devServer.options.port}`);
            console.log(`Check served assets:`);
            console.log(`http://${devServer.options.host}:${devServer.options.port}/webpack-dev-server`);
            console.log('\n');

            return middlewares;
        },
    },
};

export default config;
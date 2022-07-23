import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';
const portFinderSync = require('portfinder-sync');

const PORT = 3003;

const config: webpack.Configuration = {
    mode: 'development',
    stats: 'errors-warnings',
    infrastructureLogging: {level: 'warn'},
    entry: './src/index.tsx',
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@commonStyles': path.resolve(__dirname, 'src', 'commonStyles'),
            '@components': path.resolve(__dirname, 'src', 'components'),
            '@models': path.resolve(__dirname, 'src', 'models'),
            '@constants': path.resolve(__dirname, 'src', 'constants'),
            '@shared': path.resolve(__dirname, 'src', 'shared'),
            '@services': path.resolve(__dirname, 'src', 'services'),
            '@features': path.resolve(__dirname, 'src', 'features'),
            '@utils': path.resolve(__dirname, 'src', 'utils'),
            '@redux': path.resolve(__dirname, 'src', 'redux'),
            '@contexts': path.resolve(__dirname, 'src', 'contexts'),
            '@svgs': path.resolve(__dirname, 'src', 'svgs'),
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
            console.log('Strongson Config Editor');
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
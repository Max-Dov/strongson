import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    mode: 'development',
    target: 'node',
    entry: './src/main.ts',
    watch: true,
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@constants': path.resolve(__dirname, 'src', 'constants'),
            '@models': path.resolve(__dirname, 'src', 'models'),
            '@utils': path.resolve(__dirname, 'src', 'utils'),
        }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                exclude: [
                    /node_modules/,
                ],
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                test: /\.ts$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-typescript'],
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            // "@babel/plugin-transform-runtime" - TODO enable if having issues with async handlers
                        ],
                    }
                }
            }
        ]
    },
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    externals: [
        {
            'utf-8-validate': 'commonjs utf-8-validate',
            bufferutil: 'commonjs bufferutil',
        },
    ],
}

export default config;
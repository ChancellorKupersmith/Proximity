const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");
const path = require('path');
module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, '/Frontend/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist/build'),
        filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Development',
        template: 'index.html'
      }),
      new webpack.ProvidePlugin({
        $: require.resolve('jquery'),
        jQuery: require.resolve('jquery')
    }),
    ],
    resolve: {
      extensions: [".js"],
      modules: ['node_modules']
    },
    devServer: {
      // TODO: Find out what purpose this option is for
      static: {
        directory: './',
      },
      port: 8080,
      hot: true,
      // proxy: {
      //   '/api': 'http://localhost:3000',
      // },
    },
    module: {
      rules: [
        {
        test: /.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            // Order Matters! Loads presets from end to beginning of array
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', {"runtime": "automatic"}]
            ]
          } 
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
    }
}
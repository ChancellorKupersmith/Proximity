const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      })
    ],
    resolve: {
      extensions: [".js"]
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ]
    }
}
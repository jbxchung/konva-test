const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rawParams = process.argv.slice(2);
const cliParams = {};
for (let i = 0; i < rawParams.length - 1; i += 2) {
  const argName = rawParams[i].replace(/-/g, '');
  cliParams[argName] = rawParams[i + 1];
}

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.bundle.js'
  },
  mode: cliParams.mode || 'development',
  resolve: {
      extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(webp|jpg|jpeg|png|gif|mp3|svg)$/,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      // favicon: path.join(__dirname, 'src', 'favicon.ico'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    // allowedHosts: 'konva.jbxchung.dev',
    static: {
      publicPath: '/'
    }
  },
  devtool: 'source-map',
};
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const merge = require("webpack-merge");
const prodConfig = require("./webpack.pro");
const devConfig = require("./webpack.dev");
const commonConfig = {
  entry: {
    index: "./src/index.jsx"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "首页",
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html"
    }),
    new CleanWebpackPlugin()
  ]
};
module.exports = env => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};

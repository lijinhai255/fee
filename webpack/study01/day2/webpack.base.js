const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js"
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

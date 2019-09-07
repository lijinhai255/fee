const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");

const baseConfig = require("./webpack.base");

const devConfig = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].png",
            outputPath: "images/",
            limit: 2048
          }
        }
      },
      {
        test: /\.(woff2|woff)$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    port: 8081,
    contentBase: "./dist",
    open: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
    }
  },
  optimization: {
    //帮我们自动做代码分割
    splitChunks: {
      //async | initial | all
      chunks: "all", //默认是支持异步，我们使用all
      minSize: 30000,
      minChunks: 1,
      automaticNameDelimiter: "_",
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: "react_vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
module.exports = devConfig;
// module.exports = merge(baseConfig, devConfig);

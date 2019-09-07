const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");

const baseConfig = require("./webpack.base");

const proConfig = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]_[chunkhash:8].js"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        // use: "url-loader",
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
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  devtool: "none",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    })
  ]
};
module.exports = proConfig;

// module.exports = merge(baseConfig, proConfig);

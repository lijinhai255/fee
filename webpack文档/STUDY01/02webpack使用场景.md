# Hot Module Replacement (HMR:热模块替换)

> 启动hmr
```javaScript
devServer: {
 contentBase: "./dist",
 open: true,
 hot:true,
 //即便HMR不⽣效，浏览器也不⾃动刷新，就开启hotOnly
 hotOnly:true
 },
```

> 1 配置⽂件头部引⼊webpack
````javaScript
//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const CleanWebpackPlugin = require("clean-webpackplugin");
const webpack = require("webpack");
````
> 2 在插件配置处添加：

````javaScript
plugins: [
new CleanWebpackPlugin(),
new HtmlWebpackPlugin({
template: "src/index.html"
 }),
new webpack.HotModuleReplacementPlugin()
 ],
````

> 案例

````javaScript
import "./css/index.css";
var btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);
btn.onclick = function() {
var div = document.createElement("div");
div.innerHTML = "item";
document.body.appendChild(div);
};
//index.css
div:nth-of-type(odd) {
background: yellow; }
````

> 注意启动HMR后，css抽离会不⽣效，还有不⽀持contenthash，chunkhash
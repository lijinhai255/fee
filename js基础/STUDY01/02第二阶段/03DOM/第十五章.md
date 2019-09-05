# 第十五章 DOM



## 课前准备

- 工具
  - 编辑器 VSCode
  - 浏览器 Chorme
- 前置知识
  - ES6基础语法

## 课堂主题

学习DOM及基本操作

## 课堂目标

掌握DOM操作各种方法

## 知识点

- DOM关系
  
  - childNodes 子节点
  - children 子元素 
  - firstChild 第0个子节点
  - firstElementChild 第0个子元素
  - lastChild 最后一个子节点
  - lastElementChild 最后一个子元素
  - nextSibling 下一个兄弟节点
  - nextElementSibling 下一个兄弟元素
  - previousSibling 上一个兄弟节点
  - previousElementSibling 上一个兄弟元素
  - parentNode 父节点
  - offsetParent 定位父级
  
- DOM节点操作

  ### 创建节点

  语法：element document.createElement("tagName"); 创建一个节点
  参数：tagName 标签名称
  返回值：创建好的节点

  ### 向页面中添加节点

  - el.appendChild(node)  在元素的末尾添加一个子级
  - el.insertBefore(newNode,oldNode) 在 oldNode 前边添加入 newNode 
  - 在使用 appendChild 和 insertBefore时，如果添加是一个页面上已经存在的节点，会先从原位置删除，然后在添加到新的位置去。

  ### 替换节点

  - parent.replaceChild(newNode,oldNode) 替换子元素

  ### 删除节点

  - el parent.removeChild(el) 删除掉某个子元素
  - node.remove();

  ### 克隆节点

  - node.cloneNode(deep) 
    - deep: 默认为false
    - deep 为 true, 克隆元素及属性，以及元素的内容和后代
    - deep 为 false, 只克隆元素本身，及它的属性

## 课堂案例

- 案例：动态文件夹创建
- 案例：学生管理系统（含上移下移）

## 扩展点

​	案例：无限级下拉菜单（递归实现）

## 总结

1. DOM 的节点关系
2. DOM 的节点操作



## 下节课预告

BOM

window/location

hash路由实现




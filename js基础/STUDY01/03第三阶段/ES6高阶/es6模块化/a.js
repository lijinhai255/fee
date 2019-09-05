let name = "zhangsan";
console.log("a模块...");
// export default name;   //每个文件只能导出一个 ；
// export default name;
export let a = 10;  //导出多个；
export let b = 20;
// 导出；
let d = 30;
export {name as default};  //export default name; 
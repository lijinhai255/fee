# JS二期第二次测试（定时器&日期对象&数组字符串方法）

1. 下面结果为（）

   ```
   var a = 10;
   setTimeout(function(){
       a = 20;
   },50);
   console.log(a);
   A:10  B:20
   答案:（a）
   ```

2. 下面结果i是多少？（）

   ```
   for(var i = 0; i < 5; i++) {
        setTimeout(function(i) {
            return function() {
                console.log(i);
            };
        }(i), i * 1000);
   }
   A.0,1,2,3,4   B.5,5,5,5,5  C. 5  D. 1
   答案：（A）
   ```

3. 以下代码的执行结果是

   ```
   for(var i=0;i<5;++i){
       setTimeout(function(){
           console.log(i);
       },100);
   }
   
   A. 5 5 5 5 5
   B. 0 0 0 0 0
   C. 0 1 2 3 4
   D. 1 2 3 4 5
   
   答案：A
   ```

4. 下面关于数组的描述正确的是：（）

   ```
   A:数组的 length 既可以获取，也可以修改。
   B:调用 pop() 方法，不会修改原数组中的值。
   C:shift() 方法的返回值是新数组的长度。
   D:调用 concat() 方法，会修改原数组的值。
   答案：（A）
   ```

5. 以下代码运行后，arr的结果为：（）arr2的结果为：（） 

   ```
   var arr = [1,2]; 
   var arr2 = arr.concat(); 
   arr2.push( arr.splice(1,0) );
   A:[1,2]     
   B:[1,2,[2]]
   C:[1,2,[]]  
   D:[1,2,3]
   答案：（A,C）
   ```

6. var n = "miao wei ke tang".indexOf("wei",6)；n的值为：（）

   ```
   A:-1
   B：5
   C：程序报错
   D：-10
   答案：（A）
   ```

7. [1,2,3,4].join('0').split('') 的执行结果是（）

   ```
   A：'1,2,3,4'
   B：[1,2,3,4]  
   C：['1','0','2','0','3','0','4']
   D： '1,0,2,0,3,0,4'
   答案：（C）
   ```

8. 如何删除给定数组中的第二项和第三项(从第0项开始)，并且在得到的新的数组中第二项后面添加一个新的值为2 ？

   ```
   var arr1 = ['a','b','c','d','e']; 
   var arr2 = arr1.splice(?,?,?);
   
   A. 1,1,2
   B. 2,1,2
   C. 2,2,2
   D. 1,2,2
   
   答案：C
   ```

9. 以下代码执行后， arr 的值是：（）

   ```
   var arr=[{a:1},{}];
   arr.forEach(function(item,idx){
       item.b=idx;
   });
   
   A. [{a:1},{}]
   B. [{a:1,b:0},{b:1}]
   C. [{a:1,b:1},{b:1}]
   D. [{a:!,b:0},{b:0}]
   
   答案：B
   ```

10. js数组的方法中，哪些方法不能改变自身数组？（）

    ```
    A. pop
    B. splice
    C. sort
    D. concat
    
    答案：D
    ```

    




(function(root){
    var jQuery = function(){
        return new jQuery.prototype.init();//享有jQuery原型对象
    }
    jQuery.prototype ={
        init:function(){

        },
        css:function(){}
    }
    //
    //共享原型对象
    //jQuery的原型对象的init方法上的原型 = jQuery的原型
    jQuery.prototype.init.prototype = jQuery.prototype;
    root.$ = root.jQuery = jQuery;
})(this);
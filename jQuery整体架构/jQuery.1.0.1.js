(function(root){
    var jQuery = function(){
        return new jQuery.prototype.init();
    }
    jQuery.prototype ={
        init:function(){

        }
    }
    //共享原型对象
    //jQuery的原型对象的init方法上的原型 = jQuery的原型
    jQuery.prototype.init.prototype = jQuery.prototype;
    root.$ = root.jQuery = jQuery;
})(this);
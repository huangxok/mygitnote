//该js文件用于获取值的类属性和类型
//get_get_classof方法可以准确获取任何一个值的类型
/*
  get_classof(null);        =>"Null"          	            get_typeof(null)    	=>"object"
  get_classof(1);		    =>"Number"			            get_typeof(1)		    =>"number"
  get_classof("");		    =>"String"			            get_typeof("")		    =>"string"
  get_classof([]);		    =>"Array			            get_typeof([])		    =>"object""
  get_classof({});		    =>"Object"			            get_typeof({})		    =>"object"
  get_classof(false);       =>"Boolean"			            get_typeof(false)		=>"boolean"
  get_classof(/./);		    =>"Regexp"			            get_typeof(/./)     	=>"object"
  get_classof(new Date());	=>"Date"			            get_typeof(new Date())	=>"object"
  get_classof(window);	    =>"global"window 客户端宿主对象	get_typeof(window)		=>"object"
  function f(){};		//定义一个构造函数
  get_classof(new f());	=>"Object"			                get_typeof(new f())		=>"object"
  get_classof(f)              =>"Function"			        get_typeof(f)		    =>"function"
*/
//获取class 类属性
; function get_classof(o) {
    if (arguments.length > 1)
        throw Error("the parameter's length is expected one")
    if (o === null) { return "Null" };
    if (o === undefined) { return "Undefined" }
    return Object.prototype.toString.call(o).slice(8, -1)
}
//获取类型
; function get_typeof(o) {
    if (arguments.length > 1)
        throw Error("the parameter's length is expected on")
    return typeof o
}
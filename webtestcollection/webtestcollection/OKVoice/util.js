/**
 * 进入应用是判断，如果已登录，再次执行登录过程
 */
function isLogin(){
    var userId = localStorage.getItem("userId");
    var userName = localStorage.getItem("userName");
    var password = localStorage.getItem("password");
    if(userId && userName && password){
        mui.ajax('http://www.junsaozg.com/member/api_login.php',{
            data:{
                username: userName,
                password: password
            },
            dataType:'json',//服务器返回json格式数据
            type:'post',//HTTP请求类型
            success:function(data){
                if(+data.status == 0){
                    console.log("登录成功*********"+JSON.stringify(data));
                    if(data.script){
                        var result = data.script.split("src");
                        var len = result.length;
                        
                        for(var i=1; i<len; i++){
                          var script = document.createElement("script");
                          var temp = result[i];
                          temp = temp.split('="')[1];
                          temp = temp.split('"')[0];
                          script.setAttribute("src", temp);
                          document.getElementsByTagName("body")[0].appendChild(script);
                        }
                    }
                }else{
                    plus.ui.toast(errTranslate(+data.status));
                }
            },
            error: function(){
                plus.ui.toast("登录失败，网络错误");
            }
        });
    }
}
/**
 * 处理错误代码
 * 参数为数字
 * @param {Object} errCode
 */
function errTranslate(errCode) {
    var str = "";
    if(!+errCode){
        return "参数错误";
    }
    switch (+errCode) {
        case 1:
            {
                str = "用户名不存在";
                break;
            }
        case 2:
            {
                str = "用户名或密码错误";
                break;
            }
        case 3:
            {
                str = "验证码错误";
                break;
            }
        case 4:
            {
                str = "用户名不能为空";
                break;
            }
        case 5:
            {
                str = "昵称不能为空";
                break;
            }    
        case 6:
            {
                str = "密码不能为空";
                break;
            }    
        case 7:
            {
                str = "手机号码不能为空";
                break;
            }
        case 8:
            {
                str = "手机验证码不能为空";
                break;
            }
        case 9:
            {
                str = "用户名已存在";
                break;
            }
        default:
            {
                str = "网络错误，请重试";
            }
    }
    return str;
}
/**
 * 日期选择
 * @param {Object} id input 的 id
 * 参照例子 personalInformation_list.html
 */
function pickDate(id){
    var obj = document.getElementById(id);
    obj.addEventListener('tap', function() {
        var optionsJson = this.getAttribute('data-options') || '{}';
        var options = JSON.parse(optionsJson);
        var id = this.getAttribute('id');
        /*
         * 首次显示时实例化组件
         * 示例为了简洁，将 options 放在了按钮的 dom 上
         * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
         */
        var picker = new mui.DtPicker(options);
        picker.show(function(rs) {
            obj.value = rs.text;
            picker.dispose();
        });
    }, false);
}

var Base64 = {  
    // 转码表  
    table : [  
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',  
            'I', 'J', 'K', 'L', 'M', 'N', 'O' ,'P',  
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',  
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',  
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',  
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',  
            'w', 'x', 'y', 'z', '0', '1', '2', '3',  
            '4', '5', '6', '7', '8', '9', '+', '/' 
    ],  
    UTF16ToUTF8 : function(str) {  
        var res = [], len = str.length;  
        for (var i = 0; i < len; i++) {  
            var code = str.charCodeAt(i);  
            if (code > 0x0000 && code <= 0x007F) {  
                // 单字节，这里并不考虑0x0000，因为它是空字节  
                // U+00000000 – U+0000007F  0xxxxxxx  
                res.push(str.charAt(i));  
            } else if (code >= 0x0080 && code <= 0x07FF) {  
                // 双字节  
                // U+00000080 – U+000007FF  110xxxxx 10xxxxxx  
                // 110xxxxx  
                var byte1 = 0xC0 | ((code >> 6) & 0x1F);  
                // 10xxxxxx  
                var byte2 = 0x80 | (code & 0x3F);  
                res.push(  
                    String.fromCharCode(byte1),   
                    String.fromCharCode(byte2)  
                );  
            } else if (code >= 0x0800 && code <= 0xFFFF) {  
                // 三字节  
                // U+00000800 – U+0000FFFF  1110xxxx 10xxxxxx 10xxxxxx  
                // 1110xxxx  
                var byte1 = 0xE0 | ((code >> 12) & 0x0F);  
                // 10xxxxxx  
                var byte2 = 0x80 | ((code >> 6) & 0x3F);  
                // 10xxxxxx  
                var byte3 = 0x80 | (code & 0x3F);  
                res.push(  
                    String.fromCharCode(byte1),   
                    String.fromCharCode(byte2),   
                    String.fromCharCode(byte3)  
                );  
            } else if (code >= 0x00010000 && code <= 0x001FFFFF) {  
                // 四字节  
                // U+00010000 – U+001FFFFF  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx  
            } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {  
                // 五字节  
                // U+00200000 – U+03FFFFFF  111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
            } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {  
                // 六字节  
                // U+04000000 – U+7FFFFFFF  1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
            }  
        }  
 
        return res.join('');  
    },  
    UTF8ToUTF16 : function(str) {  
        var res = [], len = str.length;  
        var i = 0;  
        for (var i = 0; i < len; i++) {  
            var code = str.charCodeAt(i);  
            // 对第一个字节进行判断  
            if (((code >> 7) & 0xFF) == 0x0) {  
                // 单字节  
                // 0xxxxxxx  
                res.push(str.charAt(i));  
            } else if (((code >> 5) & 0xFF) == 0x6) {  
                // 双字节  
                // 110xxxxx 10xxxxxx  
                var code2 = str.charCodeAt(++i);  
                var byte1 = (code & 0x1F) << 6;  
                var byte2 = code2 & 0x3F;  
                var utf16 = byte1 | byte2;  
                res.push(Sting.fromCharCode(utf16));  
            } else if (((code >> 4) & 0xFF) == 0xE) {  
                // 三字节  
                // 1110xxxx 10xxxxxx 10xxxxxx  
                var code2 = str.charCodeAt(++i);  
                var code3 = str.charCodeAt(++i);  
                var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);  
                var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);  
                utf16 = ((byte1 & 0x00FF) << 8) | byte2  
                res.push(String.fromCharCode(utf16));  
            } else if (((code >> 3) & 0xFF) == 0x1E) {  
                // 四字节  
                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx  
            } else if (((code >> 2) & 0xFF) == 0x3E) {  
                // 五字节  
                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
            } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {  
                // 六字节  
                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx  
            }  
        }  
 
        return res.join('');  
    },  
    encode : function(str) {  
        if (!str) {  
            return '';  
        }  
        var utf8    = this.UTF16ToUTF8(str); // 转成UTF8  
        var i = 0; // 遍历索引  
        var len = utf8.length;  
        var res = [];  
        while (i < len) {  
            var c1 = utf8.charCodeAt(i++) & 0xFF;  
            res.push(this.table[c1 >> 2]);  
            // 需要补2个=  
            if (i == len) {  
                res.push(this.table[(c1 & 0x3) << 4]);  
                res.push('==');  
                break;  
            }  
            var c2 = utf8.charCodeAt(i++);  
            // 需要补1个=  
            if (i == len) {  
                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);  
                res.push(this.table[(c2 & 0x0F) << 2]);  
                res.push('=');  
                break;  
            }  
            var c3 = utf8.charCodeAt(i++);  
            res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);  
            res.push(this.table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);  
            res.push(this.table[c3 & 0x3F]);  
        }  
 
        return res.join('');  
    },  
    decode : function(str) {  
        if (!str) {  
            return '';  
        }  
 
        var len = str.length;  
        var i   = 0;  
        var res = [];  
 
        while (i < len) {  
            code1 = this.table.indexOf(str.charAt(i++));  
            code2 = this.table.indexOf(str.charAt(i++));  
            code3 = this.table.indexOf(str.charAt(i++));  
            code4 = this.table.indexOf(str.charAt(i++));  
 
            c1 = (code1 << 2) | (code2 >> 4);  
            c2 = ((code2 & 0xF) << 4) | (code3 >> 2);  
            c3 = ((code3 & 0x3) << 6) | code4;  
 
            res.push(String.fromCharCode(c1));  
 
            if (code3 != 64) {  
                res.push(String.fromCharCode(c2));  
            }  
            if (code4 != 64) {  
                res.push(String.fromCharCode(c3));  
            }  
 
        }  
 
        return this.UTF8ToUTF16(res.join(''));  
    }  
}; 

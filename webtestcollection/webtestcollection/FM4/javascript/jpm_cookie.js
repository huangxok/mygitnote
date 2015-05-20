$(function(){
	var CookieName = "FMplayRecord";//cookie键名//2015_4_20
	//DelCookie();//删除用//2015_4_20
	putCookie();//检测当前cookie，如没有添加“FMplayRecord=1@0,1@0,1@0”//2015_4_20
	outFMCookie();//刷cookie到页面//2015_4_20
	
/////////FMcookie部分开始原生JS///////////
	
	//查找"name"返回值//2015_4_20
	function findCookie(name){
		if(document.cookie.length>0){
			var oldCookie = document.cookie;
			var cookieArr = oldCookie.split("; ");
			var cookieTempArr,selectTemp;
			
			for(var i=0;i<cookieArr.length;i++){
				cookieTempArr = cookieArr[i].split("=");
				if(cookieTempArr[0]==name){
					return cookieTempArr[1];
					break;
				}
			}
			return false;
		}
		return false;
		//没有cookie返回“undefined”
	}

	//取得cookie 解析 赋值//2015_4_20
	function outFMCookie(){
		var CookieValue = findCookie(CookieName);
		
		if(CookieValue){
			var ValueArray = CookieValue.split(",");
			var ValueTempArray = new Array;
			var selectTemp,mathTemp;
			for(var i=0;i<ValueArray.length;i++){
				ValueTempArray = ValueArray[i].split("@");
				selectTemp = document.querySelectorAll("#playRecord_list .playRecord_num");
				selectTemp[i].innerHTML = ValueTempArray[0];
				mathTemp = Math.floor(ValueTempArray[1]/60);
				selectTemp = document.querySelectorAll("#playRecord_list .playRecord_min");
				selectTemp[i].innerHTML = mathTemp;
				mathTemp = Math.floor(ValueTempArray[1]%60);
				selectTemp = document.querySelectorAll("#playRecord_list .playRecord_sec");
				selectTemp[i].innerHTML = mathTemp;
			}
		}else{
			//alert("cookie出错")//无记录
		}
	}
	
	//存入cookie部分	
	function inFMCookie(timed){
		var audioNum = document.getElementById('theAudio').dataset.num;//单签audio的编号
		var CookieValue = findCookie(CookieName);
		var CookieArray,CookieArray_temp;//预输出数组，含排序和新记录
		var newCookie;//要存放键值
		var delCookie_Num = "no";//要删除的cookie号
		CookieArray = CookieValue.split(",");
		for(i=0;i<CookieArray.length;i++){//查找当前audio是否有记录
			
			CookieArray_temp = CookieArray[i].split("@");
			if(CookieArray_temp[0]==audioNum){
				delCookie_Num = i;
			}
		}

		
		if(delCookie_Num == "no"){
			newCookie = audioNum+"@"+timed;
			CookieArray.unshift(newCookie);
			CookieArray.pop();
		}else{
			newCookie = audioNum+"@"+timed;
			CookieArray.splice(delCookie_Num,1);
			CookieArray.unshift(newCookie);
		}
		newCookie = CookieArray.join(",");
		
		var exp = new Date();//存储cookie，days是保存天数
		var days = 30;//要保存的时间
		days = exp.getTime()+days*24*60*60*1000;
		exp.setTime(days);
		document.cookie = CookieName+"="+newCookie+";expires="+exp.toGMTString();//存入新的
		
		
	}
		
		
		


	//检测当前页面cookie有无FMplayRecord没有插入FMplayRecord=1@0,1@0,1@0;	
	function putCookie(){
		var CookieValue = findCookie(CookieName);
		if(CookieValue==false){//当前没有cookie记录
		 document.cookie = "FMplayRecord=1@0,1@0,1@0;";//插入数值
		}
		//alert(document.cookie);
	}
	
	function  DelCookie()
	//删除Cookie
	{
		var  exp  =  new  Date();
		exp.setTime  (exp.getTime()  -  1);
		document.cookie = CookieName+" = 0; expires="+exp.toGMTString();
	}
	
	
	
	
/////////FMcookie部分结束///////////




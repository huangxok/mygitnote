$(function(){
	javascript:window.history.forward(1); 
	var CookieName = "FMplayRecord";//cookie键名
	//DelCookie();//删除用
	putCookie();//检测当前cookie，如没有添加“FMplayRecord=1@0,1@0,1@0”
	outFMCookie();//刷cookie到页面
////////缓冲条
	// document.querySelectorAll(".shareIt")[0].onclick = function(){
		// var theAudio = document.getElementById("theAudio");
		// var ee = theAudio.buffered.length;
		// alert(ee);
	// }
	var timeloop,cookieTime = 10;//时间循环部分,10每10秒存一次cookie
	audioplayer(0);//0代表当前播放起始位置
	
	var touchId = document.getElementById("timerTouch"); //2015_4_21
	var touchLength;//滑动长度//2015_4_21
	
////////////////////////////全局部分结束//////////////////////	
	
	touchId.ontouchstart = function(event){//2015_4_21
		event.preventDefault();
		clearInterval(timeloop);//停止进度条
		var touch  = event.targetTouches[0];
		touchLength = touch.screenX;
	//alert("chumo")
	}
	
	touchId.ontouchmove = function(event){//2015_4_21
		event.preventDefault();
		clearInterval(timeloop);//停止进度条
		var touch  = event.targetTouches[0];
		touchLength = touch.screenX;
		
		/////////////进度条追随部分/////////////
		var theAudio = document.getElementById("theAudio");
		var bus = document.getElementById("bus");
		var min = document.getElementById("min");
		var sec = document.getElementById("sec");
		var timerWidth = document.getElementById("timer").offsetWidth;//进度条长度
		var theAudioLength = document.getElementById("theAudio").duration;//音频长度
		var the_Time,allTime;
		allTime = theAudio.duration;//音频总长度
		the_Time = theAudioLength*(touchLength/timerWidth);//预设定的时间
		bus.style.width = (the_Time/allTime)*100+"%";//进度跳跟随
		min.innerHTML = Math.floor(the_Time/60);
		sec.innerHTML = Math.floor(the_Time%60);


	}
	
	
	
	touchId.ontouchend = function(){//2015_4_21
		var timerWidth = document.getElementById("timer").offsetWidth;//进度条长度
		var theAudioLength = document.getElementById("theAudio").duration;//音频长度
		event.preventDefault();
		audioplayer((touchLength/timerWidth)*theAudioLength,"GO");
	
	/////////////进度条追随部分/////////////
		var theAudio = document.getElementById("theAudio");
		var bus = document.getElementById("bus");
		var min = document.getElementById("min");
		var sec = document.getElementById("sec");
		var timerWidth = document.getElementById("timer").offsetWidth;//进度条长度
		var theAudioLength = document.getElementById("theAudio").duration;//音频长度
		var the_Time,allTime;
		allTime = theAudio.duration;//音频总长度
		the_Time = theAudioLength*(touchLength/timerWidth);//预设定的时间
		bus.style.width = (the_Time/allTime)*100+"%";//进度跳跟随
		min.innerHTML = Math.floor(the_Time/60);
		sec.innerHTML = Math.floor(the_Time%60);
	
	
	
	}
	
	
	$("#playRecord").click(function(event){
		event.stopPropagation();
		outFMCookie();//读播放记录
		$("#playRecord_list").css("display","block");
		$("*").on("click",hidden_1);
	});
	
	function hidden_1(event){//播放记录部分
		 event.stopPropagation();
		 event.preventDefault();
		 var $playRecord = $(this).parents("#playRecord");
		 if($playRecord.length){
			//点击播放记录执行函数
		 }else{
			$("#playRecord_list").css("display","none");
			$("*").off("click",hidden_1);
		 };
		 
		 
	}
	
	


/////////FMcookie部分开始原生JS///////////
	
//查找"name"返回值
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

//取得cookie 解析 赋值
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
		 document.cookie = CookieName+"=1@0,1@0,1@0;";//插入数值
		}
		
	}
	
	function  DelCookie()
	//删除Cookie
	{
		var  exp  =  new  Date();
		exp.setTime  (exp.getTime()  -  1);
		document.cookie = CookieName+" = 0; expires="+exp.toGMTString();
	}
	//alert(document.cookie);
	
	
	
	/////////FMcookie部分结束///////////



//////////////////////////评论输入切换部分//////////////////////////////	
	$("#toComment *").click(function(event){
		event.stopPropagation();
		var testHide = $("#toComment_input_box").css("display");
		if(testHide == "none"){
		$("#toComment_input_box").css("display","block").focus();
		$("*").on("click",hidden_2);
		$("#toComment div").html("\<span style\=\'color\:\#f8b62d\;\'\>确 定\<\/span\>");
		}else{
			// 这里添加发送表单
			$("#toComment_input_box").css("display","none");
			$("*").off("click",hidden_2);
			var toComment_val = $("#toComment_input").val();
			
			if(toComment_val != ""){
				//内容不为空发送内容
			}
			
			$("#toComment_input").val("");
			$("#toComment div").text("评 论");
		}
	})
	
	function hidden_2(event){//评论部分
		 event.stopPropagation();
		 event.preventDefault();
		 var $playRecord = $(this).parents("#toComment");
		 var $playRecord2 = $(this).parents("#toComment_input_box");
		 if($playRecord.length+$playRecord2.length){
			
			//点击播放记录执行函数
		 }else{
			$("#toComment_input_box").css("display","none");
			// $("#toComment_input").val("");
			$("*").off("click",hidden_2);
			$("#toComment div").text("评 论");
		 };
		 
		 
	}
	
	
	
	
	
//////////////////////////音频播放器部分开始_原生JS//////////////////////////////
	
	
	
function audioplayer(busX,busGo){//播放部分控制2015_4_21
		//刷新播放列表
		var playIcon = document.getElementById("PlayOrPause");
		var playIconClss = document.getElementById("playIcon");
		var theAudio = document.getElementById("theAudio");
		if(busGo){
			gotoplay();
		}
		
		playIcon.onclick = function(){gotoplay();}
		
		function gotoplay(){
			if(theAudio.readyState){//准备就绪
				if(theAudio.paused){//暂停或未开始
					playIconClss.className = "playIcon2";
						if(busX != 0){
							theAudio.currentTime = busX;
							busX =0;
						}
					theAudio.play("play");
					//设置当前位置
					logoAnimation("play");//动画部分
					timeloop = setInterval(busLine,1000);//每1秒执行一次
					
				}else{//未暂停播放中
					if(busGo == "GO"){//判断是否拖动后的播放
						theAudio.pause();
						theAudio.currentTime = busX;
						theAudio.play("play");
						clearInterval(timeloop);
						timeloop = setInterval(busLine,1000);
						busGo = "";//清空快进距离
					}else{
						playIconClss.className = "playIcon";
						theAudio.pause();
						logoAnimation("pause");
						clearInterval(timeloop);//停止每1秒执行一次
					}
				}
				// timeloop = setInterval(busLine,1000);
			
			}else{//未准备就绪
				// theAudio.oncanplay{
					// theAudio.play();//缓冲足够时播放
				// }
				
			}
		
		
		}
	

	function logoAnimation(kk){
		var logo = document.getElementById("logo_img");
		if(kk == "play"){
			logo.className = "audio_logo_anima";
			// alert(logo.className);
		}else{
			logo.className = "";
		}
	}
		
		
		
	
//2015_4_24	
	function busLine(){//进度条
			var bus = document.getElementById("bus");
			var min = document.getElementById("min");
			var sec = document.getElementById("sec");
			var the_Time,allTime;
			allTime = theAudio.duration;//音频总长度
			the_Time = theAudio.currentTime;
			bus.style.width = (the_Time/allTime)*100+"%";
			min.innerHTML = Math.floor(the_Time/60);
			sec.innerHTML = Math.floor(the_Time%60);
			if((the_Time/allTime)>= 1){//2015_4_16
				clearInterval(timeloop);//结束时间循环
				document.getElementById("playIcon").className = "playIcon";
				logoAnimation("pause");
			}
			if(cookieTime==0){
				//inCookie(the_Time);//存入cookie
				inFMCookie(the_Time);
				cookieTime = 10;
			}else{
				cookieTime--;
			}
	}
	
}
});
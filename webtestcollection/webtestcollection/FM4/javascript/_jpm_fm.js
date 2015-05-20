$(function(){
	//屏幕翻滚
	window.onorientationchange = function(){
		// var reWindow = (window.orientation);
		// var theBody = document.body;
		// var newBody = "rotate("+reWindow+")deg";
		//alert(theBody.innerHTML);
		//theBody.style.transform = rotate(30deg);
		//document.getElementsByClassName("page").style.transform = rotate(30deg);
	//event.preventDefault();
	}

	
	window.addEventListener("orientationchange",function(){
		//document.body.style.width = "320px";
		//document.body.style.height = "800px";
		//alert(document.body.innerHTML);
		//document.querySelectorAll(".page").style.width = "320px";
		//document.querySelectorAll(".page").style.height = "800px";
		//event.preventDefault();
		//alert(123);
	});
	
	// var hh = document.querySelectorAll(".page");
	// hh[0].style.transform = "rotate(30deg)";
	
	$("#playRecord").click(function(event){
		event.stopPropagation();
		outCookie();//读播放记录
		//outCookie();//刷新播放列表
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
	
	
	outCookie();
/////////cookie部分开始_原生JS///////////	
	alert(document.cookie);
	function inCookie(timed){//存入cookie，name为自定义属性num
		var audioNum = document.getElementById('theAudio');
		var exp = new Date();
		var days = 30;//要保存的时间
		
		audioNum = audioNum.dataset.num;//读取audio的num
		days = exp.getTime()+days*24*60*60*1000;
		exp.setTime(days);
		
		document.cookie = audioNum + "=" + timed +";expires="+exp.toGMTString()+";path=192.168.1.200";
		
		//alert(audioNum + "=" + timed +"; expires="+exp.toGMTString());
		
	}
	
	function outCookie(){
		if(document.cookie.length>0){
			
			var strCookie=document.cookie;
			var arrCookie=strCookie.split("; ");
			if(arrCookie == false){
				
				arrCookie[0] = strCookie;
				
			}
			var arrTemp,mathTemp,selectTemp;
			
			for(var i=0;(i<3)&&(i<arrCookie.length);i++){//正序
			
					arrTemp = arrCookie[arrCookie.length-1-i];
					arrTemp = arrTemp.split('=');
				
					if(arrTemp[0]){
						selectTemp = document.querySelectorAll("#playRecord_list .playRecord_num");
						selectTemp[i].innerHTML = arrTemp[0];
						mathTemp = Math.floor(arrTemp[1]/60);
						selectTemp = document.querySelectorAll("#playRecord_list .playRecord_min");
						selectTemp[i].innerHTML = mathTemp;
						mathTemp = Math.floor(arrTemp[1]%60);
						selectTemp = document.querySelectorAll("#playRecord_list .playRecord_sec");
						selectTemp[i].innerHTML = mathTemp;
						;
					}
				
			}
		}else{
		// alert("没有cookie");
		}
	}
	
/////////cookie部分结束///////////	

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
	
	var timeloop,cookieTime = 10;//时间循环部分,10每10秒存一次cookie
	audioplayer(0);//0代表当前播放起始位置
	
function audioplayer(busX){//播放部分控制
		//刷新播放列表
		var playIcon = document.getElementById("PlayOrPause");
		var playIconClss = document.getElementById("playIcon");
		var theAudio = document.getElementById("theAudio");
		
		playIcon.onclick = function(){
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
					timeloop = setInterval(busLine,1000);
				}else{//未暂停播放中
					playIconClss.className = "playIcon";
					theAudio.pause();
					logoAnimation("pause");
					clearInterval(timeloop);
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
				alert("1");
				clearInterval(timeloop);//结束时间循环
				document.getElementById("playIcon").className = "playIcon";
				logoAnimation("pause");
			}
			if(cookieTime==0){
				inCookie(the_Time);//存入cookie
				cookieTime = 10;
			}else{
				cookieTime--;
			}
	}
	
}
});
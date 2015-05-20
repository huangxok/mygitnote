var headShowSprite={
	showCount:6,
	timeAll:1000,
	indexArray:["A1","B1","C1","D1","E1","F1","G1","H1","I1","J1","A2","B2","C2","D2","E2","F2","G2","H2","I2","J2"],
	showHead:function(){
		var index=headShowSprite.index;
		var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[index]);
		rotateDivList.forEach(function(d){
			d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[index];
		});
	},
	headCollectionShow:function(){
		// 头像大小自适应
		var winWidth=$(window).width();
		var winHeight=$(window).height();
		var divWidth=winWidth/this.showCount<100?winWidth/4:winWidth/this.showCount;
		$(".rotateDiv").width(divWidth).height(divWidth);
	},
	dispearHeadList:function(){
		// 头像消失函数
		window.setTimeout(function(){
			$("#headListPosition").animate({
			    opacity: 0,
			}, 1000,'ease-out',function(){
				var temCon=$("#container");
				temCon.css("display","block");
				temCon.animate({
					opacity:1,
				},600,"linear",function(){
					$("#headListPosition").css("display","none");
					$("#headListPosition").remove();

				});
			})
		},2000);
	},
	containerShow:function(){
		// 主题内容出现
		$("#headListPosition").css("display","none");
		$("#container").css({"display":"block","opacity":1});
		$("#headListPosition").remove();
	},
	showHeads:function(){
		// 头像翻转
		var self=this;
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[0]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[0];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[1]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[1];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[2]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[2];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[3]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[3];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[4]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[4];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[5]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[5];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[6]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[6];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[7]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[7];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[8]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[8];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[9]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[9];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[10]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[10];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[11]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[11];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[12]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[12];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[13]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[13];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[14]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[14];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[15]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[15];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[16]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[16];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[17]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[17];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[18]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[18];
			});
		},Math.random()*self.timeAll);
		window.setTimeout(function(){
			var rotateDivList=$(".rotateDiv"+headShowSprite.indexArray[19]);
			rotateDivList.forEach(function(d){
				d.className="rotateDiv effectShow rotateDiv"+headShowSprite.indexArray[19];
			});
		},Math.random()*self.timeAll);
	}
}
if(getUrlVar("count")==undefined){
	headShowSprite.headCollectionShow();
	headShowSprite.showHeads();
	headShowSprite.dispearHeadList();
}else{
	headShowSprite.containerShow();
}

$(window).on("resize",function(){
	headShowSprite.headCollectionShow();
});

function getUrlPara(){     
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars; 
}   
function getUrlVar(name){
	return getUrlPara()[name];
}

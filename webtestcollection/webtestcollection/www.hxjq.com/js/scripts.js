


///////// 弹出层/////////////
function displaylayer(div) {
	var subMenu = div.getElementsByTagName("span")[0];
	subMenu.style.display = "block";
}
function hidelayer(div) {
	var subMenu = div.getElementsByTagName("span")[0];
	subMenu.style.display = "none";
}

//首页产品中心
jQuery(document).ready(function() {
    var i_curIndex = 0;
    var beauBeauSlide; //函数对象
    var i_curID = 0; //取得鼠标下方的对象ID
    var pictureID = 0; //索引ID
   jQuery("#i_focus_piclist li").eq(0).show(); //默认
  beauBeauSlide = setTimeout(autoScroll, 0);
    jQuery("#i_focus_btn li").hover(function() {
        StopScrolll();

        jQuery("#i_focus_btn li").removeClass("i_cur");
        jQuery("#i_focus_piclist li").hide();
      
        i_curID = jQuery(this).attr("id"); //取当前元素的ID
        pictureID = i_curID.substring(i_curID.length -1 ); //取最后一个字符
        jQuery("#i_focus_btn li").eq(pictureID).addClass("i_cur")
        jQuery("#i_focus_piclist li").eq(pictureID).show();

jQuery("#i_focus_piclist li").not(jQuery("#i_focus_piclist li")[pictureID]).hide(); //除了自身别的全部隐藏
jQuery("#i_focus_btn li").not(jQuery("#i_focus_btn li")[pictureID]).removeClass("i_cur");



    },
    function() {
        //当鼠标离开对象的时候获得当前的对象的ID以便能在启动自动时与其同步
        i_curID = jQuery(this).attr("id"); //取当前元素的ID
        pictureID = i_curID.substring(i_curID.length - 1); //取最后一个字符
        i_curIndex = pictureID;
          beauBeauSlide = setTimeout(autoScroll, 1000);
    });
    //自动滚动
    function autoScroll() {
        jQuery("#i_focus_btn li:last").removeClass("i_cur");
        jQuery("#i_focus_piclist li:last").hide();

        jQuery("#i_focus_btn li").eq(i_curIndex).addClass("i_cur");
        jQuery("#i_focus_btn li").eq(i_curIndex - 1).removeClass("i_cur");

        jQuery("#i_focus_piclist li").eq(i_curIndex).fadeIn("fast");
        jQuery("#i_focus_piclist li").eq(i_curIndex - 1).hide();


jQuery("#i_focus_piclist li").not(jQuery("#i_focus_piclist li")[i_curIndex]).hide(); //除了自身别的全部隐藏
jQuery("#i_focus_btn li").not(jQuery("#i_focus_btn li")[i_curIndex]).removeClass("i_cur");


        i_curIndex++;
        i_curIndex = i_curIndex >= 4 ? 0 : i_curIndex;
        beauBeauSlide = setTimeout(autoScroll, 4000);
    }
    function StopScrolll() //当鼠标移动到对象上面的时候停止自动滚动
    {
        clearTimeout(beauBeauSlide);
    }
});

//index of product
jQuery(function(){
	jQuery(".pcl").hover(function(){
		jQuery(this).attr("class","pcl pclHover");
	},function(){
		jQuery(this).attr("class","pcl");
	});
})
//index of job
jQuery(document).ready(
function() 
{
	jQuery(".deal_Title").click(function(){
		jQuery(this).next("div").slideToggle("slow")
		.siblings(".deal_menuCont:visible").slideUp("slow");
		jQuery(this).toggleClass("deaTi");
		jQuery(this).siblings(".deaTi").removeClass("deaTi");
	});
});


function printText(id){
		var text= document.getElementById(id).innerHTML;
		var css_str= "<link rel=\"stylesheet\" type=\"text/css\" href=\"../style/style.css\" />";
		var js_str='<script type="text/javascript" src="../scripts/jquery-1.4.2.min.js"></script><script type="text/javascript" src="../scripts/scripts.js"></script>';
		var printwindow= window.open("printData.htm","print");
		printwindow.document.write(css_str+js_str+'<div class="textcontent0" id="text_content">'+text+'</div>');
		printwindow.document.close();
		printwindow.print();
	}
	function ding(id){
		var xmlhttp= null;
		if(XMLHttpRequest){
			xmlhttp= new XMLHttpRequest();
		}else{
			xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange= function(){
			if(xmlhttp.readyState==4&&xmlhttp.status==200){
				var rs= xmlhttp.responseText;
				if(!isNaN(rs))
					document.getElementById("tui").innerHTML= rs;
				else
					alert(trim(rs));
			}
		}
		xmlhttp.open("post","../sysconfig/ding.jsp?id="+id,false);
		xmlhttp.send();
		
	}
	function trim(str){
		while(str.indexOf(" ")==0||str.indexOf("\r")==0||str.indexOf("\n")==0){
			str= str.substring(1);
		}
		return str;
	}
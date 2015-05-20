// JavaScript Document




    $().ready(function(){
	     index=1;				   
	     var cle=setInterval(autos,5000);
	  
	        function autos(){
				   ++index;
				   if(index==5){
					      index=1;
					   }
					  
					$(".box").css("background","url(Image/"+(index)+".jpg)"); 
					$('.box').css('background-size','100%');
					$(".A").css("display","none")
					
				}
	  
	})
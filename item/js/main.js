　require.config({
　　　　paths: {
　　　　　　"jquery": "jquery-1.11.3",
　　　　　　"cook": "jquery.cookie"　,
            "sport":"sport5"
        
　　　　}
　　})

　require(['jquery', 'cook','sport'], function ($, cook,sport){
　　　　// some code here
  
  function myHover(id){
  
  $(id).hover(function(){
   	 $(this).find("div").show();
   	
   },function(){
   	
   	$(this).find("div").hide();
   	
   });
   	
   }
 
 
 myHover("#top div.fl");
 myHover("#top ul.fr  li ");
 
 function hoverShow (myHover ,show){
		//alert(1);
		//console.log($(hover).children());
		//console.log($(show));
		
		$(myHover).children().hover(function(){
			var $index = $(this).index();
		
			 that =$(this);
			$(this).css({"background":"white"}).find("a").css({"color":"blue"});
			
			$(show).children().eq($index).css({"display":"block"}).hover(
			   function (){
			   	
			   	$(this).css({"display":"block"});
			 	that.css({"background":"white"}).find("a").css({"color":"blue"});
			   	
			   	
			   },function(){
			   	 	$(this).css({"display":"none"});
			 	that.css({"background":"#4496ee"}).find("a").css({"color":"white"});
			   	
			   }
			
			);
			
				
			
		},function(){
			var $index = $(this).index();
			$(this).css({"background":"#4496ee"}).find("a").css({"color":"white"});
			
			$(show).children().eq($index).css({"display":"none"});
			
			
		})
          
		
		
		
	}
 
 //hoverShow("#nav .nav ","#nav .shop .conShow");
  hoverShow("#nav .shop .shop-ul","#nav .shop .conShow");
   

 function Carousel(list,olli,pre,next,){
    var pre = pre? $(pre):"";
     var next = next ? $(next):"";
	var list = $(list).children();
	var olli = $(olli).children();
	
	var timer = null;
	var _index = 0;	
	function autoPlay(){
	timer = setInterval(function(){
		_index ++;
		play();
		
	},3000);
	}
	autoPlay();
	olli[_index].style.background = "orange";
	
	function play(){
		for( var i=0;i<list.length;i++ ){
			list[i].style.display = "none";
			olli[i].style.background = "white";
		}
		
		if( _index > list.length-1 ){
			_index=0;
		}else if (_index < 0){
			_index = list.length-1;
			
		}
		list[_index].style.display = "block";
		olli[_index].style.background = "orange";
	}
	 
	function move(){
		for( let i = 0;i<list.length;i++ ){
			
			olli[i].onmouseenter = function(){
				_index = i;
				clearInterval(timer);
				play();
			}
			olli[i].onmouseleave = function(){
				  autoPlay();
			}
		}
	}
	move();
	if (pre){
	pre.click(function(){
		
		_index --;
		play();
		
	});}
	if(next){
	next.click(function(){
		_index ++;
		play();
		
	});
	}
	}
	
	Carousel("#banRig .homePic .bannerPic","#banRig .centralZoin .bannerStr .bannerCircle","#banRig .centralZoin .pre"
		, "#banRig .centralZoin .next");
	
	Carousel(".storey1 .bd ul",".storey1 .hd ul");
	Carousel(".storey2 .bd ul",".storey2 .hd ul");
	Carousel(".storey3 .bd ul",".storey3 .hd ul");
	Carousel(".storey4 .bd ul",".storey4 .hd ul");
	Carousel(".storey5 .bd ul",".storey5 .hd ul");
	Carousel(".storey6 .bd ul",".storey6 .hd ul");
	
	
	function show (hover ,show){
		
		
		$(hover).children().mouseover(function(){
			var $index = $(this).index();
			$(this).removeClass().addClass("hover").siblings().removeClass();
			
			$(show).children().eq($index).removeClass().addClass("show").siblings().removeClass().addClass("hidden");
			
				
			
		})
		
		
		
	}
	
	show (".storey1 .floorTab ul",".storey1 .floorCon");
	show (".storey2 .floorTab ul",".storey2 .floorCon");
	show (".storey3 .floorTab ul",".storey3 .floorCon");
	show (".storey4 .floorTab ul",".storey4 .floorCon");
	show (".storey5 .floorTab ul",".storey5 .floorCon");
	show (".storey6 .floorTab ul",".storey6 .floorCon");
	
	function hover (img){
		$(img).hover(function(){
			$(this).css({"margin-left":-5})
			
		},function(){
			$(this).css({"margin-left":0})
			
		})
	}
	
	function hoverRight(img){
		$(img).hover(function(){
			$(this).css({"margin-right":-5})
			
		},function(){
			$(this).css({"margin-right":0})
			
		})
		
	}
	hover(".floorCon ul li img");
	hoverRight(".c_enity img");
	
	
	function Leader(elem,stair){
		var that = this;
		this.elem = elem;
		this.stair = stair;
		
		
		
		stair.find("li").bind({
			click:function(){that.ul_click($(this));},
			mouseenter: function(e) { that._mouseover($(this)); },
        mouseleave: function(e) {  that._mouseout($(this))  ;  }
			
		});
		
		this.obj = this.elem.map(function(){
			return $(this).offset().top;
		});
		
		this.obj.push( elem.last().offset().top+elem.last().height() );
		//console.log( elem.last().offset().top+elem.last().height() );
		//console.log(ft.offset().top)
		
		$(window).scroll(function(){
			that._scroll();
		});
	}

	
	Leader.prototype.ul_click = function(elem){
		$("body,html").animate({"scrollTop":this.obj[elem.index()]},1000);
		//alert(this.obj[elem.index()]);
	};
	
	Leader.prototype._scroll = function(){
		var wh = $(window).height()/2;
		var dh = $(document).scrollTop();
		var arr = this.obj;
		//console.log(dh);
		var ind = -1;
		for( var i=0,l=arr.length;i<l-1;i++ ){
			var min = arr[i];
			var max = arr[i+1];
			if( min<wh+dh && wh+dh<max ){
			//	document.title = i;	
				ind = i;
			}
		}
		if( 2*wh<dh ){
			this.stair.fadeIn();
		}else{
			this.stair.fadeOut();
		}
		this.stair.find("li>p.num").css({"display":"block"});
		this.stair.find("li>p.txt").css({"display":"none"});
		if( ind==-1 ){
			
		}else{
			this.stair.find("li").eq(ind).find("p.num").css({"display":"none"});
			this.stair.find("li").eq(ind).find("p.txt").css({"display":"block"});
		}
		
	}
	Leader.prototype._mouseover = function (elem){
		elem.find("p.num").css({"display":"none"});
		elem.find("p.txt").css({"display":"block"});
		
	}
	Leader.prototype._mouseout = function(elem){
		elem.find("p.txt").css({"display":"none"});
		elem.find("p.num").css({"display":"block"});
		
	}
	
	new Leader($("#storey .stair"),$("#storey .floorNav"));
	
	
	})
	
  
  
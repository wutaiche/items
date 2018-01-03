require.config({
　　　　paths: {
　　　　　　"jquery": "jquery-1.11.3",
　　　　　　"cook": "jquery.cookie"　
           
        
　　　　}
　　})

　require(['jquery', 'cook'], function ($, cook){
	
	
	
	
	
	
	function scale(bottom,small,big,mark){
	$(bottom).find("li").mouseenter( function(){
		//记录下标
		var ind = $(this).index();
		//1.首先实现类似选项卡的图片切换
		$(small).children().eq(ind).show().siblings().hide();
		$(big).children().eq(ind).show().siblings().hide();
		//console.log(ind);
	});
	//2.滑过小图区，遮罩层显示，大图区显示
	$(small).mouseenter( function(){
		$(mask).show();
		$(big).show();
	}).mouseleave( function(){
		$(mask).hide();
		$(big).hide();
	});
	//3.让遮罩层跟随移动
	$(small).mousemove( function(e){
		var e = e || window.event;
		var x = e.pageX - $(this).offset().left - $(mask).width()/2;
		var y = e.pageY - $(this).offset().top - $(mask).height()/2;
		//console.log(x,y);
		//边界
		var maxl = $(this).width() - $(mask).width();
		var maxt = $(this).height() - $(mask).height();
		x = Math.min( maxl , Math.max( 0 , x ) );
		y = Math.min( maxt , Math.max( 0 , y ) );
		$(mask).css({
			"left":x,
			"top":y
		});
		//4.让大图区做相反运动
		//比例关系：大图/小图  = bigX/x  = 大图显示区 / 小图显示区
		var bigImgleft = -x * $(big).children().width() / $(small).children().width();
		var bigImgtop = -y * $(big).children().height() / $(small).children().width();
		$(big).children().css({
			"left":bigImgleft,
			"top":bigImgtop
		});
	});}
	scale(".specPiclist",".smallpic",".bigpic","#mark");
	
});
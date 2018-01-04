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
	
	

				$(".property .buy").click(function(){
					location.href = "cart.html";
				})
				//给加入购物车按钮添加点击事件
				$(".property #cart").click(function(e){
					//$.cookie("cart", "", { expires: 7, path: '/' }); 
					var goodName = $(this).parents().find(".name h1").text();
					//获取商品的价格
					var goodPrice = $(this).parents().find("#prince").text();
					//获取商品的图片src
					var goodSrc = $(this).parents().find(".smallpic").children().eq(0).attr("src");
					//console.log(goodSrc);
					var goodId = goodName;
					
					//获取cookie中的信息
					//如果cookie中没有信息会返回一个undefined ,我所须是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
				
					//alert(cartStr);
					//将字符串转成对象
					var cartObj = convertCartStrToObj(cartStr);
					//判断该商品是否已经在购物车中存在
					if(goodId in cartObj){
						//如果已存在，那么该商品的数量加1
						cartObj[goodId].num += 1;
					}else{
						//如果不存在，那么将新商品的信息存入
						cartObj[goodId] = {
							name : goodName,
							price : goodPrice,
							num : 1,
							src : goodSrc
						};
					}
					
					
					//将新的购物车信息存回cookie
					//将对象转为字符串
					cartStr = convertObjToCartStr(cartObj);
					//存入cookie
					//document.cookie = "key=value"
					$.cookie("cart",cartStr,{expires : 7,path:"/"});
					
			}		
				)	
			
			
			function convertCartStrToObj(cartStr){
			
				if(!cartStr){
					return {};
				}
				var goods = cartStr.split(":");
				var obj = {};
				for(var i = 0; i < goods.length; i ++){
					var data = goods[i].split(",");
					//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
					obj[data[0]] = {
						name : data[1],
						price : parseFloat(data[2]),
						num : parseInt(data[3]),
						src : data[4]
					}
				}
				return obj;
			}
//			
			
			
			function convertObjToCartStr(obj){
					/* {
					 * 	sp1 : {
					 * 		name : "香蕉",
						 * price : 30,
						 * num : 1,
						 * src : "img/1.jpg"
					 * },
					 * sp2 :{
						 * 	name :"苹果",
						 * price : 40,
						 * num:2,
						 * src : "img/2.jpg"
					 * },
					 * sp3{
						 * 	name : "梨"，
						 * price : 50,
						 * num : 3,
						 * src : "img/3.jpg"
					 * }
					 * }
					 */
					var cartStr = "";
					//遍历对象
					for(var id in obj){
						if(cartStr){
							cartStr += ":";
						}
						//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
						cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
					}
					return cartStr;
			}
			
		
	
})
require.config({
　　　　paths: {
　　　　　　"jquery": "jquery-1.11.3",
　　　　　　"cook": "jquery.cookie"　
           
　　　　}
　　})

require(['jquery','cook'],function($,cook){
	  $.get("../json/list.json", function(data){
            var arr = data;
            var str = "";
            $.each(arr,function(index,value){
            	str += `
            	<li>
    					<a href="detail.html"><img src="../images/${value.image}" alt="" /></a>
    					<p>${value.name}</p>
    					<p class="second"><span class="fl prince">¥${value.prince}</span> <span>总销量：${value.sales}</span><span class="fr comment"><i>${value.comment}</i>条评论</span></p>
    					<a class="reserve" href="#">我要预定</a>
    				</li>
            	
            	
            	`
            
            	
            });
            	$("#content .goods ul").html(str);
            
});
	
	
})

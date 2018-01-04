  require.config({
	paths:{
		"jquery": "jquery-1.11.3",
　　　　　　"cook": "jquery.cookie"
		
	}
	
	
	
})
  
  require (["jquery","cook"],function($,cook){
  	
	
	$(".registBtn").click(function(){
		//获取用户名和密码
		var usn = $("#username_dd .text").val();
		var pwd = $("#password_dd .text").val();
		var con = $("#confirm .text").val(); //确认密码
		
		//用户不能为空
		if(!usn){
			$("#username_dd .hide").text("用户不能为空").css({"display":"inline-block"});
			return;
		}
		
		//检测密码是否相同
		//密码不能为空，密码规则
		if(pwd !== con){
			$("#confirm .hide").text("两次输入的密码不相同，请重试!").css({"display":"inline-block"});
			return;
		}
		
		//检测一下用户是否已经存在
		//假设："test1,123:test2,abc:test3,888"
		/*转为对象
		 * {
		 * 	test1:123,
		 *  test2:abc,
		 *  test3:888
		 * }
		 */
		
		
		var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
		
	
		users = convertStrToObj(users);
		if(usn in users){ 
		$("#username_dd .hide").text("用户已注册").css({"display":"inline-block"});
			return;
		}else{
			
			users[usn] = pwd;
		
		    userStr = convertObjToStr(users);
			
			$.cookie("registerUsers",userStr,{expires:7,path:"/"});
			console.log(decodeURIComponent(document.cookie))
//			alert("注册成功！");
            $("#username_dd .hide").text("注册成功").css({"display":"inline-block"})
		}
	});
	
	

//将字符串转为对象
function convertStrToObj(str){
	if(!str){
		return {};
	}
	//假设不为空："test1,123:test2,abc:test3,888:李涛,123"
	var users = str.split(":"); //将字符串转为数组 ["test1,123","test2,abc","test3,888"]
	var obj = {};
	/*
	 * var obj = new Object();
	 * obj["name"] = "zhangsan";
	 * 
	 */
	//遍历数组
	for(var i = 0; i < users.length; i ++){
		//将字符串转为数组
		var userData = users[i].split(",");
		//["test1",123] ["test2","abc"] ["test3",888]
		obj[userData[0]] = userData[1];
		/*转为对象如下：
		 * obj = {
		 * 	test1 : 123,
		 *  test2 : abc,
		 *  test3 : 888
		 * }
		 */
	}
	return obj;
}


function convertObjToStr(obj){
	var str = "";
	for(var usn in obj){
		var pwd = obj[usn];
		if(str){
			
			str += ":";
		}
		str += usn + ',' + pwd;
	}
	return str;
}

  	
  	
  	
  });

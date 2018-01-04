require.config ({
	paths:{
		　"jquery": "jquery-1.11.3",
　　　　　　"cook": "jquery.cookie"　
		
	}
	
	
}
		
)

require (['jquery','cook'],function($,cook){
	
	
	$(".loginBtn").click(function(){
		
		var usn = $("#account").val();
		var pwd = $("#pwd_p").val();
		var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
		users = convertStrToObj(users);
		
		if(users[usn] == pwd){
			//登录成功
			$.cookie("loginedUsers",usn,{expires:7,path:"/"});
			
			location.href = "index.html";
		}else{
			//登录失败
			$(".result").text("用户名和密码不匹配，请确认后重试！") ;
		}
	});
	


function convertStrToObj(str){
	if(!str){ //如果是空字符串
		return {}; //返回空对象
	}
	var users = str.split(":");
	var obj = {};
	for(var i = 0; i < users.length; i ++){
		var userData = users[i].split(",");
		obj[userData[0]] = userData[1];
	}
	return obj;
}


function convertObjToStr(obj){
	var str = "";
	//遍历对象
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

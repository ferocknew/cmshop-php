$(document).ready(function() {
	var hideMask = function() {
		$('#loading_bd').fadeOut(1000, function() {
			$('#loading_mask').fadeOut(200, function() {
				$(this).remove()
			});
			$(this).remove();
		});
	}();
	var ipt = $("input");
	ipt.eq(2).focus();
	var options = {
		dataType:'json',
		beforeSubmit: showRequest,
		success: success,
		url: urlPath + "_common/admin_login.php"
	};
	$("#loginform").click(function(e) {
        location.href=''
    });//.ajaxForm(options);//.submit()//
	////
	function showRequest(formData, jqForm, options) {
		var username = formData[0].value;
		var password = formData[1].value;
		var seccode = formData[2].value;
		var nameRegex = /^[A-Za-z0-9@]+$/;
		var safeRegex = /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/;
		var codeRegex = /^[0-9]\d{5}/;
		if (username == "" && !nameRegex.test(username)) {
			ipt.eq(0).focus();
			alert('请正确输入用户名！');
			return false;
		}
		if (password == "" || safeRegex.test(password)) {
			ipt.eq(1).focus();
			alert('请正确输入密码！');
			return false;
		}
		return true;
	}

	function success(m) {
		var suc = m["suc"];
		if(suc=="" || suc==undefined){WinErr();	}
		var timelimit = m["timelimit"];
		var logincount = m["logincount"];
		if (suc ==  - 3) {
			TT.winD({
				content: "密码错误次数过多，请 " + timelimit / 60 + " 分钟后重新登录",
				icon: "error",
				opacity: 0.87,
				top: "5%",
				lock: false
			});
		} else if (suc < 0) {
			TT.winD({
				content: "登陆失败，您还可以尝试 " + logincount + " 次",
				icon: "error",
				lock: false,
				top: "5%",
				time: 1.5
			});
		} else if (suc>0) {
			var i = 3;
			var fn = function () {
				!i && WinLocation();
				i --;
			};
			timer = setInterval(fn, 1000);
			fn();
			location.href = urlPath + "admincp.asp";
		} 
	}
	
	var WinLocation = function(){
		TT.winD({
			title: "登陆成功",
			icon: "succeed",
			content : "系统未能自动跳转。<a href='"+urlPath + "admincp.asp' target='_self'>请点击这里。</a>"
		});				
	}
	
	var WinErr = function(){
		TT.winD({
			title: "登陆失败",
			icon: "error",
			content : "您的发生异常登陆，请您重试！"
		});				
	}
});

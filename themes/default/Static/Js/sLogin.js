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
			alert('����ȷ�����û�����');
			return false;
		}
		if (password == "" || safeRegex.test(password)) {
			ipt.eq(1).focus();
			alert('����ȷ�������룡');
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
				content: "�������������࣬�� " + timelimit / 60 + " ���Ӻ����µ�¼",
				icon: "error",
				opacity: 0.87,
				top: "5%",
				lock: false
			});
		} else if (suc < 0) {
			TT.winD({
				content: "��½ʧ�ܣ��������Գ��� " + logincount + " ��",
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
			title: "��½�ɹ�",
			icon: "succeed",
			content : "ϵͳδ���Զ���ת��<a href='"+urlPath + "admincp.asp' target='_self'>�������</a>"
		});				
	}
	
	var WinErr = function(){
		TT.winD({
			title: "��½ʧ��",
			icon: "error",
			content : "���ķ����쳣��½���������ԣ�"
		});				
	}
});

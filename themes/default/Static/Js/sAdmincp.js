$(document).ready(function() {
	var hideMask = function () {
		$('#loading_bd').fadeOut(1000,function(){
			$('#loading_mask').fadeOut(200,function(){$(this).remove()});
			$(this).remove();
		});
	}();
	$("#iframe_0").attr("src",urlPath+"_desktop/desktop.asp");
	$("#personal").click(function(){
		TT.ShowMenu({'ctrlid':'personal'});
	});
	$("#per_password").click(function(){
		TT.winDD(urlPath+"_user/user_PassWord.asp",{width:"400px",height:"290px",title:"�޸�����"});
		return false;
	})
	
	$("#SysOnline").click(function(e) {
		$.getJSON("admin_Common.asp?gAction=getOnLine&strType=Yes",function(data) {
			$("#SysOnline>span").text(data["online"]);
		})		
    });
	
	$('.accordion').hoverAccordion({
		keepHeight: true,
		activateItem:2,
		keepHeight:true,
		onClickOnly:true
	});
	
	var accordion = function(){
		var this_ = $(".accordion");
		var ItemUl = this_.find('ul');
		var listHeight = $("#l-m-n").height()-(ItemUl.length*31);
		this_.find(".IsShow").height(listHeight)
		ItemUl.find("iframe").height(listHeight);
	}
	TT.onWindowResize.add(accordion);
//	
//	var wait = function(){
//		var dtd = $.Deferred(); // �½�һ��deferred����
//		var tasks = function(){
//			alert("ִ����ϣ�");
//			dtd.resolve(); // �ı�deferred�����ִ��״̬
//		};
//		setTimeout(tasks,5000);
//		return dtd.promise();
//	};
//	
//����$.when(wait())
// ����.done(function(){ alert("�������ɹ��ˣ�"); })
// ����.fail(function(){ alert("��������"); });	
});

var portaltreeflg = false
function PortalClass(){
	if(!portaltreeflg){
		$("#portalTree").attr("src","../_portal/portal_Tree.asp");
		portaltreeflg = true;
	}
}
var htmltreeflg = false
function HtmlClass(){
	if(!htmltreeflg){
		$("#HtmlTree").attr("src","../_html/html_Tree.asp");
		htmltreeflg = true;
	}
}

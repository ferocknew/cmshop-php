	
	function LinkType(v){
		var CS_Type = $("#CS_Type").val();
		switch(parseInt(v)){
			case 1:
				$('.lt1').show();
				CSType(CS_Type);
				$('.lt2').hide();
				break;
			case 2:
				$('.lt2').show();
				CSType(CS_Type);
				$('.lt1').hide();
				break;
		}
	}
	
	function CSType(val){
		switch (parseInt(val)){
			case 2:
				$('.lt1').hide();
				$('.tr2').show();
				break;
			case 3:
				$('.lt1').show();
		}
	}
	
	
	// ���ύ�ͻ��˼��
	function doCheck(type){
		var CS_PName = $("#CS_PName");//�ϼ����಻��Ϊ��
		var CS_Type = $("#CS_Type");
		var CS_Name = $("#CS_Name");
		var CS_Folder = $("#CS_Folder");
		var CS_OID = $("#CS_OID");
		var CS_HtmlExt = $("#CS_HtmlExt");
		
		if(VV.VV(CS_PName.val(),"Require")){
			alert("�ϼ����಻��Ϊ�գ�");
			CS_PName.focus();
			return false;
		}
		
		if(VV.VV(CS_Type.val(),"Require")){
			alert("��ģ�Ͳ���Ϊ�գ�");
			CS_Type.focus();
			return false;
		}
		
		if(VV.VV(CS_Name.val(),"Require")){
			alert("�������Ʋ���Ϊ�գ�");
			CS_Name.focus();
			return false;
		}
		
		if(VV.VV(CS_Folder.val(),"Nosymbols")){
			alert("Ӣ�����Ʋ���Ϊ�գ�");
			CS_Folder.focus();
			return false;
		}
		
		if(VV.VV(CS_OID.val(),"Integer")){
			alert("�������򲻿�Ϊ�գ�");
			CS_OID.focus();
			return false;
		}
		ttform.submit();
	}
	function HtmlExtType(ObjValue){
		//var CS_Folder = $("#CS_Folder").val();
		//var CS_Folder = '<%=config1%>';
		//var CS_Domain = "<%=TT.GetUrl("-1")%><%=config2%><%=WF.sysCfg(34)%>"+CS_Folder;
		var CS_HtmlExt = $("#CS_HtmlExt").val();
		switch (ObjValue){
			case '1':
			$('#TypeHtml').html(CS_Domain+CS_HtmlRule_1+CS_HtmlExt);
			break;
		case '2':
			$('#TypeHtml').html(CS_Domain+CS_HtmlRule_2+CS_HtmlExt);
			break;
		case '3':
			$('#TypeHtml').html(CS_Domain+CS_HtmlRule_3+CS_HtmlExt);
			break;
		case '4':
			$('#TypeHtml').html(CS_Domain+CS_HtmlRule_4+CS_HtmlExt);
			break;
		case '5':
			$('#TypeHtml').html(CS_Domain+CS_HtmlRule_5+CS_HtmlExt);
			break;
		case '6':
			$('#TypeHtml').html(CS_Domain+CS_HtmlRule_6+CS_HtmlExt);
			break;
		case '7':
			$('#TypeHtml').html(CS_Domain+CS_HtmlRule_7+CS_HtmlExt);
			break;
		case '8':
			$('#TypeHtml').html(CS_Domain+CS_HtmlRule_8+CS_HtmlExt);
			break;
		case '11':
			$('#TypeHtml').html(CS_Domain+CS_HtmlRule_11+CS_HtmlExt);
			break;
		}
	}
	
	function sTemplate(forminput){
		var divBox_ = parent.art.dialog({id:'divBox'});
		TT.share.removeData('winData');
		parent.TT.winDD('../_portal/portal_frame.asp?URL=portal_folder.asp&sAction=SelectTemplate&PageTitle=&CurrPath=/template/&forminput='+forminput,{
			id:"Template",
			close:function(){
				var winData = TT.share.data('winData');
				if (winData !== undefined){
					var winData = winData.split("|");
					$("#"+forminput).val(winData[0]);
				}
			},
			width:"500px",
			height:"500px",
			title:"ѡ��ģ��"
		});	
	}

	function vRights(obj) {
		var val = (obj.value).split("|");
		if (val[0] == "NoRights") {
			parent.art.dialog.tips('�Բ�������Ȩ���ƶ���ѡ���ࡣ', 1.5);
			document.ttform.reset()
		}
		$("#newClass").html("[ "+val[0]+" ]")
	}
	
	function doMoveCheck(){
		var nCS_ID = ttform.nCS_ID.value;
		var CS_OID = ttform.CS_OID.value;
		if(VV.VV(nCS_ID,"Require")){
			alert("δѡ����࣡");
			return false;
		}
		
		if(VV.VV(CS_OID,"Integer")){
			alert("�������򲻿�Ϊ���б�����������");
			ttform.CS_OID.focus();
			return false;
		}
		
		ttform.submit();
	}
	
	function reloadtree(CS_ID){
		var tr = $("#t2r"+CS_ID);
		var img = $("#img"+CS_ID);
		if(tr.is(":hidden")){
			img.click();
		}else{
			img.click().click();	
		}
	}
	
	function loadtree(CS_ID,CS_Type){
		var tr = $("#t2r"+CS_ID);
		var img = $("#img"+CS_ID);
		var folder = $("#folder"+CS_ID);
		if(!tr.is(":hidden")){
			tr.hide();
			img.removeClass("pdesc").addClass("padd");
			folder.removeClass("ppd"+CS_Type).addClass("ppa"+CS_Type);
		}else{
			var td = $("#td"+CS_ID);
			img.removeClass("padd").addClass("pdesc");
			folder.removeClass("ppa"+CS_Type).addClass("ppd"+CS_Type);
			tr.show();
			var err = function(){
				td.html('').html("����ʧ�ܣ���ˢ��ҳ������ԣ�");	
			}
			var success = function(data){
				var suc = data["suc"];
				if(suc=="1"){
					td.html('').html(data["str"]);
				}else{
					td.html('').html(data["str"]);	
				}
			}
			
			TT.TTajax({
				global:true,
				url:"portal_class.asp",
				data:"Action=getsubTree&_method=yes&CS_ID="+CS_ID,
				success:success
			});
		}
	}
	
	function dele(CS_ID) {
		tem=confirm("ɾ���Ժ��޷��ָ�����ȷ��Ҫɾ����");
		if (tem==true)	{
				//parent.mainFrame.document.location.href="sys_system_units_del.asp?Action=UnitsTree&CS_ID="+CS_ID+"&CS_Path="+CS_Path;
				var err = function(){
					td.html('').html("����ʧ�ܣ���ˢ��ҳ������ԣ�");
				}
				var success = function(data){
					var suc = data["suc"];
					if(suc=="1"){
						$("#t1r"+CS_ID).remove();
						$("#t2r"+CS_ID).remove();
						$("#img"+data["CS_PID"]).click().click();
					}else{
						alert('ɾ������!')	
					}
				}
				TT.TTajax({
					url:"portal_class.asp",
					data:"Action=ClassDel&_method=yes&CS_ID="+CS_ID,
					success:success
				});
			}
	}

	function mClass(pro){
		parent.TT.winDD('../_portal/portal_Class.asp?'+pro,{
			id:"move",
			width:"460px",
			height:"300px",
			title:"�����ƶ�"
		});	
	}
	function divOpen(pro,type){
		var url,title;
		if(type=="1"){
			title = "վ������"
			//location.href='../../template/_portal/portal_Class_Config.asp?'+pro;
			//return false;
			url = "../_portal/portal_Class_Config.asp?";
		}else{
			title = "�������"
			//location.href='../../template/_portal/portal_Class.asp?'+pro;
			//return false;
			url = "../_portal/portal_Class.asp?";
		}
		parent.TT.winDD(url+pro,{width:"630px",height:"540px",title:title});	
	}

	function configDV(obj,subitem,subtype){
		var val = TT.isNumber(obj)?obj:obj.value;
		var slt01 = $("."+subitem);
		switch(subtype){
			case 1:
				if(val!="3"){
					slt01.show();
				}else{
					slt01.hide();
				}
				
				break;
			case 2:
				if(val=="1"){
					slt01.show();
				}else{
					slt01.hide();
				}
				break;
			case 3:
				if(val=="1"){
					$(".TypeImg").show();
					$(".TypeFont").hide();
				}else{
					$(".TypeImg").hide();
					$(".TypeFont").show();
				}
				break;
		}
	}

	function getWH(){
		var flag = $("input[name='config\\(5\\)']:checked").val();
		if (flag=="0"){
			var v13 = $("#config\\(13\\)").val();
			var v14 = $("#config\\(14\\)").val();
			var v18 = $("#config\\(18\\)").val();
			var v19 = $("#config\\(19\\)").val();
			$("#peffect").html("<span style='font-size:"+v18+"px;font-family:"+v19+";color:#"+v14+"'>"+v13+"</span>");
				var w = $("#peffect").width();
				var h = $("#peffect").height();
				$("#config\\(9\\)").val(w);
				$("#config\\(10\\)").val(h);
		}else{
			var url=$("#config\\(11\\)").val();
			if (url==""){
				$("#config\\(9\\)").val(0);
				$("#config\\(10\\)").val(0);
				$("#peffect").html("");
			}else{
				if ((url.substring(0,1)!=".") && (url.substring(0,1)!="/")){
					url="../"+getAppExt()+"/"+url;
				}
				$("#peffect").html("<img border=0 src='"+url+"' onerror='ErrorCheckWH()'>");
				$("#peffect > img").load(function(){
					var w = $("#peffect > img").width();
					var h = $("#peffect > img").height();
					$("#config\\(9\\)").val(w);
					$("#config\\(10\\)").val(h);
				})
			}
		}
	}
	
	function getAppExt(){
		var p = location.pathname;
		var n = p.lastIndexOf(".");
		return p.substr(n+1).toLowerCase();
	}
	
	function ErrorCheckWH(){
		BaseAlert($("#config\\(52\\)").val(),"��Ч��ͼƬˮӡͼƬ·����");
	}
	
	function BaseAlert(theText,notice){
		alert(notice);
		theText.focus();
		theText.select();
		return false;
	}

	function upload(pro,formfield){
		var divBox_ = parent.$.dialog({id:'divBox'});
		parent.TT.winDD(urlPath+'_common/admin_Upload.asp?'+pro,{
			id:"upload",
			close:function(){
				var file = TT.share.data('file');
				if (file !== undefined){
					var Arval_ = file.split("|");
					$("#config\\("+formfield+"\\)").val(Arval_[0]);
				}
			},
			width:"470px",
			height:"500px",
			title:"�ϴ��ļ�"
		});	
	}

	function InsertFile(file){
		parent.$.dialog({id:'upload'}).close();
	}
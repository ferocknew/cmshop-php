// DOOCAL
// 2011.02.17
window.undefined=window.undefined;
var JSMENU = [];
JSMENU['timer'] = [];
JSMENU['active'] = [];
JSMENU['layer'] = 0;

TT = {
	version: '1.1.2',
	update: '2012-5-16'
};
TT.apply = function(o,c,d) {
	if (d) {
		TT.apply(o, d);
	}
	if (o && c && typeof c == 'object') {
		for (var p in c) {
			o[p] = c[p];
		}
	}
	return o;
};

TT.SysPath = function(){
	var url = location.href;
	var path = url.length - url.replace(/\//g,"").length - 4;
	var str = "";
	for(var i = 0; i<path;i++){
		str += "../";
	}
	return str;
}

var urlPath = TT.SysPath() + "../System/";
var icoPath = TT.SysPath() + "../static/image/default/";

(function(window,undefined) {
	
//	var TT = function(selector, context ) {
//			return new TT.fn.init( selector, context );
//		},
//		_TT = window.TT,
//		_$ = window.$,
//		document = window.document;
//	
//		TT.fn = TT.prototype = {
//			init: function( selector, context ) {
//				alert('哈')
//			}
//		}
	
	
//	if (TT.onlyone) {
//		return ;
//	}
//	TT.onlyone = window.navigator.onlyone;
	var getscript
	, jsrc
	, jspath
	, args = {}
	, jspath = TT.SysPath() + "../static/js/"
	, csspath = TT.SysPath() +"../static/image/default/"
	, toString = Object.prototype.toString
	, ua = navigator.userAgent.toLowerCase()
	, check = function(r) {
		return r.test(ua);
	}
	, WIN = window
	, DOC = document
	, PWIN = WIN == top
	, docMode = DOC.documentMode
	, isStrict = DOC.compatMode == "CSS1Compat"
	, getscript = DOC.getElementsByTagName("SCRIPT")
	, isOpera = check(/opera/)
	, isChrome = check(/\bchrome\b/)
	, isWebKit = check(/webkit/)
	, isSafari = !isChrome && check(/safari/)
	, isSafari2 = isSafari && check(/applewebkit\/4/) // unique to Safari 2
	, isSafari3 = isSafari && check(/version\/3/)
	, isSafari4 = isSafari && check(/version\/4/)
	, isIE = !isOpera && check(/msie/)
	, isIE7 = isIE && (check(/msie 7/) || docMode == 7)
	, isIE8 = isIE && (check(/msie 8/) && docMode != 7)
	, isIE9 = isIE && (check(/msie 9/) && docMode != 7)
	, isIE6 = isIE && !isIE7 && !isIE8 && !isIE9
	, isGecko = !isWebKit && check(/gecko/)
	, isGecko2 = isGecko && check(/rv:1\.8/)
	, isGecko3 = isGecko && check(/rv:1\.9/)
	, isBorderBox = isIE && !isStrict
	, isWindows = check(/windows|win32/)
	, isMac = check(/macintosh|mac os x/)
	, isAir = check(/adobeair/)
	, isLinux = check(/linux/)
	, isSecure = /^https/i.test(WIN.location.protocol)
	, location = window.location.href
	, allurl = loaction = location.substr(0, location.indexOf("?") ==  - 1 ? location.lenght : location.indexOf("?"))
	, atips = "<div class='msgtips'><img src='/System/static/image/admincp/ajaxloading.gif' align='absmiddle'> 正在加载数据，请稍后...</div>";
	
	if (isIE6) {
		try {
			DOC.execCommand("BackgroundImageCache", false, true);
		} catch (e) {}
	}
	
	TT.apply(TT	,{
		PWIN: PWIN,
		docMode: docMode,
		isStrict: isStrict,
		isEmpty: function(v, allowBlank) {
			return v === null || v === undefined || ((TT.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
		},
		isArray: function(v) {
			return toString.apply(v) === '[object Array]';
		},
		isDate: function(v) {
			return toString.apply(v) === '[object Date]';
		},
		isObject: function(v) {
			return !!v && Object.prototype.toString.call(v) === '[object Object]';
		},
		isPrimitive: function(v) {
			return TT.isString(v) || TT.isNumber(v) || TT.isBoolean(v);
		},
		isFunction: function(v) {
			return toString.apply(v) === '[object Function]';
		},
		isNumber: function(v) {
			return typeof v === 'number' && isFinite(v);
		},
		isString: function(v) {
			return typeof v === 'string';
		},
		isBoolean: function(v) {
			return typeof v === 'boolean';
		},
		isElement: function(v) {
			return v ? !!v.tagName : false;
		},
		isDefined: function(v) {
			return typeof v == 'undefined';
		},
		isOpera: isOpera,
		isWebKit: isWebKit,
		isChrome: isChrome,
		isSafari: isSafari,
		isSafari3: isSafari3,
		isSafari4: isSafari4,
		isSafari2: isSafari2,
		isIE: isIE,
		isIE6: isIE6,
		isIE7: isIE7,
		isIE8: isIE8,
		isGecko: isGecko,
		isGecko2: isGecko2,
		isGecko3: isGecko3,
		isBorderBox: isBorderBox,
		isLinux: isLinux,
		isWindows: isWindows,
		isMac: isMac,
		isAir: isAir,
		applyIf: function(o, c) {
			if (o) {
				for (var p in c) {
					if (!TT.isDefined(o[p])) {
						o[p] = c[p];
					}
				}
			}
			return o;
		},
		Request: {
			QueryString: function(val) {
				var uri = window.location.search;
				var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
				return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
			},
			QueryStrings: function() {
				var uri = window.location.search;
				var re = /\w*\=([^\&\?]*)/ig;
				var retval = [];
				while ((arr = re.exec(uri)) != null) {
					retval.push(arr[0]);
				}
				return retval;
			},
			setQuery: function(val1, val2) {
				var a = this.QueryStrings();
				var retval = "";
				var seted = false;
				var re = new RegExp("^" + val1 + "\=([^\&\?]*)$", "ig");
				for (var i = 0; i < a.length; i++) {
					if (re.test(a[i])) {
						seted = true;
						a[i] = val1 + "=" + val2;
					}
				}
				retval = a.join("&");
				return "?" + retval + (seted ? "" : (retval ? "&" : "") + val1 + "=" + val2);
			}
		},
		location: location,
		allurl: allurl,
		atips: atips,
		gWinSize: function() {
			var windowWidth = $("body").width();
			var windowHeight = $("body").height();
			return [windowWidth, windowHeight];
		},
		ua:ua
	});
	
	getscript = (getscript)[getscript.length - 1];
	(jsrc = (getscript).src.replace(/\s/, "")).replace(/(\w+)=([^&]+)/g, function(a, b, c) {
		args[b] = a = c;
	});
	
	/** 加载CSS文件 */
	impcss = function(cssFile) {
		var tmp = "<link rel='stylesheet' href='@path@@cssFile@.css' type='text/css' media='all'/>";
		DOC.write(tmp.replace(/@path@/, csspath).replace(/@cssFile@/, cssFile));
	};
	
	/** 加载SCRIPT文件 */
	impscp = function(scpFile) {
		var tmp = "<script type='text/javascript'>document.getElementById('loading_msg').innerHTML = 'loading " + scpFile + "...';</script>";
		DOC.write(tmp);
		var tmp = "<script type='text/javascript' src='@path@@jsFile@.js'></script>";
		DOC.write(tmp.replace(/@path@/, jspath).replace(/@jsFile@/, scpFile));
	};
	
	/** 加载SCRIPT文件 */
	impinclude = function(args) {
		var tmp = args ? args.split(",") : [];
		if (tmp == undefined || tmp == "") {
			return false;
		}
		for (var i = 0; i < tmp.length; i++) {
			impscp(tmp[i]);
		}
		DOC.write("<script type='text/javascript'>document.getElementById('loading_msg').innerHTML = 'Initializing...';</script>");
	}(args.lib);
	
	TT.createScript = function(src){
		var scriptNode = document.createElement("script");
		scriptNode.type = "text/javascript";
		scriptNode.src = src;
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	}
	
	/**
	 * 异步加载脚本
	 * @method loadJs
	 * @static
	 * @param { String } url Javascript文件路径
	 * @param { Function } callback (Optional) Javascript加载后的回调函数
	 * @param { Option } options (Optional) 配置选项，例如charset
	 */
	TT.loadJs = function(url, callback, options) {
		options = options || {};
		var head = document.getElementsByTagName('head')[0] || document.documentElement,
			script = document.createElement('script'),
			done = false;
		script.src = url;
		if (options.charset) {
			script.charset = options.charset;
		}
		script.onerror = script.onload = script.onreadystatechange = function() {
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				if (callback) {
					callback();
				}
				script.onerror = script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			}
		};
		head.insertBefore(script, head.firstChild);
	}
	
	//替换CSS样式
	TT.LeftWDCss = function(w1,c1,c2) {
		var ol = $("#o-l");
		w1?ol.removeClass(c1).addClass(c2):ol.removeClass(c2).addClass(c1);
	}
	
	//内容区加载URL
	TT.IframeMask = function(file) {
		iframe_0.location.href = urlPath + file;
	}
	// 顶部标题导航	
	TT.SYSNav_ = (function(){
		return {
			init : function(){},
			currentCss : function(obj){//当前CSS样式
				obj.addClass("current").siblings().removeClass("current");		
			},
			HideLeft : function(hide,obj){
				var left = $("#o-l");
				if (hide) {
					left.removeClass("l-on").addClass("l-off");
					obj.addClass("a-off");
				} else {
					left.removeClass("l-off").addClass("l-on");
					obj.removeClass("a-off");
				}
			},
			LeftSubSH : function(obj){//显示隐藏左侧菜单
				obj.show().siblings().hide();	
			},
			LeftName : function(name){//当前left标题
				$(".x-l-tc tt").text(name);		
			},
			LeftCss : function(id){}
		}
	})();
	
	TT.SYSNav = function(options) {
		var defaults = {
			obj:this,
			left:{
				id:"",
				name:"",
				hide:false
			},
			main:{
				url:""
			},
			callback:{}
		}
		var ops,leftobj
		ops = TT.apply({},options,defaults);
		var obj = this.isElement(ops.obj)?$(ops.obj):$("#" + ops.obj);
		if(ops.left.id!=''){
			var leftobj = this.isElement(ops.left.id)?$(ops.id):$("#" + ops.left.id);
			TT.LeftWDCss(ops.left.id=="LeftMP",'w150','w180');
			TT.SYSNav_.LeftSubSH(leftobj);
			TT.SYSNav_.LeftName(ops.left.name);
			TT.SYSNav_.HideLeft(ops.left.hide,$("#c-m-n"));
			var ItemUl = (function(){
				var ItemUl = leftobj.find('ul');
				var listHeight = leftobj.height()-(ItemUl.length*31);
				leftobj.find(".IsShow").height(listHeight).find("iframe").height(listHeight);
			})();
			
		}
		TT.SYSNav_.currentCss(obj);
		ops.main && this.IframeMask(ops.main);
		this.isFunction(ops.callback) && ops.callback.call(this,ops);
		obj = null
	}

	// 左边菜单
	TT.LeftNav = function(options) {
		var defaults = {
			id : "",
			name : "", 
			main : "",
			callback : {}
		}
		var obj,ops
		var ops = TT.apply({},options,defaults);
		if(ops.id!=""){
			var obj = this.isElement(ops.id)?$(ops.id):$("#" + ops.id);
			obj.parents(".l-m").find("li").removeClass("current");
			obj.addClass("current");
		}
		ops.main && TT.IframeMask(ops.main);
		this.isFunction(ops.callback) && ops.callback.call(this,ops);
		id = ops = null;
	}

	// 左边菜单
	TT.LeftSubNav = function(obj) {
		var obj = $(obj);
		var pleftsub = obj.parent(".leftsub");
		if (pleftsub.attr("class") == "leftsub") {
			pleftsub.addClass("desc");
			obj.siblings("ol").show();
		} else {
			pleftsub.removeClass("desc");
			obj.siblings("ol").hide();
		}
		obj = null
	}
	
	var trr;
	TT.PortalLink = function(tr,filepath){
		var CS_ID = TT.Request.QueryString("CS_ID");
		$("#ttr"+trr).removeClass("current");
		$("#ttr"+tr).addClass("current");
		parent.TT.IframeMask(filepath);
		trr = tr
	}

	// 更改系统选项卡标签文字
	TT.currentTab = function(options) {
		var defaults = {
			title: '',
			icoCls: "",
			tabtitle: "",
			current: "",
			callback: {},
			lefttitle: ""
		}
		var ops = TT.apply({},options,defaults);
		if (ops.title) {
			top.document.title = 'CIM CMS 管理中心' + ops.title;
		}
		ops.icoCls && parent.$(".b-m-n .current .ico").addClass(ops.icoCls);
		ops.tabtitle && parent.$(".b-m-n .current tt").text(ops.tabtitle);
		ops.current && parent.$('#m-b .nav').html("当前位置：" + ops.current);
		ops.lefttitle && $(".x-l-tc tt").text(ops.lefttitle);
		this.isFunction(ops.callback) && ops.callback.call(this,ops);
	}

	// 隐藏内容区遮照
	TT.HideMask = function() {
		$('#ifr_mask').fadeOut(800, function() {
			$('#ifr_loading').hide();
			$(this).hide();
		});
	}

	// 显示隐藏左边框架
	TT.HideLeft = function(obj) {
		var obj = $(obj);
		var _left = $("#o-l");
		if (obj.data('l-on') == 1 || _left.is(":hidden")) {
			_left.removeClass("l-off").addClass("l-on");
			obj.removeClass("a-off");
			obj.data('l-on', 0);
		} else {
			_left.removeClass("l-on").addClass("l-off");
			obj.addClass("a-off");
			obj.data('l-on', 1);
		}
		return false;
	}
	
	// 重置遮照大小
	TT.resizeMask = function() {
		var ifrmask = $("#ifr_mask");
		if (ifrmask.length>0) {
			var ifm = $("#main_ifm");
			var ifrloading = $('#ifr_loading');
			ifrmask.width(ifm.width()).height(ifm.height());
			ifrloading.show();
		}
	}
	
	//获取checkbox 选中值
	TT.getChecked = function(name) {
		var ArrVal = $("input[name=" + name + "]:checked").map(function(){
			return this.value;
		}).get().join(',');
		return ArrVal;
	}
	
	TT.Isconfirm = function(name,m){
		var msg = [],m = !isNaN(m)?m:1;
		var id = TT.getChecked(name);
		if (id!=""){
			msg[1] = "此操作将删除选中项目，确认吗？";
			tem=confirm(msg[m]);
			if (tem==false){return false}
		}
		return true;
	}
	
	// 更换其它AJAX
	TT.TTajax = function(options) {
		var defaults = {
			global: false,
			beforeSend: {},
			complete: {},
			type: 'POST',
			dataType: 'JSON',
			timeout: 50000,
			data: "",
			error: {},
			success: {},
			url: TT.allurl
		}
		var ops = TT.apply({},options,defaults);
		
		this.ajaxErr = function(XMLHttpRequest){
			alert('错误代码:' + XMLHttpRequest.responseText);	
		}
		
		this.beforeSend = function(){
			$("#ajax_tip").show();
		}
	
		this.complete = function(){
			$("#ajax_tip").hide();
		}
		$.ajax({
			global: ops.global,
			beforeSend: ops.global?this.beforeSend:this.isFunction(ops.beforeSend) && ops.beforeSend,
			complete: ops.global?this.complete:this.isFunction(ops.complete) && ops.complete,
			type: ops.type,
			url: ops.url + (/\?/.test(ops.url) ? "&" : "?") + "IsAjax=1&s=" + Math.random(),
			dataType: ops.dataType,
			data: ops.data,
			timeout: ops.timeout,
			error: TT.isFunction(ops.error) && ops.error || this.ajaxErr,
			success: TT.isFunction(ops.success) && ops.success
		});
	}
	
	// 简化跳转
	TT.redirect = function(url) {
		window.location.replace(url);
	}
	
	// 选checkbox
	TT.checkboxAll = function(obj, el, type) {
		var this_,trthis_
		if (type == undefined) {
			if (obj.checked == true || obj.checked == "true") {
				$("input[name='" + el + "']").each(function() {
					$(this).attr("checked", true);
					$("#tr" + this.value).addClass("trchecked");
				});
			} else {
				$("input[name='" + el + "']").each(function() {
					$(this).attr("checked", false);
					$("#tr" + this.value).removeClass("trchecked");
				});
			}
		} else if (type == 1) {
			$("input[name='" + el + "']").each(function() {
				this_ = $(this);
				trthis_ = $("#tr" + this.value);
				this_.attr("checked", !this.checked);
				!this.checked?trthis_.removeClass("trchecked"):trthis_.addClass("trchecked");
			});
		}
	}
	
	//创建无模对话框
	TT.winDialog = function(url, width, height) {
		ModalDialog_(url, width, height);
		return false;
	}
	function ModalDialog_(url, width, height, optValidate) {
		if (optValidate) {
			if (!validateMode()) {
				return ;
			}
		}
		var arr = showModalDialog(url, window, "dialogWidth:" + width + "px;dialogHeight:" + height + "px;help:no;scroll:no;status:no");
	}
	
	//window.open
	TT.winOpen = function(url, t, l, w, h) {
		newWindow = window.open(url, 'win', 'resizable=yes,scrollbars=yes,status=no,toolbar=no,location=no,menu=no,left=' + l + ',top=' + t + ',width=' + w + ',height=' + h + '');
		newWindow.focus();
	}
	
	var Boxdefaults = {
		id: "divBox",
		zIndex: 1000,
		title: "",
		content: "",
		ok: null,
		okVal: "",
		cancel: null,
		cancelVal: "",
		button: [],
		width: "",
		height: "",
		fixed: true,
		follow: "",
		left: "50%",
		top: "38%",
		lock: true,
		background: "#ffffff",
		opacity: 0.4,
		icon: "",
		padding: "20px 25px",
		time: "",
		resize: false,
		drag: true,
		esc: false,
		show: true,
		init: function() {
		},
		close: function() {
		},
		path: csspath
	}
	//打开div弹窗
	TT.winD = function(options) {
		var ops = TT.apply({},options,Boxdefaults);
		art.dialog(ops);
	}
	
	TT.winDD = function(url, options, cache) {
		var ops = TT.apply({},options,Boxdefaults);
		art.dialog.open(url, ops, cache);
	}
	
	TT.AutoSelectTabs = function(id){
		var id = TT.cookie(id)||id;
		$("#"+id).addClass("current").siblings().removeClass("current");	
		$("#"+id+"_sub").show().siblings().not("#nohid").hide()
	}

	TT.in_array = function(needle, haystack) {
		if(typeof needle == 'string' || typeof needle == 'number') {
			for(var i in haystack) {
				if(haystack[i] == needle) {
						return true;
				}
			}
		}
		return false;
	}
	
	TT.setMenuPosition = function (showid, menuid, pos) {
		var showObj = $("#" + showid);
		var menuObj = menuid ? $("#" + menuid) : $("#" + showid + '_menu');
		if(this.isDefined(pos) || !pos) pos = '43';
		var basePoint = parseInt(pos.substr(0, 1));
		var direction = parseInt(pos.substr(1, 1));
		var important = pos.indexOf('!') != -1 ? 1 : 0;
		var sxy = 0, sx = 0, sy = 0, sw = 0, sh = 0, ml = 0, mt = 0, mw = 0, mcw = 0, mh = 0, mch = 0, bpl = 0, bpt = 0;
	
		if(!menuObj || !showObj) return;
		if(showObj) {
			sxy = showObj.offset();
			sx = sxy.left;
			sy = sxy.top;
			sw = showObj.outerWidth();
			sh = showObj.outerHeight();
		}
		mw = menuObj.outerWidth();
		mh = menuObj.outerHeight();
		var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		switch(basePoint) {
			case 1:
				bpl = sx;
				bpt = sy;
				break;
			case 2:
				bpl = sx + sw;
				bpt = sy;
				break;
			case 3:
				bpl = sx + sw;
				bpt = sy + sh;
				break;
			case 4:
				bpl = sx;
				bpt = sy + sh;
				break;
		}
		switch(direction) {
			case 0:
				menuObj.style.left = ($("body").width() - menuObj.width()) / 2 + 'px';
				mt = ($("body").height() - menuObj.height()) / 2;
				break;
			case 1:
				ml = bpl - mw;
				mt = bpt - mh;
				break;
			case 2:
				ml = bpl;
				mt = bpt - mh;
				break;
			case 3:
				ml = bpl;
				mt = bpt;
				break;
			case 4:
				ml = bpl - mw;
				mt = bpt;
				break;
		}
		
		if(!important) {
			if(TT.in_array(direction, [1, 4]) && ml < 0) {
				ml = bpl;
				if(TT.in_array(basePoint, [1, 4])) ml += sw;
			} else if(ml + mw > scrollLeft + document.body.clientWidth && sx >= mw) {
				ml = bpl - mw;
				if(TT.in_array(basePoint, [2, 3])) {
					ml -= sw;
				} else if(basePoint == 4) {
					ml += sw;
				}
			}
			if(TT.in_array(direction, [1, 2]) && mt < 0) {
				mt = bpt;
				if(TT.in_array(basePoint, [1, 2])) mt += sh;
			} else if(mt + mh > scrollTop + document.documentElement.clientHeight && sy >= mh) {
				mt = bpt - mh;
				if(TT.in_array(basePoint, [3, 4])) mt -= sh;
			}
		}
		menuObj.css({"top":mt,"left":ml,"position":"absolute"});
	}

	TT.ShowMenu = function(v){
		var ctrlid = this.isDefined(v['ctrlid']) ? v : v['ctrlid'];
		var showid = this.isDefined(v['showid']) ? ctrlid : v['showid'];
		var menuid = this.isDefined(v['menuid']) ? showid + '_menu' : v['menuid'];
		var ctrlObj = $("#"+ctrlid);
		var menuObj = $("#"+menuid);
		if(!menuObj) return;
		var group = this.isDefined(v['group']) ? 'group' : v['group'];
		var layer = this.isDefined(v['layer']) ? 1 : v['layer'];
		var timeout = this.isDefined(v['timeout']) ? 250 : v['timeout'];
		var cache = this.isDefined(v['cache']) ? 1 : v['cache'];
		var evt = this.isDefined(v['evt']) ? 'mouseover' : v['evt'];
		var pos = this.isDefined(v['pos']) ? '43' : v['pos'];
		if(ctrlObj) {
			if(!ctrlObj.attr('initialized')) {
				ctrlObj.attr({'initialized':true,'unselectable':true});
				ctrlObj.mouseDelay(false, group).hover(function () {
				}, function () {
					menuObj.hide();
				});
			}
		}
		
		if(!menuObj.attr('initialized')) {
			menuObj.attr({'initialized':true});
			menuObj.mouseDelay(false, group).hover(null, function () {
				menuObj.hide();
			});
		}
				
		if(pos != '*') {
			TT.setMenuPosition(showid, menuid, pos);
		}
		menuObj.show();
	}

	TT.share = {
		data: function (name, value) {
			var top = window.top,
				cache = top['_CACHE'] || {};
			top['_CACHE'] = cache;
	
			return value ? cache[name] = value : cache[name];
		},
		removeData: function (name) {
			var cache = window.top['_CACHE'];
			if (cache && cache[name]) delete cache[name];
		}
	};

	TT.onWindowResize = function() {
		//事件队列
		var queue = [],
	
		indexOf = Array.prototype.indexOf ||
		function() {
			var i = 0,
			length = this.length;
			for (; i < length; i++) {
				if (this[i] === arguments[0]) {
					return i;
				}
			}
	
			return - 1;
		};
	
		var isResizing = {},
		lazy = true,
		listener = function(e) { 
			var h = window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || document.body.clientHeight,
			w = window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || document.body.clientWidth;
	
			if (h === isResizing.h && w === isResizing.w) {
				return;
	
			} else {
				e = e || window.event;
	
				var i = 0,
				len = queue.length;
				for (; i < len; i++) {
					queue[i].call(this, e);
				}
	
				isResizing.h = h,
				isResizing.w = w;
			}
		}
	
		return {
			add: function(fn) {
				if (typeof fn === 'function') {
					if (lazy) {
						if (window.addEventListener) {
							window.addEventListener('resize', listener, false);
						} else {
							window.attachEvent('onresize', listener);
						}
	
						lazy = false;
					}
	
					queue.push(fn);
				} else {}
	
				return this;
			},
			remove: function(fn) {
				if (typeof fn === 'undefined') {
					queue = [];
				} else if (typeof fn === 'function') {
					var i = indexOf.call(queue, fn);
	
					if (i > -1) {
						queue.splice(i, 1);
					}
				}
	
				return this;
			}
		};
	}.call(this);

	
	TT.cookie = function(name, value, options) {
		if (typeof value != 'undefined') {
			// name and value given, set cookie
			options = options || {};
			if (value === null) {
				value = '';
				options.expires =  - 1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString();
			}
			var path = options.path ? '; path=' + options.path : '';
			var domain = options.domain ? '; domain=' + options.domain : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else {
			// only name given, get cookie
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = jQuery.trim(cookies[i]);
					// Does this cookie string begin with the name we want?
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
	};

	function KeyDown(){ 
		//alert(event.keyCode);
		//屏蔽 Alt+ 方向键 ← 屏蔽 Alt+ 方向键 → 
		if ((event.altKey)&&((event.keyCode==37)||(event.keyCode==39))){
			//alert("不准你使用ALT+方向键前进或后退网页！"); 
			event.returnValue=false; 
		} 
		//屏蔽 F3、F4、F5 、F6、F1
		if ((event.keyCode==114)||(event.keyCode==116)||(event.keyCode==117)||(event.keyCode==122)){
			event.keyCode=0;return false;
		} 
		//屏蔽Ctrl + R 
		if ((event.ctrlKey) && (event.keyCode==82)){ 
			event.keyCode=0; 
			event.returnValue=false; 
		} 
		//屏蔽 Ctrl+n 
		if ((event.ctrlKey)&&(event.keyCode==78)){ 
			event.returnValue=false; 
		} 
		//屏蔽 shift+F10 
		if ((event.shiftKey)&&(event.keyCode==121)){ 
			event.returnValue=false; 
		} 
		//屏蔽 shift 加鼠标左键新开一网页 
		if (window.event.srcElement.tagName == "A" && window.event.shiftKey){ 
			window.event.returnValue = false; 
		} 
		//屏蔽Alt+F4 
		if ((window.event.altKey)&&(window.event.keyCode==115)){ 
			window.showModelessDialog("about:blank","","dialogWidth:1px;dialogheight:1px"); 
			return false; 
		} 
		//屏蔽Ctrl+A 
		if((event.ctrlKey)&&(event.keyCode==65)){ 
			return false; 
		}
		
		//屏蔽退格backspace
		if((event.keyCode == 8)&&(event.srcElement.type != "text" && event.srcElement.type != "textarea" && event.srcElement.type != "password")){ 
			return false; 
		}
		
	} 
	document.onkeydown = KeyDown;
	//屏蔽IE帮助
	//document.oncontextmenu = function(){ return false; };
	window.onhelp = function(){ return false; };
	window.TT = window.$$ = TT;
	
})(window);

;(function($) {
	$.fn.BindTabs = function(options){
		var defaults = {
			tabsid:"tabs",
			auto:true
		}
		var ops = $.extend({},defaults, options);
		var this_ = $(this);
		this_.click(function(){
			id = this.id;
			var cell = $(this);
			cell.addClass("current").siblings().removeClass("current");
			$("#"+id+"_sub").show().siblings().not("#nohid").hide();
			TT.cookie(ops.tabsid,this.id);
		})
		if(ops.auto==true){TT.AutoSelectTabs(ops.tabsid);}
	}	
	$.fn.ConfigLi = function(){
		var this_ = $(this);
		this_.click(function(){
			var cell = $(this);
			$("input",cell).attr("checked",true)
			//cell.addClass("checked").siblings().removeClass("checked");
		})
	}
	
})(jQuery);

(function($,plugin) {
	var data = {}, id = 1, etid = plugin + 'ETID';
	
	// 延时构造器
	$.fn[plugin] = function (speed, group) {
		id ++;	
		group = group || this.data(etid) || id;
		speed = speed || 250;
		
		// 缓存分组名称到元素
		if (group === id) this.data(etid, group);
		
		// 暂存官方的hover方法
		this._hover = this.hover;
		
		// 伪装一个hover函数，并截获两个回调函数交给真正的hover函数处理
		this.hover = function (over, out) {
			over = over || $.noop;
			out = out || $.noop;
			this._hover(function (event) {
				var elem = this;
				clearTimeout(data[group]);
				data[group] = setTimeout(function () {
					over.call(elem, event);
				}, speed);
			}, function (event) {
				var elem = this;
				clearTimeout(data[group]);
				data[group] = setTimeout(function () {
					out.call(elem, event);
				}, speed);
			});
			
			return this;
		};
		
		return this;
	};
	
	// 冻结选定元素的延时器
	$.fn[plugin + 'Pause'] = function () {
		clearTimeout(this.data(etid));
		return this;
	};
	
	// 静态方法
	$[plugin] = {
		// 获取一个唯一分组名称
		get: function () {
			return id ++;
		},
		// 冻结指定分组的延时器
		pause: function (group) {
			clearTimeout(data[group]);
		}
	};
	
})(jQuery,'mouseDelay');

(function($) {
    var a = {},
    c = "doTimeout",
    d = Array.prototype.slice;
    $[c] = function() {
        return b.apply(window, [0].concat(d.call(arguments)))
    };
    $.fn[c] = function() {
        var f = d.call(arguments),
        e = b.apply(this, [c + f[0]].concat(f));
        return typeof f[0] === "number" || typeof f[1] === "number" ? this: e
    };
    function b(l) {
        var m = this,
        h, k = {},
        g = l ? $.fn: $,
        n = arguments,
        i = 4,
        f = n[1],
        j = n[2],
        p = n[3];
        if (typeof f !== "string") {
            i--;
            f = l = 0;
            j = n[1];
            p = n[2]
        }
        if (l) {
            h = m.eq(0);
            h.data(l, k = h.data(l) || {})
        } else {
            if (f) {
                k = a[f] || (a[f] = {})
            }
        }
        k.id && clearTimeout(k.id);
        delete k.id;
        function e() {
            if (l) {
                h.removeData(l)
            } else {
                if (f) {
                    delete a[f]
                }
            }
        }
        function o() {
            k.id = setTimeout(function() {
                k.fn()
            },
            j)
        }
        if (p) {
            k.fn = function(q) {
                if (typeof p === "string") {
                    p = g[p]
                }
                p.apply(m, d.call(n, i)) === true && !q ? o() : e()
            };
            o()
        } else {
            if (k.fn) {
                j === undefined ? e() : k.fn(j === false);
                return true
            } else {
                e()
            }
        }
    }
})(jQuery);

$(document).ready(function(){
	//自适应窗口大小
	var thisResize = $('body').find(".onResize").length;
	if(thisResize!=0){
		var mainResize = function(){
			var SW,SH,WIN = $(window),H = WIN.height(),WW = WIN.width();
			$(".onResize").each(function (index, domEle) {
				SH = $(domEle).attr("h")
				$(domEle).css({height:H-SH});
			})
		}
		mainResize();
		TT.onWindowResize.add(mainResize);
	}
	// 更改滚动条
	if(TT.isIE6){
		if($("html")[0].scrollHeight>$("html").height()){
			$("html").css("overflowY","scroll");
		}
	}
//	$("<input>",{
//		type:"text",
//		id:"_method",
//		val:"yes",
//		name:"_method"
//	}).appendTo("form");
});
// DOOCAL
// 2011.02.17
window.undefined=window.undefined;
var JSMENU = [];
JSMENU['timer'] = [];
JSMENU['active'] = [];
JSMENU['layer'] = 0;

TT = {
	version: '1.1.2',
	update: '2012-1-6'
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

(function(window,undefined) {
	if (TT.onlyone) {
		return ;
	}
	TT.onlyone = window.navigator.onlyone;
	var getscript
	, jsrc
	, jspath
	, args = {}
	, jspath = "/Static/home/"
	, csspath = "/Images/"
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
	, isIE6 = isIE && !isIE7 && !isIE8
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
	, atips = "<div class='msgtips'>正在加载数据，请稍后...</div>";

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
		request: {
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
		}
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
		var tmp = "<script type='text/javascript' src='@path@@jsFile@.js'></script>";
		DOC.write(tmp.replace(/@path@/, jspath).replace(/@jsFile@/, scpFile));
	};
	
	/** 加载SCRIPT文件 */
	impinclude = function(args) {
		var tmp = args ? args.split(",") : [];
		if (tmp == undefined) {
			return false;
		}
		if (tmp == "") {
			return ;
		}
		for (var i = 0; i < tmp.length; i++) {
			impscp(tmp[i]);
		}
	}(args.lib);
	
	TT.createScript = function(src){
		var scriptNode = document.createElement("script");
		scriptNode.type = "text/javascript";
		scriptNode.src = src;
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	}
	//替换CSS样式
	TT.reClass = function(obj,c1,c2) {
		$("#" + obj).removeClass(c1).addClass(c2);
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
			$("#ajaxmsg").show();
		}
	
		this.complete = function(){
			$("#ajaxmsg").hide();
		}
		
		$.ajax({
			global: ops.global,
			beforeSend: ops.global?this.beforeSend:this.isFunction(ops.beforeSend) && ops.beforeSend,
			complete: ops.global?this.complete:this.isFunction(ops.complete) && ops.complete,
			type: ops.type,
			url: ops.url + (ops.url.indexOf("?") ==  - 1 ? '?' : '&') + "s=" + Math.random(),
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
	
	//打开div弹窗
	TT.winD = function(options) {}
	
	TT.winDD = function(url, options, cache) {	}
		
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
	//document.onkeydown = KeyDown;
	//屏蔽IE帮助
	//window.onhelp = function(){ return false; };
	window.TT = window.$$ = TT;
	
})(window);

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

$(document).ready(function(){
	//自适应窗口大小
//	var thisResize = $('body').find(".Resize").length;
//	if(thisResize!=0){
//		var mainResize = function(){
//			var w = $(window);
//			var H = w.height();
//			var W = w.width();
//			$(".Resize").each(function (index, domEle) {
//				$(domEle).css({height:H-$(domEle).attr("ResizeAttr")});
//			})
//		}
//		mainResize();
//		TT.onWindowResize.add(mainResize);
//	}
});
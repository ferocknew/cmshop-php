/*
	[Discuz!] (C)2001-2009 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: calendar.js 21580 2011-04-01 02:22:19Z svn_project_zhangjie $
*/

var controlid = null;
var currdate = null;
var startdate = null;
var enddate  = null;
var yy = null;
var mm = null;
var hh = null;
var ii = null;
var currday = null;
var addtime = false;
var today = new Date();
var lastcheckedyear = false;
var lastcheckedmonth = false;

function loadcalendar() {
	s = '';
	s += '<div id="calendar" style="display:none; position:absolute; z-index:100000;" onclick="doane(event)">';
	s += '<div style="width: 210px;"><table cellspacing="0" cellpadding="0" width="100%" style="text-align: center;">';
	s += '<tr align="center" id="calendar_week"><td><a href="javascript:;" onclick="refreshcalendar(yy, mm-1)" title="上一月">&laquo;</a></td><td colspan="5" style="text-align: center"><a href="javascript:;" onclick="showdiv(\'year\');doane(event)" class="dropmenu" title="点击选择年份" id="year"></a>&nbsp; - &nbsp;<a id="month" class="dropmenu" title="点击选择月份" href="javascript:;" onclick="showdiv(\'month\');doane(event)"></a></td><td><A href="javascript:;" onclick="refreshcalendar(yy, mm+1)" title="下一月">&raquo;</A></td></tr>';
	s += '<tr id="calendar_header"><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>';
	for(var i = 0; i < 6; i++) {
		s += '<tr>';
		for(var j = 1; j <= 7; j++)
			s += "<td id=d" + (i * 7 + j) + " height=\"19\">0</td>";
		s += "</tr>";
	}
	s += '<tr id="hourminute" class="pns"><td colspan="4" align="left"><input type="text" size="1" value="" id="hour" class="px vm" onKeyUp=\'this.value=this.value > 23 ? 23 : zerofill(this.value);controlid.value=controlid.value.replace(/\\d+(\:\\d+)/ig, this.value+"$1")\'> 点 <input type="text" size="1" value="" id="minute" class="px vm" onKeyUp=\'this.value=this.value > 59 ? 59 : zerofill(this.value);controlid.value=controlid.value.replace(/(\\d+\:)\\d+/ig, "$1"+this.value)\'> 分</td><td align="right" colspan="3"><button class="pn" onclick="confirmcalendar();"><em>确定</em></button></td></tr>';
	s += '</table></div></div>';
	s += '<div id="calendar_year" onclick="doane(event)" style="display: none;z-index:100001;"><div class="col">';
	for(var k = 2020; k >= 1931; k--) {
		s += k != 2020 && k % 10 == 0 ? '</div><div class="col">' : '';
		s += '<a href="javascript:;" onclick="refreshcalendar(' + k + ', mm);$(\'#calendar_year\').hide();"><span' + (today.getFullYear() == k ? ' class="calendar_today"' : '') + ' id="calendar_year_' + k + '">' + k + '</span></a><br />';
	}
	s += '</div></div>';
	s += '<div id="calendar_month" onclick="doane(event)" style="display: none;z-index:100001;">';
	for(var k = 1; k <= 12; k++) {
		s += '<a href="javascript:;" onclick="refreshcalendar(yy, ' + (k - 1) + ');$(\'#calendar_month\').hide();"><span' + (today.getMonth()+1 == k ? ' class="calendar_today"' : '') + ' id="calendar_month_' + k + '">' + k + ( k < 10 ? '&nbsp;' : '') + ' 月</span></a><br />';
	}
	s += '</div>';
	if(TT.isIE6) {
		s += '<iframe id="calendariframe" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
		s += '<iframe id="calendariframe_year" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
		s += '<iframe id="calendariframe_month" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
	}

	var div = document.createElement('div');
	div.innerHTML = s;
	$('#append_parent').html(div);
	document.onclick = function(event) {
		closecalendar(event);
	};
	$('#calendar').onclick = function(event) {
		doane(event);
		$('#calendar_year,#calendar_month').hide();
		if(TT.isIE6) {
			$('#calendariframe_year,#calendariframe_month').hide();
		}
	};
}
function closecalendar(event) {
	$('#calendar,#calendar_year,#calendar_month').hide();
	if(TT.isIE6) {
		$('#calendariframe,#calendariframe_year,#calendariframe_month').hide();
	}
}

function parsedate(s) {
	/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec(s);
	var m1 = (RegExp.$1 && RegExp.$1 > 1899 && RegExp.$1 < 2101) ? parseFloat(RegExp.$1) : today.getFullYear();
	var m2 = (RegExp.$2 && (RegExp.$2 > 0 && RegExp.$2 < 13)) ? parseFloat(RegExp.$2) : today.getMonth() + 1;
	var m3 = (RegExp.$3 && (RegExp.$3 > 0 && RegExp.$3 < 32)) ? parseFloat(RegExp.$3) : today.getDate();
	var m4 = (RegExp.$4 && (RegExp.$4 > -1 && RegExp.$4 < 24)) ? parseFloat(RegExp.$4) : 0;
	var m5 = (RegExp.$5 && (RegExp.$5 > -1 && RegExp.$5 < 60)) ? parseFloat(RegExp.$5) : 0;
	/(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec("0000-00-00 00\:00");
	return new Date(m1, m2 - 1, m3, m4, m5);
}

function settime(d) {
	if(!addtime) {
		$('#calendar,#calendar_month').hide();
		if(TT.isIE6) {
			$('#calendariframe').hide();
		}
	}
	controlid.value = yy + "-" + zerofill(mm + 1) + "-" + zerofill(d) + (addtime ? ' ' + zerofill($('#hour').val()) + ':' + zerofill($('#minute').val()) : '');
}

function confirmcalendar() {
	if(addtime && controlid.value === '') {
		controlid.value = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + zerofill($('#hour').val()) + ':' + zerofill($('#minute').val());
	}
	closecalendar();
}

function initclosecalendar() {
	var e = getEvent();
	var aim = e.target || e.srcElement;
	while (aim.parentNode != document.body) {
		if (aim.parentNode.id == 'append_parent') {
			aim.onclick = function () {closecalendar(e);};
		}
		aim = aim.parentNode;
	}
}
function showcalendar(event, controlid1, addtime1, startdate1, enddate1) {
	controlid = controlid1;
	addtime = addtime1;
	startdate = startdate1 ? parsedate(startdate1) : false;
	enddate = enddate1 ? parsedate(enddate1) : false;
	currday = controlid.value ? parsedate(controlid.value) : today;
	hh = currday.getHours();
	ii = currday.getMinutes();
	var p = $(controlid).offset();
	$('#calendar').css({left:p.left,top:p.top+20}).show();
	doane(event);
	refreshcalendar(currday.getFullYear(), currday.getMonth());
	if(lastcheckedyear != false) {
		$('#calendar_year_' + lastcheckedyear).addClass('calendar_default');
		$('#calendar_year_' + today.getFullYear()).addClass('calendar_today');
	}
	if(lastcheckedmonth != false) {
		$('#calendar_month_' + lastcheckedmonth).addClass('calendar_default');
		$('#calendar_month_' + (today.getMonth() + 1)).addClass('calendar_today');
	}
	$('#calendar_year_' + currday.getFullYear()).addClass('calendar_checked');
	$('#calendar_month_' + (currday.getMonth() + 1)).addClass('calendar_checked');
	$('#hourminute').css('display',addtime? '' : 'none');
	lastcheckedyear = currday.getFullYear();
	lastcheckedmonth = currday.getMonth() + 1;
	if(TT.isIE6) {
		var c = $('#calendar');
		var cp = c.offset();
		$('#calendariframe').css({left:cp.left,top:cp.top,width:c.outerWidth(),height:c.outerHeight()}).show();
	}
	initclosecalendar();
}

function refreshcalendar(y, m) {
	var x = new Date(y, m, 1);
	var mv = x.getDay();
	var d = x.getDate();
	var dd = null;
	yy = x.getFullYear();
	mm = x.getMonth();
	$("#year").html(yy);
	$("#month").html(mm + 1 > 9  ? (mm + 1) : '0' + (mm + 1));

	for(var i = 1; i <= mv; i++) {
		dd = $("#d" + i);
		dd.html("&nbsp;");
		dd.removeClass("calendar_checked");
	}

	while(x.getMonth() == mm) {
		dd = $("#d" + (d + mv));
		dd.html('<a href="javascript:;" onclick="settime(' + d + ');return false">' + d + '</a>');
		if(x.getTime() < today.getTime() || (enddate && x.getTime() > enddate.getTime()) || (startdate && x.getTime() < startdate.getTime())) {
			dd.removeAttr("class").addClass('calendar_expire');
		} else {
			dd.removeAttr("class").addClass('calendar_default');
		}
		if(x.getFullYear() == today.getFullYear() && x.getMonth() == today.getMonth() && x.getDate() == today.getDate()) {
			dd.removeAttr("class").addClass('calendar_today');
			dd.attr("title",'今天');
		}
		if(x.getFullYear() == currday.getFullYear() && x.getMonth() == currday.getMonth() && x.getDate() == currday.getDate()) {
			dd.addClass('calendar_checked');
		}
		x.setDate(++d);
	}

	while(d + mv <= 42) {
		dd = $("#d" + (d + mv));
		dd.html("&nbsp;");
		d++;
	}

	if(addtime) {
		$('#hour').val(zerofill(hh));
		$('#minute').val(zerofill(ii));
	}
}

function showdiv(id) {
	var p = $("#"+id);
	var cp = p.offset();
	$('#calendar_' + id).css({left:cp.left,top:cp.top}).show();
	if(TT.isIE6) {
		var p = $('#calendar_' + id);
		var cp = p.offset();
		$('#calendariframe_' + id).css({left:cp.left,top:cp.top,width:p.outerWidth(),height:p.outerHeight()}).show();
	}
}

function zerofill(s) {
	var s = parseFloat(s.toString().replace(/(^[\s0]+)|(\s+$)/g, ''));
	s = isNaN(s) ? 0 : s;
	return (s < 10 ? '0' : '') + s.toString();
}

function doane(event, preventDefault, stopPropagation) {
	var preventDefault = TT.isDefined(preventDefault) ? 1 : preventDefault;
	var stopPropagation = TT.isDefined(stopPropagation) ? 1 : stopPropagation;
	e = event ? event : window.event;
	if(!e) {
		e = getEvent();
	}
	if(!e) {
		return null;
	}
	if(preventDefault) {
		if(e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	}
	if(stopPropagation) {
		if(e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
	return e;
}

function getEvent() {
	if(document.all) return window.event;
	func = getEvent.caller;
	while(func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if((arg0.constructor  == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func=func.caller;
	}
	return null;
}

//if(!BROWSER.other) {
	impcss('calendar');
	loadcalendar();
//}
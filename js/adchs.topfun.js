/**
 * Common js for ADCHS
 * License: GPL 2.0
 * Author: Sun Junwen
 */
// Redirect for topfun.us
/**
 * 检测是否有指定名称的 Cookie
 */
function hasCookie(key) {
	return (new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
}

/**
 * 得到指定名称的 Cookie 值
 */
function getCookie(key) {
	if (!key || !jqCommon.hasCookie(key)) {
		return null;
	}
	return unescape(
		document.cookie.replace(
			new RegExp("(?:^|.*;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"),
			"$1"));
}

/**
 * 设置指定名称的 Cookie 值
 */
function setCookie(key, value) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + 1);
	var c_value = escape(value) + "; expires=" + exdate.toUTCString();
	document.cookie = key + "=" + c_value + "; path=/;";
}

var mirrorSunjw = "http://www.sunjw.us/adchs/";
var mirrorFreemind = "http://www.freemindworld.com/adchs/";
var mirrorApkbus = "http://www.apkbus.com/design/";
var targetMirror = 0;

var oldRedirect = 0;
if (hasCookie("mi")) {
	oldRedirect = getCookie("mi");
	if (oldRedirect == "ab") {
		targetMirror = mirrorApkbus;
	} else if (oldRedirect == "fm") {
		targetMirror = mirrorFreemind;
	} else if (oldRedirect == "sun") {
		targetMirror = mirrorSunjw;
	}
} else {
	var rand = Math.random();
	if (rand >= 0.8) {
		targetMirror = mirrorApkbus; // 20% apkbus
		setCookie("mi", "ab");
	} else if (rand >= 0.6) {
		targetMirror = mirrorFreemind; // 20% freemind
		setCookie("mi", "fm");
	} else if (rand >= 0.3) {
		targetMirror = mirrorSunjw; // 30% sunjw
		setCookie("mi", "sun");
	} else {
		// 30% keep on topfun
		setCookie("mi", "tf");
	}
}

if (targetMirror != 0) {
	var sub = "adchs";
	var curHref = window.location.href;
	var pos = curHref.indexOf(sub) + sub.length + 1; // pass '/'
	var path = curHref.substr(pos);
	targetMirror = targetMirror + path;
	
	window.location.href = targetMirror;
	//console.log(targetMirror);
}

// Menu Setup
jqFolding.setup({
	initState : "hide"
});

function menuFix() {
	var scrollLeftPos = (window.pageXOffset ||
		document.body.scrollLeft ||
		document.documentElement.scrollLeft);
	var scrollTopPos = (window.pageYOffset ||
		document.body.scrollTop ||
		document.documentElement.scrollTop);
	var windowHeight = $(window).height();
	var pageWrapperLeft = $("#pageWrapper").get(0).offsetLeft;

	var navWrapper = $("#navWrapper");
	//navWrapper.css("left", (0 - scrollLeftPos) + "px");
	if (scrollTopPos < 90) {
		navWrapper.css("position", "absolute");
		navWrapper.css("top", "100px");
		navWrapper.css("left", "0px");
		navWrapper.css("height", windowHeight - 110 + "px");
	} else {
		navWrapper.css("position", "fixed");
		navWrapper.css("top", "10px");
		navWrapper.css("left", pageWrapperLeft - scrollLeftPos + "px");
		navWrapper.css("height", windowHeight - 20 + "px");
	}
}

// Acronym tooltip
var tooltipDiv = 0;
function initTooltip() {
	if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
		// put an ad of firefox for old version IE
		var ffAdWrapper = $('<div/>');
		ffAdWrapper.addClass('divListwHeader').addClass('foldingList');
		var ffAd = $('<div/>').addClass('trigger');
		ffAd.html("<a target='_blank' href='//affiliates.mozilla.org/link/banner/29664'><img src='//affiliates.mozilla.org/media/uploads/banners/07a7168b3e66be69074c8a3b2e072b0a9e1fd3b2.png' alt='下載：更快、更棒、更好玩' /></a>");
		ffAdWrapper.append(ffAd);
		ffAdWrapper.insertBefore('#navWrapper > br.clear');
		return; // do nothing on acronym
	}

	$('acronym').hover(function () {
		var acronymLeft = this.offsetLeft;
		var acronymTop = this.offsetTop;
		var acronymTitle;
		if ($(this).attr('title')) {
			acronymTitle = $(this).attr('title');
			$(this).removeAttr('title');
			$(this).attr('titlex', acronymTitle);
		}
		acronymTitle = $(this).attr('titlex');

		if (tooltipDiv == 0) {
			tooltipDiv = $('<div/>');
			tooltipDiv.hide();
			tooltipDiv.addClass('tooltip');

			$('#pageWrapper').append(tooltipDiv);
		}

		tooltipDiv.css('left', acronymLeft + 'px');
		tooltipDiv.css('top', (acronymTop + 25) + 'px');

		tooltipDiv.html(acronymTitle);
		tooltipDiv.show();
	}, function () {
		if (tooltipDiv != 0) {
			tooltipDiv.hide();
		}
	});
}

// Init
$(function () {
	jqFolding.init();

	// Menu position fix
	window.onscroll = function () {
		menuFix();
	}
	window.onresize = function () {
		menuFix();
	}
	menuFix();

	// Auto play video
	$('video.clickPlay').click(function () {
		$(this).get(0).load();
		$(this).get(0).play();
	});

	initTooltip();
});

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-5927560-6']);
_gaq.push(['_trackPageview']);

(function () {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();

(function () {
	var po = document.createElement('script');
	po.type = 'text/javascript';
	po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
})();

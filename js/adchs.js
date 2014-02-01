/**
 * Common js for ADCHS
 * License: GPL 2.0
 * Author: Sun Junwen
 */
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

// footer
var footerLines = ["<a href=\"http://adchs.sourceforge.net\">Android Design 安卓设计非官方简体中文版</a>&nbsp;-&nbsp;<a href=\"http://www.sunjw.us/adchs\" target=\"_blank\">www.sunjw.us/adchs</a>&nbsp;-&nbsp;感谢&nbsp;<a href=\"http://www.topfun.us\" target=\"_blank\">topfun 同学</a>&nbsp;<a href=\"http://www.freemindworld.com\" target=\"_blank\">Li Fanxi</a>&nbsp;<a href=\"http://www.apkbus.com\" target=\"_blank\">安卓巴士</a>&nbsp;提供的&nbsp;<a href=\"http://www.topfun.us/adchs/\">镜像1</a>&nbsp;<a href=\"http://www.freemindworld.com/adchs\">镜像2</a>&nbsp;<a href=\"http://www.apkbus.com/design\">镜像3</a>。",
	"没有特别说明的话，所有内容按照 <a href=\"http://creativecommons.org/licenses/by/2.5/\" target=\"_blank\">Creative Commons Attribution 2.5</a> 协议授权。<br />基于 <a href=\"http://developer.android.com/design/\" target=\"_blank\">Android Design</a> 翻译而成，部分图片和设计样式也来自于 <a href=\"http://developer.android.com/design/\" target=\"_blank\">Android Design</a>。Android 是 Google 的商标。",
	"2012-2014&nbsp;-&nbsp;<a href=\"http://www.sunjw.us/blog\" target=\"_blank\">Sun Junwen</a>&nbsp;-&nbsp;sunjw8888 at gmail.com&nbsp;-&nbsp;<a href=\"http://www.sunjw.us/jstoolnpp/\" target=\"_blank\">JSToolNpp</a>&nbsp;-&nbsp;<a href=\"http://weibo.com/nusjw\" target=\"_blank\" title=\"Follow me on Weibo\"><img src=\"imgs/weibo-small.png\" alt=\"Follow me on Weibo\"/></a>&nbsp;<a href=\"http://www.renren.com/sunjwvista\" target=\"_blank\" title=\"Follow me on Renren\"><img src=\"imgs/renren-small.png\" alt=\"Follow me on Renren\"/></a>&nbsp;<a href=\"http://www.twitter.com/sunjw\" target=\"_blank\" title=\"Follow me on Twitter\"><img src=\"imgs/twitter-small.png\" alt=\"Follow me on Twitter\"/></a>&nbsp;<a href=\"http://www.facebook.com/profile.php?id=1444809914\" target=\"_blank\" title=\"Follow me on Facebook\"><img src=\"imgs/fb-small.png\" alt=\"Follow me on Facebook\"/></a>&nbsp;-&nbsp;<g:plusone size=\"small\"></g:plusone>"];

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function fillFooter() {
	var footerCont = $("#footer");

	var curUrl = window.location.href;
	var secondLevel = 0;
	if (curUrl.search("building-blocks/") != -1 ||
		curUrl.search("get-started/") != -1 ||
		curUrl.search("patterns/") != -1 ||
		curUrl.search("style/") != -1) {
		secondLevel = 1;
	}

	var lines = footerLines.length;
	var i = 0;
	for (; i < lines; ++i) {
		var line = footerLines[i];
		if (secondLevel) {
			line = replaceAll(line, "imgs/", "../imgs/");
		}

		var lineCont = $("<p/>");
		lineCont.html(line);
		if (i + 1 == lines) {
			lineCont.addClass("lastLine");
		}

		footerCont.append(lineCont);
	}
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

	fillFooter();
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

console.log('exkeleton-popup.js loaded');

var nMsgTimeout = 5000;

function callBgFunc(funcName, callback, arg1, arg2, arg3){
	chrome.runtime.getBackgroundPage(function(bgwin){
		var result = bgwin[funcName](arg1, arg2, arg3);
		callback && callback(result);
	});
}

function fadeIn(el){
	el.style.opacity = 1;
};

function fadeOut(el){
	el.style.opacity = 0;
};

function showMsg(sMsgText){
	var msgArea = document.getElementById('msg-area');
	msgArea.innerText = sMsgText; //TODO: this could parse links & use innerHTML.
	fadeIn(msgArea);
	setTimeout(function(){
		fadeOut(msgArea);
	}, nMsgTimeout);
}

function addEventListeners(){
	window.addEventListener('unload', function(){
		onPopupClose();
	});
	document.addEventListener('DOMContentLoaded', function() {
		onPopupOpen();
	});
}

addEventListeners();
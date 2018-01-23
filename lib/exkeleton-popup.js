console.log('exkeleton-popup.js loaded');

var nMsgTimeout = 5000,
	sFadeSpeed = '0.5s';

function callBgFunc(funcName, oArgs){
	chrome.runtime.getBackgroundPage(function(bgwin){
		bgwin[funcName](oArgs);
	});
}

//TODO: these should use transition on opacity to show/hide.
function fadeIn(el){
	el.classList.remove('fade-out');
	el.classList.add('fade-in');
};

function fadeOut(el){
	el.classList.remove('fade-in');
	el.classList.add('fade-out');
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
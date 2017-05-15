console.log('exkeleton-popup.js loaded');

var bgpage = chrome.extension.getBackgroundPage();
var nBodyWidth;
var pageContainer;

function fadeIn(el){
	el.classList.remove('fadeOut');
	el.classList.add('fadeIn');
};

function fadeOut(el){
	el.classList.remove('fadeIn');
	el.classList.add('fadeOut');
};

function showMsg(sMsgText){
	var msgArea = document.getElementById('msgArea');
	msgArea.innerText = sMsgText; //TODO: this will parse links & use innerHTML.
	fadeIn(msgArea);
	setTimeout(function(){
		fadeOut(msgArea);
	}, 5000);
}

function setUpNav(){
	var aPages = document.getElementsByClassName('page'),
		numPages = aPages.length;
	nBodyWidth = document.body.clientWidth;
	pageContainer = document.getElementById('page-container');
	pageContainer.style.width = (nBodyWidth*numPages)+'px';

	for(var i=0; i<numPages; i++){
		aPages[i].style.width = nBodyWidth+'px';
	}

	var aNavLinks = document.querySelectorAll('#mainNav a');
	if(numPages <2 || aNavLinks.length<2) return;
	for(var i=0; i<aNavLinks.length; i++){
		var nNavTo = (i * nBodyWidth * -1),
			thisLink = aNavLinks[i];
		thisLink.setAttribute('data-navto', nNavTo+'px');
		thisLink.addEventListener('click', function(){
			pageContainer.style.left = this.getAttribute('data-navto');
		});
	}

}

function addEventListeners(){
	window.addEventListener('unload', function(){
		onPopupClose();
	});
}

function init(){
	setUpNav();
	addEventListeners();
};

document.addEventListener('DOMContentLoaded', function() {
	init();
	onPopupOpen();
});
var bgpage = chrome.extension.getBackgroundPage();
var nBodyWidth;
var pageContainer;

function fadeIn(el){
	el.classList.add('fadeIn');
	el.classList.remove('fadeOut');
};

function fadeOut(el){
	el.classList.add('fadeOut');
	el.classList.remove('fadeIn');
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
		var nNavTo = i * nBodyWidth * -1;
		var thisLink = aNavLinks[i];
		thisLink.setAttribute('data-navto', nNavTo+'px');
		thisLink.addEventListener('click', function(){
			pageContainer.style.left = this.getAttribute('data-navto');
		});
	}

}

function init(){
	setUpNav();
};

document.addEventListener('DOMContentLoaded', function() {
	//when the popup opens.
	console.log('Exkeleton popup opened');


	//add the event listener for the popup closing
	window.addEventListener('unload', function(){
		//when popup closes.
	});

	init();

	//tmp
	document.body.addEventListener('click', function(){
		showMsg('Body clicked');
	});
});
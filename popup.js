var bgpage = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {
	//when the popup opens.
	console.log('Exkeleton popup opened');

	//add the event listener for the popup closing
	window.addEventListener('unload', function(){
		//when popup closes.
	});
});

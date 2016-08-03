console.log('Exkeleton background.js loaded');

function getPopupWin(){
	var popupWin = chrome.extension.getViews( {type:'popup'} );
	if(popupWin.length){
		return popupWin[0];
	}
	return false;
}
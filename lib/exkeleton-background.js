console.log('exkeleton-background.js loaded');

function getPopupWin() {
	var popupWin = chrome.extension.getViews( {type:'popup'} );
	if(popupWin.length){
		return popupWin[0];
	}
	return false;
};

function logIt(oArgs) {
	console.log(oArgs);
};

function storeData(sName, oData, callback){
	
}

function loadData(sName, callback){

}

//TODO: sender/listener for content.js runtime message
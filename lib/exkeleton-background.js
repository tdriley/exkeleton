console.log('exkeleton-background.js loaded');

function getPopupWin() {
	var popupWin = chrome.extension.getViews( {type:'popup'} );
	if(popupWin.length){
		return popupWin[0];
	}
	return false;
};

function logIt(data) {
	console.log(data);
};

function storeItem(sName, oData, callback){
	var store = {};
	store[sName] = oData;
    chrome.storage.local.set(store, function() {
        callback && callback();
    });
};

function loadItem(sName, callback){
	var get = {};
	get[sName] = {};
	chrome.storage.local.get(get, function(data) {
		data[sName] && callback(data[sName]);
	});
};

//TODO: sender/listener for content.js runtime message
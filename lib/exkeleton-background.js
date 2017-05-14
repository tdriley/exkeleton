console.log('exkeleton-background.js loaded');

window.Exk = function(){

	let 
	_getPopupWin = function() {
		var popupWin = chrome.extension.getViews( {type:'popup'} );
		if(popupWin.length){
			return popupWin[0];
		}
		return false;
	},

	_logIt = function(arg) {
		console.log(arg);
	}; //end of private funcs

	return {
		getPopupWin: _getPopupWin,
		logIt: 		  _logIt
	}

}();

console.log(Exk);
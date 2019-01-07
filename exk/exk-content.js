const ExkContent = () => {

	const 

	// Construct shared funcs, so we can make them available later.
	oShared = ExkShared('content');

	_showPageMsg = (sMsgText) => {
		// const msgArea = document.getElementById('msg-area');
		// msgArea.innerText = sMsgText; //TODO: this could parse links & use innerHTML.
		// _fadeIn(msgArea);
		// setTimeout(function(){
		// 	_fadeOut(msgArea);
		// }, _nMsgTimeout);
	},

	_on = (sEvt, callback) => {
		if ( _aCustomEventNames.indexOf(sEvt)===-1 || typeof callback !== 'function' ) return false
		window.addEventListener(sEvt, callback)
		return true
	},
	
	_off = (sEvt, callback) => {
		window.removeEventListener(sEvt, callback)
	},
	_bgport = oShared.bgport;

	// Code to run now
	document.addEventListener('DOMContentLoaded', function() {
		// window.dispatchEvent( _aCustomEvents['popupOpen'] );
	})

	// Set up browser.runtime communication with background.
	_bgport.onMessage.addListener(function(msg, port) {
		
	});
	_bgport.postMessage({loaded: true});

	// Set up return.
	const oReturn = {
		showPageMsg: 		_showPageMsg,
		on: 				_on,
		off: 				_off
	}

	for (var key in oShared) {
		oReturn[key] = oShared[key];
	}

	return oReturn;
};

window.exk = ExkContent();

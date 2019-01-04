const ExkPopup = () => {

	let 
	_aCustomEvents = [];

	const 

	// Construct shared funcs, so we can make them available later.
	oShared = ExkShared();

	// Settings
	_nMsgTimeout = 5000,
	_aCustomEventNames = ['popupOpen'],

	_createCustomEvents = (aEventNames) => {
		aEventNames.forEach((sEvtName)=>{
			_aCustomEvents[sEvtName] = new CustomEvent(sEvtName);
		})
	},

	_callBgFunc = (funcName, callback, oArgs) => {
		browser.runtime.getBackgroundPage(function(bgwin){
			console.log(bgwin);
			var result = bgwin.Exk[funcName](oArgs);
			callback && callback(result);
		});
	},

	_fadeIn = (el) => {
		el.style.opacity = 1;
	},

	_fadeOut = (el) => {
		el.style.opacity = 0;
	},

	_showMsg = (sMsgText) => {
		const msgArea = document.getElementById('msg-area');
		msgArea.innerText = sMsgText; //TODO: this could parse links & use innerHTML.
		_fadeIn(msgArea);
		setTimeout(function(){
			_fadeOut(msgArea);
		}, _nMsgTimeout);
	},

	_on = (sEvt, callback) => {
		if ( _aCustomEventNames.indexOf(sEvt)===-1 || typeof callback !== 'function' ) return false
		window.addEventListener(sEvt, callback)
		return true
	},
	
	_off = (sEvt, callback) => {
		window.removeEventListener(sEvt, callback)
	};

	// Code to run now
	_createCustomEvents(_aCustomEventNames);

	document.addEventListener('DOMContentLoaded', function() {
		window.dispatchEvent( _aCustomEvents['popupOpen'] );
	})

	// Set up browser.runtime communication with background.
	let port = browser.runtime.connect({name: "popup"});
	port.postMessage({loaded: true});
	port.onMessage.addListener(function(msg, port) {
		console.log('exk-popup.js received:', msg, port);
	});

	// Set up return.
	const oReturn = {
		fadeIn: 			_fadeIn,
		fadeOut: 			_fadeOut,
		showMsg: 			_showMsg,
		on: 				_on,
		off: 				_off
	}

	for (var key in oShared) {
		oReturn[key] = oShared[key];
	}

	return oReturn;
};

window.exk = ExkPopup();

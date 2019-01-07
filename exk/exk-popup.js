const ExkPopup = () => {

	const 

		// Construct shared funcs, so we can make them available later.
		oShared = ExkShared('popup')

		// Settings
		_nMsgTimeout = 5000,

		// Methods
		_fadeIn = (el) => {
			el.style.opacity = 1;
		},

		_fadeOut = (el) => {
			el.style.opacity = 0;
		},

		_showPopupMsg = (sMsgText) => {
			const msgArea = document.getElementById('msg-area');
			msgArea.innerText = sMsgText; //TODO: this could parse links & use innerHTML.
			_fadeIn(msgArea);
			setTimeout(function(){
				_fadeOut(msgArea);
			}, _nMsgTimeout);
		},
		_bgport = oShared.bgport;

	// Code to run now
	document.addEventListener('DOMContentLoaded', function() {
		_bgport.postMessage({type:'event', name:'popupOpened'});
	});

	// Set up return.
	const oReturn = {
		fadeIn: 			_fadeIn,
		fadeOut: 			_fadeOut,
		showPopupMsg: 		_showPopupMsg
	}

	for (var key in oShared) {
		oReturn[key] = oShared[key];
	}

	return oReturn;
};

window.exk = ExkPopup();

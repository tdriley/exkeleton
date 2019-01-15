const ExkOptions = () => {

	const 

		// Construct shared funcs, so we can make them available later.
		oShared = ExkShared('options')

		// Settings
		_nMsgTimeout = 5000,

		// Methods
		_showOptionsMsg = (sMsgText) => {
			console.log('Options msg:', sMsgText)
		},
		_bgport = oShared.bgport;

	// Code to run now
	document.addEventListener('DOMContentLoaded', function() {
		_bgport.postMessage({type:'event', name:'optionsOpened'});
	});

	// Set up return.
	const oReturn = {
		showOptionsMsg: _showOptionsMsg
	}

	for (var key in oShared) {
		oReturn[key] = oShared[key];
	}

	return oReturn;
};

window.exk = ExkOptions();

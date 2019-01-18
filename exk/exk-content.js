const ExkContent = () => {

	const 

		// Construct shared funcs, so we can make them available later.
		oShared = ExkShared('content'),

		// Settings
		_nMsgTimeout = 5000,

		// Methods
		_setUpMsgContainer = () => {
			_msgContainer = document.createElement('div')
			_msgContainer.setAttribute('id', 'exk-tab-msg-container')
			_msgContainer.style = 'transition:opacity 0.25s; opacity:0; position:fixed; top:-1000px; visibility:hidden; right:10px; background:#fff; padding:10px; border:thin solid #eee; box-shadow:0 0 10px #eee;'
			document.body.appendChild(_msgContainer)
		},

		_showTabMsg = (sMsgText) => {
			_msgContainer.innerText = sMsgText
			_msgContainer.style['visibility'] = 'visible'
			_msgContainer.style['top'] = '10px'
			
			oShared.fadeIn(_msgContainer);
			setTimeout(function(){
				oShared.fadeOut(_msgContainer);
			}, _nMsgTimeout);
		},
		_bgport = oShared.bgport;

	// Code to run now.
	_setUpMsgContainer();

	// Set up return.
	const oReturn = {
		showTabMsg: _showTabMsg
	}

	for (var key in oShared) {
		oReturn[key] = oShared[key];
	}

	return oReturn;
};

const exk = ExkContent();
exk.showTabMsg('The Test message')

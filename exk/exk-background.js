const ExkBackground = () => {
	this.msgPorts = {};

	let 
		that = this;

	const 

		// Construct shared funcs, so we can make them available later.
		_oShared = ExkShared('background'),
		
		_on = (sEvt, callback) => {
			if ( _aCustomEventNames.indexOf(sEvt)===-1 || typeof callback !== 'function' ) return false;
			window.addEventListener(sEvt, callback);
			return true;
		},
		
		_off = (sEvt, callback) => {
			window.removeEventListener(sEvt, callback);
		},
		
		_triggerEvent = (sName) => {
			_oShared.triggerEvent(sName);
			updateParts({type:'event', name:sName});
		},

		updateParts = (oMsg) => {
			for (const key in msgPorts) {
				msgPorts[key].postMessage(oMsg);
			}
		};

		/* Code to run now */
		// Set up browser.runtime communication with other parts of the extension.
		browser.runtime.onConnect.addListener( (port) => {
			const sPortName = (port.sender.tab) ? port.name + '-' + port.sender.tab.id : port.name;
			that.msgPorts[sPortName] = port;
			port.onDisconnect.addListener( (disport) => {
				const sDisPortName = (disport.sender.tab) ? disport.name + '-' + disport.sender.tab.id : disport.name;
				delete that.msgPorts[sDisPortName];
				if (disport.name==='popup') _triggerEvent('popupClosed');
			});
			port.onMessage.addListener( (msg, port) => {

				switch(msg.type) {
					case 'event':
						_triggerEvent(msg.name);
				}
			});
		});

	// Set up return.
	const oReturn = {
		on: 		_on,
		off: 		_off
	};

	for (var key in _oShared) {
		oReturn[key] = _oShared[key];
	};

	return oReturn;
};

window.exk = ExkBackground();

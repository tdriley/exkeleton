const ExkBackground = () => {
	this.msgPorts = {};

	let 
		that = this;

	const 

		// Construct shared funcs, so we can make them available later.
		_oShared = ExkShared('background'),
		
		_triggerEvent = (sName, oData) => {
			let oMsg = {type:'event', name:sName}
			if (oData) oMsg.data = oData

			_oShared.runEventCallback(sName, oData);
			updateParts(oMsg);
		},

		updateParts = (oMsg) => {
			for (const key in msgPorts) {
				msgPorts[key].postMessage(oMsg);
			}
		},

		_onTabActivated = (activeInfo) => {
			browser.tabs.get(activeInfo.tabId, (tab) => {
				_triggerEvent('tabActivated', tab);
			})
		}

		/* Code to run now */
		// Set up browser.runtime communication with other parts of the extension.
		browser.runtime.onConnect.addListener( (port) => {
			const sPortName = (port.sender.tab) ? port.name + '-' + port.sender.tab.id : port.name;
			that.msgPorts[sPortName] = port;
			port.onDisconnect.addListener( (disport) => {
				const sDisPortName = (disport.sender.tab) ? disport.name + '-' + disport.sender.tab.id : disport.name;
				delete that.msgPorts[sDisPortName];
				if (disport.name==='popup') _triggerEvent('popupClosed');
				if (disport.name==='options') _triggerEvent('optionsClosed');
			});
			port.onMessage.addListener( (msg, port) => {

				switch(msg.type) {
					case 'event':
						_triggerEvent(msg.name, msg.data);
				}
			});
		});

		// Set up tabs listeners.
		browser.tabs.onActivated.addListener(_onTabActivated);

	// Set up return.
	const oReturn = {};

	for (var key in _oShared) {
		oReturn[key] = _oShared[key];
	};

	return oReturn;
};

window.exk = ExkBackground();

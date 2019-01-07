// Funcs that work the same when called in background or popup.
const ExkShared = (sContext) => {

	let 
		_evtListeners = [],
		_bgport;

    const 
		_logIt = (something) => {
			console.log(something);
		},
		
		_storeItem = (sName, oData, callback) => {
			let store = {};
			store[sName] = oData;
			browser.storage.local.set(store, () => {
				callback && callback();
			});
		},

		_loadItem = (sName, callback) => {
			let get = {};
			get[sName] = {};
			browser.storage.local.get(get, (data) => {
				data[sName] && callback(data[sName]);
			});
		},
		
		_getId = () => {
			const getIdPart = () => {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return getIdPart() + '-' + getIdPart() + '-' + getIdPart() + '-' + getIdPart();
		},

		_triggerEvent = (sName) => {
			_evtListeners.forEach((listener)=>{
				if (listener.name===sName) listener.handler.call();
			});
		},

		_on = (name, handler) => {
			const sNewId = _getId();
			_evtListeners.push({id: sNewId, name:name, handler:handler, context:sContext});
			console.log('_evtListeners', _evtListeners);
			return sNewId;
		},
		
		_off = (name, handler) => {
			_evtListeners.forEach( (listener, i) => {
				if (listener.name===name && listener.handler===handler) {
					_evtListeners.splice(i, 1);
				}
			});
		};
    
    // Code to run now.
    window.browser = ( () => {
		return window.browser || window.chrome;
	})();

	// Set up communication with the background script.
	if (sContext !== 'background') {
		_bgport = browser.runtime.connect({name: sContext});
		_bgport.onMessage.addListener( (msg, port) => {
			if (msg.type==='event') _triggerEvent(msg.name);
		});
	};

	return {
		logIt: _logIt,
		storeItem: _storeItem,
		loadItem: _loadItem,
		getId: _getId,
		bgport: _bgport,
		triggerEvent: _triggerEvent,
		on: _on,
		off: _off
	}
};

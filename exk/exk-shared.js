// Funcs that work the same when called in any context.
const ExkShared = (sContext) => {

	let 
		_evtListeners = [],
		_bgport;

    const 
		
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

		_runEventCallback = (sName, oData) => {
			// TODO: predefined list of accepted events, or at least useful errors when they don't exist...
			// ...user may want to add/trigger them themselves.
			_evtListeners.forEach((listener)=>{
				if (listener.name===sName) listener.handler.call(this, oData);
			});
		},

		_fadeIn = (el) => {
			el.style.opacity = 1;
		},

		_fadeOut = (el) => {
			el.style.opacity = 0;
		},

		_getAllTabs = (callback) => {
			// TODO: user can provide a filter.
			// TODO: Could async funcs return a promise?
			browser.tabs.query({}, (tabs) => {
				callback && callback(tabs)
			})
		},

		_getCurrentTab = (callback) => {
			// TODO: user can provide a filter(s).
			// TODO: Could async funcs return a promise?
			browser.windows.getCurrent({populate: true}, (win)=>{
				win.tabs.forEach( (tab) => {
					if (tab.active) {
						callback && callback(tab, win)
						return;
					}
				})
			})
		},

		_on = (name, handler) => {
			const sNewId = _getId();
			_evtListeners.push({id: sNewId, name:name, handler:handler, context:sContext});
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
	})()

	// Stuff that will be returned for all contexts.
	let oReturn = {
		storeItem: _storeItem,
		loadItem: _loadItem,
		getId: _getId,
		runEventCallback: _runEventCallback,
		getAllTabs: _getAllTabs,
		getCurrentTab: _getCurrentTab,
		on: _on,
		off: _off
	}

	// Stuff we want returned in contexts other than the background script.
	if (sContext !== 'background') {
		// Set up communication with the background script.
		_bgport = browser.runtime.connect({name: sContext});
		_bgport.onMessage.addListener( (msg, port) => {
			if (msg.type==='event') _runEventCallback(msg.name);
		})

		oReturn.fadeIn = _fadeIn
		oReturn.fadeOut = _fadeOut
		oReturn.bgport = _bgport
	}

	return oReturn
};

// TODO:
// - Get current page URL
// - 

// Funcs that work the same when called in background or popup.
const ExkShared = () => {

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
    };
    
    // Code to run now.
    window.browser = ( () => {
		return window.browser || window.chrome;
	})();

	return {
		logIt: _logIt,
		storeItem: _storeItem,
		loadItem: _loadItem
	}
};

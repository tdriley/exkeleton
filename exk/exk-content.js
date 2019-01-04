window.browser = ( () => {
	return window.browser || window.chrome;
})();

let port = browser.runtime.connect({name: "content"});
port.onMessage.addListener(function(msg, port) {
	console.log('exk-content.js received:', msg, port);
});
port.postMessage({loaded: true, pageUrl: window.location.href});
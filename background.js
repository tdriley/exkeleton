//write your custom background js here
function setNoProxy(){
	console.log('setNoProxy');
	var config = {
		mode: "pac_script",
		pacScript: {
	  		data: "function FindProxyForURL(url, host) {\n" +
    		"    return 'DIRECT';\n" +
    		"}"
		}
	};
	chrome.proxy.settings.set(
		{value: config, scope: 'regular'},
		function() {
			console.log('setNoProxy cb');
		}
	 );
};

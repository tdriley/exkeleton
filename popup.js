var bgpage = bgpage
var aConBtns = document.querySelectorAll('.conbtns a');
var user;
var pass;

function onPopupOpen(){
	checkProxy();

	aConBtns.forEach(function(el){
		if(el.dataset.proxy !== 'noproxy'){
			el.dataset.proxy_host = document.getElementById('proxy'+el.dataset.proxy+'_host').value;
		}
		el.addEventListener('click', function(e){
			if(el.dataset.proxy !== 'noproxy'){
				el.dataset.proxy_host = document.getElementById('proxy'+el.dataset.proxy+'_host').value;
			}
			if(e.target.dataset.proxy==='noproxy'){
				conProxy('noproxy');
				return;
			}
			var host = document.getElementById('proxy'+e.target.dataset.proxy+'_host').value;
			var port = document.getElementById('proxy'+e.target.dataset.proxy+'_port').value;
			
			user = document.getElementById('user_'+e.target.dataset.proxy).value;
			pass = document.getElementById('pass_'+e.target.dataset.proxy).value;
			conProxy(host, port);
		});
	});
};
function onPopupClose(){
	//when the popup closes
	bgpage.setNoProxy();
};

function checkProxy(host){
	console.log('checkProxy', host);
	chrome.proxy.settings.get(
		{'incognito': false},
		function(config) {
			console.log('chrome.proxy.settings.get callback', config );

			var pacScript;
			var matchInPac;
			if(config.value.pacScript){
				pacScript = config.value.pacScript.data;
				matchInPac = pacScript.match(/PROXY ((\w|\.)+):/);
			}

			var hostFromPac = (matchInPac) ? matchInPac[1] : 'noproxy';

			setBtnState('selected', hostFromPac);
		}
	);
};

function setBtnState(sState, host){
	aConBtns.forEach(function(el){
		el.parentElement.classList.remove('selected');
		el.parentElement.classList.remove('active');
		el.parentElement.classList.remove('errored');
		if(el.dataset.proxy_host===host){
			el.parentElement.classList.add('selected');
		}
	});
}

function onAuthRequired(details, authCb){
	console.log('onAuthRequired', details);
	console.log('using these credentials:', user, pass);
	authCb({
		authCredentials: {
			username: user, 
			password: pass
		}
	});
	chrome.webRequest.onAuthRequired.removeListener(onAuthRequired);
}

function conProxy(host, port) {
	console.log('conProxy', host, port);
	var data;
	if(host==='noproxy'){
		data = "function FindProxyForURL(url, host) {\n" +
    "    return 'DIRECT';\n" +
    "}";
	}else{
      data = "function FindProxyForURL(url, host) {\n" +
    "    return 'PROXY "+host+":"+port+"';\n" +
    "}"
	}

	chrome.proxy.settings.onChange.addListener(function(details){
		console.log('proxy.settings.onChange', details);
	});

	// chrome.proxy.onProxyError.addListener(function(details){
	// 	console.log('chrome.proxy.onProxyError', details);
	// });

	// chrome.webRequest.onCompleted.addListener(function(details){
	// 	console.log('chrome.webRequest.onCompleted', details);
	// 	}, 
	// 	{urls: ["<all_urls>"]}
	// );

    chrome.webRequest.onAuthRequired.addListener(
    	onAuthRequired,
        {urls: ["<all_urls>"]},
        ['asyncBlocking']
    );

	var config = {
		mode: "pac_script",
		pacScript: {
	  		data: data
		}
	};
	chrome.proxy.settings.set(
		{value: config, scope: 'regular'},
		function() {
			console.log('chrome.proxy.settings.set cb');
			checkProxy(host);
		});
	};
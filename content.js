chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log(message, sender);
        sendResponse('msg received in content.js');
    }
);

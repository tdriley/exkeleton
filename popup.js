//write your custom popup js here

function onPopupOpen(){
	//when the popup opens
	console.log('Exkeleton popup opened');
	callBgFunc('logIt', null, 'Exkeleton popup opened');
	
};
function onPopupClose(){
	//when the popup closes
	bgpage.Exk.logIt('Exkeleton popup closed');

};
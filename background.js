//write your background js here
console.log('Thanks for using Exkeleton! You have this stuff available to you in background:', exk);

exk.on('popupClosed', () => {
	// on popup closed
	exk.logIt('Popup closed')
})

exk.on('popupOpened', () => {
	// on popup opened
	exk.logIt('Popup opened')
})
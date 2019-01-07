//write your popup js here
console.log('Thanks for using Exkeleton! You have this stuff available to you in popup:', exk);

exk.on('popupOpened', () => {
	// on popup opened
	exk.logIt('Popup opened')
})

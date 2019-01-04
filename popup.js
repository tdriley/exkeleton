//write your popup js here
console.log('Thanks for using Exkeleton! You have this stuff available to you in popup:', exk);

exk.on('popupOpen', () => {
	// on popup opened
	exk.logIt('Popup opened')
})

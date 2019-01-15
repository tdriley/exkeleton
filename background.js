//write your background js here
console.log('Thanks for using Exkeleton! You have this stuff available to you in background:', exk);

exk.on('popupOpened', () => {
	// on popup opened
	exk.logIt('Popup opened')
})

exk.on('popupClosed', () => {
	// on popup closed
	exk.logIt('Popup closed')
})

exk.on('optionsOpened', () => {
	// on options opened
	exk.logIt('Options opened')
})

exk.on('tabActivated', (tab) => {
	// on tab activated
	console.log(tab)
})

exk.getAllTabs((tabs) => {
	console.log('All tabs:', tabs)
})
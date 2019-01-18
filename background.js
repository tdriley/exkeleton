//write your background js here
console.log('Thanks for using Exkeleton! You have this stuff available to you in background:', exk);

exk.on('popupOpened', () => {
	// on popup opened
	console.log('Popup opened')
})

exk.on('popupClosed', () => {
	// on popup closed
	console.log('Popup closed')
})

exk.on('optionsOpened', () => {
	// on options opened
	console.log('Options opened')
})

exk.on('optionsClosed', () => {
	// on options opened
	console.log('Options closed')
})

exk.on('tabActivated', (tab) => {
	// on tab activated
	console.log('Tab activated:', tab)
})

exk.getAllTabs( (tabs) => {
	console.log('All tabs:', tabs)
})

exk.getCurrentTab( (tab, win) => {
	console.log('Current tab:', tab)
	console.log('Current win:', win)
})

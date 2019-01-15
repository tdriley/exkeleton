//write your popup js here
console.log('Thanks for using Exkeleton! You have this stuff available to you in popup:', exk);

exk.getAllTabs((tabs) => {
	console.log('All tabs:', tabs)
})
// requires the https node module
const https = require('https');
const username = 'michaelmroczka2';

// Function to print message from the console.
function printMessage(username, badgeCount, points){
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
	console.log(message);
}

// Connect to API url ( https://teamtreehouse.com/michaelmroczka2.json )
function getProfile(username){
	try {
		const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
			//console.log(response.statusCode);
			let body = "";
		
			// Read the data
			response.on('data', data => {
				// since data comes in through different packets we need to concatenate all the packets into one response
				body +=  data.toString();
			});
			// Parse the data
			response.on('end', () => {
				// when the packets finally are done transmitting...
				// console.log(body);
				// console.log(typeof body);
				const profile = JSON.parse(body);
				printMessage(username, profile.badges.length, profile.points.total);
			});
			// Print the data
		});
		request.on('error', e => console.error(`Problem with request: ${e.message}`));
	} catch (error) {
		console.error(error.message);
	}
}


// const users = ["chalkers", "michaelmroczka2"];
// this line gets all the arguments after the first 2 default ones when running the 
// applciation, so you can type in usernames and run the applciation automatically
const users = process.argv.slice(2);
users.forEach(getProfile);

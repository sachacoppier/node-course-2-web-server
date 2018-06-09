const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;


var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => { // when this url is ran, when you run server.js so it logs something

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	fs.appendFile('serveur.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log');
		}
	});

	console.log(log);
	next();

});

app.use(express.static(__dirname + '/public')); //express middlewar static directory.

// app.use((req, res, next) => { //req and res are objects //No need to call next since we don't want to move on to the rest of the request
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'maintenance Page',
// 		welcomeMessage: 'We won\'t be late !'
// 	}); //People will get this back to the body data	
// 	next();
// }); //the next function isn't called so the code stops executing here.




hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


app.get('/', (req, res) => { //Handler for http get request //First arguments is the URL, in this case the root of the app, the second is the function to run (the one that tells express what to send back)

	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome home'
	}); //People will get this back to the body data

});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage : 'Unable to handle request'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
}); //Bind the app to a port on the machine


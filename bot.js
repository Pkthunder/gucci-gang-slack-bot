var env = require('node-env-file');
env(__dirname + '/.env');

var Botkit = require('botkit');

var bot_options = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    scopes: ['bot']
};

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot(bot_options);

// controller.startTicking();		// not needed within the lambda context

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

webserver.get('/', function(req, res){
	res.render('index', {
		domain: req.get('host'),
		protocol: req.protocol,
		layout: 'layouts/default'
	});
})

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
	require("./skills/" + file)(controller);
});

module.exports = webserver;

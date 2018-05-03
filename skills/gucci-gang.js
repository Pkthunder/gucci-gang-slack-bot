var hearsRegex = [
    /gucci\s?gang/ig
];

var triggers = [
    'direct_message',
    'direct_mention',
    'mention',
    'ambient'
];

var ggText = `Gucci Gang Gucci Gang Gucci Gang Gucci Gang Gucci Gang Gucci Gang Gucci Gang`;

var repeat = function (str, times) {
    var s = [];
    for (var i=0; i<times; i++) {
        s.push(str);
    }
    return s.join(' ');
};

module.exports = function(controller) {

    controller.hears(hearsRegex, triggers, function (bot, message) {
        if (message.match.length >= 8) {
            bot.reply(message, 'My bitch love do cocaine!');
        }
	else if (message.match.length === 1) {
            bot.reply(message, repeat(message.match[0], 8) + ' :guccigang:');
        }
        else {
            bot.reply(message, '... ' + 
		repeat(message.match[0], 8 - message.match.length) + 
		' :guccigang:' );
        }

    });

    controller.hears(['^lyrics'], triggers.slice(0, 2), function (bot, message) {
	bot.reply(message, `https://genius.com/Lil-pump-gucci-gang-lyrics`);
    });

    controller.hears(['^echo (.*)'], triggers, function (bot, message) {
        bot.reply(message, message.match[1]);
    });

};

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

var GG_ITERATIONS = 7;      // not 8? Why would it be musical?

module.exports = function(controller) {

    controller.hears(hearsRegex, triggers, function (bot, message) {
        var reply = '';

        if (message.match.length >= GG_ITERATIONS) {
           reply = 'My bitch love do cocaine!';
        }
        else if (message.match.length === 1) {
            reply = repeat(message.match[0], GG_ITERATIONS);
        }
        else {
            reply = '... ' + repeat(message.match[0], GG_ITERATIONS - message.match.length);
        }

        reply += ' :guccigang:';

        bot.reply(message, reply);

    });

    controller.hears(['^lyrics'], triggers.slice(0, 2), function (bot, message) {
	   bot.reply(message, `https://genius.com/Lil-pump-gucci-gang-lyrics`);
    });

    controller.hears(['^echo (.*)'], triggers, function (bot, message) {
        bot.reply(message, message.match[1]);
    });

};

var hearsRegex = [
    /gucci\sgang/i
];

var triggers = [
    'direct_message',
    'direct_mention',
    'mention',
    'ambient'
];

var ggText = `Gucci Gang Gucci Gang Gucci Gang Gucci Gang Gucci Gang Gucci Gang Gucci Gang`;

module.exports = function(controller) {

    controller.hears(hearsRegex, triggers, function (bot, message) {
        console.log(message);

        bot.reply(ggText + ':guccigang:');
    });

    controller.hears(['^echo (.*)'], triggers, function (bot, message) {
        bot.reply(message, message.match[1]);
    });

};

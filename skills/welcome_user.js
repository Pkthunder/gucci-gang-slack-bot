module.exports = function(controller) {

    controller.on('user_channel_join,user_group_join', function(bot, message) {

        bot.reply(message, '<@' + message.user + '>, Welcome to the motherfucking Gucci Gang!');

    });

}

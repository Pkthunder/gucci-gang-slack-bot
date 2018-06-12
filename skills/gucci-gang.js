var _lyrics_ = `
Gucci Gang, ooh, yeah, Lil Pump, yeah, Gucci Gang, ooh
Gucci gang, Gucci gang, Gucci gang, Gucci gang
Gucci gang, Gucci gang, Gucci gang (Gucci gang!)
Spend ten racks on a new chain
My bitch love do cocaine, ooh
I fuck a bitch, I forgot her name
I can't buy a bitch no wedding ring
Rather go and buy Balmains
Gucci gang, Gucci gang, Gucci gang (Gucci gang!)
Gucci gang, Gucci gang, Gucci gang, Gucci gang
Gucci gang, Gucci gang, Gucci gang (Gucci gang!)
Spend ten racks on a new chain
My bitch love do cocaine, ooh
I fuck a bitch, I forgot her name, yeah
I can't buy no bitch no wedding ring
Rather go and buy Balmains, aye
Gucci gang, Gucci gang, Gucci gang
My lean cost more than your rent, ooh
Your mama still live in a tent, yeah
Still slanging dope in the jets, huh
Me and my grandma take meds, ooh
None of this shit be new to me
Fucking my teacher, call it tutory
Bought some red bottoms, cost hella Gs
Fuck your airline, fuck your company
Bitch, your breath smell like some cigarettes
I'd rather fuck a bitch from the projects
They kicked me out the plane off a Percocet
Now Lil Pump fly a private jet
Everybody screaming "fuck West Jet!"
Lil Pump still sell that meth
Hunnid on my wrist sippin on Tech
Fuck a lil bitch, make her pussy wet
Gucci gang, Gucci gang, Gucci gang, Gucci gang
Gucci gang, Gucci gang, Gucci gang (Gucci gang!)
Spend ten racks on a new chain
My bitch love do cocaine, ooh
I fuck a bitch, I forgot her name
I can't buy a bitch no wedding ring
Rather go and buy Balmains
Gucci gang, Gucci gang, Gucci gang (Gucci gang!)
Gucci gang, Gucci gang, Gucci gang, Gucci gang
Gucci gang, Gucci gang, Gucci gang (Gucci gang!)
Spend ten racks on a new chain
My bitch love do cocaine, ooh
I fuck a bitch, I forgot her name
I can't buy no bitch no wedding ring
Rather go and buy Balmains, aye
Gucci gang, Gucci gang, Gucci gang
Lil Pump, yeah, Lil Pump, ooh
`;

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

    _lyrics_.split('\n').forEach(line => {
        if (line.slice(0, 10) !== 'Gucci gang') {
            var lyrics = line.split(' ');
            var splitIndex = (lyrics.length > 5) ? 3 : 2;

            var front = lyrics.slice(0, splitIndex);
            var end = lyrics.slice(splitIndex);

            if (front[0] !== '' && end[0] !== '') {
                if (front[front.length - 1].endsWith(',')) front[front.length - 1] += '?';

                var regex = new RegExp(`^${front.join(' ').toLowerCase()}`, 'i');
                var lyricsReply = `... ${end.join(' ').toLowerCase()}`;

                controller.hears([regex], triggers, function (bot, message) {
                    bot.reply(message, lyricsReply);
                });
            }
        }
    });


    controller.hears([/^gucci/i], triggers, function (bot, message) {
       bot.reply(message, `Gang!`);
    });

    controller.hears([/^gang/i], triggers, function (bot, message) {
       bot.reply(message, `You mean, Gucci Gang, mofo!`);
    });

    controller.hears(['^lyrics'], triggers.slice(0, 2), function (bot, message) {
	   bot.reply(message, `https://genius.com/Lil-pump-gucci-gang-lyrics`);
    });

    controller.hears(['^artist', '^HNIC'], triggers.slice(0, 2), function (bot, message) {
       bot.reply(message, `Lil Pump`);
    });

    controller.hears(['^echo (.*)'], triggers, function (bot, message) {
        bot.reply(message, message.match[1]);
    });

};

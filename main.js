const handler = require('serverless-express/handler');
const bot = require('./bot');

exports.handler = handler(bot);

const winston = require('winston');

new winston.remove(winston.transports.Console);
new winston.add(winston.transports.Console, { timestamp: true });
new winston.add(winston.transports.File, { filename: 'TestExecution.log' });
module.exports = winston;




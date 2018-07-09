const winston = require('winston');
const secrets = require('./secrets');

/**
 * Requiring `winston-mongodb` will expose
 * `winston.transports.MongoDB`
 */
require('winston-mongodb');


let options = {
    mongo: {
        level: 'silly',
        db: secrets.mongo.dbURI,
        collection: 'log',
    }
}

let logger = winston.createLogger({
    transports: [
        new winston.transports.MongoDB(options.mongo)
    ],
    exitOnError: false
});

module.exports = logger;
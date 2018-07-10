const winston = require('winston');

let secrets;
try {
    secrets = require('./secrets');
} catch (error) {
}

/**
 * Requiring `winston-mongodb` will expose
 * `winston.transports.MongoDB`
 */
require('winston-mongodb');


let options = {
    mongo: {
        level: 'silly',
        db: process.env.DB_URI || (secrets && secrets.mongo.dbURI),
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
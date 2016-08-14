'use strict';

var _     = require('lodash');
var chalk = require('chalk');

var mandatoryKeys = [
    'CORS_ORIGIN',
    'SERVER_HOST',
    'SERVER_PORT',
    'SERVER_SSL',
    'SERVER_URL_SCHEME',
    'SERVER_URL_HOST',
    'SERVER_URL_PORT',
    'MOBILE_CLIENT_START_URL',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USERNAME',
    'DB_PWD',
    'LOG_LEVEL'
];

function _enforceMandatory(key) {
    var val = process.env[key];

    if (_.includes(mandatoryKeys, key) && _.isEmpty(val)) {
        throw new Error(chalk.bold.red('Missing environment variable: ' + key));
    }

    return val;
}

module.exports = {
    buildEnvConfig: function () {
        return {
            corsOrigins: _enforceMandatory('CORS_ORIGIN').split(','),
            server: {
                host: _enforceMandatory('SERVER_HOST'),
                port: _enforceMandatory('SERVER_PORT'),
                ssl : (_enforceMandatory('SERVER_SSL').toLowerCase() === 'true'),
                key : _enforceMandatory('SERVER_KEY'),
                cert: _enforceMandatory('SERVER_CERT'),
                ca  : _enforceMandatory('SERVER_CA').split(',')
            },
            serverURL: {
                scheme: _enforceMandatory('SERVER_URL_SCHEME'),
                host  : _enforceMandatory('SERVER_URL_HOST'),
                port  : _enforceMandatory('SERVER_URL_PORT')
            },
            mobileClientURL: _enforceMandatory('MOBILE_CLIENT_START_URL'),
            db: {
                host    : _enforceMandatory('DB_HOST'),
                port    : _enforceMandatory('DB_PORT'),
                dbName  : _enforceMandatory('DB_NAME'),
                username: _enforceMandatory('DB_USERNAME'),
                password: _enforceMandatory('DB_PWD')
            },
            logLevel: _enforceMandatory('LOG_LEVEL')
        };
    }
};

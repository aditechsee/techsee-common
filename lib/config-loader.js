'use strict';

var chalk  = require('chalk');
var helper = require('./helpers/config-loader.helper');
var fs     = require('fs-extra');
var Path   = require('path');
var _      = require('lodash');
var dotenv = require('dotenv-safe');

var env = process.env.NODE_ENV;

module.exports = {
    load: function (params) {
        if (!env || _.isEmpty(env)) {
            throw new Error(chalk.bold.red('`NODE_ENV` is not set!'));
        }

        var dotEnvConfig = {
            path            : params.confFiles[env],
            sample          : params.templateFile,
            allowEmptyValues: _.includes(params.mandatoryKeys, '*')
        };

        if (!fs.existsSync(dotEnvConfig.path)) {
            throw new Error(chalk.bold.red('Config file is missing: `' + dotEnvConfig.path + '`'));
        }

        try {
            dotenv.load(dotEnvConfig);

        } catch (err) {
            console.error(chalk.bold.red(err));
            throw err;
        }

        console.log(dotEnvConfig.path, dotenv.parse(fs.readFileSync(dotEnvConfig.path)));
        // return helper.buildEnvConfig(params.mandatoryKeys);
    }
};

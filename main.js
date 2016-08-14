'use strict';

var fs   = require('fs-extra');
var Path = require('path');
var _    = require('lodash');

var lib = {};

fs.readdirSync('./lib').filter(function (file) {
    // Only keep the .js files
    return _.endsWith(file, '.js');

}).forEach(function (file) {
    lib[file.slice(0, -3)] = require(Path.resolve('./lib/' + file));
});

module.exports = lib;

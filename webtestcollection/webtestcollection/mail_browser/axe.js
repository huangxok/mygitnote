(function(root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return factory(window.console);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(console);
    } else {
        root.axe = factory(window.console);
    }
}(this, function(console) {
    'use strict';

    var DEBUG = 0;
    var INFO = 1;
    var WARN = 2;
    var ERROR = 3;

    /**
     * Default console log appender
     * @constructor
     */
    var ConsoleAppender = function() {};

    ConsoleAppender.prototype.log = function(level, date, component, message) {
        var logFunction;

        if (level === DEBUG) {
            logFunction = console.log.bind(console);
        } else if (level === INFO) {
            logFunction = console.info.bind(console);
        } else if (level === WARN) {
            logFunction = console.warn.bind(console);
        } else if (level === ERROR) {
            logFunction = console.error.bind(console);
        }

        if (component) {
            logFunction('[' + date.toISOString() + '][' + component + ']', message);
        } else {
            logFunction('[' + date.toISOString() + '] ' + message);
        }
    };

    /**
     * Lightweight logger. Logging goes like this:
     * var axe = require('axe');
     * axe.debug([TAG], message);
     * axe.info([TAG], message);
     * axe.warn([TAG], message);
     * axe.error([TAG], message);
     *
     * @constructor
     */
    var Axe = function() {
        /**
         * Default console log appender
         * @type {ConsoleAppender}
         */
        this.defaultAppender = new ConsoleAppender();

        /**
         * Gathers all the appenders
         * @type {Array}
         */
        this.appenders = [this.defaultAppender];

        /**
         * Configures the log leve, ignores anything below this log level. Default: this.DEBUG
         * @type {Number}
         */
        this.logLevel = 0; // default to debug

        /**
         * Maximum number of log entries. Default: 10000
         * @type {Number}
         */
        this.maxEntries = 10000;

        var levels = ['debug', 'info', 'warn', 'error'];
        for (var i = 0; i < levels.length; i++) {
            this[levels[i]] = this.log.bind(this, i);
        }

        /**
         * Holds all the log entries
         * @type {Array}
         */
        this.logs = [];
        this.DEBUG = DEBUG;
        this.INFO = INFO;
        this.WARN = WARN;
        this.ERROR = ERROR;
    };

    /**
     * Add an appender, no-op if already present.
     * Must implemement the following method: appender.log(level [Number], date [Date], component [String], message [String/Error])
     *
     * @param {Object} appender The appender
     */
    Axe.prototype.addAppender = function(appender) {
        if (this.appenders.indexOf(appender) !== -1) {
            return;
        }

        this.appenders.push(appender);
    };

    /**
     * Removes an appender, no-op if not present.
     * @param {Object} appender The appender
     */
    Axe.prototype.removeAppender = function(appender) {
        var index = this.appenders.indexOf(appender);
        if (index !== -1) {
            this.appenders.splice(index, 1);
        }
    };

    /**
     * Log something to the appenders
     * @param {Number} level The log level
     * @param {[type]} component [description]
     * @param {[type]} message [description]
     * @return {[type]} [description]
     */
    Axe.prototype.log = function(level, component, message) {
        if (level < this.logLevel) {
            return;
        }

        if (component && !message) {
            message = component;
            component = undefined;
        }

        var log = [level, new Date(), component, message];

        this.logs.push(log);
        this.logs = this.logs.slice(-this.maxEntries);

        this.appenders.forEach(function(appender) {
            appender.log.apply(appender, log);
        });
    };

    /**
     * Dump the logger's entire logs (up to the max number of entries) to an appender.
     *
     * @param {Object} appender The appender
     */
    Axe.prototype.dump = function(appender) {
        this.logs.forEach(function(log) {
            appender.log.apply(appender, log);
        });
    };

    return new Axe();
}));
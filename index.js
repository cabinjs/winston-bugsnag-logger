
const _ = require('lodash');
const bugsnag = require('bugsnag');
const winston = require('winston');
const util = require('util');

function BugsnagLogger(options) {

  options = options || {};
  options = _.defaultsDeep(options, {
    apiKey: process.env.BUGSNAG_API_KEY || '',
    config: {},
    name: 'bugsnag',
    silent: false,
    level: 'info',
    levelsMap: {
      silly: 'info',
      verbose: 'info',
      info: 'info',
      debug: 'info',
      warn: 'warning',
      error: 'error'
    }
  });

  winston.Transport.call(this, _.omit(options, [
    'apiKey',
    'config',
    'bugsnag',
    'levelsMap'
  ]));

  this._levelsMap = options.levelsMap;

  // expose the instance on the transport
  if (options.bugsnag) {
    this.bugsnag = options.bugsnag;
  } else {
    this.bugsnag = bugsnag;
    this.bugsnag.register(options.apiKey, options.config);
  }

};

// Inherit from `winston.Transport`
util.inherits(BugsnagLogger, winston.Transport);

// Define a getter so that `winston.transports.BugsnagLogger`
// is available and thus backwards compatible
winston.transports.BugsnagLogger = BugsnagLogger;

BugsnagLogger.prototype.log = function(level, msg, meta, fn) {

  if (this.silent) return fn(null, true);
  if (!(level in this._levelsMap)) return fn(null, true);

  meta = meta || {};
  meta.severity = this._levelsMap[level];
  meta.metaData = meta.metaData || {};

  //
  // TODO: this is currently unknown and poorly documented by Bugsnag
  // (e.g. bugsnag-js sends a different payload than bugsnag-node does)
  // <insert facepalm here>
  //

  if (_.isError(msg) && !_.isObject(meta.metaData.err)) {
    meta.metaData.err = { stack: msg.stack, message: msg.message };
    msg = msg.message;
  }

  if (_.isError(meta) && !_.isObject(meta.metaData.err)) {
    meta.metaData.err = { stack: meta.stack, message: meta.message };
    if (!_.isString(msg))
      msg = meta.message;
  }

  this.bugsnag.notify(msg, meta, function() {
    fn(null, true);
  });

}

module.exports = BugsnagLogger;

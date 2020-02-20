> This package is deprecated and a better alternative has been created, please use Cabin: https://cabinjs.com

# winston-bugsnag-logger

[![node](https://img.shields.io/badge/node-4.8.4+-brightgreen.svg)][node-url]
[![bugsnag](https://img.shields.io/badge/bugsnag-1.x+-brightgreen.svg)][bugsnag-url]
[![winston](https://img.shields.io/badge/winston-2.x+-brightgreen.svg)][winston-url]
[![license](https://img.shields.io/github/license/niftylettuce/winston-bugsnag-logger.svg)][license-url]

The **maintained** and **well-documented** [Bugsnag](https://github.com/bugsnag/bugsnag-node) transport for the [winston](https://github.com/winstonjs/winston) logger.

> Full API documentation is available at: <https://docs.bugsnag.com/api/error-reporting/>

## Index

* [Install](#install)
* [Usage](#usage)
* [Options](#options-options)
  - [Log Level Mapping](#log-level-mapping)
* [License](#license)


## Install

```bash
npm install --save winston winston-bugsnag-logger
```


## Usage

You can configure `winston-bugsnag-logger` in two different ways.

With `new winston.Logger`:

```js
const winston = require('winston');
const Bugsnag = require('winston-bugsnag-logger');

const options = {
  apiKey: '*******',
  level: 'info'
};

const logger = new winston.Logger({
  transports: [
    new Bugsnag(options)
  ]
});
```

Or with winston's `add` method:

```js
const winston = require('winston');
const Bugsnag = require('winston-bugsnag-logger');

const logger = new winston.Logger();

logger.add(Bugsnag, options);
```

See [Options](#options-options) below for custom configuration.


## Options (`options`)

Per `options` variable above, here are the default options provided:

Default options:

* `apiKey` (String) - your Bugsnag API key (defaults to `process.env.BUGSNAG_API_KEY`)
* `config` (Object) - a Bugsnag configuration object
* `bugsnag` (Object) - an optional instance of `bugsnag` that is already configured via `bugsnag.register` (if provided this will be used instead of the `config` option)

Transport related options:

* `name` (String) - transport's name (defaults to `bugsnag`)
* `silent` (Boolean) - suppress logging (defaults to `false`)
* `level` (String) - transport's level of messages to log (defaults to `info`)
* `levelsMap` (Object) - log level mapping to Bugsnag (see [Log Level Mapping](#log-level-mapping) below)

### Log Level Mapping

Winston logging levels are mapped by default to Bugsnag's acceptable levels.

These defaults are set as `options.levelsMap' and are:

```js
{
  silly: 'info',
  verbose: 'info',
  info: 'info',
  debug: 'debug',
  warn: 'warning',
  error: 'error'
}
```

You can customize how log levels are mapped using the `levelsMap` option:

```js
new Bugsnag({
  levelsMap: {
    verbose: 'info'
  }
});
```

If no log level mapping was found for the given `level` passed, then it will not log anything.


## License

[MIT License][license-url]


[license-url]: LICENSE
[node-url]: https://nodejs.org
[bugsnag-url]: https://bugsnag.com
[winston-url]: https://github.com/winstonjs/winston

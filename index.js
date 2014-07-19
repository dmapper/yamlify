var through = require('through');
var yaml = require('js-yaml');
var includeSchema = require('./includeSchema');

module.exports = function(file) {
  if (!/\.ya?ml$/.test(file)) return through();

  var data = '';
  function write(buf) {
    data += buf;
  }

  function end() {
    this.queue('module.exports = ' + JSON.stringify(yaml.safeLoad(data, {
      schema: includeSchema,
      filename: file
    })) + ';');
    this.queue(null);
  }

  return through(write, end);
};
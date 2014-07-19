var fs   = require('fs');
var yaml = require('js-yaml');
var includeSchema = require('./includeSchema');

require.extensions['.yml'] = require.extensions['.yaml'] = function (m, f) {
  m.exports = yaml.safeLoad(fs.readFileSync(f, 'utf8'), {
    schema: includeSchema,
    filename: f
  });
};


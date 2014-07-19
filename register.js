var fs   = require('fs');
var yaml = require('js-yaml');
var includeSchema = require('./includeSchema');

var yamlRequire = function (m, f) {
  m.exports = yaml.safeLoad(fs.readFileSync(f, 'utf8'), {
    schema: includeSchema,
    filename: f
  });
};

// Hack to prevent later changes of .yml, .yaml extensions handlers
['.yml', '.yaml'].forEach(function(ext){
  Object.defineProperty(require.extensions, ext, {
    get: function() {
      return yamlRequire;
    },
    set: function() {}
  });
});
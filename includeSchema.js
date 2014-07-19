yaml = require('js-yaml');
path = require('path');
fs = require('fs');
var IMPORT_ANCHOR_FIELD = '__yaml-import-specified-anchor';
var INCLUDE_SCHEMA;

var includeYamlType = new yaml.Type('!include', {
  loadKind: 'scalar',
  loadResolver: function (state) {
    var filename, data, parts, src, anchor, json;

    // Get a specific pointer if present
    parts = state.result.split(' *');
    src = parts[0];
    anchor = parts[1];

    // Load file with proper absolute/relative path handling
    if (src[0] === '/' || src[0] === '\\')
      filename = path.normalize(state.result.slice(1));
    else
      filename = path.join(path.dirname(state.filename), src);

    // Add .yml/.yaml extension unless explicitly specified
    if (!/\.ya?ml/.test(filename))
      if (fs.existsSync(filename + '.yml'))
        filename += '.yml';
      else
        filename += '.yaml';

    data = fs.readFileSync(filename, {encoding: 'utf-8'});

    if (anchor) {

      // Check whether the included file has anchor specified
      if (!(new RegExp(' &' + anchor + '[ \n\r]+')).test(data)) {
        throw new Error('' + filename + ' doesn\'t have anchor &'
          + anchor + '.');
      }

      data += '\n' + IMPORT_ANCHOR_FIELD + ': *' + anchor;
    }

    // Parse included file
    json = yaml.load(data, {
      schema: INCLUDE_SCHEMA,
      filename: filename
    });

    // Return the whole json result or a particular anchor if specified
    if (anchor)
      state.result = json[IMPORT_ANCHOR_FIELD];
    else
      state.result = json;

    return true;
  }
});

INCLUDE_SCHEMA = yaml.Schema.create([includeYamlType]);
module.exports = INCLUDE_SCHEMA;
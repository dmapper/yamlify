# yamlify

> YAML (`.yaml`, `.yml`) files support for browserify and node.  


## YAML support for browserify and node.js

Yamlify!
```js
// server.js

var browserify = require('browserify');
var yamlify = require('yamlify');

b = browserify();
b.add('./client.js');
b.transform(yamlify);
```

Add ability to require YAML files in Node.js
```js
// server.js

require('yamlify/register');
```

After that you can require yaml wherever you want:
```js
// client.js or server.js

var constants = require('./constants.yaml');
```

## licence
MIT

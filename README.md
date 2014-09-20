# yamlify

> YAML (`.yaml`, `.yml`) files support for browserify and node.  
> With feature to include `yaml` files into each other.  
         

## YAML support for browserify and node.js

Yamlify!
```js
// server.js

var browserify = require('browserify');
var yamlify = require('yamlify');

b = browserify();
b.add('client.js');
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

## YAML files inclusions

This plugin also adds an ability to include yaml files into each other.

Lets say you want to keep some data in a partial file:
 
```yaml
# _films.yaml

- &terminator
  name: Terminator 2 
  year: 1991
- name: Avatar
  year: 2009
``` 
 
You can include a whole `.yaml` file into another one like this: 
```yaml
# director.yaml

name: James Cameron 
films: !include ./_films 
```
  
You can also include a particular anchor from the specified file:  

```yaml
# me.yaml

name: John Smith
favouriteFilm: !include ./_films *terminator
```


## licence
MIT
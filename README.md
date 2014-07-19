# yamlify

> YAML (`.yaml`, `.yml`) files support for browserify and node.  
> With feature to include `yaml` files into each other.  
         

## features

1. Adds `!include` yaml type for ability to include yaml file 
    into each other.
2. You can use `require('yamlify/register')` to add `.yaml`, `.yml` files
    support to `node.js`


## YAML support for browserify and node.js

### Yamlify!
```js
var browserify = require('browserify');
var yamlify = require('yamlify');

b = browserify();
b.add('foobar.js');
b.transform(yamlify);
```

### Add ability to require YAML files in Node.js
```js
require('yamlify/register');
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
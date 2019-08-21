# json-store-obhect

[![Build Status](https://travis-ci.org/cedced19/json-store-object.svg?branch=master)](https://travis-ci.org/cedced19/json-store-object)

Simple JSON database to store properties.

```bash
npm i --save json-store-object
```

First init the store (make sure that the path is correctly defined):
```javascript
var JSONStore = require('json-store-object');

var defaultObject = { // Object to consider if the file do not exists
    up: false
}

var defaultReturn = null; // Value to return if the key do not exist do not exists

var db = JSONStore(defaultObject, defaultReturn,'./index.json');
```

## Functions

* `db.getAll()`: get the whole file
* `db.get(key, cb)`: get a property, example: `db.get('up' function (err, obj) {...})`
* `db.put(key, value, cb)`: edit a property in the store or create it, example: `db.put('up', true, function (err) {...})`
* `db.delete(key, cb)`: delete a property, example: `db.delete('up', function (err) {...})`
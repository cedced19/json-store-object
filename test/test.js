const assert = require('assert');
const path = require('path');
const fs = require('fs');
const examplePath = path.join(process.cwd(), '/example.json');
const exampleContent = JSON.parse(fs.readFileSync(examplePath));

describe('JSON Storage Object', function () {

    it('the module can be required without throwing', function () {
        var JSONStorage = require('../');
    });

    describe('run test', function () {

        beforeEach(function () {
            fs.writeFileSync(examplePath, JSON.stringify(exampleContent));
        });

        after(function () {
            fs.writeFileSync(examplePath, JSON.stringify(exampleContent));
        });

        it('should give the content of example.json', function () {
            var content = require('../')({ up: false }, null, examplePath).getAll();
            assert.equal(Object.keys(content).length, 4);
        });

        it('should give the id value', function () {
            var id = require('../')({ up: false }, null, examplePath).get('id');
            assert.equal(id, 1);
        });

        it('should remove the "id" property', function (done) {
            var store = require('../')({ up: false }, null, examplePath);
            store.delete('id', function (err) {
                assert.equal(err, null);
                assert.equal(store.getAll().hasOwnProperty('id'), false);
                done();
            });
        });

        it('should change the id with "2"', function (done) {
            var store = require('../')({ up: false }, null, examplePath);
            store.put('id', 2, function (err) {
                assert.equal(err, null);
                assert.equal(store.getAll().hasOwnProperty('id'), true);
                var id = store.get('id');
                assert.equal(id, 2);
                done();
            });
        });

        it('should add a property', function (done) {
            var store = require('../')({ up: false }, null, examplePath);
            store.put('bidule', 3, function (err) {
                assert.equal(err, null);
                assert.equal(store.getAll().hasOwnProperty('bidule'), true);
                var bidule = store.get('bidule');
                assert.equal(bidule, 3);
                done();
            });
        });

        it('should create new file if it does not exist', function () {
            var example2Path = path.join(process.cwd(), '/example2.json');
            assert.equal(fs.existsSync(example2Path), false);
            var store = require('../')({ up: false }, null, example2Path);
            assert.equal(fs.existsSync(example2Path), true);
            fs.unlinkSync(example2Path);
        });


    });
});
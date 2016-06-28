var expect = require('chai').expect;
var lib = require('../functions');

describe('the functions library', function () {
    it('should be an object', function () {
        expect(lib).to.be.an('object');
    });

    describe('sum', function () {
        it('should be a function', function () {
            expect(lib.sum).to.be.a('function');
        });

        it('should return zero for bad values', function () {
            expect(lib.sum()).to.equal(0);
            expect(lib.sum([])).to.equal(0);
            expect(lib.sum({})).to.equal(0);
            expect(lib.sum(100)).to.equal(0);
            expect(lib.sum('foo')).to.equal(0);
            expect(lib.sum(null)).to.equal(0);
        });

        it('should take an array and return a number', function () {
            var testArray = [1, 2, 3];
            expect(lib.sum(testArray)).to.equal(6);
        });

        it('should ignore non-numeric values', function () {
            var testArray = [, 1, 2, 3, 'foo', [], {}, null];
            expect(lib.sum(testArray)).to.equal(6);
        });
    });

    describe('flatten', function () {
        it('should be a function', function () {
            expect(lib.flatten).to.be.a('function');
        });

        it('should return an empty array for bad values', function () {
            expect(lib.flatten()).to.deep.equal([]);
            expect(lib.flatten(1)).to.deep.equal([]);
            expect(lib.flatten('foo')).to.deep.equal([]);
            expect(lib.flatten([])).to.deep.equal([]);
            expect(lib.flatten({})).to.deep.equal([]);
            expect(lib.flatten(null)).to.deep.equal([]);
        });

        it('should flatten an array of arrays to a single array', function () {
            var testArray = [
                [1, 2],
                [3, 4],
                [5, 6]
            ];
            var expectedResult = [1, 2, 3, 4, 5, 6];
            expect(lib.flatten(testArray)).to.deep.equal(expectedResult);
        });

        it('should ignore empty array', function () {
            var testArray = [
                [1, 2],
                [],
                [3, 4],
                [],
                [5, 6]
            ];
            var expectedResult = [1, 2, 3, 4, 5, 6];
            expect(lib.flatten(testArray)).to.deep.equal(expectedResult);
        });
    });

    describe('seq', function () {
        it('should be a function', function () {
            expect(lib.range).to.be.a('function');
        });

        it('should return an empty array for bad arguments', function () {
            expect(lib.range()).to.deep.equal([]);
            expect(lib.range(0)).to.deep.equal([]);
            expect(lib.range('')).to.deep.equal([]);
            expect(lib.range({})).to.deep.equal([]);
        });

        it('should return an array starting with 1 up to size (inclusive)', function () {
            expect(lib.range(1)).to.deep.equal([1]);
            expect(lib.range(2)).to.deep.equal([1, 2]);
            expect(lib.range(3)).to.deep.equal([1, 2, 3]);
        });
    });

    describe('isObject', function () {
        it('should be a function', function () {
            expect(lib.isObject).to.be.a('function');
        });

        it('should return false for non-object arguments', function () {
            expect(lib.isObject()).to.equal(false);
            expect(lib.isObject(0)).to.equal(false);
            expect(lib.isObject('')).to.equal(false);
            expect(lib.isObject([])).to.equal(false);
        });

        it('should return true for objects', function () {
            expect(lib.isObject({})).to.equal(true);
            expect(lib.isObject({foo: 'bar'})).to.equal(true);
        });
    });

    describe('mapObject', function () {
        it('should be a function', function () {
            expect(lib.mapObject).to.be.a('function');
        });

        it('should return an empty object for bad arguments', function () {
            expect(lib.mapObject()).to.deep.equal({});
            expect(lib.mapObject('')).to.deep.equal({});
            expect(lib.mapObject(false)).to.deep.equal({});
            expect(lib.mapObject(1)).to.deep.equal({});
            expect(lib.mapObject([])).to.deep.equal({});
            expect(lib.mapObject({})).to.deep.equal({});
            expect(lib.mapObject({}, '')).to.deep.equal({});
            expect(lib.mapObject({}, false)).to.deep.equal({});
            expect(lib.mapObject({}, 1)).to.deep.equal({});
            expect(lib.mapObject({}, [])).to.deep.equal({});
            expect(lib.mapObject({}, {})).to.deep.equal({});
        });

        it('should return a new object', function () {
            var testObj = {};
            expect(lib.mapObject(testObj, noOp)).to.be.an('object').and.not.equal(testObj);
        });

        it('should return an object with the same keys as the argument', function () {
            var testObj = {
                abc: 123,
                foo: 'bar'
            };

            expect(lib.mapObject(testObj, noOp)).to.be.an('object').and.deep.equal(testObj);
        });

        it('should have values which are the result of the original values passed through the function', function () {
            var testObj = {
                a: 1,
                b: 2,
                c: 3
            };

            function double(n) {
                return n * 2;
            }

            var expectedResult = {
                a: 2,
                b: 4,
                c: 6
            };

            expect(lib.mapObject(testObj, double)).to.deep.equal(expectedResult);
        });
    });
});

describe('extending the global Object prototype', function () {
    it('should be optional, requiring a function invocation to enable', function () {
        expect(Object.prototype.keys).to.be.an('undefined');
        expect(Object.prototype.map).to.be.an('undefined');
        lib.extendObjectPrototype();
        expect(Object.prototype.keys).to.be.a('function');
        expect(Object.prototype.map).to.be.a('function');
    });

    it('should add a keys method that returns an Objects keys as an array', function () {
        var testObject = {
            a: 1,
            b: 2,
            c: 3
        };
        lib.extendObjectPrototype();
        expect(testObject.keys()).to.deep.equal(['a', 'b', 'c']);
    });

    it('should add a map function that calls mapObject on this', function () {
        var testObj = {
            a: 1,
            b: 2,
            c: 3
        };

        function triple(n) {
            return n * 3;
        }

        var expectedResult = {
            a: 3,
            b: 6,
            c: 9
        };

        expect(testObj.map(triple)).to.deep.equal(expectedResult);
    });
});

function noOp(a) {
    return a;
}
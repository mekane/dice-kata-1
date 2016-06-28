module.exports = {
    extendObjectPrototype: extendObjectPrototype,
    flatten: flatten,
    isObject: isObject,
    mapObject: mapObject,
    range: range,
    sum: sum
};

function extendObjectPrototype() {
    Object.prototype.keys = function () {
        return Object.keys(this);
    };
    Object.prototype.map = function (fn) {
        return mapObject(this, fn);
    }
}

function flatten(array) {
    if (array && typeof array.reduce === 'function')
        return array.reduce(concatAllArrayValues, []);
    return [];

    function concatAllArrayValues(resultArray, nextValue) {
        return resultArray.concat(nextValue);
    }
}

function range(size) {
    var result = [];
    var i = 1;
    if (size && typeof size === 'number') {
        var max = size + 1;
        while (i < max) {
            result.push(i++);
        }
    }
    return result;
}

function sum(array) {
    if (array && typeof array.reduce === 'function')
        return array.reduce(addNext, 0);
    return 0;

    function addNext(total, numberToAdd) {
        if (typeof numberToAdd != 'number')
            return total;
        return total + numberToAdd;
    }
}

function isObject(obj) {
    return !!obj && Object.prototype.toString.call(obj) === '[object Object]';
}

function mapObject(obj, fn) {
    if (obj && isObject(obj) && typeof fn === 'function') {
        var result = {};
        Object.keys(obj).forEach(function (key) {
            result[key] = fn(obj[key]);
        });
        return result;
    }
    return {};
}

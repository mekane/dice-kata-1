var lib = require('../functional-programming/library');
var flatten = lib.flatten;
var sum = lib.sum;

module.exports = {
    listFaces: listFaces,
    combineDice: combineDice,
    combineTotals: combineTotals,
    getPercentageStatsFromTotals: getPercentageStatsFromTotals
};

function listFaces(size) {
    return lib.range(size);
}

function combineDice(size) {
    return flatten(listFaces(size).map(combineWithSize(size)));
}

function combineTotals(arrayOfCombinations) {
    return arrayOfCombinations.reduce(sumCombinationsAndTrackTotal, {});

    function sumCombinationsAndTrackTotal(trackingObject, arrayOfCombinationsToSum) {
        var currentSum = sum(arrayOfCombinationsToSum);
        trackingObject[currentSum] = trackingObject[currentSum] + 1 || 1;
        return trackingObject;
    }
}

function getPercentageStatsFromTotals(statsObject) {
    var result = {};
    var totalRolls = countTotalRolls(statsObject);

    Object.keys(statsObject).map(function(total){
        result[total] = ((statsObject[total] * 100) / totalRolls).toFixed();
    });

    return result;

    function countTotalRolls(obj) {
        return sum(Object.keys(obj).map(getCount));

        function getCount(total){
            return statsObject[total];
        }
    }
}

function combineWithSize(size) {
    return function (number) {
        return listFaces(size).map(function (secondNumber) {
            return [number, secondNumber];
        });
    }
}

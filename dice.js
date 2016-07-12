var lib = require('./functions');
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

function combineDice(numberOfDice, size) {
    var n = numberOfDice - 1;
    var results = listFaces(size);

    while ( n --> 0 ){
        results = flatten(listFaces(size).map(function(number) {
            return lib.combineArrayWith(results, number);
        }));
    }

    return results;
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
        result[total] = ((statsObject[total] * 100) / totalRolls).toFixed(1);
    });

    return result;

    function countTotalRolls(obj) {
        return sum(Object.keys(obj).map(getCount));

        function getCount(total){
            return statsObject[total];
        }
    }
}

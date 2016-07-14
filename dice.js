var lib = require('./functions');
var flatten = lib.flatten;
var sum = lib.sum;

module.exports = {
    listFaces: listFaces,
    combineDice: combineDice,
    combineTotals: combineTotals,
    getPercentageStatsFromTotals: getPercentageStatsFromTotals,
    sumPercentagesGreaterThanRoll: sumPercentagesGreaterThanRoll,
    parseDiceFromCommandLine: parseDiceFromCommandLine,
    sumPercentagesLessThanRoll: sumPercentagesLessThanRoll
};

function listFaces(size) {
    return lib.range(size);
}

function combineDice(numberOfDice, size) {
    var n = numberOfDice - 1;
    var results = listFaces(size).map(makeArray);

    while (n-- > 0) {
        results = flatten(listFaces(size).map(function (number) {
            return lib.combineArrayWith(results, number);
        }));
    }

    return results;

    function makeArray(item) {
        return [item];
    }
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

    Object.keys(statsObject).map(function (total) {
        result[total] = ((statsObject[total] * 100) / totalRolls).toFixed(1);
    });

    return result;

    function countTotalRolls(obj) {
        return sum(Object.keys(obj).map(getCount));

        function getCount(total) {
            return statsObject[total];
        }
    }
}

function sumPercentagesGreaterThanRoll(percentageStats, targetRoll) {
    if (!percentageStats || typeof percentageStats !== 'object' || typeof targetRoll !== 'number' || targetRoll < 0) {
        return 0;
    }
    var sum = 0;
    Object.keys(percentageStats).forEach(function (roll) {
        if (roll > targetRoll) {
            sum += parseFloat(percentageStats[roll]);
        }
    });
    return sum;
}

function sumPercentagesLessThanRoll(  percentageStats, targetRoll) {
    if (!percentageStats || typeof percentageStats !== 'object' || typeof targetRoll !== 'number' || targetRoll < 0) {
        return 0;
    }
    var sum = 0;
    Object.keys(percentageStats).forEach(function (roll) {
        if (roll < targetRoll) {
            sum += Number.parseFloat(percentageStats[roll]);
        }
    });
    return sum;
}

function parseDiceFromCommandLine(stringToParse) {
    if (stringToParse && typeof stringToParse === 'string') {
        var parsed = stringToParse.split('d');
        var number = 0;
        var size = 0;

        try {
            number = Number.parseInt(parsed[0]);
            size = Number.parseInt(parsed[1]);
        }
        catch (err) {
            return {};
        }

        if (number > 0 && size > 0) {
            return {
                number: number,
                size: size
            };
        }
    }

    return {};
}

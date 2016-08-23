var lib = require('./functions');
var flatten = lib.flatten;
var sum = lib.sum;

module.exports = {
    listFaces: listFaces,
    computeRollsForDice: computeRollsForDice,
    combineRolls: combineRolls,
    combineTotals: combineTotals,
    getPercentageStatsFromTotals: getPercentageStatsFromTotals,
    sumPercentagesGreaterThanRoll: sumPercentagesGreaterThanRoll,
    parseDiceFromCommandLine: parseDiceFromCommandLine,
    parseTargetFromCommandLine: parseTargetFromCommandLine,
    sumPercentagesLessThanRoll: sumPercentagesLessThanRoll,
    convertDiceToListOfDiceSizes: convertDiceToListOfDiceSizes,
    getStatsForDice: getStatsForDice
};

function listFaces(size) {
    return lib.range(size);
}

function computeRollsForDice(diceSizes) {
    if (Array.isArray(diceSizes) && diceSizes.length > 0) {
        return diceSizes.reduce(combineRolls, []);
    }
    return [];
}

function combineRolls(existingRolls, diceSize) {
    if (Array.isArray(existingRolls)) {
        if (existingRolls.length === 0)
            return listFaces(diceSize).map(makeArray);
        else
            return flatten(listFaces(diceSize).map(function (number) {
                return lib.combineArrayWith(existingRolls, number);
            }));
    }
    return [];

    function makeArray(val) {
        return [val];
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

function getPercentageStatsFromTotals(statsObject, optionalPrecision) {
    var result = {};
    var totalRolls = countTotalRolls(statsObject);
    var precision = optionalPrecision || 1;

    Object.keys(statsObject).map(function (total) {
        result[total] = ((statsObject[total] * 100) / totalRolls).toFixed(precision);
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

function sumPercentagesLessThanRoll(percentageStats, targetRoll) {
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
        var number = Number.parseInt(parsed[0]);
        var size = Number.parseInt(parsed[1]);

        if (!isNaN(number) && number > 0 && !isNaN(size) && size > 0) {
            return {
                number: number,
                size: size
            };
        }
    }

    return {};
}

function parseTargetFromCommandLine(stringToParse) {
    var direction = 'greater';

    if (!stringToParse || typeof stringToParse !== 'string' || stringToParse.length === 0) {
        return {};
    }

    var first = 0;
    var last = stringToParse.length - 1;

    if (stringToParse[first] === '+') {
        stringToParse = stripFirst(stringToParse);
    }

    if (stringToParse[last] === '+') {
        stringToParse = stripLast(stringToParse);
    }

    if (stringToParse[first] === '-') {
        direction = 'less';
        stringToParse = stripFirst(stringToParse);
    }

    if (stringToParse[last] === '-') {
        direction = 'less';
        stringToParse = stripLast(stringToParse);
    }

    var target = Number.parseInt(stringToParse);

    if (isNaN(target)) {
        return {};
    }

    return {
        target: target,
        direction: direction
    };

    function stripFirst(string) {
        return string.substring(1);
    }

    function stripLast(string) {
        return string.substring(0, string.length - 1);
    }
}

function convertDiceToListOfDiceSizes(listOfDiceObjects) {
    if (Array.isArray(listOfDiceObjects) && listOfDiceObjects.length > 0)
        return flatten(listOfDiceObjects.map(getSize)).filter(validNumber);
    return [];

    function getSize(diceObj) {
        if (!validNumber(diceObj.number)) {
            return null;
        }
        var n = diceObj.number;
        var result = [];
        while (n-- > 0)
            result.push(diceObj.size);
        return result;
    }

    function validNumber(value) {
        return value && typeof value === 'number';
    }
}

function getStatsForDice(diceConfig, optionalModifier, optionalPrecision){
    var diceToRoll = convertDiceToListOfDiceSizes(diceConfig);
    var rolls = computeRollsForDice(diceToRoll);
    var totals = combineTotals(rolls);
    var stats = getPercentageStatsFromTotals(totals, optionalPrecision);

    var modifier = Number(optionalModifier) || 0;
    var finalStats = {};

    if ( modifier ) {
        Object.keys(stats).forEach(function (key) {
            var newKey = Number(key) + modifier;
            finalStats[newKey] = stats[key];
        });
    }
    else {
        finalStats = stats;
    }

    return finalStats;
}
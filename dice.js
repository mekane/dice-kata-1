module.exports = {
    listFaces: listFaces,
    combineDice: combineDice,
    combineTotals: combineTotals,
    getPercentageStatsFromTotals: getPercentageStatsFromTotals
};

function listFaces(size) {
    return rest(seq(size + 1));
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

function flatten(array) {
    return array.reduce(flattenArraysIgnoringEmpty, []);
}

function flattenArraysIgnoringEmpty(a, b) {
    if (a && a.length)
        return a.concat(b);
    return b;
}


function seq(number) {
    var result = [];
    var i = 0;

    if (number) {
        while (i < number) {
            result.push(i++);
        }
    }
    return result;
}

function rest(array) {
    return array.slice(1);
}

function sum( array ) {
    return array.reduce(addNext, 0);

    function addNext(total, numberToAdd) {
        return total + numberToAdd;
    }
}
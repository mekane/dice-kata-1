#! /usr/local/bin/node
var dice = require('./dice');

var parsedArgs = process.argv.map(parseArg).filter(isUsefulArgument);
var diceArgs = parsedArgs.filter(isDiceArg);
var targetArg = parsedArgs.filter(isTargetArg)[0];

var diceToRoll = dice.convertDiceToListOfDiceSizes(diceArgs);
var rolls = dice.computeRollsForDice(diceToRoll);
var stats = dice.getPercentageStatsFromTotals(dice.combineTotals(rolls));

printStatsForAllRolls(stats);
printTargetOdds(stats, targetArg);

function parseArg(arg) {
    var diceSpec = dice.parseDiceFromCommandLine(arg);
    return isDiceArg(diceSpec) ? diceSpec : dice.parseTargetFromCommandLine(arg);
}

function isUsefulArgument(parsedObject) {
    return parsedObject && (isTargetArg(parsedObject) || isDiceArg(parsedObject));
}

function isTargetArg(parsedObject) {
    return !!parsedObject.target;
}

function isDiceArg(parsedObject) {
    return !!parsedObject.number;
}


function printStatsForAllRolls(stats) {
    for (roll in stats) {
        var chance = stats[roll];
        var line = padLeft(2)(roll) + ': ' + padLeft(4)(chance) + '%';
        console.log(line)
    }
}

function printTargetOdds(stats, targetArgument) {
    if (targetArgument) {
        console.log();

        var target = targetArgument.target;

        if (targetArgument.direction === 'greater') {
            console.log('Odds of rolling higher than ' + target + ': ' + dice.sumPercentagesGreaterThanRoll(stats, target).toFixed(1) + '%');
        }
        else if (targetArgument.direction === 'less') {
            target = -target;
            console.log('Odds of rolling less than ' + target + ': ' + dice.sumPercentagesLessThanRoll(stats, target).toFixed(1) + '%');
        }
    }
}

function padLeft(size) {
    return function (string) {
        var padding = '';
        var missingLength = size - string.length + 1;
        if (missingLength > 0) {
            padding = new Array(missingLength).join(' ');
        }
        return padding + string;
    }
}

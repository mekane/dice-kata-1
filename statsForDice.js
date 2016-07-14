#! /usr/local/bin/node
var dice = require('./dice');

var commandLineOptionDice = dice.parseDiceFromCommandLine(process.argv[2]);
var commandLineOptionTarget = process.argv[3];

var numberOfDice = commandLineOptionDice.number;
var sizeOfDice = commandLineOptionDice.size;

var rolls = dice.computeRollsForDice(numberOfDice, sizeOfDice);
var stats = dice.getPercentageStatsFromTotals(dice.combineTotals(rolls));
printStatsForAllRolls(stats);
printTargetOdds(stats, commandLineOptionTarget);


function printStatsForAllRolls(stats) {
    console.log('Stats for ' + numberOfDice + ' ' + sizeOfDice + '-sided dice:');

    for (roll in stats) {
        var chance = stats[roll];
        var line = padLeft(2)(roll) + ': ' + padLeft(4)(chance) + '%';
        console.log(line)
    }
}

function printTargetOdds(stats, targetArgument) {
    console.log();
    var target = Number.parseInt(targetArgument);

    if ( target > 0 ) {
        console.log('Odds of rolling higher than ' + target + ': ' + dice.sumPercentagesGreaterThanRoll(stats, target));
    }
    else {
        target = -target;
        console.log('Odds of rolling less than ' + target + ': ' + dice.sumPercentagesLessThanRoll(stats, target));
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

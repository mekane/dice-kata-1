#! /usr/local/bin/node
var dice = require('./dice');

var mode = process.argv[2];
var arg = process.argv[3];

var arg4d12 = '4d12';

console.log('mode = ' + mode);

var combos2d6 = dice.computeRollsForDice([6, 6]);
var combos4d12 = dice.computeRollsForDice([12, 12, 12, 12]);

if (mode === 'combinations') {
    if (arg === arg4d12)
        logCombinations(combos4d12);
    else
        logCombinations(combos2d6);
}
else if (mode === 'totals') {
    if (arg === arg4d12)
        console.log(dice.combineTotals(combos4d12));
    else
        console.log(dice.combineTotals(combos2d6));
}
else if (mode === '-h' || mode === '--help' || mode === 'help') {
    console.log('Usage: demo.js [OPTION]');
    console.log('');
    console.log('Options:');
    console.log('  combinations \t\t print out the combinations for 2d6');
    console.log('  totals \t\t print out the total possible rolls for each roll');
    console.log('  stats \t\t print out the stats for rolls of 2d6');
}
else {
    if ( arg === arg4d12 )
        logStats(dice.getStatsForDice([{size: 12, number: 4}], 0, 3));
    else
        logStats(dice.getStatsForDice([{size: 6, number: 2}], 0, 2));
}

function logCombinations(arrayOfCombinations) {
    console.log(arrayOfCombinations.map(arrayToString).join(' '));
}

function arrayToString(array) {
    return '[' + array.join(' ') + ']';
}

function logStats(stats) {
    var roll;

    for (roll in stats) {
        var chance = stats[roll];
        var line = padLeft(2)(roll) + ': ' + padLeft(4)(chance) + '%';
        console.log(line)
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
}
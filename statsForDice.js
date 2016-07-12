#! /usr/local/bin/node
var dice = require('./dice');

var commandLineOptionDice = dice.parseDiceFromCommandLine(process.argv[2]);

var numberOfDice = commandLineOptionDice.number;
var sizeOfDice = commandLineOptionDice.size;

var rolls = dice.combineDice(numberOfDice, sizeOfDice);
var stats = dice.getPercentageStatsFromTotals(dice.combineTotals(rolls));

console.log('Stats for ' + numberOfDice + ' ' + sizeOfDice + '-sided dice:');

for (roll in stats) {
    var chance = stats[roll];
    var line = padLeft(2)(roll)+': ' + padLeft(4)(chance)+'%';
    console.log(line)
}

function padLeft(size){
    return function(string) {
        var padding = '';
        var missingLength = size - string.length + 1;
        if ( missingLength > 0 ) {
            padding = new Array(missingLength).join(' ');
        }
        return padding + string;
    }
}

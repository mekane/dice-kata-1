var dice = require('./dice');

var commandLineOptionDice = dice.parseDiceFromCommandLine(process.argv[2]);

var numberOfDice = commandLineOptionDice.number;
var sizeOfDice = commandLineOptionDice.size;

var rolls = dice.combineDice(numberOfDice, sizeOfDice);

console.log('Stats for ' + numberOfDice + ' ' + sizeOfDice + '-sided dice:');
console.log( dice.getPercentageStatsFromTotals(dice.combineTotals(rolls)) );

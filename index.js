//var commandLineOptionOne = process.argv[2];
var dice = require('./dice');

console.log( dice.getPercentageStatsFromTotals(dice.combineTotals(dice.combineDice(6))) );

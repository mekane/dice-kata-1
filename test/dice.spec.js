var expect = require('chai').expect;
var dice = require('../dice');

describe('the dice module', function () {
    it('should be an object', function () {
        expect(dice).to.be.an('object');
    });

    describe('listFaces', function () {
        it('should have a listFaces method', function () {
            expect(dice.listFaces).to.be.a('function');
        });

        it('should return an empty array if the arguments are bad', function () {
            expect(dice.listFaces()).to.deep.equal([]);
            expect(dice.listFaces('foo')).to.deep.equal([]);
            expect(dice.listFaces([])).to.deep.equal([]);
            expect(dice.listFaces({})).to.deep.equal([]);
        });

        it('should list the faces for a 4-sided die', function () {
            expect(dice.listFaces(4)).to.deep.equal([1, 2, 3, 4]);
        });

        it('should list the faces for a 6-sided die', function () {
            expect(dice.listFaces(6)).to.deep.equal([1, 2, 3, 4, 5, 6]);
        });
    });

    describe('combineRolls', function () {
        it('should be a function', function () {
            expect(dice.combineRolls).to.be.a('function');
        });

        it('should return an empty array for bad arguments', function () {
            expect(dice.combineRolls()).to.deep.equal([]);
            expect(dice.combineRolls(0)).to.deep.equal([]);
            expect(dice.combineRolls('')).to.deep.equal([]);
            expect(dice.combineRolls({})).to.deep.equal([]);
        });

        it('should return an array of single rolls given an empty starting array', function () {
            var expectedCombinations = [[1], [2], [3], [4], [5], [6]];
            expect(dice.combineRolls([], 6)).to.deep.equal(expectedCombinations);
        });

        it('should take an array and return combinations with a given dice size', function () {
            var rollsFor1d6 = [[1], [2], [3], [4], [5], [6]];
            var expectedCombinationsFor2d6 = [
                [1, 1],
                [1, 2],
                [1, 3],
                [1, 4],
                [1, 5],
                [1, 6],
                [2, 1],
                [2, 2],
                [2, 3],
                [2, 4],
                [2, 5],
                [2, 6],
                [3, 1],
                [3, 2],
                [3, 3],
                [3, 4],
                [3, 5],
                [3, 6],
                [4, 1],
                [4, 2],
                [4, 3],
                [4, 4],
                [4, 5],
                [4, 6],
                [5, 1],
                [5, 2],
                [5, 3],
                [5, 4],
                [5, 5],
                [5, 6],
                [6, 1],
                [6, 2],
                [6, 3],
                [6, 4],
                [6, 5],
                [6, 6]
            ];
            expect(dice.combineRolls(rollsFor1d6, 6)).to.deep.equal(expectedCombinationsFor2d6);
        });

        it('should be able to combine rolls for different size dice', function () {
            var rollsFor1d4 = [[1], [2], [3], [4]];
            var expectedCombinationsFor1d4and1d6 = [
                [1, 1],
                [1, 2],
                [1, 3],
                [1, 4],
                [2, 1],
                [2, 2],
                [2, 3],
                [2, 4],
                [3, 1],
                [3, 2],
                [3, 3],
                [3, 4],
                [4, 1],
                [4, 2],
                [4, 3],
                [4, 4],
                [5, 1],
                [5, 2],
                [5, 3],
                [5, 4],
                [6, 1],
                [6, 2],
                [6, 3],
                [6, 4]
            ];
            expect(dice.combineRolls(rollsFor1d4, 6)).to.deep.equal(expectedCombinationsFor1d4and1d6);

            var rollsFor1d2 = [[1], [2]];
            var rollsFor1d2and1d3 = dice.combineRolls(rollsFor1d2, 3);
            var rollsFor1d2and1d3and1d4 = dice.combineRolls(rollsFor1d2and1d3, 4);
            var expectedCombinationsFor1d2and1d3and1d4 = [
                [1, 1, 1],
                [1, 1, 2],
                [1, 2, 1],
                [1, 2, 2],
                [1, 3, 1],
                [1, 3, 2],
                [2, 1, 1],
                [2, 1, 2],
                [2, 2, 1],
                [2, 2, 2],
                [2, 3, 1],
                [2, 3, 2],
                [3, 1, 1],
                [3, 1, 2],
                [3, 2, 1],
                [3, 2, 2],
                [3, 3, 1],
                [3, 3, 2],
                [4, 1, 1],
                [4, 1, 2],
                [4, 2, 1],
                [4, 2, 2],
                [4, 3, 1],
                [4, 3, 2]
            ];

            expect(rollsFor1d2and1d3and1d4).to.deep.equal(expectedCombinationsFor1d2and1d3and1d4);
        });
    });

    describe('the computeRollsForDice method', function () {
        it('should be a method', function () {
            expect(dice.computeRollsForDice).to.be.a('function');
        });

        it('should return an empty array for bad results', function () {
            expect(dice.computeRollsForDice()).to.deep.equal([]);
            expect(dice.computeRollsForDice('')).to.deep.equal([]);
            expect(dice.computeRollsForDice(11)).to.deep.equal([]);
            expect(dice.computeRollsForDice([])).to.deep.equal([]);
            expect(dice.computeRollsForDice({})).to.deep.equal([]);
        });

        it('should return the combinations of a list of dice sizes', function () {
            var _2d2 = [2, 2];
            var expectedCombinations2d2 = [
                [1, 1],
                [1, 2],
                [2, 1],
                [2, 2]
            ];
            expect(dice.computeRollsForDice(_2d2)).to.deep.equal(expectedCombinations2d2);

            var _1d6 = [6];
            var expectedCombinations1d6 = [[1], [2], [3], [4], [5], [6]];
            expect(dice.computeRollsForDice(_1d6)).to.deep.equal(expectedCombinations1d6);

            var _2d6 = [6, 6];
            var expectedCombinations2d6 = [
                [1, 1],
                [1, 2],
                [1, 3],
                [1, 4],
                [1, 5],
                [1, 6],
                [2, 1],
                [2, 2],
                [2, 3],
                [2, 4],
                [2, 5],
                [2, 6],
                [3, 1],
                [3, 2],
                [3, 3],
                [3, 4],
                [3, 5],
                [3, 6],
                [4, 1],
                [4, 2],
                [4, 3],
                [4, 4],
                [4, 5],
                [4, 6],
                [5, 1],
                [5, 2],
                [5, 3],
                [5, 4],
                [5, 5],
                [5, 6],
                [6, 1],
                [6, 2],
                [6, 3],
                [6, 4],
                [6, 5],
                [6, 6]
            ];
            expect(dice.computeRollsForDice(_2d6)).to.deep.equal(expectedCombinations2d6);

            var _3d4 = [4, 4, 4];
            var expectedCombinations3d4 = [
                [1, 1, 1],
                [1, 1, 2],
                [1, 1, 3],
                [1, 1, 4],
                [1, 2, 1],
                [1, 2, 2],
                [1, 2, 3],
                [1, 2, 4],
                [1, 3, 1],
                [1, 3, 2],
                [1, 3, 3],
                [1, 3, 4],
                [1, 4, 1],
                [1, 4, 2],
                [1, 4, 3],
                [1, 4, 4],
                [2, 1, 1],
                [2, 1, 2],
                [2, 1, 3],
                [2, 1, 4],
                [2, 2, 1],
                [2, 2, 2],
                [2, 2, 3],
                [2, 2, 4],
                [2, 3, 1],
                [2, 3, 2],
                [2, 3, 3],
                [2, 3, 4],
                [2, 4, 1],
                [2, 4, 2],
                [2, 4, 3],
                [2, 4, 4],
                [3, 1, 1],
                [3, 1, 2],
                [3, 1, 3],
                [3, 1, 4],
                [3, 2, 1],
                [3, 2, 2],
                [3, 2, 3],
                [3, 2, 4],
                [3, 3, 1],
                [3, 3, 2],
                [3, 3, 3],
                [3, 3, 4],
                [3, 4, 1],
                [3, 4, 2],
                [3, 4, 3],
                [3, 4, 4],
                [4, 1, 1],
                [4, 1, 2],
                [4, 1, 3],
                [4, 1, 4],
                [4, 2, 1],
                [4, 2, 2],
                [4, 2, 3],
                [4, 2, 4],
                [4, 3, 1],
                [4, 3, 2],
                [4, 3, 3],
                [4, 3, 4],
                [4, 4, 1],
                [4, 4, 2],
                [4, 4, 3],
                [4, 4, 4]
            ];
            expect(dice.computeRollsForDice(_3d4)).to.deep.equal(expectedCombinations3d4);

            var _4d2 = [2, 2, 2, 2];
            var expectedCombinations4d2 = [
                [1, 1, 1, 1],
                [1, 1, 1, 2],
                [1, 1, 2, 1],
                [1, 1, 2, 2],
                [1, 2, 1, 1],
                [1, 2, 1, 2],
                [1, 2, 2, 1],
                [1, 2, 2, 2],
                [2, 1, 1, 1],
                [2, 1, 1, 2],
                [2, 1, 2, 1],
                [2, 1, 2, 2],
                [2, 2, 1, 1],
                [2, 2, 1, 2],
                [2, 2, 2, 1],
                [2, 2, 2, 2]
            ];
            expect(dice.computeRollsForDice(_4d2)).to.deep.equal(expectedCombinations4d2);

            var _1d2_1d3_1d4 = [2, 3, 4];
            var expectedCombinationsFor1d2and1d3and1d4 = [
                [1, 1, 1],
                [1, 1, 2],
                [1, 2, 1],
                [1, 2, 2],
                [1, 3, 1],
                [1, 3, 2],
                [2, 1, 1],
                [2, 1, 2],
                [2, 2, 1],
                [2, 2, 2],
                [2, 3, 1],
                [2, 3, 2],
                [3, 1, 1],
                [3, 1, 2],
                [3, 2, 1],
                [3, 2, 2],
                [3, 3, 1],
                [3, 3, 2],
                [4, 1, 1],
                [4, 1, 2],
                [4, 2, 1],
                [4, 2, 2],
                [4, 3, 1],
                [4, 3, 2]
            ];
            expect(dice.computeRollsForDice(_1d2_1d3_1d4)).to.deep.equal(expectedCombinationsFor1d2and1d3and1d4);
        });
    });

    describe('the combineTotals method', function () {
        it('should reduce all of the combinations to a map of totals and counts', function () {
            var testCombinationsFor1d4 = [[1], [2], [3], [4]];
            var expectedTotalsFor1d4 = {
                1: 1,
                2: 1,
                3: 1,
                4: 1
            };
            expect(dice.combineTotals(testCombinationsFor1d4)).to.deep.equal(expectedTotalsFor1d4);

            var testCombinationsFor2d2 = [
                [1, 1],
                [1, 2],
                [2, 1],
                [2, 2]
            ];
            var expectedTotalsFor2d2 = {
                2: 1,
                3: 2,
                4: 1
            };
            expect(dice.combineTotals(testCombinationsFor2d2)).to.deep.equal(expectedTotalsFor2d2);


            var testCombinationsFor3d2 = [
                [1, 1, 1], // 3
                [1, 1, 2], // 4
                [1, 2, 1], // 4
                [1, 2, 2], // 5
                [2, 1, 1], // 4
                [2, 1, 2], // 5
                [2, 2, 1], // 5
                [2, 2, 2]  // 6
            ];

            var expectedTotalsFor3d2 = {
                3: 1,
                4: 3,
                5: 3,
                6: 1
            };
            expect(dice.combineTotals(testCombinationsFor3d2)).to.deep.equal(expectedTotalsFor3d2);
        });
    });

    describe('getPercentageStatsFromTotals', function () {
        it('should count the total number of rolls and compute odds in percentages', function () {
            var testTotalsFor2d2 = {
                2: 1,
                3: 2,
                4: 1
            };
            var expectedStatsFor2d2 = {
                2: '25.0',
                3: '50.0',
                4: '25.0'
            };
            expect(dice.getPercentageStatsFromTotals(testTotalsFor2d2)).to.deep.equal(expectedStatsFor2d2);

            var testTotalsFor3d2 = {
                3: 1,
                4: 3,
                5: 3,
                6: 1
            };
            var expectedStatsFor3d2 = {
                3: '12.5',
                4: '37.5',
                5: '37.5',
                6: '12.5'
            };
            expect(dice.getPercentageStatsFromTotals(testTotalsFor3d2)).to.deep.equal(expectedStatsFor3d2);
        });

        it('should take a precision argument to allow control over the decimal places in the stats', function () {
            var testTotalsFor3d2 = {
                3: 1,
                4: 3,
                5: 3,
                6: 1
            };
            var expectedStatsFor3d2_toFiveDecimalPlaces = {
                3: '12.50000',
                4: '37.50000',
                5: '37.50000',
                6: '12.50000'
            };
            expect(dice.getPercentageStatsFromTotals(testTotalsFor3d2, 5)).to.deep.equal(expectedStatsFor3d2_toFiveDecimalPlaces);
        });
    });

    describe('sumPercentagesGreaterThanRoll', function () {
        it('should be a function', function () {
            expect(dice.sumPercentagesGreaterThanRoll).to.be.a('function');
        });

        it('returns zero for bad arguments', function () {
            expect(dice.sumPercentagesGreaterThanRoll()).to.equal(0);
            expect(dice.sumPercentagesGreaterThanRoll(0)).to.equal(0);
            expect(dice.sumPercentagesGreaterThanRoll('')).to.equal(0);
            expect(dice.sumPercentagesGreaterThanRoll({})).to.equal(0);
        });

        it('returns the sum of the chances for rolls greater than the argument', function () {
            var testChances = {
                1: '25',
                2: '25',
                3: '25',
                4: '25'
            };
            expect(dice.sumPercentagesGreaterThanRoll(testChances, 2)).to.equal(50);

            testChances = {
                1: '20',
                2: '20',
                3: '20',
                4: '20',
                5: '20'
            };
            expect(dice.sumPercentagesGreaterThanRoll(testChances, 2)).to.equal(60);
        });
    });

    describe('sumPercentagesLessThanRoll', function () {
        it('should be a function', function () {
            expect(dice.sumPercentagesLessThanRoll).to.be.a('function');
        });

        it('returns zero for bad arguments', function () {
            expect(dice.sumPercentagesLessThanRoll()).to.equal(0);
            expect(dice.sumPercentagesLessThanRoll(0)).to.equal(0);
            expect(dice.sumPercentagesLessThanRoll('')).to.equal(0);
            expect(dice.sumPercentagesLessThanRoll({})).to.equal(0);
        });

        it('returns the sum of the chances for rolls less than the argument', function () {
            var testChances = {
                1: '25',
                2: '25',
                3: '25',
                4: '25'
            };
            expect(dice.sumPercentagesLessThanRoll(testChances, 2)).to.equal(25);

            testChances = {
                1: '20',
                2: '20',
                3: '20',
                4: '20',
                5: '20'
            };
            expect(dice.sumPercentagesLessThanRoll(testChances, 3)).to.equal(40);
        });
    });

    describe('the parseDiceFromCommandLine method', function () {
        it('should be a function', function () {
            expect(dice.parseDiceFromCommandLine).to.be.a('function');
        });

        it('should return an empty object for bad arguments', function () {
            expect(dice.parseDiceFromCommandLine()).to.deep.equal({});
            expect(dice.parseDiceFromCommandLine('')).to.deep.equal({});
            expect(dice.parseDiceFromCommandLine(0)).to.deep.equal({});
            expect(dice.parseDiceFromCommandLine({})).to.deep.equal({});
            expect(dice.parseDiceFromCommandLine('0d0')).to.deep.equal({});
            expect(dice.parseDiceFromCommandLine('0d6')).to.deep.equal({});
            expect(dice.parseDiceFromCommandLine('1d0')).to.deep.equal({});
            expect(dice.parseDiceFromCommandLine('ad6')).to.deep.equal({});
            expect(dice.parseDiceFromCommandLine('9dfoo')).to.deep.equal({});
            expect(dice.parseDiceFromCommandLine('add')).to.deep.equal({});
        });

        it('should return an object with parsed (numeric) dice number and size', function () {
            expect(dice.parseDiceFromCommandLine('1d6')).to.deep.equal({number: 1, size: 6});
            expect(dice.parseDiceFromCommandLine('2d6')).to.deep.equal({number: 2, size: 6});
            expect(dice.parseDiceFromCommandLine('1d4')).to.deep.equal({number: 1, size: 4});
            expect(dice.parseDiceFromCommandLine('1d10')).to.deep.equal({number: 1, size: 10});
            expect(dice.parseDiceFromCommandLine('10d10')).to.deep.equal({number: 10, size: 10});
        });
    });

    describe('the parseTargetFromCommandLine method', function () {
        it('should be a function', function () {
            expect(dice.parseTargetFromCommandLine).to.be.a('function');
        });

        it('should return an empty object for bad arguments', function () {
            expect(dice.parseTargetFromCommandLine()).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine('')).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine(0)).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine({})).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine('-')).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine('+')).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine('foo')).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine('a+')).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine('a-')).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine('-a')).to.deep.equal({});
            expect(dice.parseTargetFromCommandLine('+a')).to.deep.equal({});
        });

        it('should return an object with parsed (numeric) dice number and size', function () {
            expect(dice.parseTargetFromCommandLine('1')).to.deep.equal({target: 1, direction: 'greater'});
            expect(dice.parseTargetFromCommandLine('1+')).to.deep.equal({target: 1, direction: 'greater'});
            expect(dice.parseTargetFromCommandLine('-1')).to.deep.equal({target: 1, direction: 'less'});
            expect(dice.parseTargetFromCommandLine('1-')).to.deep.equal({target: 1, direction: 'less'});
            expect(dice.parseTargetFromCommandLine('8')).to.deep.equal({target: 8, direction: 'greater'});
            expect(dice.parseTargetFromCommandLine('8+')).to.deep.equal({target: 8, direction: 'greater'});
            expect(dice.parseTargetFromCommandLine('-8')).to.deep.equal({target: 8, direction: 'less'});
            expect(dice.parseTargetFromCommandLine('8-')).to.deep.equal({target: 8, direction: 'less'});
        });
    });

    describe('the convertDiceToListOfDiceSizes method', function () {
        it('should be a function', function () {
            expect(dice.convertDiceToListOfDiceSizes).to.be.a('function');
        });

        it('should return an empty array for bad arguments', function () {
            expect(dice.convertDiceToListOfDiceSizes()).to.deep.equal([]);
            expect(dice.convertDiceToListOfDiceSizes(0)).to.deep.equal([]);
            expect(dice.convertDiceToListOfDiceSizes('')).to.deep.equal([]);
            expect(dice.convertDiceToListOfDiceSizes([])).to.deep.equal([]);
            expect(dice.convertDiceToListOfDiceSizes({})).to.deep.equal([]);
        });

        it('should just return the sizes from a list of dice spec objects', function () {
            var diceSpecList = [
                {number: 1, size: 4},
                {number: 1, size: 6},
                {number: 1, size: 8}
            ];
            var expectedList = [4, 6, 8];
            expect(dice.convertDiceToListOfDiceSizes(diceSpecList)).to.deep.equal(expectedList);
        });

        it('should ignore bogus values in the list', function () {
            var diceSpecList = [
                {number: 1, size: 4},
                {number: 1, size: 'foo' },
                {number: 1, size: 6},
                {foo: 'bar' },
                {number: 1, size: 8},
                {number: 'foo', size: 11 },
                'eighteen',
                18
            ];
            var expectedList = [4, 6, 8];
            expect(dice.convertDiceToListOfDiceSizes(diceSpecList)).to.deep.equal(expectedList);
        });

        it('should expand dice objects with multiple dice into a list of that many', function () {
            var diceSpecList = [
                {number: 1, size: 4},
                {number: 2, size: 6},
                {number: 3, size: 8}
            ];
            var expectedList = [4, 6, 6, 8, 8, 8];
            expect(dice.convertDiceToListOfDiceSizes(diceSpecList)).to.deep.equal(expectedList);
        });
    });

    describe('the getStatsForDice wrapper method', function () {
        it('should be a method', function () {
            expect(dice.getStatsForDice).to.be.a('function');
        });

        it('should be a convenience method for generating stats from dice configurations', function () {
            var diceConfig = [{number: 2, size: 6}];
            var expectedStats = {
                2: '2.8',
                3: '5.6',
                4: '8.3',
                5: '11.1',
                6: '13.9',
                7: '16.7',
                8: '13.9',
                9: '11.1',
                10: '8.3',
                11: '5.6',
                12: '2.8'
            };
            expect(dice.getStatsForDice(diceConfig)).to.deep.equal(expectedStats);
        });

        it('should take an optional modifier that increases or decreases the keys of the stats block', function () {
            var diceConfig = [{number: 2, size: 6}];
            var expectedStats = {
                4: '2.8',
                5: '5.6',
                6: '8.3',
                7: '11.1',
                8: '13.9',
                9: '16.7',
                10: '13.9',
                11: '11.1',
                12: '8.3',
                13: '5.6',
                14: '2.8'
            };
            expect(dice.getStatsForDice(diceConfig, 2)).to.deep.equal(expectedStats);
        });

        it('should take an optional precision argument', function () {
            var diceConfig = [{number: 2, size: 6}];
            var expectedStats = {
                2: '2.78',
                3: '5.56',
                4: '8.33',
                5: '11.11',
                6: '13.89',
                7: '16.67',
                8: '13.89',
                9: '11.11',
                10: '8.33',
                11: '5.56',
                12: '2.78'
            };
            expect(dice.getStatsForDice(diceConfig, 0, 2)).to.deep.equal(expectedStats);
        });
    });
});

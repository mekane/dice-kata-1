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

    describe('the combineDice method', function () {
        it('should be a method', function () {
            expect(dice.combineDice).to.be.a('function');
        });

        it('should return the combinations of two sets of faces of the same size die', function () {
            var expectedCombinations = [
                [1, 1], [1, 2],
                [2, 1], [2, 2]
            ];
            expect(dice.combineDice(2)).to.deep.equal(expectedCombinations);
        });

        it('should return the combinations of two sets of faces of the same size die', function () {
            var expectedCombinations = [
                [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
                [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
                [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
                [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
                [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
                [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6]
            ];
            expect(dice.combineDice(6)).to.deep.equal(expectedCombinations);
        });
    });

    describe('the combineTotals method', function () {
        it('should reduce all of the combinations to a map of totals and counts', function () {
            var testCombinations = [
                [1, 1], [1, 2],
                [2, 1], [2, 2]
            ];

            var expectedTotals = {
                2: 1,
                3: 2,
                4: 1
            };

            expect(dice.combineTotals(testCombinations)).to.deep.equal(expectedTotals);
        });
    });

    describe('getPercentageStatsFromTotals', function () {
        it('should count the total number of rolls and compute odds in percentages', function () {
            var testTotals = {
                2: 1,
                3: 2,
                4: 1
            };
            var expectedStats = {
                2: '25',
                3: '50',
                4: '25'
            };
            expect(dice.getPercentageStatsFromTotals(testTotals)).to.deep.equal(expectedStats);
        });
    });

});

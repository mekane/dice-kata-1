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

    describe('the diceCombinations method', function () {
        it('should be a method', function () {
            expect(dice.combineDice).to.be.a('function');
        });

        it('should return the combinations of n sets of faces of the same size dice', function () {
            var n = 2;
            var size = 2;
            var expectedCombinations2d2 = [
                [1, 1],
                [1, 2],
                [2, 1],
                [2, 2]
            ];
            expect(dice.combineDice(n, size)).to.deep.equal(expectedCombinations2d2);

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
            expect(dice.combineDice(2, 6)).to.deep.equal(expectedCombinations2d6);

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
            expect(dice.combineDice(3, 4)).to.deep.equal(expectedCombinations3d4);

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
            expect(dice.combineDice(4, 2)).to.deep.equal(expectedCombinations4d2);
        });
    });

    describe('the combineTotals method', function () {
        it('should reduce all of the combinations to a map of totals and counts', function () {
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
    });

});

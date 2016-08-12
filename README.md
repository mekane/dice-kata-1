# Dice Kata - Take 1

## The Kata

Write a program that outputs the probabilities of rolling each number 2-12 using 2d6. 

Here are the expected results:

<table>
  <tr>
    <th>Number</th><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td>
  </tr>
  <tr>
  <th>Fraction</th><td>1/36</td><td>2/36</td><td>3/36</td><td>4/36</td><td>5/36</td><td>6/36</td><td>5/36</td><td>4/36</td><td>3/36</td><td>2/36</td><td>1/36</td>
  </tr>
  <tr>
    <th>Percent</th><td>3%</td><td>6%</td><td>8%</td><td>11%</td><td>14%</td><td>17%</td><td>14%</td><td>11%</td><td>8%</td><td>6%</td><td>3%</td>
  </tr>  
</table>

### Enhancements
1. Add an option to input the number of dice.
1. Add an option to input the size of dice.
1. Add command line parsing to allow specification of arbitrary combinations of dice size and number.
1. Add modifiers to dice (e.g. 1d6+2, 1d8-1, etc.)
1. Add command line option to specify a target number and compute odds of rolling above or below that number on the dice specified.

### Workflow
The project includes mocha for unit testing and istanbul for computing test coverage.

Run `npm install` to set everything up.
Run `npm test` to run unit tests.
Run `npm run coverage` to generate coverage report.
Run `npm run view-coverage` to pop open a web browser and view the coverage report.
Run `npm run build` to export the dice module using browserify.

## Retrospective From First Attempt

I used Node and Mocha to TDD the solution. I ended up using a very functional style, especially keeping in mind the
future enhancements. I managed to get the initial output of 2d6 working in just under an hour and a half.

I didn't stick to the ideal incremental TDD cycle as I would have liked. And I ended up writing a lot of little helper 
function in my module that weren't explicitly unit tested. Many of them were so small and simple they I figured they
didn't need their own unit tests (heresy, I know). I could have exposed them and that would have made my steps a little
smaller and I would have written more tests.

I'm pretty happy with how my code turned out. It's a little rushed, but I think it will be easy to change when the time
comes to extend it to do other numbers and sizes of dice. There are a few functions that could be made more general too.
I feel pretty good about my test coverage. I know I could have more, but I would feel confident making changes knowing
that the overall functionality still works.

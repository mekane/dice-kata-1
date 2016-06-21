# Dice Kata - Take 1

## The Kata

Write a program that outputs the probabilities of rolling each number 2-12 using 2d6. 

Here are the expected results:

| Number | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| Fraction | 1/36 | 2/36 | 3/36 | 4/36 | 5/36 | 6/36 | 5/36 | 4/36 | 3/36 | 2/36 | 1/36 | 
| Percent | 3% | 6% | 8% | 11% | 14% | 17% | 14% | 11% | 8% | 6% | 3% | 


Enhancements
1 Add an option to input the number of dice.
1 Add an option to input the size of dice.
1 Add some crazy option to specify arbitrary combinations of dice size and number.


## Retrospective

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
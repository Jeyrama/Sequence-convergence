/*
Consider the following series:
1, 2, 4, 8, 16, 22, 26, 38, 62, 74, 102, 104, 108, 116, 122

It is generated as follows:
  For single digit integers, add the number to itself to get the next element.
  For other integers, multiply all the non-zero digits and 
  add the result to the original number to get the next element.
  For example: 16 + (6 * 1) = 22 and 104 + (4 * 1) = 108.

Let's begin the same series with a seed value of 3 instead of 1:
3, 6, 12, 14, 18, 26, 38, 62, 74, 102, 104, 108, 116, 122
Notice that the two sequences converge at 26 and are identical therefter. 
We will call the series seeded by a value of 1 the "base series" and the other series the "test series".

Let's look at another test series that starts with 15:
15, 20, 22, 26, 38, 62, 74, 102, 104, 108, 116, 122
The sequences converge at 22 if the test series starts with 15

You will be given a seed value for the test series and 
your task will be to return the number of integers that have to be generated 
in the test series before it converges to the base series. 

In the case above:
  convergence(3) = 5, the length of [3, 6, 12, 14, 18]. 
  convergence(15) = 2, the length of [15, 20]. 
*/


// Solution 

/**
 * Returns the next number in the sequence
 * @param {number} n
 */
function next(n) {
  const digits = n.toString();
  
  // handle single digit
  if (digits.length === 1) {
    return n + n;
  }
  
  // handle multiple digit values
  return digits.split('').reduce((acc, digit) => {
    return acc * (parseInt(digit) || 1)
  }, 1) + n
}

/**
 * Gets length of the test sequence when the it converges on the base sequence
 * @param {number} n - test sequence base
 */
function convergence(n) {
  // initialize series counters
  let counterOne = 1
  let counterN = n
  
  // initialize series containers
  const seriesOne = [counterOne]
  const seriesN = [counterN]
  
  while (true) {
    // update the series counters
    counterOne = next(counterOne)
    counterN = next(counterN)
    
    // update the series containers
    seriesOne.push(counterOne)
    seriesN.push(counterN)
    
    // check for matches in either series
    const matchOne = seriesOne.indexOf(counterN)
    const matchN = seriesN.indexOf(counterOne)
    
    // return test sequence length by type of match
    if (matchOne > 0) return seriesOne.length - 1
    if (matchN > 0) return matchN
  }
}

// or
// convert from Celsius to Fahrenheit
// declare fahrenheit var
// proper order of arithmetic operations is followed by using parenthesis (()) when needed
function convertCtoF(celsius) {
    let fahrenheit = celsius * (9 / 5) + 32;
    return fahrenheit;
}
convertCtoF(30);
  

// take the input, str, and return it in reverse
// split() function will turn our string into an array of characters
// reverse() takes our array of characters and reverses them.
// join('') to put our characters back together into a string
function reverseString(str) {
    return str
    .split("")
    .reverse()
    .join("");
}


// find longest word in string
// take the string and convert it into an array of words
// loop through the words in the string
// declare a var to keep track globally of the greatest current length
// check for the longest word by comparing the current word to the previous one 
// store the new longest word
function findLongestWordLength(str) {
    let words = str.split(' ');
    let maxLength = 0;
  
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > maxLength) {
        maxLength = words[i].length;
      }
    }
  
    return maxLength;
  }


// return largest num in arrays
// create a variable to store the results as an array
// create an outer loop to iterate through the outer array
// create a second variable to hold the largest number and initialise it with the first number
// create said inner loop to work with the sub-arrays
// check if the element of the sub array is larger than the currently stored largest, if so update
function largestOfFour(arr) {
    const results = [];
    for (let i = 0; i < arr.length; i++) {
      let largestNumber = arr[i][0];
      for (let j = 1; j < arr[i].length; j++) {
        if (arr[i][j] > largestNumber) {
          largestNumber = arr[i][j];
        }
      }
      results[i] = largestNumber;
    }
    return results;
  }
// OR
function lrgstOfFour(arr) {
    return arr.map(Function.apply.bind(Math.max, null));
}


// confirm ending
//
function confirmEnding(str, target) {
    // "Never give up and good luck will find you."
    // -- Falcor
    return str.slice(str.length - target.length) === target;
  }

  confirmEnding("He has to give me a new name", "name");
  // OR
  function confirmEnding(str, target) {
    return str.slice(-target.length) === target
  }
  
  confirmEnding("Bastian", "n");
  // If -number is provided as the first parameter to slice(), the offset is taken backwards from the end of the string


// repeat a string
// take a variable and return that variable being repeated certain amount of times
function repeatStringNumTimes(str, num) {
    // use recursion
    // check if num is negative and return an empty string if true
    if (num < 1) {
      return "";
    } else {
      return str + repeatStringNumTimes(str, num - 1);
    }
  }


// truncate a string
// use the slice() method and specify where to start and where to stop
function truncateString(str, num) {
    // use Ternary Operator; shortcut for if statement and follows this format: condition ? expr1 : expr2
    return str.length > num ? str.slice(0, num) + "..." : str;
}


// look through an array arr and returns the first element that passes 'truth test'
function findElement(arr, func) {
    return arr.find(func);
}


// Check if a value is classified as a boolean primitive
// to check for the type of a parameter, use typeof
function booWho(bool) {
    return typeof bool === "boolean";
}
  
// test here
booWho(null);


// title case a sentence
function titleCase(str) {
    // Lowercase the whole string using str.toLowerCase()
    // find all non-whitespace chars (\S), at the beginning (^), or after any whitespace character (\s)
    // g modifier searches for other such word pattern in the whole string and replaces them
    return str
      .toLowerCase()
      .replace(/(^|\s)\S/g, L => L.toUpperCase());
}


// slice and splice
// given two arrays and an index
// ensure that the original arrays are not mutated
// create a copy of second array inside function
function frankenSplice(arr1, arr2, n) {
    // create a localArr and add all the items from arr2 using the slice() function
    // splice() function will mutate array and add new elements, will add contents of arr1 into localArr
    // n is the starting position where our content will be inserted
    // since not deleting any elements so the next argument is 0
    // add the entire contents of arr1 using spread syntax ...
    let localArr = arr2.slice();
    localArr.splice(n, 0, ...arr1);
    return localArr;
}


// rem all falsy values fro array; return a new array; do not mutate original arr
function bouncer(arr) {
    // Array.prototype.filter method expects a function that returns a Boolean value
    // returns true for truthy value or false for falsy value
    return arr.filter(Boolean);
}

bouncer([7, "ate", "", false, 9]);


// return lowest index which a value (arg2) should be inserted into array (arg1) once sorted
function getIndexToIns(arr, num) {
    // count num of entries that are smaller than new value num
    // new value would be inserted after these values
    return arr.filter(val => num > val).length;
}


// return true if string in first element of array contains all of the letters of the string in second element of array
function mutation(arr) {
    // grab the second string, lowercase and turn it into an array
    // make sure every one of its letters is a part of the lowercased first string
    // every will go letter by letter to compare, do so by using indexOf on the first string
    return arr[1]
      .toLowerCase()
      .split("")
      .every(function(letter) {
        return arr[0].toLowerCase().indexOf(letter) !== -1;
      });
}

mutation(["hello", "hey"]);


// split an array (arg1) into groups the length of size (arg2) and returns as a two-dimensional array
function chunkArrayInGroups(arr, size) {
    // create variable newArr; an empty array to push to
    const newArr = [];
    // while loop loops until the length of the array in our test is not 0
    // inside loop, push to newArr array using arr.splice(0, size)
    // for each iteration of while loop, delete size number of elements from front of arr and push to newArr
    while (arr.length > 0) {
      newArr.push(arr.splice(0, size));
    }
    return newArr;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);


// return the sum of two given numbers plus the sum of all the numbers between them
// Math.max() to find the maximum value of two numbers
// Math.min() to find the minimum value of two numbers
function sumAll(arr) {
    // create variable to store the max number
    let max = Math.max(arr[0], arr[1]);
    // create variable to store the min number
    let min = Math.min(arr[0], arr[1]);
    // create accumulator variable to add the numbers.
    let sumBetween = 0;
    for (let i = min; i <= max; i++) {
      sumBetween += i;
    }
    return sumBetween;
}
  
sumAll([1, 4]);


// check two arrays & return new array that contains only items that are not in either of original arrays
function diffArray(arr1, arr2) {
    // merge the list to make it easy to compare functions; use concat
    // use filter to get new array, create a callback function
    return arr1
      .concat(arr2)
      .filter(item => !arr1.includes(item) || !arr2.includes(item));
}
  
diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);


// rem all elements from initial array that is the same as any other other arguments
function destroyer(arr) {
    // declare a variable named valsToRem 
    // set valsToRem equal to a new Array object from() the arguments passed into the function
    // use slice() method on the array of arguments, starting from the second index, 1
    const valsToRem = Array.from(arguments).slice(1);
    // return the filtered array, using includes() in the callback function to check if val is not in valsToRemove
    // returning true to keep the value in the original array or false to remove it
    return arr.filter(function(val) {
      return !valsToRem.includes(val);
    });
}


// look through array of objects (arg1) and
// return an array of all objects that have matching name and value pairs (arg2)
function whatIsInAName(collection, source) {
    const sourceKeys = Object.keys(source);
    // filter through the collection using .filter()
    // return a Boolean value for the .filter() method
    // reduce to Boolean value to be returned for the .every() method
    return collection
      .filter(obj => sourceKeys
                       .every(key => obj.hasOwnProperty(key) &&
                              obj[key] === source[key]));
  }
  
  // test here
  whatIsInAName(
    [
      { first: "Romeo", last: "Montague" },
      { first: "Mercutio", last: null },
      { first: "Tybalt", last: "Capulet" }
    ],
    { last: "Capulet" }
  );


// convert string to spinal case (all-lowercase-words-joined-by-dashes)
function spinalCase(str) {
    // Split the string at one of the following conditions... 
    // whitespace  [\s] , underscore  [_], followed by an uppercase letter [(?=[A-Z])]
    // Join the array using a hyphen (-)
    // lowercase the whole resulting string
    return str
      .split(/\s|_|(?=[A-Z])/)
      .join("-")
      .toLowerCase();
}

// test here
spinalCase("This Is Spinal Tap");

// translate provided string to Pig Latin
// input strings are guaranteed to be English words in all lowercase
function translatePigLatin(str) {
    // use replace() on string
    // use regular expression to check if the first letter is a vowel and add 'way' to end
    // use replace() again to check for consonants at the beginning of the word 
    // move consonant to the end of the word and add ay at the end
    return str
      .replace(/^[aeiou]\w*/, "$&way")
      .replace(/(^[^aeiou]+)(\w*)/, "$2$1ay");
}
  
  // test here
  translatePigLatin("consonant");


// search and replace on the sentence using the arguments provided and return the new sentence
function myReplace(str, before, after) {
    // Check if first character of argument "before" is a capital or lowercase letter 
    // change the first character of argument "after" to match the case
    // regular expression ^[A-Z] is used to check (test) if the first character of before is uppercase
    // if first letter of before is capitalized, change the first letter of after to uppercase
    // else: if first letter of before is lowercase, change the first letter of after to lowercase
    if (/^[A-Z]/.test(before)) {
      after = after[0].toUpperCase() + after.substring(1)
    } else {
      after = after[0].toLowerCase() + after.substring(1)
    }
  
    // return string with argument "before" replaced by argument "after" (with correct case)
    return str.replace(before, after);
}
  
  // test here
  myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");


// match the missing base pairs for the provided DNA strand
// for each character in the provided string, find the base pair character
// return the results as a second array
function pairElement(str) {
    // define an object with all pair possibilities, this allows us to easily find by key or value
    const pairs = {
      A: "T",
      T: "A",
      C: "G",
      G: "C"
    };
  
    // map character to array of character and matching pair
    // split() str into a characters array so we can use each letter to find its pair
    // map() each character in array of individual characters to an array with the character and its matching pair
    return str
      .split("")
      .map(x => [x, pairs[x]]);
}
  
  // test here
  pairElement("GCG");


// find the missing letter in the passed letter range and return it
// if all letters are present in the range, return undefined
function fearNotLetter(str) {
    // define variables to store the character code for the first letter in the string
    let currCharCode = str.charCodeAt(0);
    let missing = undefined;
    // turn the string to an array in order to forEach through it instead of using for and while loops
    // forEach through letters’ character codes, compare with what should be in that position
    // if current letter matches, move comparison variable to next position and compare on next cycle
    // if not, missing letter assigned to missing variable, which will be returned after the map is finished
    // if there are no missing characters, return undefined
    str
      .split("")
      .forEach(letter => {
        if (letter.charCodeAt(0) === currCharCode) {
          currCharCode++;
        } else {
          missing = String.fromCharCode(currCharCode);
        }
      });
  
    return missing;
}
  
  // test here
  fearNotLetter("abce");


// return a new array of unique values from two original arrays in the order they show up
function uniteUnique(arr1, arr2, arr3) {
    // Creates an empty array to store our final result.
    const finalArray = [];
  
    // Loop through the arguments object to truly make the program work with two or more arrays
    // instead of 3.
    for (let i = 0; i < arguments.length; i++) {
      const arrayArguments = arguments[i];
  
      // Loops through the array at hand
      for (let j = 0; j < arrayArguments.length; j++) {
        let indexValue = arrayArguments[j];
  
        // Checks if the value is already on the final array.
        if (finalArray.indexOf(indexValue) < 0) {
          finalArray.push(indexValue);
        }
      }
    }
  
    return finalArray;
}
  
uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);


// convert HTML entities from string to their corresponding HTML entities
function convertHTML(str) {
    // use Object Lookup to declare as many HTML entities as needed
    const htmlEntities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;"
    };
    // split the original string by characters
    // use map() to return a filtered str with all entities changed automatically
    // join all the characters once again
    return str
      .split("")
      .map(entity => htmlEntities[entity] || entity)
      .join("");
  }
  
  // test here
  convertHTML("Dolce & Gabbana");


// return the sum of all odd Fibonacci numbers that are less than or equal to num
function sumFibs(num) {
    // Perform checks for the validity of the input
    if (num <= 0) return 0;
  
    // Create an array of fib numbers till num
    const arrFib = [1, 1];
    let nextFib = 0;
  
    // We put the new Fibonacci numbers to the front so we
    // don't need to calculate the length of the array on each
    // iteration
    while ((nextFib = arrFib[0] + arrFib[1]) <= num) {
      arrFib.unshift(nextFib);
    }
  
    // if number % 2 == 0, number is even 
    // filter() method to filter out even numbers
    // reduce() method to sum the remaining (odd) values
    return arrFib.filter(x => x % 2 != 0).reduce((a, b) => a + b);
}
  
  // test here
  sumFibs(4);


// sum of all primes
// ind all prime numbers up to the number you are given as a parameter and return their sum
function sumPrimes(num) {
    // Helper function to check primality
    function isPrime(num) {
      const sqrt = Math.sqrt(num);
      // loop over all values in our range
      for (let i = 2; i <= sqrt; i++) {
        if (num % i === 0)
            // returns false if target num is div by any number in between 2 & sqrt of target num
            return false;
      }
      return true;
    }
  
    // Check all numbers for primality
    let sum = 0;
    for (let i = 2; i <= num; i++) {
      if (isPrime(i))
        // add to the sum if they are prime
        sum += i;
    }
    return sum;
}


// smallest common multiple
// find the smallest common multiple of the provided parameters that can be evenly divided by both
function smallestCommons(arr) {
    // Setup
    const [min, max] = arr.sort((a, b) => a - b);
    const range = Array(max - min + 1)
      .fill(0)
      .map((_, i) => i + min);
    // Largest possible value for SCM
    // check every multiple of the largest value in range... 
    // ...until we find a value that is divisible by every value in the range
    // upper bound for this loop is the product of all values in the provided range
    const upperBound = range.reduce((prod, curr) => prod * curr);
    // Test all multiples of 'max'
    for (let multiple = max; multiple <= upperBound; multiple += max) {
      // Check if every value in range divides 'multiple'
      const divisible = range.every((value) => multiple % value === 0);
      if (divisible) {
        return multiple;
      }
    }
  }
  
  smallestCommons([1, 5]);


// given array arr, iterate through & rem each element starting from the first element (the 0 index) 
// until the function func returns true when the iterated element is passed through it
function dropElements(arr, func) {
    // drop them elements.
    let originalLen = arr.length;
    // create a for loop to check each element
    for (let i = 0; i < originalLen; i++) {
      if (func(arr[0])) {
        // check for the function given if true then stop
        break;
      } else {
        // if function given is false, remove that element
        arr.shift();
      }
    }
    return arr;
}
  
// test here
dropElements([1, 2, 3, 4], function(n) {
    return n >= 3;
});


// flatten a nested array
function steamrollArray(arr) {
    // create a new variable to keep flattened arrays
    // use spread operator to concatenate each element of arr with an empty array
    const flat = [].concat(...arr);
    // use Array.some() method to find out if the new array contains an array still
    // if new array contains an array, use recursion to call steamrollArray again, 
    // passing in the new array to repeat the process on the arrays that were deeply nested
    // if new array does not contain an array, return the flattened array
    return flat.some(Array.isArray) ? steamrollArray(flat) : flat;
}
  
steamrollArray([1, [2], [3, [[4]]]]);


// check if the predicate (arg2) is truthy on all elements of a collection (arg1)
// iterate through the first argument to check each object
function truthCheck(collection, pre) {
    // use the native every() method to test whether all elements in the array pass the test
    return collection.every(function (element) {
      return element.hasOwnProperty(pre) && Boolean(element[pre]);
    });
  }
  
  truthCheck([
    { name: "Quincy", role: "Founder", isBot: false }, 
    { name: "Naomi", role: "", isBot: false }, 
    { name: "Camperbot", role: "Bot", isBot: true }], 
    "isBot");


// create a func that sums two arguments together
// if only one argument is provided, return a func that expects one argument and returns the sum
function addTogether() {
    const [first, second] = arguments;
    // First argument is not a number
    if (typeof(first) !== "number") {
      return undefined;
    }
    // First argument is a number
    //  and second argument is not defined
    else if (arguments.length === 1) {
      function addSecond(second) {
        // New argument is not a number
        if (typeof(second) !== "number") {
          return undefined;
        }
        // New argument is a number
        else {
          return first + second;
        }
      }
      // Note: returning a *function*
      return addSecond;
    }
    // First argument is a number
    //  and second argument is not a number
    else if (typeof(second) !== "number") {
      return undefined;
    }
    // First argument is a number
    //  and second argument is a number
    else {
      return first + second;
    }
  }


// Create a variable that will make a copy of the full name that was passed as a parameter
// create the six methods needed and return what is asked for
// For the individual setters, we can use the split to turn the fullname into an array of 
// first and last names and concatenate the unchanged portion of the name with what was passed as a parameter
const Person = function(firstAndLast) {
    let fullName = firstAndLast;
  
    this.getFirstName = function() {
      return fullName.split(" ")[0];
    };
  
    this.getLastName = function() {
      return fullName.split(" ")[1];
    };
  
    this.getFullName = function() {
      return fullName;
    };
  
    this.setFirstName = function(name) {
      fullName = name + " " + fullName.split(" ")[1];
    };
  
    this.setLastName = function(name) {
      fullName = fullName.split(" ")[0] + " " + name;
    };
  
    this.setFullName = function(name) {
      fullName = name;
    };
};
  
const bob = new Person("Bob Ross");
console.log(bob.getFullName());


// return a new array that transforms the element’s average altitude into their orbital periods
// GM and earthRadius are both given
// orbitalPer holds the value of orbital period for each iteration calculated using the formula
// delete the key avgAlt, and add orbitalPer
function orbitalPeriod(arr) {
    const GM = 398600.4418;
    const earthRadius = 6367.4447;
    const newArr = [];
  
    //Looping through each key in arr object
    for (let elem in arr) {
      //Rounding off the orbital period value
      const orbitalPer = Math.round(
        2 * Math.PI * Math.sqrt(Math.pow(arr[elem].avgAlt + earthRadius, 3) / GM)
      );
      //Adding new object with orbitalPeriod property
      newArr.push({name: arr[elem].name, orbitalPeriod: orbitalPer});
    }
  
    return newArr;
}
  
// test here
orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]);

// Palindrome Checker
// remove all non-alphanumeric characters 
// turn everything into the same case

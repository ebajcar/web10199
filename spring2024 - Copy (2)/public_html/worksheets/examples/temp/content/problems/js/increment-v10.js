/*
Author:     Ellen Bajcar  
Program:    increment-v10.js  
Date:         
Updated:      
Version:    23.5.14.10  
Copyright:  
  The materials provided in class and in SLATE are protected by copyright. They are intended for the personal, educational uses of students in this course and should not be shared externally or on websites such as Course Hero or OneClass. Unauthorized distribution may result in copyright infringement and violation of Sheridan policies.
Description: 
  PROBLEM: increment a number by one (modified version of add two numbers)
  
  SOLUTION: 
  1. Get (pick) a number to be incremented
     - add HTML <input type=number>
     - capure the value entered by user
  2. define a function that takes one argument and returns the incremented value
     - DONE
  3. Call the function passing the picked number
  4. display the result on the page.
      - add <output> element 
*/

function init() {
    // takes 2 arguments to add any two numbers
    // if only one argument passed, it will increment it by 1
    function sum( num1, num2=1 ) {
        return num1 + num2;
    }
    // get value from the user WHEN 
    // the EVENT onchance occurs on the object identified as uval 
    uval.onchange = function() {
        // using the property .valueAsNumber instead of .value 
        let x = uval.valueAsNumber;
        // target output element and add as iys content
        // available properties innerText, innerHTML, textContent
        out.innerHTML = "<h2>" + x + " + 1  = " + sum(x) + "</h2>"; 
    }
}
// Javascript processing is done as soon as the Document Object Model (DOM) 
//is ready to be access
document.addEventListener( "DOMContentLoaded", init )
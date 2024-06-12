    var dice1 = Math.ceil((Math.random() * 6) + 1);
    var dice2 = Math.ceil((Math.random() * 6) + 1);
    var total = dice1 + dice2; 
    console.log("Rolling dice: " +
          dice1 + " + " + dice2 + " = " + total);
    if (total == 7 || total == 11){
      console.log("That's a natural. You win!");
    } else if (total == 2 || total == 3 || total == 12) {
      console.log("That's craps. You Lose.");
    } else {
      var point = total;
      console.log("Your point is " + point);
      while (true) {
        dice1 = Math.ceil((Math.random() * 6) + 1);
        dice2 = Math.ceil((Math.random() * 6) + 1);
        total = dice1 + dice2; 
        console.log("Rolling dice: " +
          dice1 + " + " + dice2 + " = " + total);
        if (total == point) {
          console.log("You made your point. You win.");
          break;
        } else if (total == 7) {
          console.log("That's a 7. You lose.");
          break;
        }
      }    
    }
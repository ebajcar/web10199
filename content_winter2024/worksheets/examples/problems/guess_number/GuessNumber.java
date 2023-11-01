import java.util.Scanner; 
/*
Author: Ellen Bajcar
Date: Fall 2011
Version: 1.0
Purpose: learning Java programming
Copyright: 
	This work is the intellectual property of Sheridan College. 
	Any further copying and distribution outside of class must be within 
	the copyright law. Posting to commercial sites for profit is prohibited.
Description:
	Console application that generates a random number between 1 and 10 (inclusive)
	and prompts the user to guess what the number is. The user's guess is
	compared to the random number and advises the user whether the guess is too
	low, too high, and there is a match.  The game ends when the user guesses the
	number.
*/
public class GuessNumber {
  public static void main(String[] args) {
    // Generate a random number to be guessed
    int number = (int)(Math.random() * 10)+1;

	// Prompt the user to guess a number between 1 and 10
    Scanner input = new Scanner(System.in);
    System.out.println("Guess a magic number between 1 and 10");

    int guess = -1;
    while (guess != number) {
      // Prompt the user to guess the number
      System.out.print("\nEnter your guess: ");
      guess = input.nextInt();

	  // Determine whether the guess is the same as the number
	  // if yes, let the user know
	  // if no, determine if 
	  //        guess is higher than number, let user know
	  //        guess is lower than number, let user know	  
      if (guess == number)
        System.out.println("Yes, the number is " + number);
      else if (guess > number)
        System.out.println("Your guess is too high");
      else
        System.out.println("Your guess is too low");
    } // End of loop
    input.close();
  }
}
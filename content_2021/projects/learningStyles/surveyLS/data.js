/*
	Create the self-assessment.
	Instructions to the user [with developer annotations]:
	Read the word(s) in the first column ["name:"in whenYou] and check (or highlight) the description that 
	best expresses how you usually handle each situation ["visual", "auditory", "tactile" in whenYou].
	[present the table to the user and allow them to select their preferences.]
	
	Many responses probably fell in one column, with several in a another column, and very few in the remaining one.
	the column that represents your actions est is your primary processing style.  The second highest is your auxiliary
	style. Though this test is not very technical or complicated, most adults know how they respond to situations.
	
	By spending time thinking about reactions, you can identify how you prefer to process information.
	This assessment looks at your modality preferences.
	[add up the three columns and determine the user's primary and auxiliary processing style.]
	
	My primary processing style: ______________________ learner
	My auxiliary processing style: ____________________ learner
	
	[Make the calculated styles click-able. When the user clicks on one of the resulting styles, 
	display the appropriate object: visualLearner, auditoryLearner, or tactileLearner (as an unordered list)]
*/


	// determine what type of learning you are:  I am a ...
    var whenYou = [
       { "name": "spell", 
			"visual": "Do you try to see the word?", 
			"auditory": "Sound out the word, or use a phonetic approach?", 
			"tactile": "Write the word down to find if it feels right?" },
       { "name": "talk", 
			"visual": "Talk sparingly,but dislike listening for too long? Do you favor words such as see, picture, and imagine?", 
			"auditory": "Enjoy listening, but are impatient to talk? Use words, such as hear, tune, and think?", 
			"tactile": "Gesture and use expressive movements? Use words such as feel, touch, or hold?" },
	   { "name": "visualize", 
			"visual": "Do you see vivid, detailed pictures?", 
			"auditory": "Think in sounds?", 
			"tactile": "Have few images, all involving movement?" },
	   { "name": "concentrate", 
			"visual": "Do you become distracted by untidiness or movement?", 
			"auditory": "Become distracted by sounds or noises?", 
			"tactile": "Become distracted by activity around you?" },
	   { "name": "meet someone again", 
			"visual": "Do you forget names, but remember faces? Remember where you met?", 
			"auditory": "Forget faces, but remember names? Remember what you talked about?", 
			"tactile": "Remember best what you did together?" },
	   { "name": "contact people on business", 
			"visual": "Do you prefer direct, face-to-face personal meetings?", 
			"auditory": "Prefer the telephone?", 
			"tactile": "Talk with them while walking or participating in an activity?" },
	   { "name": "relax", 
			"visual": "Do you prefer to watch TV, a play, or a movie?", 
			"auditory": "Prefer to listen to the radio, music, or read?", 
			"tactile": "Prefer to play games or work with your hands?" },
	   { "name": "try to interpret someones mood", 
			"visual": "Do you primarily look at facial expressions?", 
			"auditory": "Listen to tone of voice?", 
			"tactile": "Watch body movement?" },
	   { "name": "read", 
			"visual": "Do you like descriptive scenes? Pause to imagine the action?", 
			"auditory": "Enjoy dialogue and conversation, or hear the characters talk?", 
			"tactile": "Prefer action stories or are not a keen reader?" },
	   { "name": "do something new at work or school", 
			"visual": "Do you like to see demonstrations, diagrams, slides or posters?", 
			"auditory": "Prefer verbal instructions or talking about it with someone else?", 
			"tactile": "Prefer to jump right in and try it?" },
	   { "name": "put something together", 
			"visual": "Do you look at the directios and the picture?", 
			"auditory": "Like to talk with someone or find yourself talking out loud as you work?", 
			"tactile": "Ignore the directions and figure it out as you go along?" },
	   { "name": "need help with a computer application", 
			"visual": "Do you seek out pictures or diagrams?", 
			"auditory": "Call the helpdesk, ask a neighbour, or growl at the computer?", 
			"tactile": "Keep trying to do it or try it on another computer?" },
	   { "name": "teach someone", 
			"visual": "Do you prefer to show them?", 
			"auditory": "Prefer to tell them?", 
			"tactile": "Do it for them and let them see how it is done or ask them to try it?" }
    ];

	// To improve my learning, I can ... (consider the following)
	var visualLearner = [ 	"Visualize myself successfully performing a task.", 	
							"Take notes. Write out everything.",
							"Keep a journal of what I've learned.",
							"Use charts, maps, notes, and flashcards.",
							"Make pictures of words, ideas, and concepts in my head.",
							"Ask the teacher to write on the board."
						];
						
	var auditoryLearner = [	"Tape lectures.",
							"Read my notes or textbooks out loud.",
							"Summarize what I've learned and then tape myself.",
							"Explain what I've learned to others.",
							"Make a song out of items I need to memorize.",
							"Listen to music as I study to match words, ideas, and concepts to musical themes."
							];
							
	var tactileLearner = [	"Take notes.",
							"Underline or highlight important facts.",
							"Make a scrapbook of what I've learned.",
							"Act out a poem, story, or historical event.",
							"Walk through a series of instructions.",
							"Build a model or draw a picture of what I am learning.",
							"Create physical exercises or motions to match words, ideas, and concepts."
							];
							
 

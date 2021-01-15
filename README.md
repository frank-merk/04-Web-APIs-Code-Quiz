# 04 Web APIs: Code Quiz
## Frank Merchlewitz

### Overview

I was tasked with creating a coding quiz with certain paramaters. Players needed to answer a series of questions under a certain time limit, and be penalized on their score for incorrect answers. There also needed to be a way to view previous high scores. When the quiz is over, the user is alerted their score and is prompted for their initials to add their name to a leaderboard.

### Strategy

I decided to make this by creating an array of question objects. Then I wrote a series of functions that would write that question object information to the page in an organized way and log user clicks, cross-referencing for the correct answers. A for loop advances the quiz and populates the question area on the page with the next round of info from the question array of objects, all while a timer keeps track of the users score. To keep everything in one page, I hid the high score information, and used a click event to trigger its visibility. 

### Challenges
I found this to be a very difficult logical exercise to work through. The array of objects was pretty simple to imagine and write, but there were so many other things that needed to be accounted for, especially data storage. I think there is probably a better way to do the high score page, but time got away from me this week unfortunately. Overall, I think I gained a much better grasp on selector elements, as well as creating and appending different elements and ways to work with that type of information

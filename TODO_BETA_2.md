# Beta 2 Main Backend Features

## Misc fixes
### Session History updates

- [ ] update session history to return reverse chronological order (most recent at top)
- [ ] the list is ordered by ids, need to sort the list first
- [ ] current session is not included in history - merge when grabbing session history
  - place current session at top front of list
  - if clicking current session in history should it restart or continue where left off? (frontend problem?)
    - if so, could frontend just place this at the top anyway from user data 
    and use the same logic as their "continue session"? 


### Previous Sessions
- [ ] confirm grabbing a previous session works on front end & test for any bugs

### Stats

How do we deliver stats to frontend? or does frontend calculate that once they receive the data?

What stats should we keep track of?





## OAuth
- [ ] come up with OAuth task list
### Registration
### Login
### Log Out

### Route Logic
- [ ] create user Auth middleware
- [ ] update route logic to hold middleware verifying user data


## Business Logic
**once a user runs out of questions they're prompted to enter an openAI key**
- User can add their own openAI key to start generating questions
    - Does the user add new topics?
- salt and hash keys and store in DB?


## Feedback
**user feedback**
- how do we handle feed back from frontend? 
- thumbs up and down? 
- what's the backend logic to handle calculating feedback?
- what's the backend logic to handle filtering out bad questions?


## Error handling
How does the server respond if the data it gets from the database is not the right shape?
How do we handle sending the front end errors with getting data or if an AI request is bad or crashes (IE rate limit, bad API key, etc )


## Documentation
- [ ] setting up backend on you're own computer
- firestore setup?? 
  - for people who copy this app
  - for people who are working on the HireMe team
- openAI needs & setup
- frontend documentation 
- anything else?


## Deployment
- Launch this puppy!


<br>
<br>
<br>
<br>

# Stretch

## Variable Session questions
- add ability for frontend to select a variable amount of questions
  - add logic for GPT to handle this
- if the available questions is less than the requested amount - generate the difference

## timed sessions
- capture time taken to complete sessions
- logic for timed sessions ( is this a frontend thing )

## Feedback V2
- accepting custom text input? 
- updated algorithm to update or remove question prompts

## Answer correction
- How would this work? something the frontend was thinking of if you get an answer wrong it gives some sort of explanation?? 

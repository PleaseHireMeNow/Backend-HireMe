 **Get questions flow**
 ✅ get questions from DB
 ✅ get userHistory from DB
 ✅ compare to user - see what has been looked at
 ✅ -- grab all incorrectly answered & unanswered questions
 ✅ send 10 questions to the user
 ✅ ADD to current session
 ✅ update users list of questions in DB
 ✅ send need more questions flag to frontend
 ✅ if not enough questions (less than 20) - get more Q's from GPT
 ✅ SET new Q's in questions DB

 **AI needs**
 ✅ Get a list of questions (tech stack & level)

**What to give to prompt**
 ✅ Topic
 ✅ Difficulty
 ✅ List of questions in DB
 variable number of questions to generate (deal with later)

 **update answers**
 ✅ update user answer history
 ✅ update current session current_question property
 ✅ update got answer right/wrong in history + current session

** MORE THINGS **
✅ Update current session to include responses when answerHistory api is called
✅ update how session history is stored when a new session is started (document per session)
✅ -- make questions into SessionQuestions in current session

✅ add session_id field to current session
✅ update session_id when moving session to previous

✅ remove flag from res.send to frontend
✅ add AI flow to end of new session request
✅ DELETE flag route & documentation

**Topics**
✅ add get topics route
✅ update user topic selection
✅ - do we need get or delete?
✅ - can this all be done in a PUT route?


✅ update user session history to grab session history instead of answer history

**generating new question topics**
✅ if there are no questions (allQuestions = 0 OR less than 30)
✅ generate 10 questions with new topic
✅ send back the 10
✅ generate 10 more


**Misc**
✅ order and clean up types
✅ WHY DOES SESSION ID NOT MATCH??
✅ Get questionData from answer History route
✅  -- remove dummy data from answerHistory post calls
✅ update questionsRoutes to be 2 get routes


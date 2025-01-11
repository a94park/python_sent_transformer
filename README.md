# Reuseable Chatbot (React Flask)

- A python chatbot using python's sentence-transformers with a React frontend.
- User inputs are embedded numerically to create a vector representation for a more accurate, quicker response.
- This version takes my resume to answer job interview questions.
- Can easily be adjusted to use on your e-commerce, personal, and professional websites.

# How to use

1. clone
2. venv
3. pip install -r requirements.txt
4. make your json file following this structure:

   {
   "questions": [
   {
   "patterns": ["Hello", "Hi", "Hey", "Good day", "Greetings"],
   "response": "Hello! How can I assist you today?"
   },
   {
   "patterns": [
   "What is your name?",
   "Who are you?",
   "Can you tell me about yourself?"
   ],
   "response": "I am a chatbot created to share information about **\_**."
   }
   ]
   }

   (ChatGPT can create this file for you, given the structure and the document you want to create questions from. The more patterns you provide, the more accurate the bot becomes.)

5. Adjust line 12 to the correct json file name.
6. client, npm install, run React, run flask

# Stretch

- Connect to database to hold user inputs to generate more responses.

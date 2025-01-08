# Customizable Chatbot

- A python chatbot using python's sentence-transformers.
- User inputs are embedded numerically to create a vector representation for a more accurate, quicker response.
- This version takes my resume to answer job interview questions.
- Can easily be adjusted to use on your e-commerce, personal, and professional websites.

# How to use

1. clone
2. venv
3. pip install sentence-transformers (no requirements.txt since it's the only one you need)
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
   (ChatGPT can create this file for you, given the structure and the document you want to create questions from)
5. Adjust line 8 to the correct json file name and run.

# Stretch

- Connect to database to hold user inputs to generate more responses.

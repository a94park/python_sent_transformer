import json
from sentence_transformers import SentenceTransformer, util

# Load the model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load JSON data
with open('resume_data.json') as f:
    data = json.load(f)

def get_response(user_input):
    user_input = user_input.lower()  # Normalize user input
    user_embedding = model.encode(user_input)
    responses = [
        (util.cos_sim(user_embedding, model.encode(pattern.lower())).item(), item["response"])  # Normalize patterns
        for item in data["questions"] 
        for pattern in item["patterns"]
    ]
    best_response = max(responses, key=lambda x: x[0])
    return best_response[1] if best_response[0] > 0.5 else "Sorry, I couldn't understand that."

def main():
    print("Welcome to the CLI Chatbot. Type 'exit' to quit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break
        answer = get_response(user_input)
        if not answer.strip():
            answer = "I'm not sure how to answer that."
        print(f"Bot: {answer}")

if __name__ == "__main__":
    main()


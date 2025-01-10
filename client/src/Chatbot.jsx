import { useState } from "react";
import "./Chatbot.scss"; // Import the SCSS file

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add the user's message to the chat history
    setMessages([...messages, { sender: "user", text: userInput }]);

    try {
      // Send user input to the backend
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: userInput }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      // Add the bot's response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.response },
      ]);
    } catch (error) {
      // Handle network or other errors
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text:
            error.message === "Backend error"
              ? "Sorry, something went wrong."
              : "Unable to reach the server.",
        },
      ]);
    } finally {
      setUserInput(""); // Clear the input field
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="input"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

import { useState, useEffect, useRef } from "react";
import { FaCommentDots } from "react-icons/fa"; // Import chat bubble icon
import "./Chatbot.scss"; // Import the SCSS file

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setMessages([...messages, { sender: "user", text: userInput }]);
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/chat`, {
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

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.response },
      ]);
    } catch (error) {
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
      setIsLoading(false);
      setUserInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div>
      <button
        className={`toggle-chat-button ${!isChatVisible ? "flash" : ""}`}
        onClick={() => setIsChatVisible(!isChatVisible)}>
        <FaCommentDots />
        {isChatVisible ? " Close Chat" : " Open Chat"}
      </button>
      <div
        className={`chat-container animate__animated ${
          isChatVisible ? "animate__fadeInUp" : "animate__fadeOutDown"
        }`}
        style={{ display: isChatVisible ? "flex" : "none" }}>
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}>
              {message.text}
            </div>
          ))}
          {isLoading && <div className="message bot-message">Loading...</div>}
        </div>
        <div className="input-container">
          <input
            className="input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button className="send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

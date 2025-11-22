import React, { useState } from 'react';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import './ChatWidget.css';

const ChatWidget = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState([
    { text: "Hey there!. How can I help today? 😊", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const userMessage = {text: inputText, sender: 'user'}
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // api call
    try {
        const response = await fetch('http://localhost:8000/analysis_app/chat/',{
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({message: inputText})
      });
      const data = await response.json();
      
      if (data.status === true) {
        setMessages(prev => [...prev,
          {text: data.response, sender: 'bot'}
        ]);
      }
      else {
        throw new Error(data.error || 'failed');
        
      }
    } catch (error) {
      setMessages(prev => [...prev,
          {text:'...sorry please try again later !', sender: 'bot'}
        ]);
        console.error('chat error:', error);
    }
          
  };

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      {isOpen ? (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Jawabu Mentor</h3>
            <div className="toggle">
              <button onClick={toggleChat}>✕</button>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit"><FiSend /></button>
          </form>
        </div>
      ) : (
        <button className="chat-toggle-btn" onClick={toggleChat}>
          <FiMessageCircle /> Chat
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMessageCircle, FiX, FiMinus } from 'react-icons/fi';

const ChatWidget = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState([
    { text: "Hey there! I'm Jawabu Mentor. How can I help you today? 😊", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // API call
    try {
      const response = await fetch('http://localhost:8000/analysis_app/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText })
      });
      const data = await response.json();
      
      if (data.status === true) {
        setMessages(prev => [...prev,
          { text: data.response, sender: 'bot' }
        ]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      setMessages(prev => [...prev,
        { text: 'Sorry, I\'m having trouble responding right now. Please try again later! 😔', sender: 'bot' }
      ]);
      console.error('Chat error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Widget */}
      {isOpen ? (
        <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 flex flex-col transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-96'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center min-h-[60px]">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
              <h3 className="font-semibold text-sm">Jawabu Mentor</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-blue-400 rounded transition-colors w-6 h-6 flex items-center justify-center flex-shrink-0"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <button 
                onClick={toggleChat}
                className="p-1 hover:bg-blue-400 rounded transition-colors w-6 h-6 flex items-center justify-center flex-shrink-0"
              >
                <FiX className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50 min-h-0">
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2 break-words ${
                          msg.sender === 'user'
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center w-10 h-10 flex-shrink-0"
                  >
                    <FiSend className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Press Enter to send
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Toggle Button */
        <button
          onClick={toggleChat}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center space-x-2 min-w-[80px] justify-center"
        >
          <FiMessageCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold text-sm">Chat with me...</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
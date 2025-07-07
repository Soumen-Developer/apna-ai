import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Save, Download, Copy, Trash2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGenerateTextMutation } from '../services/geminiApi';
import ChatHistory from '../components/ChatHistory';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Apna AI, powered by Google Gemini. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [generateText, { isLoading }] = useGenerateTextMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await generateText({
        prompt: input,
        temperature: 0.7,
        maxTokens: 1000
      }).unwrap();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      let errorText = "Sorry, there was an error processing your request. Please try again.";
      if (error instanceof Error) {
        errorText += ` Details: ${error.message}`;
      }
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      text: "Hello! I'm Apna AI, powered by Google Gemini. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  const saveChat = () => {
    // In production, this would save to backend
    const chatData = JSON.stringify(messages, null, 2);
    const blob = new Blob([chatData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ChatHistory />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Apna AI Chat</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Powered by Google Gemini</span>
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={clearChat}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group"
              title="Clear Chat"
            >
              <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button
              onClick={saveChat}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 group"
              title="Save Chat"
            >
              <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button
              onClick={saveChat}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-200 group"
              title="Export Chat"
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
          >
            <div
              className={`max-w-xs lg:max-w-3xl px-6 py-4 rounded-2xl shadow-md transition-all duration-300 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600 text-white ml-auto'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mr-auto hover:shadow-lg dark:hover:shadow-gray-900/25'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-white/20 backdrop-blur-sm' 
                    : 'bg-gradient-to-br from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
<div className={`text-sm leading-relaxed ${message.sender === 'user' ? 'text-white' : 'text-gray-900 dark:text-white transition-colors duration-300'}`}>
  {message.sender === 'ai' ? (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props}) => <h1 className="text-2xl font-bold my-2" {...props} />,
        h2: ({ ...props}) => <h2 className="text-xl font-bold my-2" {...props} />,
        h3: ({ ...props}) => <h3 className="text-lg font-bold my-2" {...props} />,
        ul: ({ ...props}) => <ul className="list-disc list-inside" {...props} />,
        ol: ({ ...props}) => <ol className="list-decimal list-inside" {...props} />,
        li: ({ ...props}) => <li className="my-1" {...props} />,
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return !(props as any).inline && match ? (
            <div className="bg-gray-800 text-white p-2 rounded my-2">
              <pre><code className={className} {...props}>{children}</code></pre>
            </div>
          ) : (
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" {...props}>
              {children}
            </code>
          );
        },
        a: ({ ...props}) => <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
      }}
    >
      {message.text}
    </ReactMarkdown>
  ) : (
    message.text
  )}
</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400 transition-colors duration-300'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.sender === 'ai' && (
                      <button
                        onClick={() => copyMessage(message.text)}
                        className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                        title="Copy message"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 shadow-lg transition-colors duration-300 mr-12">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 shadow-lg transition-colors duration-300">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
              rows={1}
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500">
              {input.length}/2000
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white p-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl group"
          >
            {isLoading ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-200" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center transition-colors duration-300">
          Press Enter to send, Shift+Enter for new line • Your conversations are private and secure
        </p>
      </div>
    </div>
  </div>
  );
};

export default Chat;

'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { UIMessage } from 'ai';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  const { messages, status, append } = useChat({
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Halo! Saya CS GriyaReka. Ada yang bisa kami bantu seputar layanan GriyaReka?' }
    ]
  });
  
  const isLoading = status === 'submitted' || status === 'streaming';
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    append({ role: 'user', content: input });
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl border w-[350px] h-[450px] flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
          <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
            <div className="font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              CS GriyaReka
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-orange-600 text-white rounded-br-none shadow-sm' 
                    : 'bg-white border text-slate-800 rounded-bl-none shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border text-slate-500 p-3 rounded-lg rounded-bl-none shadow-sm text-sm flex gap-1 items-center">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t flex gap-2 items-center">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pesan Anda di sini..." 
              className="flex-1 focus-visible:ring-blue-900"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="bg-blue-900 hover:bg-blue-800 shrink-0" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

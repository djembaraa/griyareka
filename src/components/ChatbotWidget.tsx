'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([
    { role: 'bot', content: 'Halo! Ada yang bisa kami bantu seputar layanan GriyaReka?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Terima kasih atas pesannya. Tim kami akan segera menghubungi Anda kembali.' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl border w-80 h-96 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
          <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
            <div className="font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              GriyaBot
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-orange-600 text-white rounded-br-none' 
                    : 'bg-white border text-slate-700 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pesan..." 
              className="flex-1 focus-visible:ring-blue-900"
            />
            <Button type="submit" size="icon" className="bg-blue-900 hover:bg-blue-800 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

'use client';

import { useChat } from '@ai-sdk/react';
import GeneratorInput from '@/components/generator/generator-input';
import { RenderMessage } from '@/components/generator/render-message';
import { useState, useEffect } from 'react';

export default function TextGeneratorPage() {
  const [isThinking, setIsThinking] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const handleSubmit = async (msg: string) => {
    if (!msg.trim()) return;

    setIsThinking(true);
    setMessage('');

    // Add user message immediately
    const userMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: msg,
      parts: [{ type: 'text', text: msg }]
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [{ role: 'user', content: msg }] 
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.content) {
        // Add AI response
        const aiMessage = {
          id: data.id || `ai_${Date.now()}`,
          role: 'assistant',
          content: data.content,
          parts: [{ type: 'text', text: data.content }]
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Add error message
        const errorMessage = {
          id: `error_${Date.now()}`,
          role: 'assistant',
          content: 'Error: ' + (data.error || 'Failed to get response'),
          parts: [{ type: 'text', text: 'Error: ' + (data.error || 'Failed to get response') }]
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'Error: Failed to connect to server',
        parts: [{ type: 'text', text: 'Error: Failed to connect to server' }]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 flex flex-col">
        <RenderMessage 
          useChat={{ 
            messages, 
            setMessages, 
            reload: () => {}, 
            error: null 
          } as any} 
          isThinking={isThinking} 
        />
      </div>

      <div className="sticky bottom-0 bg-white/80 dark:bg-dark-primary/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <GeneratorInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSubmit={handleSubmit}
          disabled={isThinking}
          isLoading={isThinking}
        />
      </div>
    </div>
  );
}
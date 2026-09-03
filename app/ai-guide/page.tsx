'use client';

import { useState } from 'react';

export default function AIGuideScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ q: string; a: string }>>([]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/ai-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      const data = await response.json();
      setAnswer(data.answer || 'Unable to get response');
      setHistory([{ q: question, a: data.answer }, ...history.slice(0, 9)]);
      setQuestion('');
    } catch (error) {
      setAnswer('Error: Unable to reach AI Guide');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-3xl">
      {/* Input Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 sticky top-0 z-10">
        <h2 className="font-bold text-lg text-gray-800 mb-3">🤖 Ask Sacred Guide</h2>

        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask about history, ritual, scripture..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? '...' : '📤'}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">Works for all 7 faiths • Multi-language support</p>
      </div>

      {/* Answer Section */}
      {answer && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-800">📖 Answer</h3>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              💬 Share to WA
            </button>
          </div>
          <p className="text-gray-700 leading-relaxed mb-3">{answer}</p>
          <p className="text-xs text-gray-500">✓ Sourced from original scriptures and traditions</p>
        </div>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-800 mb-3">📋 Recent Questions</h3>
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setQuestion(item.q);
                  setAnswer(item.a);
                }}
              >
                <p className="text-sm font-semibold text-gray-800">Q: {item.q}</p>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

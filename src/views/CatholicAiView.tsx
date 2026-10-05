import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, Cross, User, Bot, AlertCircle, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const CatholicAiView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡La paz de Cristo esté contigo! Soy el Asistente Católico de Evangelización de la Diócesis de Sonsonate. Puedes consultarme sobre Jesucristo, la Santísima Trinidad, la Virgen María, el Santo Rosario, los Santos, el Catecismo de la Iglesia Católica, las Sagradas Escrituras o la vida pastoral de nuestra diócesis. ¿En qué puedo orientarte hoy?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    '¿Quién es la Patrona de la Diócesis de Sonsonate?',
    '¿Qué significa que Dios es Trinidad?',
    '¿Cómo prepararme para una buena Confesión?',
    '¿Cuál es la importancia del Santo Rosario?',
    '¿Quién fue San Óscar Romero y su legado en El Salvador?',
    '¿Qué es la Transubstanciación en la Eucaristía?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend.trim() })
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor.');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Que la bendición de Dios te acompañe siempre.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'La Iglesia nos recuerda que Dios escucha siempre nuestras oraciones. En este instante el servicio experimentó una demora de red; por favor vuelve a consultar en unos segundos o acude a los contenidos formativos del portal.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3 border border-[#D4AF37]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Evangelización y Catequesis</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sacred text-white mb-2">
          🤖 Asistente Católico de la Diócesis
        </h1>
        <p className="max-w-2xl mx-auto text-slate-200 text-xs sm:text-sm font-light leading-relaxed">
          Respuestas fundamentadas en el Catecismo de la Iglesia Católica, las Sagradas Escrituras y el Magisterio de la Iglesia.
        </p>
      </div>

      {/* Pastoral Note */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
        <div>
          <strong>Aviso Pastoral:</strong> Este asistente es una herramienta formativa y educativa. No sustituye la dirección espiritual, el consejo pastoral ni la confesión sacramental, las cuales deben realizarse personalmente con un sacerdote en tu parroquia.
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 flex flex-col h-[520px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-[#B8860B] text-white shadow-sm'
                      : 'bg-[#0A1128] text-[#D4AF37] shadow-sm'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#0A1128] text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      isUser ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0A1128] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2 rounded-tl-none border border-slate-200/60">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#B8860B]" />
                <span>Consultando la doctrina católica...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">Sugerencias:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#D4AF37] hover:text-[#B8860B] transition whitespace-nowrap text-xs shadow-xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta sobre la fe, Biblia, sacramentos..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-slate-50 text-slate-800"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold disabled:opacity-50 transition shadow-md hover:scale-105 shrink-0"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4 fill-[#0A1128]" />
          </button>
        </form>
      </div>
    </div>
  );
};

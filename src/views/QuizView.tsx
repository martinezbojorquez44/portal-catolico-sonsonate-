import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Share2, Sparkles, Award, ArrowRight } from 'lucide-react';
import { getDailyQuizQuestions, CATHOLIC_QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion } from '../types';
import { useAuth } from '../context/AuthContext';

export const QuizView: React.FC = () => {
  const { user, saveQuizResult } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>(getDailyQuizQuestions(5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; selected: number; isCorrect: boolean }[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent changing after selection
    setSelectedAnswer(index);
    setShowExplanation(true);

    const isCorrect = index === currentQ.correctIndex;
    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, selected: index, isCorrect }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      if (user) {
        const finalScore = userAnswers.filter((a) => a.isCorrect).length;
        saveQuizResult(finalScore, questions.length).catch((e) =>
          console.error('Error saving quiz result to Firestore:', e)
        );
      }
    }
  };

  const handleRestart = () => {
    // Pick another 5 questions
    setQuestions(getDailyQuizQuestions(5));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setUserAnswers([]);
    setQuizFinished(false);
  };

  const score = userAnswers.filter((a) => a.isCorrect).length;

  const handleShareResult = async () => {
    const text = `🧠 ¡He completado el Quiz Católico del Día en la Diócesis de Sonsonate!\nMi puntuación: ${score} de ${questions.length} respuestas correctas.\n¡Pon a prueba tu fe católica!`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz Católico - Diócesis de Sonsonate',
          text
        });
      } catch (e) {
        navigator.clipboard.writeText(text);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3 border border-[#D4AF37]/30">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Formación en la Fe</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sacred text-white mb-2">
          🧠 Quiz Católico del Día
        </h1>
        <p className="max-w-xl mx-auto text-slate-200 text-xs sm:text-sm font-light leading-relaxed">
          Cada día nuevas preguntas sobre Jesús, la Trinidad, la Virgen María, Santos, Biblia, Catecismo y la Diócesis de Sonsonate.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-100 pb-3">
            <span className="text-[#B8860B] uppercase font-bold">
              Pregunta {currentIndex + 1} de {questions.length} • {currentQ.category}
            </span>
            <span>Aciertos: {score}</span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-2xl font-bold font-sacred text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isChosen = selectedAnswer === idx;
              const isCorrectOpt = idx === currentQ.correctIndex;
              let style = 'bg-slate-50 border-slate-200 hover:border-[#D4AF37] text-slate-800';

              if (selectedAnswer !== null) {
                if (isCorrectOpt) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isChosen && !isCorrectOpt) {
                  style = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  style = 'bg-slate-50/50 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-sm leading-snug ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {selectedAnswer !== null && (
                    <div>
                      {isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {isChosen && !isCorrectOpt && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-1 animate-in fade-in duration-200">
              <span className="font-bold font-sacred block text-amber-900">
                {selectedAnswer === currentQ.correctIndex ? '¡Excelente respuesta!' : 'Respuesta correcta:'}
              </span>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {selectedAnswer !== null && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition flex items-center gap-2"
              >
                <span>{currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* QUIZ FINISHED RESULTS SCREEN */
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#D4AF37] text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-50 text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sacred text-slate-900">
              ¡Quiz Completado con Éxito!
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Tu puntuación final:
            </p>
            <div className="text-4xl sm:text-5xl font-extrabold font-sacred text-[#B8860B] mt-2">
              {score} / {questions.length}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
              {score === questions.length
                ? '¡Felicidades! Demuestras un profundo conocimiento de la fe católica y de la Iglesia.'
                : score >= 3
                ? '¡Muy buen resultado! Sigue profundizando en la riqueza de nuestra doctrina y Sagrada Escritura.'
                : 'La fe es un camino continuo de aprendizaje. Te invitamos a repasar las secciones de Jesús, María y Catecismo.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={handleShareResult}
              className="px-6 py-3 rounded-xl bg-[#0A1128] text-white hover:bg-[#16295A] text-xs font-bold transition flex items-center gap-2 shadow-md"
            >
              <Share2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{copiedShare ? '¡Resultado copiado!' : 'Compartir Resultado'}</span>
            </button>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-xs transition flex items-center gap-2 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Realizar otra ronda</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

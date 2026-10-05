// Web Speech API helper for reading Gospel, Rosary, and prayers in Spanish

class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking = false;
  private listeners: ((speaking: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(cb: (speaking: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private setSpeaking(status: boolean) {
    this.isSpeaking = status;
    this.listeners.forEach((cb) => cb(status));
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95; // Reverent, clear pacing

    // Look for Spanish voice
    const voices = this.synth.getVoices();
    const esVoice = voices.find((v) => v.lang.startsWith('es'));
    if (esVoice) {
      utterance.voice = esVoice;
    }

    utterance.onstart = () => this.setSpeaking(true);
    utterance.onend = () => {
      this.setSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => this.setSpeaking(false);

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.setSpeaking(false);
  }

  public getStatus(): boolean {
    return this.isSpeaking;
  }
}

export const speechManager = new SpeechManager();

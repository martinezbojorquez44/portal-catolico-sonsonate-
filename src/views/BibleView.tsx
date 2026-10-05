import React, { useState } from 'react';
import { BookOpen, Search, Bookmark, Sparkles, Copy, Check } from 'lucide-react';

interface BibleBook {
  name: string;
  testament: 'Antiguo' | 'Nuevo';
  category: string;
  chapters: number;
}

export const BibleView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedTestament, setSelectedTestament] = useState<'Todos' | 'Antiguo' | 'Nuevo'>('Todos');
  const [copiedPassage, setCopiedPassage] = useState<string | null>(null);

  const books: BibleBook[] = [
    // Antiguo Testamento (46)
    { name: 'Génesis', testament: 'Antiguo', category: 'Pentateuco', chapters: 50 },
    { name: 'Éxodo', testament: 'Antiguo', category: 'Pentateuco', chapters: 40 },
    { name: 'Levítico', testament: 'Antiguo', category: 'Pentateuco', chapters: 27 },
    { name: 'Números', testament: 'Antiguo', category: 'Pentateuco', chapters: 36 },
    { name: 'Deuteronomio', testament: 'Antiguo', category: 'Pentateuco', chapters: 34 },
    { name: 'Josué', testament: 'Antiguo', category: 'Históricos', chapters: 24 },
    { name: 'Jueces', testament: 'Antiguo', category: 'Históricos', chapters: 21 },
    { name: 'Rut', testament: 'Antiguo', category: 'Históricos', chapters: 4 },
    { name: '1 Samuel', testament: 'Antiguo', category: 'Históricos', chapters: 31 },
    { name: '2 Samuel', testament: 'Antiguo', category: 'Históricos', chapters: 24 },
    { name: '1 Reyes', testament: 'Antiguo', category: 'Históricos', chapters: 22 },
    { name: '2 Reyes', testament: 'Antiguo', category: 'Históricos', chapters: 25 },
    { name: '1 Crónicas', testament: 'Antiguo', category: 'Históricos', chapters: 29 },
    { name: '2 Crónicas', testament: 'Antiguo', category: 'Históricos', chapters: 36 },
    { name: 'Esdras', testament: 'Antiguo', category: 'Históricos', chapters: 10 },
    { name: 'Nehemías', testament: 'Antiguo', category: 'Históricos', chapters: 13 },
    { name: 'Tobías', testament: 'Antiguo', category: 'Históricos', chapters: 14 },
    { name: 'Judit', testament: 'Antiguo', category: 'Históricos', chapters: 16 },
    { name: 'Ester', testament: 'Antiguo', category: 'Históricos', chapters: 10 },
    { name: '1 Macabeos', testament: 'Antiguo', category: 'Históricos', chapters: 16 },
    { name: '2 Macabeos', testament: 'Antiguo', category: 'Históricos', chapters: 15 },
    { name: 'Job', testament: 'Antiguo', category: 'Sapienciales', chapters: 42 },
    { name: 'Salmos', testament: 'Antiguo', category: 'Sapienciales', chapters: 150 },
    { name: 'Proverbios', testament: 'Antiguo', category: 'Sapienciales', chapters: 31 },
    { name: 'Eclesiastés (Qohélet)', testament: 'Antiguo', category: 'Sapienciales', chapters: 12 },
    { name: 'Cantar de los Cantares', testament: 'Antiguo', category: 'Sapienciales', chapters: 8 },
    { name: 'Sabiduría', testament: 'Antiguo', category: 'Sapienciales', chapters: 19 },
    { name: 'Eclesiástico (Sirácida)', testament: 'Antiguo', category: 'Sapienciales', chapters: 51 },
    { name: 'Isaías', testament: 'Antiguo', category: 'Proféticos', chapters: 66 },
    { name: 'Jeremías', testament: 'Antiguo', category: 'Proféticos', chapters: 52 },
    { name: 'Lamentaciones', testament: 'Antiguo', category: 'Proféticos', chapters: 5 },
    { name: 'Baruc', testament: 'Antiguo', category: 'Proféticos', chapters: 6 },
    { name: 'Ezequiel', testament: 'Antiguo', category: 'Proféticos', chapters: 48 },
    { name: 'Daniel', testament: 'Antiguo', category: 'Proféticos', chapters: 14 },
    { name: 'Oseas', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 14 },
    { name: 'Joel', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 4 },
    { name: 'Amós', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 9 },
    { name: 'Abdías', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 1 },
    { name: 'Jonás', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 4 },
    { name: 'Miqueas', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 7 },
    { name: 'Nahúm', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 3 },
    { name: 'Habacuc', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 3 },
    { name: 'Sofonías', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 3 },
    { name: 'Ageo', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 2 },
    { name: 'Zacarías', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 14 },
    { name: 'Malaquías', testament: 'Antiguo', category: 'Proféticos Menores', chapters: 3 },

    // Nuevo Testamento (27)
    { name: 'Santo Evangelio según San Mateo', testament: 'Nuevo', category: 'Evangelios', chapters: 28 },
    { name: 'Santo Evangelio según San Marcos', testament: 'Nuevo', category: 'Evangelios', chapters: 16 },
    { name: 'Santo Evangelio según San Lucas', testament: 'Nuevo', category: 'Evangelios', chapters: 24 },
    { name: 'Santo Evangelio según San Juan', testament: 'Nuevo', category: 'Evangelios', chapters: 21 },
    { name: 'Hechos de los Apóstoles', testament: 'Nuevo', category: 'Histórico NT', chapters: 28 },
    { name: 'Romanos', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 16 },
    { name: '1 Corintios', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 16 },
    { name: '2 Corintios', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 13 },
    { name: 'Gálatas', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 6 },
    { name: 'Efesios', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 6 },
    { name: 'Filipenses', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 4 },
    { name: 'Colosenses', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 4 },
    { name: '1 Tesalonicenses', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 5 },
    { name: '2 Tesalonicenses', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 3 },
    { name: '1 Timoteo', testament: 'Nuevo', category: 'Cartas Pastorales', chapters: 6 },
    { name: '2 Timoteo', testament: 'Nuevo', category: 'Cartas Pastorales', chapters: 4 },
    { name: 'Tito', testament: 'Nuevo', category: 'Cartas Pastorales', chapters: 3 },
    { name: 'Filemón', testament: 'Nuevo', category: 'Cartas Paulinas', chapters: 1 },
    { name: 'Hebreos', testament: 'Nuevo', category: 'Cartas Apostólicas', chapters: 13 },
    { name: 'Santiago', testament: 'Nuevo', category: 'Cartas Católicas', chapters: 5 },
    { name: '1 Pedro', testament: 'Nuevo', category: 'Cartas Católicas', chapters: 5 },
    { name: '2 Pedro', testament: 'Nuevo', category: 'Cartas Católicas', chapters: 3 },
    { name: '1 Juan', testament: 'Nuevo', category: 'Cartas Católicas', chapters: 5 },
    { name: '2 Juan', testament: 'Nuevo', category: 'Cartas Católicas', chapters: 1 },
    { name: '3 Juan', testament: 'Nuevo', category: 'Cartas Católicas', chapters: 1 },
    { name: 'Judas', testament: 'Nuevo', category: 'Cartas Católicas', chapters: 1 },
    { name: 'Apocalipsis', testament: 'Nuevo', category: 'Profético NT', chapters: 22 }
  ];

  const featuredPassages = [
    {
      title: 'El Señor es mi Pastor',
      ref: 'Salmo 23 (22), 1-3',
      text: 'El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar, hacia aguas tranquilas me conduce, conforta mi alma.'
    },
    {
      title: 'El Himno a la Caridad',
      ref: '1 Corintios 13, 4-7',
      text: 'El amor es paciente, es servicial; el amor no es envidioso, no es jactancioso, no se engríe; es decoroso; no busca su interés; no se irrita; no toma en cuenta el mal; no se alegra de la injusticia, se alegra con la verdad.'
    },
    {
      title: 'El Amor Infinito del Padre',
      ref: 'San Juan 3, 16',
      text: 'Porque tanto amó Dios al mundo que dio a su Hijo único, para que todo el que crea en Él no perezca, sino que tenga vida eterna.'
    }
  ];

  const filteredBooks = books.filter((b) => {
    const matchesTestament = selectedTestament === 'Todos' || b.testament === selectedTestament;
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
    return matchesTestament && matchesSearch;
  });

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPassage(title);
    setTimeout(() => setCopiedPassage(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Palabra Viva de Dios</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          📜 Santa Biblia Católica
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          Los 73 libros inspirados por el Espíritu Santo: 46 en el Antiguo Testamento y 27 en el Nuevo Testamento.
          «Lámpara es tu palabra para mis pasos, luz en mi sendero» (Salmo 119, 105).
        </p>
      </div>

      {/* Featured Scripture Passages */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-sacred text-slate-900">
          Pasajes Bíblicos para Meditación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPassages.map((p) => (
            <div key={p.title} className="p-6 rounded-3xl bg-white shadow-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#B8860B]">{p.ref}</span>
                  <button
                    onClick={() => handleCopy(p.text, p.title)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                    title="Copiar pasaje"
                  >
                    {copiedPassage === p.title ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <h4 className="font-bold font-sacred text-slate-900 text-base mb-2">{p.title}</h4>
                <p className="font-scripture text-base italic text-slate-700 leading-relaxed">
                  «{p.text}»
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Explorer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-sacred text-slate-900">
              Canon Bíblico Católico (73 Libros)
            </h3>
            <p className="text-xs text-slate-500">Antiguo y Nuevo Testamento completos</p>
          </div>

          <div className="flex items-center gap-2">
            {(['Todos', 'Antiguo', 'Nuevo'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTestament(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedTestament === t
                    ? 'bg-[#0A1128] text-[#D4AF37]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t} {t === 'Antiguo' ? '(46)' : t === 'Nuevo' ? '(27)' : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar libro por nombre o categoría..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
          {filteredBooks.map((b) => (
            <div
              key={b.name}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#D4AF37] transition group cursor-default"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-[#B8860B]">{b.category}</span>
                <span className="text-[10px] text-slate-400">{b.chapters} caps.</span>
              </div>
              <h5 className="font-semibold text-slate-900 text-xs sm:text-sm mt-1 truncate group-hover:text-[#B8860B] transition">
                {b.name}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

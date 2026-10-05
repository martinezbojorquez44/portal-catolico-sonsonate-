import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // In-memory / server state for Diocese & Intentions
  let dioceseData = {
    bishopMessage: '«Queridos hermanos de la Diócesis de Sonsonate y devotos que nos visitan: ponemos en el centro de nuestra vida y misión evangelizadora a Jesucristo, único Salvador y Señor. Que la Santísima Virgen de Candelaria y San José nos acompañen en la construcción de una comunidad diocesana fraterna, misionera y llena de esperanza.»',
    popeNotes: '[Información oficial del Santo Padre actualizada conforme al Magisterio de la Santa Sede]',
    lastUpdated: new Date().toISOString()
  };

  const prayerIntentionsStore = [
    {
      id: 'int-1',
      name: 'Familia Mendoza',
      category: 'Salud',
      intention: 'Por la salud y pronta recuperación de nuestro abuelo y por la paz en nuestro hogar.',
      date: new Date().toLocaleDateString('es-ES'),
      approved: true
    },
    {
      id: 'int-2',
      name: 'Parroquiano de Nahuizalco',
      category: 'Vocaciones',
      intention: 'Por las vocaciones sacerdotales y religiosas en la Diócesis de Sonsonate.',
      date: new Date().toLocaleDateString('es-ES'),
      approved: true
    },
    {
      id: 'int-3',
      name: 'Fiel devoto',
      category: 'Acción de gracias',
      intention: 'En acción de gracias a Jesús Nazareno de Sonsonate por un favor concedido a mi familia.',
      date: new Date().toLocaleDateString('es-ES'),
      approved: true
    }
  ];

  // Catholic AI Chat endpoint (Server-side Gemini proxy)
  app.post('/api/ai/chat', async (req: Request, res: Response) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Mensaje requerido.' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;

      const systemInstruction = `Eres el Asistente Católico de Evangelización de la Diócesis de Sonsonate, El Salvador.
Tu misión es orientar, enseñar y acompañar en la fe católica desde el Magisterio de la Iglesia, el Catecismo de la Iglesia Católica (CIC), las Sagradas Escrituras y la tradición viva de la Iglesia.

NORMAS OBLIGATORIAS:
1. Pon siempre a Jesucristo en el centro de toda respuesta, con reverencia y caridad.
2. Explica con claridad la doctrina católica sobre la Santísima Trinidad, la Virgen María, los Sacramentos, la Santa Misa, el Santo Rosario y las virtudes.
3. No inventes citas bíblicas, dogmas, documentos pontificios ni nombres eclesiásticos.
4. No te presentes NUNCA como sacerdote ni pretendas absolver pecados ni administrar sacramentos. Para confesión, dirección espiritual y casos personales graves, aconseja con delicadeza acudir a un sacerdote o a su parroquia más cercana en la Diócesis de Sonsonate (como la Catedral de Sonsonate, Nahuizalco, Izalco, Juayúa, etc.).
5. Conoce la Diócesis de Sonsonate: erigida en 1986 por San Juan Pablo II, su Catedral está consagrada a Nuestra Señora de Candelaria, su Obispo actual es Monseñor Constantino Barrera, y venera con gran amor a Jesús Nazareno de Sonsonate.
6. Responde en español con un tono pastoral, cálido, pacífico, teológicamente riguroso y esperanzador.`;

      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 5) {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });

        const promptText = `${systemInstruction}\n\nPregunta del fiel: ${message}`;
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText
        });

        const reply = response.text || 'Que la paz de Cristo esté con vosotros. ¿En qué más puedo orientarte sobre nuestra fe?';
        res.json({ reply });
        return;
      }

      // Robust fallback response engine with grounded Catholic catechetical wisdom
      const lower = message.toLowerCase();
      let fallback = '';

      if (lower.includes('jesus') || lower.includes('jesucristo') || lower.includes('cristo')) {
        fallback = 'Jesucristo es el Hijo único de Dios, verdadero Dios y verdadero hombre, centro de nuestra fe y esperanza. Como nos enseña el Evangelio (Jn 14, 6): «Yo soy el Camino, la Verdad y la Vida; nadie va al Padre sino por mí». En la Diócesis de Sonsonate le rendimos especial amor en la Eucaristía y en la venerada imagen de Jesús Nazareno.';
      } else if (lower.includes('trinidad') || lower.includes('padre, hijo') || lower.includes('espiritu santo')) {
        fallback = 'El misterio de la Santísima Trinidad es el centro de nuestra fe: un solo Dios verdadero en tres Personas divinas distintas: el Padre creador, el Hijo redentor y el Espíritu Santo consolador y santificador. Cada vez que nos santiguamos proclamamos este misterio de amor.';
      } else if (lower.includes('maria') || lower.includes('virgen') || lower.includes('candelaria') || lower.includes('guadalupe')) {
        fallback = 'La Santísima Virgen María es la Madre de Dios (Theotokos) y Madre nuestra en el orden de la gracia. En Sonsonate la honramos especialmente bajo la advocación de Nuestra Señora de Candelaria, patrona de nuestra Catedral, y como Reina de la Paz, celestial patrona de El Salvador.';
      } else if (lower.includes('rosario') || lower.includes('misterios')) {
        fallback = 'El Santo Rosario es un compendio de todo el Evangelio. Al rezarlo recorremos con María los misterios Gozosos, Luminosos, Dolorosos y Gloriosos de Cristo. Te invitamos a rezarlo en familia por la paz y las vocaciones en nuestra diócesis.';
      } else if (lower.includes('confesion') || lower.includes('pecado') || lower.includes('perdon')) {
        fallback = 'El Sacramento de la Reconciliación es el abrazo de la misericordia divina. Si sientes la necesidad de confesarte, recuerda que solo un sacerdote válidamente ordenado puede otorgar la absolución en nombre de Cristo. Te animamos a acercarte a tu parroquia o a la Catedral de Sonsonate para recibir este hermoso sacramento de paz.';
      } else if (lower.includes('sonsonate') || lower.includes('obispo') || lower.includes('diocesis') || lower.includes('catedral')) {
        fallback = 'La Diócesis de Sonsonate fue creada el 31 de mayo de 1986 por el Papa San Juan Pablo II. Su sede es la Catedral de Nuestra Señora de Candelaria y su Obispo actual es S.E. Mons. Constantino Barrera Morales. La diócesis es célebre por su devoción a Jesús Nazareno y sus solemnes procesiones de Semana Santa.';
      } else {
        fallback = `La Iglesia Católica nos enseña que Dios nos ama infinitamente y nos llama a vivir en santidad, oración y caridad con el prójimo. «Buscad primero el Reino de Dios y su justicia, y todo lo demás se os dará por añadidura» (Mt 6, 33). Si deseas profundizar en un tema de doctrina o vida espiritual, no dudes en preguntarme con más detalle o consultar a tu párroco.`;
      }

      res.json({ reply: fallback });
    } catch (err: any) {
      console.error('Error in /api/ai/chat:', err);
      res.status(500).json({
        reply: 'Que la gracia de Nuestro Señor Jesucristo esté con vosotros. Hubo una dificultad momentánea para procesar tu consulta; recuerda que en el Catecismo de la Iglesia Católica y en la oración diaria encontramos la luz de la verdad.'
      });
    }
  });

  // Prayer intentions endpoint
  app.get('/api/intentions', (req: Request, res: Response) => {
    res.json(prayerIntentionsStore);
  });

  app.post('/api/intentions', (req: Request, res: Response) => {
    const { name, category, intention } = req.body;
    if (!intention || intention.trim().length < 5) {
      res.status(400).json({ error: 'La intención de oración debe tener contenido.' });
      return;
    }

    const newIntention = {
      id: `int-${Date.now()}`,
      name: name?.trim() || 'Fiel devoto',
      category: category || 'Familia',
      intention: intention.trim(),
      date: new Date().toLocaleDateString('es-ES'),
      approved: true
    };

    prayerIntentionsStore.unshift(newIntention);
    res.json({ success: true, intention: newIntention });
  });

  // Diocese administration endpoints
  app.get('/api/diocese-status', (req: Request, res: Response) => {
    res.json(dioceseData);
  });

  app.post('/api/diocese-status', (req: Request, res: Response) => {
    const { bishopMessage, popeNotes, pin } = req.body;
    // Simple secure PIN for demo diocesan administration
    if (pin !== '1986' && pin !== 'candelaria') {
      res.status(401).json({ error: 'Clave de administración incorrecta. (Clave por defecto: 1986)' });
      return;
    }

    if (bishopMessage) dioceseData.bishopMessage = bishopMessage;
    if (popeNotes) dioceseData.popeNotes = popeNotes;
    dioceseData.lastUpdated = new Date().toISOString();

    res.json({ success: true, dioceseData });
  });

  // Production static files or Vite dev middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Diócesis de Sonsonate Server running on port ${port}`);
  });
}

startServer();

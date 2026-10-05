import { Saint } from '../types';

export const SAINTS_DATA: Saint[] = [
  {
    id: 'san-pedro',
    name: 'San Pedro Apóstol',
    feastDay: '06-29',
    feastDayDisplay: '29 de junio',
    category: 'Apóstoles',
    countryOfOrigin: 'Betsaida, Galilea',
    patronage: 'Papas, pescadores, la Iglesia universal',
    century: 'Siglo I',
    image: 'https://images.unsplash.com/photo-1548625361-1959828a2a78?w=800&auto=format&fit=crop&q=80',
    biography: 'Simón Pedro, pescador de Galilea, fue llamado por Jesús para ser "pescador de hombres". Cristo le confió las llaves del Reino de los Cielos diciendo: "Tú eres Pedro, y sobre esta piedra edificaré mi Iglesia" (Mt 16,18). Fue el primer Obispo de Roma y murió mártir crucificado cabeza abajo en la colina vaticana.',
    virtues: ['Fe inquebrantable', 'Humildad tras el arrepentimiento', 'Celo apostólico', 'Fidelidad hasta el martirio'],
    prayer: 'Oh glorioso San Pedro, Príncipe de los Apóstoles, roca sobre la cual Cristo fundó su Iglesia: alcánzanos una fe viva, un amor ardiente a Jesús y una fidelidad total a sus enseñanzas y al Santo Padre. Por Jesucristo nuestro Señor. Amén.'
  },
  {
    id: 'san-pablo',
    name: 'San Pablo Apóstol',
    feastDay: '06-29',
    feastDayDisplay: '29 de junio',
    category: 'Apóstoles',
    countryOfOrigin: 'Tarso de Cilicia',
    patronage: 'Misioneros, teólogos, evangelizadores, escritores',
    century: 'Siglo I',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop&q=80',
    biography: 'Saulo de Tarso, incansable perseguidor de los primeros cristianos, experimentó una radical conversión en el camino a Damasco cuando Cristo resucitado se le reveló: "¿Saulo, Saulo, por qué me persigues?". Transformado en el Apóstol de los Gentiles, llevó el Evangelio por todo el Mediterráneo y escribió las cartas apostólicas que son pilar del Nuevo Testamento.',
    virtues: ['Pasión por el Evangelio', 'Valentía misionera', 'Amor a la Cruz', 'Profundidad teológica'],
    prayer: 'San Pablo, Apóstol de las gentes y maestro de la fe: infunde en nuestros corazones tu mismo celo ardiente para proclamar a Cristo crucificado y resucitado, diciendo con verdad: "Ya no vivo yo, sino que Cristo vive en mí". Amén.'
  },
  {
    id: 'san-jose',
    name: 'San José, Esposo de María',
    feastDay: '03-19',
    feastDayDisplay: '19 de marzo / 1 de mayo (Obrero)',
    category: 'Laicos',
    countryOfOrigin: 'Belén / Nazaret',
    patronage: 'Patrono universal de la Iglesia, de los padres de familia y trabajadores',
    century: 'Siglo I',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    biography: 'Descendiente de David, hombre justo y prudente, Dios le confió la custodia de los mayores tesoros del cielo: su Hijo Jesucristo y la Santísima Virgen María. Con amor paternal y silencio fecundo, protegió a la Sagrada Familia en Nazaret y enseñó el oficio de carpintero al Redentor.',
    virtues: ['Silencio contemplativo', 'Obediencia dócil a Dios', 'Justicia y castidad', 'Paternidad protectora'],
    prayer: 'Glorioso Patriarca San José, custodio de Jesús y María: protege a nuestras familias, guía a la Iglesia y asiste a los trabajadores en sus fatigas. Alcánzanos una santa vida y una dichosa muerte en los brazos de Jesús y María. Amén.'
  },
  {
    id: 'san-oscar-romero',
    name: 'San Óscar Arnulfo Romero',
    feastDay: '03-24',
    feastDayDisplay: '24 de marzo',
    category: 'Mártires',
    countryOfOrigin: 'Ciudad Barrios, El Salvador',
    patronage: 'El Salvador, defensores de los derechos humanos, comunicadores de la verdad',
    century: 'Siglo XX',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop&q=80',
    biography: 'Cuarto Arzobispo de San Salvador, San Óscar Romero fue un pastor santo y valiente que dedicó su vida a anunciar el Evangelio y defender a los pobres y oprimidos en El Salvador. Mártir de la fe y la justicia, fue asesinado en el altar mientras celebraba la Santa Misa el 24 de marzo de 1980. Canonizado por el Papa Francisco en 2018.',
    virtues: ['Amor por los pobres', 'Fidelidad al Magisterio', 'Voz de los sin voz', 'Entrega eucarística'],
    prayer: 'San Óscar Romero, pastor y mártir de Cristo en nuestra tierra salvadoreña: enséñanos a no tener miedo a dar testimonio del Evangelio, a construir la paz sobre la justicia y la reconciliación, y a defender siempre la dignidad de los más vulnerables. Ruega por El Salvador y por la Diócesis de Sonsonate. Amén.'
  },
  {
    id: 'san-francisco-asis',
    name: 'San Francisco de Asís',
    feastDay: '10-04',
    feastDayDisplay: '4 de octubre',
    category: 'Místicos y Religiosos',
    countryOfOrigin: 'Asís, Italia',
    patronage: 'Ecología, animales, orden franciscana, paz',
    century: 'Siglo XIII',
    image: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&auto=format&fit=crop&q=80',
    biography: 'Renunció a todas las riquezas de su familia para abrazar a la "Señora Pobreza" e imitar fielmente a Cristo crucificado. Escuchó la voz del Señor en San Damián: "Francisco, repara mi Iglesia". Fundó la Orden de los Frailes Menores y recibió los sagrados estigmas de la Pasión en el monte Alvernia.',
    virtues: ['Pobreza evangélica', 'Alegría perfecta', 'Amor a la creación', 'Paz y bien'],
    prayer: 'Señor, hazme un instrumento de tu paz: donde haya odio, ponga yo amor; donde haya ofensa, perdón; donde haya discordia, unión; donde haya error, verdad; donde haya duda, fe. San Francisco de Asís, ruega por nosotros.'
  },
  {
    id: 'santo-tomas-aquino',
    name: 'Santo Tomás de Aquino',
    feastDay: '01-28',
    feastDayDisplay: '28 de enero',
    category: 'Doctores',
    countryOfOrigin: 'Roccasecca, Italia',
    patronage: 'Universidades, estudiantes, teólogos, escuelas católicas',
    century: 'Siglo XIII',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
    biography: 'El "Doctor Angélico", fraile dominico, unió magistralmente la fe y la razón en la majestuosa Suma Teológica. Ante el crucifijo de Nápoles, el Señor le dijo: "Bien has escrito de mí, Tomás. ¿Qué recompensa quieres?", y él respondió: "Nada más que a Ti, Señor". Autor de los sublimes himnos eucarísticos Pange Lingua y Tantum Ergo.',
    virtues: ['Sabiduría divina', 'Pureza de mente y corazón', 'Devoción eucarística', 'Humildad intelectual'],
    prayer: 'Concédenos, oh Dios omnipotente, comprender lo que Santo Tomás enseñó y seguir los ejemplos de su admirable vida. Que por su intercesión alcancemos el conocimiento del único y verdadero Dios. Amén.'
  },
  {
    id: 'san-agustin',
    name: 'San Agustín de Hipona',
    feastDay: '08-28',
    feastDayDisplay: '28 de agosto',
    category: 'Doctores',
    countryOfOrigin: 'Tagaste, Numidia (Argelia)',
    patronage: 'Teólogos, impresores, buscadores de la verdad',
    century: 'Siglo IV - V',
    image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=800&auto=format&fit=crop&q=80',
    biography: 'Hijo de las lágrimas y oraciones de Santa Mónica, pasó de una juventud inquieta y extraviada a ser uno de los más grandes Padres y Doctores de la Iglesia. Obispo de Hipona, escribió las inolvidables "Confesiones" y "La Ciudad de Dios". Exclamó: "Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti".',
    virtues: ['Búsqueda incansable de la verdad', 'Arrepentimiento sincero', 'Amor apasionado a la Iglesia', 'Sabiduría pastoral'],
    prayer: 'Tarde te amé, Hermosura tan antigua y tan nueva, tarde te amé. San Agustín, ruega para que nuestros corazones encuentren su descanso y su paz únicamente en Dios. Amén.'
  },
  {
    id: 'santa-teresa-calcuta',
    name: 'Santa Teresa de Calcuta',
    feastDay: '09-05',
    feastDayDisplay: '5 de septiembre',
    category: 'Místicos y Religiosos',
    countryOfOrigin: 'Skopje (Macedonia) / Calcuta (India)',
    patronage: 'Misioneras de la Caridad, voluntarios, enfermos y abandonados',
    century: 'Siglo XX',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80',
    biography: 'Fundadora de las Misioneras de la Caridad, escuchó en el tren a Darjeeling el llamado dentro del llamado a saciar la sed infinita de Jesús en la Cruz a través del servicio a "los más pobres entre los pobres". Vivió irradiando la sonrisa y el consuelo de Cristo en los moribundos de Calcuta y el mundo entero.',
    virtues: ['Caridad heroica', 'Fidelidad en la noche oscura', 'Defensa de la vida concebida', 'Amor a la Eucaristía'],
    prayer: 'Santa Teresa de Calcuta, tú que viste el rostro de Jesús en los más abandonados y desvalidos: enséñanos a saciar su sed mediante obras de misericordia, llevando paz y alegría a quienes nos rodean. Amén.'
  },
  {
    id: 'san-antonio-padua',
    name: 'San Antonio de Padua',
    feastDay: '06-13',
    feastDayDisplay: '13 de junio',
    category: 'Doctores',
    countryOfOrigin: 'Lisboa, Portugal / Padua, Italia',
    patronage: 'Cosas perdidas, pobres, matrimonios, predicadores',
    century: 'Siglo XIII',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&auto=format&fit=crop&q=80',
    biography: 'Fraile franciscano portugués, apodado el "Arca del Testamento" por su asombroso dominio de las Escrituras y el don de milagros. Sostuvo en sus brazos al Niño Jesús, quien se le apareció envuelto en luz celestial. Venerado profundamente en El Salvador, especialmente en el Santuario de San Antonio del Monte en Sonsonate.',
    virtues: ['Elocuencia evangélica', 'Caridad con los necesitados', 'Amor entrañable al Niño Jesús', 'Pureza de vida'],
    prayer: 'Oh bendito San Antonio, amado protector nuestro y consuelo de los afligidos: tú que eres honrado con devoción especial en nuestra tierra de Sonsonate y San Antonio del Monte, alcánzanos de Dios lo que con fe te pedimos y no permitas que perdamos jamás la gracia divina. Amén.'
  },
  {
    id: 'san-judas-tadeo',
    name: 'San Judas Tadeo Apóstol',
    feastDay: '10-28',
    feastDayDisplay: '28 de octubre',
    category: 'Apóstoles',
    countryOfOrigin: 'Galilea',
    patronage: 'Causas difíciles, imposibles y desesperadas',
    century: 'Siglo I',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    biography: 'Pariente de Nuestro Señor Jesucristo y hermano de Santiago el Menor. Apóstol fiel que predicó el Evangelio en Judea, Samaria, Idumea, Siria y Persia, donde fue coronado con el martirio. Portador del medallón con el rostro de Cristo y la llama del Espíritu Santo.',
    virtues: ['Esperanza inquebrantable', 'Lealtad al Salvador', 'Compasión por los afligidos', 'Fortaleza en las pruebas'],
    prayer: '¡San Judas Tadeo, apóstol de Cristo y glorioso intercesor en los casos difíciles! Ven en mi auxilio en esta tribulación y alcánzame la gracia de confiar siempre en la infinita misericordia del Señor. Amén.'
  },
  {
    id: 'san-miguel-arcangel',
    name: 'San Miguel Arcángel',
    feastDay: '09-29',
    feastDayDisplay: '29 de septiembre',
    category: 'Ángeles',
    countryOfOrigin: 'Corte Celestial',
    patronage: 'Defensor de la Iglesia, soldados, policías, enfermos',
    century: 'Eternidad',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    biography: 'Príncipe de la Milicia Celestial, cuyo nombre significa "¿Quién como Dios?". Condujo la victoria de los ángeles fieles contra el dragón infernal. Es el guardián supremo de la Santa Iglesia y protector de las almas en el combate espiritual.',
    virtues: ['Lealtad a Dios', 'Victoria sobre el mal', 'Defensa de los justos', 'Celo por la gloria divina'],
    prayer: 'San Miguel Arcángel, defiéndenos en la lucha. Sé nuestro amparo contra la perversidad y acechanzas del demonio. Que Dios manifieste sobre él su poder, es nuestra humilde súplica; y tú, Príncipe de la Milicia Celestial, con el poder divino arroja al infierno a Satanás y a los demás espíritus malignos que vagan por el mundo para la perdición de las almas. Amén.'
  },
  {
    id: 'san-juan-bosco',
    name: 'San Juan Bosco',
    feastDay: '01-31',
    feastDayDisplay: '31 de enero',
    category: 'Pastores',
    countryOfOrigin: 'Castelnuovo Don Bosco, Italia',
    patronage: 'Juventud, educadores, estudiantes, acróbatas',
    century: 'Siglo XIX',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    biography: 'Padre y maestro de la juventud, fundador de la Familia Salesiana y promotor del "Sistema Preventivo" basado en la razón, la religión y el amor. Dedicó cada aliento a salvar a los jóvenes marginados de Turín bajo la guía constante de María Auxiliadora.',
    virtues: ['Alegría salesiana', 'Amor filial a María Auxiliadora', 'Paciencia infinita con los jóvenes', 'Entrega total pastoral'],
    prayer: 'San Juan Bosco, amigo entrañable de los jóvenes: enséñanos a educar con el corazón, a vivir siempre en la santa alegría y a amar con devoción ardiente a Jesús Sacramentado y a la Virgen Auxiliadora. Amén.'
  },
  {
    id: 'santa-teresa-avila',
    name: 'Santa Teresa de Jesús (de Ávila)',
    feastDay: '10-15',
    feastDayDisplay: '15 de octubre',
    category: 'Doctores',
    countryOfOrigin: 'Ávila, España',
    patronage: 'Escritores católicos, personas que buscan la oración interior',
    century: 'Siglo XVI',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
    biography: 'Primera mujer proclamada Doctora de la Iglesia. Mística cumbre y reformadora del Carmelo descalzo. Escribió obras maestras de la espiritualidad como "El Castillo Interior" y "Camino de Perfección". Enseñó que la oración no es otra cosa sino "tratar de amistad, estando muchas veces tratando a solas con quien sabemos nos ama".',
    virtues: ['Determinada determinación', 'Amor a la humanidad de Cristo', 'Fidelidad a la oración mental', 'Buen humor y valentía'],
    prayer: 'Nada te turbe, nada te espante; todo se pasa, Dios no se muda; la paciencia todo lo alcanza; quien a Dios tiene nada le falta: sólo Dios basta. Santa Teresa de Jesús, ruega por nosotros.'
  },
  {
    id: 'san-martin-porres',
    name: 'San Martín de Porres',
    feastDay: '11-03',
    feastDayDisplay: '3 de noviembre',
    category: 'Místicos y Religiosos',
    countryOfOrigin: 'Lima, Perú',
    patronage: 'Justicia social, barberos, enfermeros, armonía interracial',
    century: 'Siglo XVI - XVII',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=80',
    biography: 'Fray Escoba, hermano cooperador dominico en el convento de Santo Domingo de Lima. Dotado de dones sobrenaturales como la bilocación y la curación milagrosa, sirvió con humildad sublime a los enfermos, a los esclavos y hasta a los animales, uniendo a perro, gato y ratón en el mismo plato.',
    virtues: ['Humildad profunda', 'Caridad desbordante', 'Paciencia ante las ofensas', 'Oración incesante'],
    prayer: 'San Martín de Porres, humilde siervo de Dios y modelo de caridad evangélica: intercede por nosotros para que aprendamos a servir con mansedumbre a nuestros hermanos y alcancemos la paz en el Señor. Amén.'
  },
  {
    id: 'san-benito',
    name: 'San Benito de Nursia',
    feastDay: '07-11',
    feastDayDisplay: '11 de julio',
    category: 'Místicos y Religiosos',
    countryOfOrigin: 'Nursia, Italia',
    patronage: 'Patrono principal de Europa, monjes, protección contra el mal',
    century: 'Siglo V - VI',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80',
    biography: 'Padre del monacato occidental y autor de la Santa Regla ("Ora et Labora" - Reza y Trabaja). Fundó la Abadía de Montecasino. Su medalla y cruz son signo universal de protección y renuncia absoluta al poder del maligno.',
    virtues: ['Discernimiento y templanza', 'Equilibrio de oración y trabajo', 'Hospitalidad sagrada', 'Autoridad paternal'],
    prayer: 'La Santa Cruz sea mi luz, no sea el dragón mi guía. ¡Vete, Satanás; nunca me aconsejes cosas vanas; es malo lo que me ofreces, bebe tú mismo tu veneno! San Benito, ruega por nosotros.'
  },
  {
    id: 'san-ignacio-loyola',
    name: 'San Ignacio de Loyola',
    feastDay: '07-31',
    feastDayDisplay: '31 de julio',
    category: 'Pastores',
    countryOfOrigin: 'Loyola, Guipúzcoa, España',
    patronage: 'Ejercicios espirituales, soldados, Compañía de Jesús',
    century: 'Siglo XVI',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    biography: 'Noble caballero vasco herido en Pamplona, cuya lectura de vidas de Cristo y de los santos lo llevó a una conversión total en Manresa. Fundador de la Compañía de Jesús (Jesuitas) bajo el lema "Ad Maiorem Dei Gloriam" (Para Mayor Gloria de Dios) y autor de los célebres Ejercicios Espirituales.',
    virtues: ['Magis (Buscar siempre lo mejor para Dios)', 'Discernimiento de espíritus', 'Disponibilidad total apostólica', 'Amor a la Iglesia'],
    prayer: 'Tomad, Señor, y recibid toda mi libertad, mi memoria, mi entendimiento y toda mi voluntad; todo mi haber y mi poseer; vos me lo disteis, a vos, Señor, lo torno; todo es vuestro, disponed a toda vuestra voluntad. Dadme vuestro amor y gracia, que ésta me basta. Amén.'
  }
];

export function getSaintForToday(date: Date = new Date()): Saint {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const todayKey = `${month}-${day}`;

  const match = SAINTS_DATA.find((s) => s.feastDay === todayKey);
  if (match) return match;

  // Stable daily rotation based on day of year if no direct feast day match
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return SAINTS_DATA[dayOfYear % SAINTS_DATA.length];
}

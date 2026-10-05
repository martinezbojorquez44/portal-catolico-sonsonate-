import { QuizQuestion } from '../types';

export const CATHOLIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Jesús',
    question: '¿Qué significa el nombre santo de "Jesús" en hebreo?',
    options: ['Dios con nosotros', 'Dios salva', 'El Ungido', 'Príncipe de la Paz'],
    correctIndex: 1,
    explanation: 'El nombre Jesús (Yeshúa) significa "Dios salva" o "El Señor es salvación", tal como el Ángel reveló a San José en sueños (Mt 1, 21).'
  },
  {
    id: 'q2',
    category: 'Santísima Trinidad',
    question: '¿Cuántas naturalezas y cuántas personas hay en la Santísima Trinidad?',
    options: ['Tres naturalezas y una persona', 'Una naturaleza divina y tres personas distintas', 'Tres naturalezas y tres personas', 'Una naturaleza y una persona'],
    correctIndex: 1,
    explanation: 'La fe católica enseña el misterio de un solo Dios verdadero en una única naturaleza divina y tres Personas distintas: Padre, Hijo y Espíritu Santo.'
  },
  {
    id: 'q3',
    category: 'Virgen María',
    question: '¿Cuál es el dogma mariano que proclama que María fue concebida sin la mancha del pecado original?',
    options: ['Maternidad Divina', 'Perpetua Virginidad', 'Inmaculada Concepción', 'Asunción en cuerpo y alma'],
    correctIndex: 2,
    explanation: 'El dogma de la Inmaculada Concepción fue definido solemnemente por el Beato Papa Pío IX en 1854 mediante la bula Ineffabilis Deus.'
  },
  {
    id: 'q4',
    category: 'Santo Rosario',
    question: '¿Qué misterios del Santo Rosario se rezan tradicionalmente los días martes y viernes?',
    options: ['Misterios Gozosos', 'Misterios Dolorosos', 'Misterios Gloriosos', 'Misterios Luminosos'],
    correctIndex: 1,
    explanation: 'Los Misterios Dolorosos, que contemplan la Pasión y Muerte de Nuestro Señor, se rezan los martes y viernes.'
  },
  {
    id: 'q5',
    category: 'Sacramentos',
    question: '¿Cuál es el sacramento que imprime carácter y confiere la plenitud de los dones del Espíritu Santo?',
    options: ['Bautismo', 'Eucaristía', 'Confirmación', 'Unción de los Enfermos'],
    correctIndex: 2,
    explanation: 'La Confirmación perfecciona la gracia bautismal y enriquece al creyente con la especial fortaleza del Espíritu Santo.'
  },
  {
    id: 'q6',
    category: 'Biblia',
    question: '¿Cuántos libros componen el canon completo de la Santa Biblia Católica?',
    options: ['66 libros', '70 libros', '73 libros (46 en el Antiguo Testamento y 27 en el Nuevo)', '77 libros'],
    correctIndex: 2,
    explanation: 'El canon católico de las Sagradas Escrituras consta de 73 libros: 46 en el Antiguo Testamento y 27 en el Nuevo Testamento.'
  },
  {
    id: 'q7',
    category: 'Santos',
    question: '¿Quién es el primer santo salvadoreño canonizado por la Iglesia Católica, pastor y mártir?',
    options: ['San Óscar Arnulfo Romero', 'San Martín de Porres', 'San Pedro Claver', 'San Juan Diego'],
    correctIndex: 0,
    explanation: 'San Óscar Arnulfo Romero, Arzobispo de San Salvador y mártir de la fe y la justicia, fue canonizado en Roma el 14 de octubre de 2018.'
  },
  {
    id: 'q8',
    category: 'Diócesis',
    question: '¿Cuál es el nombre oficial de la Catedral de Sonsonate y quién es la Excelsa Patrona diocesana?',
    options: [
      'Catedral de San Miguel y Virgen de la Paz',
      'Catedral de San Salvador y Divino Salvador del Mundo',
      'Catedral de la Santísima Trinidad de Sonsonate y Nuestra Señora de Candelaria',
      'Catedral de Santa Ana y Nuestra Señora del Carmen'
    ],
    correctIndex: 2,
    explanation: 'La sede episcopal de la Diócesis es la Catedral de la Santísima Trinidad de Sonsonate, y la Excelsa Patrona de la Diócesis es Nuestra Señora de Candelaria, cuya fiesta patronal se celebra el 2 de febrero.'
  },
  {
    id: 'q9',
    category: 'Liturgia',
    question: '¿Qué color litúrgico se utiliza en la Santa Misa durante el tiempo de Adviento y Cuaresma?',
    options: ['Verde', 'Blanco', 'Morado', 'Rojo'],
    correctIndex: 2,
    explanation: 'El color morado simboliza la preparación espiritual, la penitencia, la conversión y la esperanza vigilante.'
  },
  {
    id: 'q10',
    category: 'Catecismo',
    question: '¿Cuáles son las tres virtudes teologales infundidas por Dios en el alma?',
    options: ['Prudencia, Justicia y Fortaleza', 'Fe, Esperanza y Caridad', 'Pobreza, Castidad y Obediencia', 'Humildad, Mansedumbre y Paciencia'],
    correctIndex: 1,
    explanation: 'Las tres virtudes teologales son la Fe, la Esperanza y la Caridad (Amor), que tienen a Dios mismo como origen, motivo y objeto directo.'
  },
  {
    id: 'q11',
    category: 'Evangelio',
    question: '¿Cuáles son los cuatro evangelistas inspirados por el Espíritu Santo?',
    options: ['Pedro, Pablo, Juan y Santiago', 'Mateo, Marcos, Lucas y Juan', 'Moisés, David, Isaías y Jeremías', 'Tomás, Felipe, Bartolomé y Andrés'],
    correctIndex: 1,
    explanation: 'Los cuatro evangelios canónicos fueron escritos por los santos evangelistas Mateo, Marcos, Lucas y Juan.'
  },
  {
    id: 'q12',
    category: 'Historia de la Iglesia',
    question: '¿En qué año fue creada la Diócesis de Sonsonate por el Papa San Juan Pablo II?',
    options: ['1975', '1986', '1992', '2000'],
    correctIndex: 1,
    explanation: 'La Diócesis de Sonsonate fue erigida por San Juan Pablo II el 31 de mayo de 1986 mediante la Constitución Apostólica De grege Christi.'
  }
];

export function getDailyQuizQuestions(count = 5): QuizQuestion[] {
  const today = new Date();
  const seed = today.getFullYear() * 1000 + (today.getMonth() + 1) * 50 + today.getDate();
  const shuffled = [...CATHOLIC_QUIZ_QUESTIONS].sort((a, b) => {
    const hashA = (a.id.charCodeAt(1) * 31 + seed) % 100;
    const hashB = (b.id.charCodeAt(1) * 31 + seed) % 100;
    return hashA - hashB;
  });
  return shuffled.slice(0, count);
}

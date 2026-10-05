export interface JesusContent {
  section: string;
  title: string;
  description: string;
  biblicalQuote: string;
  reference: string;
  targetAudience: {
    children: string;
    youth: string;
    adults: string;
  };
}

export const JESUS_SECTIONS: JesusContent[] = [
  {
    section: 'salvador',
    title: 'Jesucristo: Centro de Nuestra Fe y Esperanza',
    description: 'Jesucristo es el Hijo Unigénito de Dios, verdadero Dios y verdadero hombre. En Él se revela la plenitud del amor del Padre y la salvación de la humanidad.',
    biblicalQuote: 'Porque tanto amó Dios al mundo que dio a su Hijo único, para que todo el que crea en Él no perezca, sino que tenga vida eterna.',
    reference: 'San Juan 3, 16',
    targetAudience: {
      children: 'Jesús es tu mejor amigo, que te ama con todo su corazón y siempre camina a tu lado.',
      youth: 'Jesús es quien da sentido pleno a tus anhelos, tu libertad y tus grandes proyectos de vida.',
      adults: 'Cristo es la respuesta definitiva al misterio del ser humano, del sufrimiento y de la esperanza trascendente.'
    }
  },
  {
    section: 'vida-publica',
    title: 'Vida Pública, Parábolas y Milagros',
    description: 'Bautizado en el Jordán por Juan el Bautista, Jesús inauguró el Reino de Dios. Con sus parábolas nos enseñó la misericordia del Padre y con sus milagros demostró su poder divino sobre la enfermedad, la naturaleza y la muerte.',
    biblicalQuote: 'El tiempo se ha cumplido y el Reino de Dios está cerca; convertíos y creed en el Evangelio.',
    reference: 'San Marcos 1, 15',
    targetAudience: {
      children: 'Jesús calmó la tempestad, multiplicó los panes y abrazó con ternura a los niños.',
      youth: 'Jesús desafió las hipocresías, defendió la verdad y nos enseñó a amar hasta dar la vida.',
      adults: 'Las parábolas del Buen Samaritano y del Hijo Pródigo revelan el corazón reconciliador de Dios.'
    }
  },
  {
    section: 'pasion-muerte',
    title: 'Pasión y Muerte en la Cruz',
    description: 'En obediencia amorosa al Padre, Cristo cargó con todos nuestros pecados. Entregó su vida en el madero del Calvario para redimirnos del pecado y de la muerte eterna.',
    biblicalQuote: 'Nadie tiene mayor amor que el que da la vida por sus amigos.',
    reference: 'San Juan 15, 13',
    targetAudience: {
      children: 'Jesús nos amó tanto que no dudó en dar su vida en la Cruz para que pudiéramos ser felices en el Cielo.',
      youth: 'La Cruz de Cristo no es derrota, sino el mayor acto de amor y valentía de la historia humana.',
      adults: 'Por sus llagas fuimos sanados; en el sacrificio de la Cruz el dolor adquiere valor redentor.'
    }
  },
  {
    section: 'resurreccion',
    title: 'Gloriosa Resurrección y Ascensión',
    description: '¡Cristo ha resucitado, verdaderamente ha resucitado! Al tercer día el sepulcro quedó vacío. La muerte ha sido vencida y las puertas del Paraíso se abrieron para siempre.',
    biblicalQuote: 'Yo soy la resurrección y la vida; el que cree en mí, aunque haya muerto, vivirá.',
    reference: 'San Juan 11, 25',
    targetAudience: {
      children: '¡Jesús vive para siempre! El sepulcro está vacío y Él está con nosotros cada domingo en Misa.',
      youth: 'La Resurrección es la prueba de que el amor es más fuerte que la muerte y el bien siempre vencerá.',
      adults: 'La Resurrección de Cristo es la garantía cierta de nuestra propia resurrección en el último día.'
    }
  },
  {
    section: 'eucaristia',
    title: 'La Santísima Eucaristía: Presencia Real',
    description: 'En la Última Cena, Jesús tomó el pan y el vino y los convirtió en su propio Cuerpo y Sangre. La Eucaristía es fuente y culmen de toda la vida cristiana.',
    biblicalQuote: 'El que come mi carne y bebe mi sangre tiene vida eterna, y yo le resucitaré en el último día.',
    reference: 'San Juan 6, 54',
    targetAudience: {
      children: 'En la Hostia consagrada no hay un pedazo de pan, ¡está Jesús vivo esperándote con amor!',
      youth: 'La Eucaristía es el alimento para no desfallecer en el camino y el abrazo íntimo con Dios.',
      adults: 'En cada Santa Misa se renueva incruentamente el mismo y único sacrificio redentor del Calvario.'
    }
  }
];

export const TRINITY_INFO = {
  title: 'La Santísima Trinidad: Un Solo Dios en Tres Personas',
  dogma: 'El misterio central de la fe y de la vida cristiana es el misterio de la Santísima Trinidad. Los cristianos son bautizados en el nombre del Padre y del Hijo y del Espíritu Santo.',
  persons: [
    {
      name: 'Dios Padre',
      role: 'Creador omnipotente',
      description: 'Origen primero de todo y bondad infinita. Nos cuida con providencia y ternura paternal inagotable.',
      quote: 'Padre nuestro que estás en el cielo, santificado sea tu Nombre.'
    },
    {
      name: 'Dios Hijo (Jesucristo)',
      role: 'Redentor y Salvador',
      description: 'Engendrado, no creado, de la misma naturaleza del Padre. Se hizo hombre para nuestra salvación.',
      quote: 'El Verbo se hizo carne y habitó entre nosotros.'
    },
    {
      name: 'Dios Espíritu Santo',
      role: 'Santificador y Paráclito',
      description: 'Señor y dador de vida, que procede del Padre y del Hijo. Alienta, guía e inflama a la Iglesia con sus siete sagrados dones.',
      quote: 'El Defensor, el Espíritu Santo que enviará el Padre en mi nombre, os lo enseñará todo.'
    }
  ],
  signOfCross: 'Por la señal de la Santa Cruz, de nuestros enemigos líbranos Señor, Dios nuestro. En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.',
  prayer: 'Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.'
};

export const ROSARY_MYSTERIES = {
  gozosos: {
    name: 'Misterios Gozosos',
    days: 'Lunes y Sábados',
    mysteries: [
      { num: 1, title: 'La Anunciación del Ángel a María', fruit: 'La humildad', scripture: 'Lc 1, 26-38' },
      { num: 2, title: 'La Visitación de María a su prima Santa Isabel', fruit: 'La caridad fraterna', scripture: 'Lc 1, 39-56' },
      { num: 3, title: 'El Nacimiento de Jesús en el portal de Belén', fruit: 'La pobreza de espíritu', scripture: 'Lc 2, 1-20' },
      { num: 4, title: 'La Presentación del Niño Jesús en el Templo', fruit: 'La pureza y obediencia', scripture: 'Lc 2, 22-40' },
      { num: 5, title: 'El Niño Jesús perdido y hallado en el Templo', fruit: 'La búsqueda de Dios', scripture: 'Lc 2, 41-52' }
    ]
  },
  luminosos: {
    name: 'Misterios Luminosos',
    days: 'Jueves',
    mysteries: [
      { num: 1, title: 'El Bautismo de Jesús en el río Jordán', fruit: 'La apertura al Espíritu Santo', scripture: 'Mt 3, 13-17' },
      { num: 2, title: 'La autorrevelación en las Bodas de Caná', fruit: 'A Jesús por María', scripture: 'Jn 2, 1-12' },
      { num: 3, title: 'El anuncio del Reino de Dios invitando a la conversión', fruit: 'El arrepentimiento y conversión', scripture: 'Mc 1, 14-15' },
      { num: 4, title: 'La Transfiguración en el Monte Tabor', fruit: 'El deseo de santidad', scripture: 'Mt 17, 1-9' },
      { num: 5, title: 'La Institución de la Sagrada Eucaristía', fruit: 'La devoción eucarística', scripture: 'Mt 26, 26-29' }
    ]
  },
  dolorosos: {
    name: 'Misterios Dolorosos',
    days: 'Martes y Viernes',
    mysteries: [
      { num: 1, title: 'La Agonía de Jesús en el Huerto de Getsemaní', fruit: 'El dolor de los pecados', scripture: 'Mt 26, 36-46' },
      { num: 2, title: 'La Flagelación del Señor en la columna', fruit: 'La mortificación de los sentidos', scripture: 'Jn 19, 1' },
      { num: 3, title: 'La Coronación de Espinas', fruit: 'El desprecio de las vanidades', scripture: 'Mt 27, 27-31' },
      { num: 4, title: 'Jesús con la Cruz a cuestas camino al Calvario', fruit: 'La paciencia en las pruebas', scripture: 'Lc 23, 26-32' },
      { num: 5, title: 'La Crucifixión y Muerte de Nuestro Señor', fruit: 'El amor a la Cruz y salvación', scripture: 'Jn 19, 17-30' }
    ]
  },
  gloriosos: {
    name: 'Misterios Gloriosos',
    days: 'Miércoles y Domingos',
    mysteries: [
      { num: 1, title: 'La Gloriosa Resurrección del Señor', fruit: 'La fe y vida nueva', scripture: 'Mt 28, 1-10' },
      { num: 2, title: 'La Admirable Ascensión de Jesús al Cielo', fruit: 'La esperanza cristiana', scripture: 'Hch 1, 6-11' },
      { num: 3, title: 'La Venida del Espíritu Santo en Pentecostés', fruit: 'El amor de Dios y celo apostólico', scripture: 'Hch 2, 1-13' },
      { num: 4, title: 'La Asunción de la Virgen María en cuerpo y alma', fruit: 'La gracia de una santa muerte', scripture: 'Ap 12, 1' },
      { num: 5, title: 'La Coronación de María como Reina de Cielos y Tierra', fruit: 'La confianza en su intercesión', scripture: 'Lc 1, 46-55' }
    ]
  }
};

export const SACRAMENTS_DATA = [
  {
    id: 'bautismo',
    name: 'El Santo Bautismo',
    category: 'Sacramentos de Iniciación Cristiana',
    icon: 'Droplets',
    definition: 'Puerta de la vida en el Espíritu y fundamento de toda la vida cristiana. Por el Bautismo somos liberados del pecado original, regenerados como hijos de Dios e incorporados a la Santa Iglesia.',
    matterForm: 'Materia: Agua natural. Forma: "Yo te bautizo en el nombre del Padre, y del Hijo, y del Espíritu Santo".',
    effects: 'Borra el pecado original y todo pecado actual; infunde la gracia santificante; imprime un carácter espiritual indeleble.',
    requirements: 'Partida de nacimiento del niño; padres y padrinos bautizados y confirmados; asistencia a las charlas prebautismales en la parroquia.'
  },
  {
    id: 'confirmacion',
    name: 'La Confirmación',
    category: 'Sacramentos de Iniciación Cristiana',
    icon: 'Flame',
    definition: 'Perfecciona la gracia bautismal; nos une más íntimamente a la Iglesia y nos enriquece con la fortaleza especial del Espíritu Santo para ser verdaderos testigos y soldados de Cristo.',
    matterForm: 'Materia: Sagrado Crisma (aceite consagrado con bálsamo). Forma: "Recibe por esta señal el don del Espíritu Santo".',
    effects: 'Crecimiento de la gracia bautismal; infusión de los 7 dones del Espíritu Santo; fortaleza para confesar con valentía la fe católica.',
    requirements: 'Haber recibido el Bautismo y la Primera Comunión; catequesis de confirmación; padrino o madrina católico practicante.'
  },
  {
    id: 'eucaristia',
    name: 'La Santísima Eucaristía',
    category: 'Sacramentos de Iniciación Cristiana',
    icon: 'Wine',
    definition: 'El sacramento de los sacramentos. En la Eucaristía está contenido verdadera, real y substancialmente el Cuerpo, Sangre, Alma y Divinidad de Nuestro Señor Jesucristo.',
    matterForm: 'Materia: Pan de trigo ácimo y vino puro de vid con unas gotas de agua. Forma: Palabras de la consagración pronunciadas por el sacerdote válidamente ordenado.',
    effects: 'Unión íntima con Cristo; conservación y aumento de la vida de gracia; perdón de los pecados veniales; prenda de la gloria futura.',
    requirements: 'Estar en estado de gracia (sin pecado mortal sin confesar); guardar una hora de ayuno eucarístico; tener recta intención.'
  },
  {
    id: 'reconciliacion',
    name: 'Penitencia y Reconciliación (Confesión)',
    category: 'Sacramentos de Curación',
    icon: 'HeartHandshake',
    definition: 'Sacramento mediante el cual los fieles que confiesan sus pecados con arrepentimiento sincero reciben de la misericordia divina el perdón y la reconciliación con Dios y con la Iglesia.',
    matterForm: 'Materia: Actos del penitente (contrición, confesión de boca y satisfacción). Forma: "Yo te absuelvo de tus pecados en el nombre del Padre, y del Hijo, y del Espíritu Santo".',
    effects: 'Perdón de todos los pecados confesados; restitución de la gracia santificante; paz y serenidad de la conciencia; fuerza espiritual para el combate cristiano.',
    requirements: 'Los 5 pasos para una buena confesión: 1. Examen de conciencia. 2. Dolor de corazón. 3. Propósito de enmienda. 4. Confesión sincera al sacerdote. 5. Cumplir la penitencia.'
  },
  {
    id: 'uncion-enfermos',
    name: 'Unción de los Enfermos',
    category: 'Sacramentos de Curación',
    icon: 'ShieldPlus',
    definition: 'Conferido a los cristianos que comienzan a encontrarse en peligro de muerte por enfermedad grave o vejez avanzada. Otorga una gracia especial de fortaleza, paz y alivio.',
    matterForm: 'Materia: Óleo de los enfermos bendecido por el Obispo. Forma: "Por esta santa unción y por su bondadosa misericordia, te ayude el Señor con la gracia del Espíritu Santo...".',
    effects: 'Unión del enfermo a la Pasión de Cristo; consuelo y fortaleza espiritual; perdón de los pecados si no pudo confesarse; restablecimiento de la salud corporal si conviene a la salvación del alma.',
    requirements: 'Ser católico bautizado que se encuentre en peligro de muerte por enfermedad o ancianidad. Solicitar el sacramento al sacerdote de la parroquia.'
  },
  {
    id: 'orden-sacerdotal',
    name: 'El Orden Sacerdotal',
    category: 'Sacramentos al Servicio de la Comunidad',
    icon: 'Sparkles',
    definition: 'Sacramento por el que la misión confiada por Cristo a sus Apóstoles sigue siendo ejercida en la Iglesia hasta el fin de los tiempos: episcopado, presbiterado y diaconado.',
    matterForm: 'Materia: Imposición de las manos del Obispo sobre la cabeza del ordenando. Forma: Oración consagratoria propia de cada grado.',
    effects: 'Carácter espiritual indeleble que configura con Cristo Cabeza, Pastor y Siervo; gracia del Espíritu Santo para enseñar, santificar y gobernar.',
    requirements: 'Varón bautizado, con vocación discernida por la Iglesia, formación en el seminario mayor, celibato y obediencia a su Obispo.'
  },
  {
    id: 'matrimonio',
    name: 'El Santo Matrimonio',
    category: 'Sacramentos al Servicio de la Comunidad',
    icon: 'Heart',
    definition: 'Alianza matrimonial por la que un varón y una mujer constituyen entre sí un consorcio de toda la vida, ordenado por su misma índole natural al bien de los cónyuges y a la procreación y educación de los hijos.',
    matterForm: 'Materia y Forma: Consentimiento mutuo y legítimo manifestado libremente ante el ministro sagrado de la Iglesia y dos testigos.',
    effects: 'Vínculo perpetuo y exclusivo indisoluble hasta la muerte; gracia especial de los esposos para santificarse mutuamente y educar a sus hijos en la fe católica.',
    requirements: 'Partidas de bautismo y confirmación actualizadas; expediente matrimonial parroquial; curso prematrimonial; ausencia de impedimentos canónicos.'
  }
];

export const CATHOLIC_PRAYERS = [
  {
    id: 'padre-nuestro',
    title: 'Padre Nuestro',
    category: 'Fundamentales',
    text: 'Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.'
  },
  {
    id: 'ave-maria',
    title: 'Ave María',
    category: 'Marianas',
    text: 'Dios te salve, María, llena eres de gracia; el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.'
  },
  {
    id: 'gloria',
    title: 'Gloria al Padre',
    category: 'Fundamentales',
    text: 'Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.'
  },
  {
    id: 'credo-apostoles',
    title: 'Credo de los Apóstoles',
    category: 'Fundamentales',
    text: 'Creo en Dios, Padre Todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios Padre Todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.'
  },
  {
    id: 'salve-regina',
    title: 'Dios te Salve, Reina y Madre (La Salve)',
    category: 'Marianas',
    text: 'Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando, en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce Virgen María! Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo. Amén.'
  },
  {
    id: 'acto-contricion',
    title: 'Acto de Contrición',
    category: 'Penitenciales',
    text: 'Señor mío Jesucristo, Dios y Hombre verdadero, Creador, Padre y Redentor mío; por ser Vos quien sois, Bondad infinita, y porque os amo sobre todas las cosas, me pesa de todo corazón haberos ofendido. También me pesa porque podéis castigarme con las penas del infierno. Ayudado de vuestra divina gracia, propongo firmemente nunca más pecar, confesarme y cumplir la penitencia que me fuere impuesta. Amén.'
  },
  {
    id: 'angelus',
    title: 'El Ángelus',
    category: 'Marianas',
    text: 'V. El Ángel del Señor anunció a María.\nR. Y concibió por obra del Espíritu Santo. (Ave María...)\nV. He aquí la esclava del Señor.\nR. Hágase en mí según tu palabra. (Ave María...)\nV. Y el Verbo se hizo carne.\nR. Y habitó entre nosotros. (Ave María...)\nV. Ruega por nosotros, Santa Madre de Dios.\nR. Para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo.\nOración: Te pedimos, Señor, que derrames tu gracia en nuestras almas para que, habiendo conocido por el anuncio del Ángel la Encarnación de tu Hijo Jesucristo, seamos conducidos por su Pasión y su Cruz a la gloria de la Resurrección. Por el mismo Jesucristo Nuestro Señor. Amén.'
  },
  {
    id: 'alma-cristo',
    title: 'Alma de Cristo (Anima Christi)',
    category: 'A Jesús',
    text: 'Alma de Cristo, santifícame. Cuerpo de Cristo, sálvame. Sangre de Cristo, embriágame. Agua del costado de Cristo, lávame. Pasión de Cristo, confórtame. ¡Oh buen Jesús, óyeme! Dentro de tus llagas, escóndeme. No permitas que me aparte de Ti. Del enemigo maligno, defiéndeme. En la hora de mi muerte, llámame. Y mándame ir a Ti, para que con tus santos te alabe, por los siglos de los siglos. Amén.'
  }
];

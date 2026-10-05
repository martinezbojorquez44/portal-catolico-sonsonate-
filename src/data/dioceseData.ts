import { MassSchedule, DiocesanNews } from '../types';

export interface DioceseInfo {
  name: string;
  country: string;
  foundationDate: string;
  foundingPope: string;
  cathedral: string;
  patronSaint: {
    name: string;
    title: string;
    feastDay: string;
    history: string;
    image: string;
  };
  jesusNazareno: {
    title: string;
    description: string;
    heritage: string;
    image: string;
  };
  bishop: {
    name: string;
    title: string;
    appointmentDate: string;
    biography: string;
    pastoralMotto: string;
    message: string;
    image: string;
  };
  contact: {
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    curiaHours: string;
  };
}

export const INITIAL_DIOCESE_INFO: DioceseInfo = {
  name: 'Diócesis de Sonsonate',
  country: 'El Salvador, Centroamérica',
  foundationDate: '31 de mayo de 1986',
  foundingPope: 'San Juan Pablo II (Constitución Apostólica "De grege Christi")',
  cathedral: 'Catedral de la Santísima Trinidad de Sonsonate',
  patronSaint: {
    name: 'Nuestra Señora de Candelaria',
    title: 'Excelsa Patrona Diocesana',
    feastDay: '2 de febrero',
    history: 'La devoción a la Santísima Virgen de Candelaria en la ciudad de Sonsonate data de la época colonial. Al erigirse la Diócesis el 31 de mayo de 1986 por mandato de San Juan Pablo II, la histórica parroquia central fue consagrada como Catedral de la Santísima Trinidad de Sonsonate. Cada 2 de febrero, miles de fieles acuden a la bendición de las candelas y a la solemne procesión en honor a la Excelsa Patrona de la Diócesis.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
  },
  jesusNazareno: {
    title: 'Jesús Nazareno de Sonsonate',
    description: 'La venerada y milagrosa imagen de Jesús Nazareno de Sonsonate es uno de los máximos tesoros de piedad católica de Centroamérica. Su Hermandad, una de las más antiguas de América, custodia las solemnes procesiones de Semana Santa que reúnen a más de cien mil devotos.',
    heritage: 'Declarada Patrimonio Cultural Inmaterial de El Salvador por la Asamblea Legislativa.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80'
  },
  bishop: {
    name: 'S.E. Mons. Constantino Barrera Morales',
    title: 'Obispo de la Diócesis de Sonsonate',
    appointmentDate: 'Nombrado por el Papa Benedicto XVI el 11 de junio de 2012',
    pastoralMotto: '«In veritate et caritate» (En la verdad y la caridad)',
    biography: 'Monseñor Constantino Barrera nació en Cantón San José, Ilobasco, Cabañas. Realizó sus estudios eclesiásticos en el Seminario Mayor San José de la Montaña y fue ordenado sacerdote en 1990. Fue Rector del Seminario Mayor y Vicario General de la Diócesis de San Vicente. En 2012 fue consagrado Obispo de Sonsonate, guiando a la grey diocesana con solicitud pastoral, cercanía a las comunidades parroquiales y promoción del clero y los laicos.',
    message: '«Queridos hermanos de la Diócesis de Sonsonate y devotos que nos visitan: ponemos en el centro de nuestra vida y misión evangelizadora a Jesucristo, único Salvador y Señor. Que la Santísima Virgen de Candelaria y San José nos acompañen en la construcción de una comunidad diocesana fraterna, misionera y llena de esperanza.»',
    image: 'https://images.unsplash.com/photo-1548625361-1959828a2a78?w=800&auto=format&fit=crop&q=80'
  },
  contact: {
    address: 'Obispado de Sonsonate, Barrio El Ángel, frente a Parque Central',
    city: 'Sonsonate',
    country: 'El Salvador',
    phone: '+503 2451-0348',
    email: 'curia@diocesisdesonsonate.org',
    curiaHours: 'Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:00 PM'
  }
};

export const INITIAL_MASS_SCHEDULES: MassSchedule[] = [
  {
    parish: 'Catedral de la Santísima Trinidad de Sonsonate',
    location: 'Centro Histórico, Sonsonate',
    priest: 'Párroco y Cabildo Catedralicio',
    weekdays: '6:30 AM, 12:00 MD, 5:30 PM',
    saturdays: '6:30 AM, 5:30 PM (Misa de precepto)',
    sundays: '6:30 AM, 8:00 AM, 10:00 AM (Misa del Obispo), 4:00 PM, 6:00 PM',
    confessions: 'Martes a Viernes de 4:00 PM a 5:30 PM',
    phone: '+503 2451-0420'
  },
  {
    parish: 'Santuario de San Antonio del Monte',
    location: 'San Antonio del Monte, Sonsonate',
    priest: 'Pbro. Párroco del Santuario',
    weekdays: '6:00 AM, 5:00 PM',
    saturdays: '6:00 AM, 4:00 PM, 6:00 PM',
    sundays: '6:00 AM, 8:00 AM, 10:00 AM, 4:00 PM, 6:00 PM',
    confessions: 'Sábados y Domingos antes de cada Misa',
    phone: '+503 2451-1822'
  },
  {
    parish: 'Parroquia San Juan Bautista',
    location: 'Nahuizalco, Sonsonate',
    priest: 'Párroco de Nahuizalco',
    weekdays: '6:30 AM, 6:00 PM',
    saturdays: '6:30 AM, 5:00 PM',
    sundays: '7:00 AM, 9:00 AM, 11:00 AM, 5:00 PM',
    confessions: 'Jueves eucarísticos a las 5:00 PM',
    phone: '+503 2453-0105'
  },
  {
    parish: 'Parroquia Nuestra Señora de los Dolores (Izalco)',
    location: 'Izalco, Sonsonate',
    priest: 'Párroco de Izalco',
    weekdays: '6:30 AM, 5:30 PM',
    saturdays: '6:30 AM, 5:00 PM',
    sundays: '7:00 AM, 9:30 AM, 5:00 PM',
    confessions: 'Viernes primeros de mes',
    phone: '+503 2453-5012'
  },
  {
    parish: 'Parroquia Santa Lucía',
    location: 'Juayúa, Sonsonate',
    priest: 'Párroco de Juayúa',
    weekdays: '6:30 AM, 6:00 PM',
    saturdays: '6:30 AM, 5:00 PM',
    sundays: '7:00 AM, 10:00 AM, 5:00 PM',
    confessions: 'Sábados de 3:00 PM a 5:00 PM',
    phone: '+503 2452-2010'
  },
  {
    parish: 'Parroquia San Francisco de Asís',
    location: 'Armenia, Sonsonate',
    priest: 'Párroco de Armenia',
    weekdays: '6:00 AM, 5:30 PM',
    saturdays: '6:00 AM, 5:00 PM',
    sundays: '7:00 AM, 9:00 AM, 5:00 PM',
    confessions: 'Jueves y Viernes a las 4:30 PM',
    phone: '+503 2454-0012'
  }
];

export const INITIAL_NEWS: DiocesanNews[] = [
  {
    id: 'noticia-1',
    title: 'Solemnes Fiestas Patronales en honor a Nuestra Señora de Candelaria',
    date: 'Febrero 2026',
    category: 'Celebración',
    summary: 'La Catedral de la Santísima Trinidad de Sonsonate acogió a millares de peregrinos en la Misa Pontifical en honor a la Excelsa Patrona presidida por Monseñor Constantino Barrera.',
    content: 'Con gran gozo espiritual y recogimiento, la Diócesis de Sonsonate celebró la fiesta solemne de la Candelaria. El Obispo diocesano exhortó a todas las familias a ser lámparas vivas de la fe en sus comunidades y hogares.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'noticia-2',
    title: 'Preparativos para la Cuaresma y la Magna Semana Santa Sonsonateca',
    date: 'Marzo 2026',
    category: 'Semana Santa',
    summary: 'Las hermandades y cofradías de la diócesis intensifican retiros espirituales y ensayos de piedad para la Semana Mayor.',
    content: 'La piedad popular de Sonsonate, reconocida nacional e internacionalmente, prepara el cortejo procesional del Nazareno y el Santo Entierro, invitando a vivir la Cuaresma en profunda conversión, oración y caridad.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'noticia-3',
    title: 'Encuentro Diocesano de Jóvenes: «Testigos de Cristo en Sonsonate»',
    date: 'Abril 2026',
    category: 'Jóvenes',
    summary: 'Más de mil doscientos jóvenes de las 28 parroquias de Sonsonate se congregaron para alabar a Dios y renovar su compromiso apostólico.',
    content: 'Una jornada de adoración eucarística, testimonios, dinámicas formativas y música sacra animó a la juventud diocesana a no conformarse con la mediocridad y abrazar la santidad con entusiasmo cristiano.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80'
  }
];

export const POPE_SECTION_DATA = {
  title: 'El Santo Padre — Papa León XIV',
  subtitle: 'Vicario de Cristo, Sucesor de Pedro y Pastor Universal de la Iglesia Católica',
  statusBadge: 'Magisterio & Vida de la Iglesia',
  biography: 'El Obispo de Roma ejerce el supremo y pleno ministerio petrino de confirmación en la fe, comunión fraterna y guía pastoral de todo el Pueblo de Dios conforme al mandato de Cristo a San Pedro: «Apacienta mis ovejas» (Jn 21, 17).',
  election: '[Agregar información oficial]',
  teachings: 'Promoción de la centralidad eucarística, defensa de la vida humana y la dignidad de la persona, fomento de la paz mundial y custodia fiel del depósito de la fe católica.',
  officialDocuments: [
    { title: 'Encíclica sobre el Sagrado Corazón de Jesús y la Reconciliación', category: 'Carta Encíclica', summary: 'Llamado a volver al Corazón de Cristo en un mundo herido por el egoísmo.' },
    { title: 'Exhortación Apostólica a los Jóvenes Cristianos', category: 'Exhortación Apostólica', summary: 'Orientaciones pastorales para discernir la vocación con valentía.' },
    { title: 'Mensaje Urgente para la Paz entre las Naciones', category: 'Mensaje Pontificio', summary: 'Oración incesante por el cese de los conflictos armados y el diálogo fraterno.' }
  ],
  prayerForPope: 'Oh Dios, Pastor y guía de todos los creyentes, mira con benevolencia a tu siervo el Papa, a quien has puesto al frente de tu Iglesia; concédele la gracia de edificar con la palabra y con el ejemplo a aquellos a quienes preside, para que llegue a la vida eterna junto con el rebaño que le ha sido confiado. Por Jesucristo Nuestro Señor. Amén.'
};

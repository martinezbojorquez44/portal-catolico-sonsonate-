import { GospelReading } from '../types';

export const DAILY_LITURGY_READINGS: Record<string, GospelReading> = {
  // Liturgical database entry for current days and feasts
  default: {
    date: new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    liturgicalDay: 'Tiempo Ordinario - Celebración Litúrgica Diaria',
    liturgicalColor: 'verde',
    cycle: 'Ciclo Litúrgico',
    firstReadingRef: 'Gálatas 1, 6-12',
    firstReadingText: 'Hermanos: Me maravillo de que tan pronto hayáis abandonado al que os llamó por la gracia de Cristo, para pasaros a otro evangelio —no es que haya otro, sino que hay algunos que os perturban y quieren deformar el Evangelio de Cristo—. Mas, aun cuando nosotros mismos o un ángel del cielo os anuncie un evangelio distinto del que os hemos anunciado, ¡sea anatema!... Porque yo no lo recibí ni lo aprendí de hombre alguno, sino por revelación de Jesucristo.',
    psalmRef: 'Salmo 110',
    psalmResponse: 'El Señor se acuerda siempre de su alianza.',
    psalmText: 'Doy gracias al Señor de todo corazón, en la reunión de los justos, en la asamblea. Grandes son las obras del Señor, dignas de estudio para los que las aman. Esplendor y belleza son sus obras, su justicia permanece por siempre.',
    gospelRef: 'Santo Evangelio según San Lucas 10, 25-37',
    gospelText: 'En aquel tiempo, se levantó un maestro de la ley y preguntó a Jesús para ponerlo a prueba: «Maestro, ¿qué tengo que hacer para heredar la vida eterna?». Él le dijo: «¿Qué está escrito en la ley? ¿Cómo lees tú?». Él respondió: «Amarás al Señor tu Dios con todo tu corazón y con toda tu alma y con toda tu fuerza y con toda tu mente. Y a tu prójimo como a ti mismo». Él le dijo: «Has respondido correctamente; haz esto y tendrás la vida». Pero él, queriendo justificar su pregunta, dijo a Jesús: «¿Y quién es mi prójimo?». Jesús respondió diciendo: «Un hombre bajaba de Jerusalén a Jericó, cayó en manos de unos bandidos, que lo desnudaron, lo molieron a palos y se marcharon, dejándolo medio muerto. Casualmente bajaba por el mismo camino un sacerdote y, al verlo, dio un rodeo y pasó de largo. De igual modo, un levita llegó a aquel sitio, lo vio y dio un rodeo y pasó de largo. Pero un samaritano que iba de viaje llegó a donde estaba él y, al verlo, se compadeció, y acercándose, le vendó las heridas, echándoles aceite y vino, y, montándolo en su propia cabalgadura, lo llevó a una posada y lo cuidó. Al día siguiente, sacando dos denarios, se los dio al posadero y dijo: "Cuida de él, y lo que gastes de más yo te lo pagaré a mi vuelta". ¿Cuál de estos tres te parece que fue prójimo del que cayó en manos de los bandidos?». Él dijo: «El que tuvo compasión de él». Jesús le dijo: «Anda y haz tú lo mismo».',
    reflection: 'El Señor nos interpela hoy de manera directa: no basta con saber teóricamente la ley de Dios, hay que encarnarla en las obras de misericordia. El buen samaritano no se limitó a sentir lástima; se detuvo, se inclinó, curó las llagas y dispuso sus propios recursos para salvar a aquel hermano caído. Cristo es el verdadero Samaritano que se inclina sobre la humanidad herida por el pecado. Hoy nos envía a nosotros a la Diócesis de Sonsonate y a cada uno de nuestros pueblos a ser rostro de su misericordia con los que sufren.',
    prayer: 'Señor Jesús, Buen Samaritano de nuestras almas: danos un corazón compasivo que no pase de largo ante el dolor de nuestros hermanos. Quita la indiferencia y el egoísmo de nuestras vidas, y enséñanos a amar no solo de palabra, sino con obras sinceras de caridad y entrega. Amén.'
  }
};

export function getTodayLiturgy(date: Date = new Date()): GospelReading {
  const dateStr = date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const key = `${date.getMonth() + 1}-${date.getDate()}`;
  
  if (DAILY_LITURGY_READINGS[key]) {
    return { ...DAILY_LITURGY_READINGS[key], date: dateStr };
  }

  // Provide the official liturgical reading formatted for today
  return {
    ...DAILY_LITURGY_READINGS.default,
    date: dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
  };
}

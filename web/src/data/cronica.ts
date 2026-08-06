/**
 * Los 1176 años de Lutum, en línea recta.
 *
 * Cada escena aporta su propio cielo. Los colores se interpolan de una a la
 * siguiente mientras avanzas, así que el paso del tiempo se ve antes de
 * leerlo: el mundo empieza rosa amanecer y acaba negro.
 */

export interface Escena {
  anio: string;
  titulo: string;
  /** Nombre del PNG en public/assets/historia/. */
  cuadro: string;
  /** Cielo: [arriba, abajo]. */
  cielo: [string, string];
  /** Suelo: [lejos, cerca]. */
  suelo: [string, string];
  texto: string[];
  etiquetas: string[];
  /** Los huecos del vault se marcan, no se esconden. */
  pendiente?: boolean;
}

export const ESCENAS: Escena[] = [
  {
    anio: '0', titulo: 'La Creación Primordial', cuadro: 'a0',
    cielo: ['#2A1030', '#E88AA8'], suelo: ['#8E4A66', '#B4557A'],
    texto: [
      'En un cosmos vacío, Cladis encuentra un planeta plano y en blanco. Con un gesto levanta montañas, traza ríos y hace brotar bosques.',
      'Apenas hay vida: plantas y algunos animales. Al despertar el primer ser con alma aparece <b>Egon</b>; al tocar el primer rayo de sol la superficie, nace <b>Lunaris</b>.',
    ],
    etiquetas: ['LUTUM = BARRO', 'NACEN LAS TRES SUPERIORES'],
  },
  {
    anio: '138', titulo: 'La Cosecha de Mundos', cuadro: 'a138',
    cielo: ['#3A1440', '#F0A8C0'], suelo: ['#7A4460', '#A8547A'],
    texto: [
      'Impaciente con la lentitud de la evolución, Cladis viaja a mundos más avanzados y <b>selecciona especies</b>: humanos, animales exóticos, plantas.',
      'Entre el botín trae un instrumento musical. Nunca había oído música. Al intentar tocarlo, un cabello suyo se enreda en las cuerdas y nace <b>Armonia</b>.',
    ],
    etiquetas: ['ESPECIES IMPORTADAS', 'PRIMER ACCIDENTE DIVINO'],
  },
  {
    anio: '367', titulo: 'El Incidente de las Caídas', cuadro: 'a367',
    cielo: ['#4A1030', '#E8622E'], suelo: ['#5E2A3E', '#8E3A56'],
    texto: [
      'Cladis construye un parque de atracciones flotante para hacer felices a los humanos, <i>como quien regala un juguete a una mascota</i>. Se divierte tanto añadiendo cosas que no calcula los refuerzos.',
      'Un día de viento, el Parque de las Nubes cae sobre la multitud. Ella rechaza la idea misma de la muerte y repuebla el mundo con constructos: <b>todos los humanos llevan hoy una parte de constructo dentro</b>.',
    ],
    etiquetas: ['NECRÓPOLIS', 'NACE LITT', 'HUMANOS = CONSTRUCTOS'],
  },
  {
    anio: '372', titulo: 'Entrada incompleta', cuadro: 'a372', pendiente: true,
    cielo: ['#140A1C', '#3A2044'], suelo: ['#241428', '#3A2038'],
    texto: [
      'En el archivo existe una lámina fechada cinco años después. Su título empieza y se corta: <b>«AÑO 372 — El»</b>. Nada más. Cero bytes.',
      'En un mundo cuya diosa abandona todo lo que empieza, <i>un documento inacabado no es un fallo del archivo: es coherencia temática</i>.',
    ],
    etiquetas: ['0 BYTES', 'SE PUBLICA VACÍO'],
  },
  {
    anio: '501', titulo: 'La Vigilia Divina', cuadro: 'a501',
    cielo: ['#3A1408', '#F0B25A'], suelo: ['#6B3A2E', '#8E5442'],
    texto: [
      'Un grupo de humanos empieza a desmontar una de sus construcciones. Cladis pasa de la incredulidad a una furia primordial y <b>se arranca uno de sus propios ojos</b>.',
      'De ahí sale <b>Vigilis</b>: un globo ocular gigante que vigila desde el cielo y lanza fuego espiritual a quien daña una estructura. No juzga intenciones.',
    ],
    etiquetas: ['NACE VIGILIS', 'LA OBRA VALE MÁS QUE LA GENTE'],
  },
  {
    anio: '612', titulo: 'El surgimiento de Arbo', cuadro: 'a612',
    cielo: ['#1E3A28', '#C9E8A8'], suelo: ['#2E5E38', '#4E8E4A'],
    texto: [
      'Una astilla se le clava en el dedo mientras esculpe montañas. Al retirarla, la chispa que sale con la sangre cobra vida.',
      '<b>Arbo</b> repara exactamente lo que su creadora rompe. Con el tiempo se convierte en su consejero: una figura casi paternal que le recuerda que <i>el equilibrio también es arquitectura</i>.',
    ],
    etiquetas: ['NACE ARBO', 'BOSQUES NUEVOS'],
  },
  {
    anio: '708', titulo: 'El Lamento de las Aguas', cuadro: 'a708',
    cielo: ['#141A44', '#7AC9E8'], suelo: ['#1E3A5E', '#2E6B96'],
    texto: [
      'Cladis regala un castillo a <b>Aric</b>, artista mortal y amigo. Un andamio cede mientras él trabaja en lo alto de una torre.',
      'Una lágrima llega al océano y se hace perla; la perla, delfín; el delfín, diosa: <b>Lydara</b>. Pero su rostro recuerda tanto al de Aric que Cladis <i>evita su compañía desde entonces</i>.',
    ],
    etiquetas: ['MUERE ARIC', 'NACE LYDARA', 'CASTILLO VACÍO'],
  },
  {
    anio: '738', titulo: 'La Orden de los Constructores', cuadro: 'a738',
    cielo: ['#3A2A0E', '#F7E3B0'], suelo: ['#6B5432', '#96784A'],
    texto: [
      'En Arténica, un grupo selecto de humanos funda la Orden. Criterios de admisión brutales: sólo habilidad sobresaliente y devoción inquebrantable.',
      'Es la primera vez que los mortales <b>organizan</b> lo que la diosa hace por impulso. La primera institución de Lutum es, en el fondo, un intento de ponerle plazos al capricho.',
    ],
    etiquetas: ['ARTÉNICA', 'PRIMERA INSTITUCIÓN'],
  },
  {
    anio: '978', titulo: 'La Guerra de las Tierras Fértiles', cuadro: 'a978',
    cielo: ['#3A0E14', '#E8622E'], suelo: ['#4A2020', '#6B3028'],
    texto: [
      'Décadas de guerra por el valle central. Ciudades arrasadas, campos yermos bajo el fuego.',
      'A Cladis no le importan los muertos: le importa que <b>sus obras estén siendo reducidas a escombros</b>. Crea a los <b>Defensores</b>, gólems de tierra que protegen monumentos. La paz llegó cuando la arquitectura aprendió a defenderse sola.',
    ],
    etiquetas: ['GÓLEMS', 'TRATADOS DE PAZ'],
  },
  {
    anio: '1103', titulo: 'La Academia Arcana', cuadro: 'a1103',
    cielo: ['#0E1440', '#4E5EC9'], suelo: ['#1E2A5E', '#3A4A8E'],
    texto: [
      'Cladis salta al espacio creyendo que llegará al cielo, alcanza órbita y sigue nadando hasta Phaingea. <i>«Necesito llegar a la mancha rosa de allí arriba, creo…»</i>',
      'Zax la guía de vuelta. Ella nunca vuelve a salir. Los estudiosos fundan en <b>Estelaria</b> la Academia Arcana para perpetuar su legado.',
    ],
    etiquetas: ['ESTELARIA', 'ZAX ASCIENDE', 'MIEDO AL VACÍO'],
  },
  {
    anio: '1176', titulo: 'El Cataclismo Oscuro', cuadro: 'a1176',
    cielo: ['#0A0410', '#5E0A2E'], suelo: ['#1A0812', '#2E0E1E'],
    texto: [
      'Cladis intenta crear vida desde cero. El experimento estalla y arrasa una región entera. De ahí salen criaturas aberrantes y energías corruptas.',
      'Para tapar el error <b>crea el Abismo</b> y arroja dentro todo lo fallido, incluido <b>Zarath</b>, hecho a propósito como compañero. <i>Fue hecho para que ella no estuviera sola y acabó gobernando la soledad.</i>',
    ],
    etiquetas: ['EL ABISMO', 'NACE ZARATH', 'ÚLTIMA GRIETA'],
  },
];

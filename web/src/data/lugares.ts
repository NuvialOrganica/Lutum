/**
 * Los lugares de Lutum, colocados sobre el mapa que dibujó Cristina.
 *
 * Las coordenadas son relativas (0 a 1) sobre la imagen del mapa, así que
 * siguen valiendo si algún día se cambia la resolución.
 *
 * El mapa enseña **veintisiete** sitios y el vault sólo describe trece. Los
 * otros catorce se publican igual, marcados: en este mundo los huecos se
 * enseñan, no se tapan.
 */

export interface Lugar {
  slug: string;
  nombre: string;
  sub: string;
  /** Posición sobre el mapa, de 0 a 1. */
  x: number;
  y: number;
  /** Páginas del cuadro de diálogo: [pestaña, texto]. */
  paginas: [string, string][];
  /** Deidad con templo aquí, si la hay. */
  deidad?: string;
  /** Sin entrada propia en el vault. */
  sinEntrada?: boolean;
  /** Algo que no cuadra entre el mapa y el vault. */
  nota?: string;
}

const SIN_LORE: [string, string][] = [
  ['EN EL MAPA', 'Este sitio existe en el mapa del mundo, pero todavía no tiene entrada en el vault.'],
  ['PENDIENTE', 'Cuando Cristina escriba su ficha, aparecerá aquí sin tocar nada más. Mientras tanto se queda a la vista: <i>en Lutum, lo inacabado forma parte del mundo</i>.'],
];

export const LUGARES: Lugar[] = [
  /* ---------------------------------------------- con entrada en el vault */
  {
    slug: 'artenica', nombre: 'Ciudad Arténica', sub: 'La capital de los artesanos',
    x: 0.215, y: 0.755, deidad: 'cladis',
    nota: 'En el mapa aparecen dos etiquetas con este nombre, una junto a Ciudad Autómata y otra aquí. Y el vault la llama «Cladípolis» a mitad de su propia entrada.',
    paginas: [
      ['LUGAR', 'La joya de la corona entre las cuatro ciudades principales, a ambas orillas de un río inmenso. Calles de piedra pulida, esculturas y fuentes.'],
      ['HITOS', '<b>La Gran Forja de Cladis</b>, el Palacio de los Artesanos, la Plaza de la Creatividad y el <b>Puente de los Sueños</b>.'],
      ['PODER', 'Gobierna un consejo de artesanos elegidos por habilidad. Aquí se fundó en 738 la <i>Orden de los Constructores</i>.'],
    ],
  },
  {
    slug: 'neblisco', nombre: 'Ciudad Neblisco', sub: 'La ciudad de los cerrojos',
    x: 0.452, y: 0.720,
    paginas: [
      ['LUGAR', 'Casas amontonadas formando un laberinto de callejones tortuosos bajo niebla perpetua. Puentes colgantes y escaleras retorcidas.'],
      ['GENTE', 'Cada puerta lleva <b>varios candados</b>. Cuando llamas, oyes desde dentro los cerrojos deslizándose uno tras otro.'],
      ['BAJO', 'Debajo están <b>Los Alcantarillados</b> y el Escondrijo de los Pillos. El crimen es constante… pero nadie ve nada, y eso también protege a la víctima.'],
    ],
  },
  {
    slug: 'coralina', nombre: 'Pueblo costero Coralina', sub: 'El templo de Lydara',
    x: 0.360, y: 0.870, deidad: 'lydara',
    paginas: [
      ['LUGAR', 'Pueblo pesquero entre arrecifes. Posada del Marinerito, Taberna del Kraken Rojo, Mercado del Pescador y Academia de Navegación.'],
      ['TEMPLO', 'El Templo de Lydara, lleno de figuras de delfines. Los marineros rezan aquí antes de zarpar: <i>+1 a la próxima salvación</i>.'],
    ],
  },
  {
    slug: 'profundidades', nombre: 'Reino de las Profundidades', sub: 'Coralina sumergida',
    x: 0.300, y: 0.945,
    paginas: [
      ['LUGAR', 'Un reino entero bajo el agua: arcos de coral, plazas de corrientes cambiantes y jardines vivos.'],
      ['COMERCIO', 'Cangrejos que fabrican <b>burbujas de aire respirable</b> (10 mo), esponjas de secado rápido y gafas de visión submarina.'],
      ['DEFENSA', 'La Fortaleza de Aguas Oscuras vigila el borde del reino. Se entra por la Puerta de las Profundidades.'],
    ],
  },
  {
    slug: 'salto', nombre: 'Salto del Ángel', sub: 'El templo oculto de Cladis',
    x: 0.372, y: 0.680, deidad: 'cladis',
    paginas: [
      ['LUGAR', 'Un valle entre montañas con una cascada imponente. Casas con huerto y la posada <b>La Sirena del Salto</b>.'],
      ['SECRETO', 'Detrás del velo de agua, una gruta lleva a un <b>templo tallado en la roca</b>. Es el contrapunto de Arténica: allí Cladis es <i>monumento</i>; aquí es <i>secreto</i>.'],
    ],
  },
  {
    slug: 'bosque-locura', nombre: 'Bosque de la Locura', sub: 'Prado de Flores Estridentes',
    x: 0.632, y: 0.672,
    paginas: [
      ['LUGAR', 'Desde fuera parece hermoso. Dentro, la luz se difumina, el aire pesa y los senderos se retuercen.'],
      ['PELIGRO', 'En el corazón, flores con <b>conciencia propia</b> que usan ilusiones para defenderse, llevando a los incautos a la locura o a la muerte.'],
      ['AVISO', 'Quien busca sus propiedades curativas se enfrenta a un desafío que no es físico: <i>es mental</i>.'],
    ],
  },
  {
    slug: 'verdantia', nombre: 'Ciudad Verdantia', sub: 'El templo de Arbo',
    x: 0.552, y: 0.712, deidad: 'arbo', sinEntrada: true,
    nota: 'El vault la nombra como «Verdantia», templo de Arbo, pero su ficha está vacía. El mapa la llama «Ciudad Verdantia».',
    paginas: SIN_LORE,
  },
  {
    slug: 'sanroque', nombre: 'Pueblo San Roque', sub: 'El templo de Armonia',
    x: 0.478, y: 0.855, deidad: 'armonia', sinEntrada: true,
    nota: 'En el vault sólo hay una línea: «un lugar donde la armonía y la creatividad florecen en cada rincón».',
    paginas: SIN_LORE,
  },
  {
    slug: 'hoyo', nombre: 'El Hoyo', sub: 'La entrada del Abismo',
    x: 0.500, y: 0.612, deidad: 'zarath',
    paginas: [
      ['LUGAR', 'Un pozo sin fondo medido. Creado en 1176 tras el Cataclismo Oscuro.'],
      ['FUNCIÓN', 'Aquí arrojó Cladis todas sus creaciones fallidas y cualquier estructura peligrosa.'],
      ['REY', '<b>Zarath</b> gobierna por descarte. Su templo está en la entrada, <i>mirando hacia arriba</i>.'],
    ],
  },
  {
    slug: 'castillo', nombre: 'Castillo de la Aurora Solitaria', sub: 'Monumento a Aric',
    x: 0.772, y: 0.612,
    paginas: [
      ['LUGAR', 'Un castillo bañado en luz dorada con relieves celestiales. Vacío y silencioso.'],
      ['HISTORIA', 'Cladis se lo regaló a <b>Aric</b>, artista mortal y amigo. Un andamio cedió mientras él trabajaba en lo alto de una torre.'],
      ['ECO', 'De la lágrima que ella derramó nació <b>Lydara</b>. Su rostro recuerda tanto al de Aric que Cladis <i>evita su compañía desde entonces</i>.'],
    ],
  },
  {
    slug: 'necropolis', nombre: 'Antigua Necrópolis', sub: 'Zona de impacto · año 367',
    x: 0.852, y: 0.140,
    paginas: [
      ['LUGAR', 'Donde cayó el Parque de las Nubes. Antes tenía otro nombre; nadie recuerda cuál.'],
      ['HISTORIA', 'Cladis construyó un parque de atracciones flotante <i>sin calcular refuerzos</i>. Cayó sobre la multitud y mató a la mayor parte de la humanidad.'],
      ['LEGADO', 'Ella rechazó la idea de la muerte y repobló el mundo con constructos. <b>Todos los humanos llevan hoy una parte de constructo dentro.</b>'],
    ],
  },
  {
    slug: 'vigilantes', nombre: 'Vigilantes del Abismo', sub: 'El templo de Vigilis',
    x: 0.562, y: 0.545, deidad: 'vigilis',
    paginas: [
      ['LUGAR', 'El templo principal de Vigilis, el ojo que observa desde el cielo.'],
      ['FUNCIÓN', 'Desde aquí se vigila que nadie profane las construcciones de Cladis. Quien daña una estructura recibe una lanza de fuego que sólo le hiere a él.'],
      ['NOTA', 'En el vault sólo aparece mencionado de pasada, como la ubicación de su templo. Da para mucho más.'],
    ],
  },
  {
    slug: 'estiaria', nombre: 'Estiaria', sub: 'A la Ciudad de las Luces',
    x: 0.902, y: 0.922, deidad: 'zax',
    nota: 'El vault llama a la ciudad de las luces «Estelaria»; el mapa pone «Estiaria». O es una errata, o Estiaria es el paso desde el que se llega a Estelaria. Hay que decidirlo.',
    paginas: [
      ['LUGAR', 'Torres hacia cielos estrellados y calles iluminadas por la luz de las constelaciones.'],
      ['COMERCIO', 'Forja de las Estrellas, Mercado de las Galaxias, Librería de los Mundos y un Taller de Astronavegación que <b>repara naves</b>.'],
      ['TEMPLO', 'El Templo de Zax: Jardines Astrales, Biblioteca Celestial y un <b>observatorio</b> con telescopios mágicos. En 1103 se funda aquí la Academia Arcana.'],
    ],
  },

  /* ------------------------------------ en el mapa, todavía no en el vault */
  { slug: 'jardin-mariposas', nombre: 'Jardín de Mariposas Flotante', sub: 'Isla en el aire',
    x: 0.290, y: 0.115, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'pasaje-mariposas', nombre: 'El Pasaje a las Mariposas Elevadas', sub: 'Camino a la isla',
    x: 0.322, y: 0.225, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'explanada-estatuas', nombre: 'La Explanada de las Estatuas', sub: 'Figuras de piedra',
    x: 0.272, y: 0.285, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'bosque-cristal', nombre: 'Bosque de Cristal', sub: 'Al norte de Arténica',
    x: 0.192, y: 0.392, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'ciudad-automata', nombre: 'Ciudad Autómata', sub: 'En la costa oeste',
    x: 0.092, y: 0.625, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'bosque-boletaire', nombre: 'Bosque Boletaire', sub: 'El de las setas',
    x: 0.478, y: 0.412, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'volatortuga', nombre: 'Volatortuga', sub: 'Una ciudad sobre una tortuga',
    x: 0.582, y: 0.312, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'torre-infinita', nombre: 'Torre Infinita', sub: 'En medio del mar',
    x: 0.712, y: 0.462, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'isla-prehistorica', nombre: 'Isla Prehistórica', sub: 'Con dinosaurios',
    x: 0.892, y: 0.382, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'costa-segura', nombre: 'Costa Segura', sub: 'Puerto del este',
    x: 0.912, y: 0.472, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'pueblo-marchito', nombre: 'Pueblo Marchito', sub: 'Junto al castillo',
    x: 0.782, y: 0.722, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'mazmorra-espejo', nombre: 'La Mazmorra del Espejo Roto', sub: 'En los acantilados',
    x: 0.922, y: 0.702, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'capital-magna', nombre: 'Capital Magna', sub: 'La ciudad más grande del mapa',
    x: 0.752, y: 0.802, sinEntrada: true, paginas: SIN_LORE },
  { slug: 'montana-tesoro', nombre: 'Montaña del Tesoro', sub: 'Con una cueva en la base',
    x: 0.652, y: 0.882, sinEntrada: true, paginas: SIN_LORE },
];

export const porSlug = (slug: string): Lugar | undefined =>
  LUGARES.find((l) => l.slug === slug);

export const CON_ENTRADA = LUGARES.filter((l) => !l.sinEntrada).length;

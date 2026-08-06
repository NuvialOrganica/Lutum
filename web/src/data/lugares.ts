/**
 * El mapa recorrible de Lutum.
 *
 * El terreno es una rejilla de caracteres, que es la forma más cómoda de
 * dibujar y de corregir un mundo a mano. Cada carácter es un tipo de casilla
 * y los lugares se colocan encima por coordenadas.
 */

export type Estructura =
  | 'ciudad' | 'torre' | 'templo' | 'castillo' | 'santuario'
  | 'ruina' | 'pozo' | 'puerto';

export interface Lugar {
  slug: string;
  nombre: string;
  sub: string;
  /** Casilla del mapa. */
  x: number;
  y: number;
  estructura: Estructura;
  /** Páginas del cuadro de diálogo: [pestaña, texto]. */
  paginas: [string, string][];
  deidad?: string;
  pendiente?: boolean;
}

/* Terreno. 48 columnas × 32 filas.
   .  hierba        "  hierba alta   :  camino        ~  agua
   ^  montaña       T  bosque        %  bosque oscuro x  vacío
   !  tierra muerta f  niebla        _  arena                    */
export const MAPA: string[] = [
  '^^^^^^^^^^^....TTTTT.........................:::',
  '^^^^^^^^^^.....TTTTT......................::::..',
  '^^^^^^^^........TTT.....................:::.....',
  '^^^^^^..........................""".:::.........',
  '^^^^^...:::::..........""".........::...........',
  '^^^^.::::...::::......""""........::............',
  '^^^..:.........::::....""........::.............',
  '^^...:...........::::..........:::..............',
  '^....:..............::::.....:::................',
  '....::.................:::::::..................',
  '...::.....~~~~~~...................""".........',
  '..::.....~~~~~~~~.................""""".........',
  '..:.....~~~~~~~~~~................""""".........',
  '..:......~~~~~~~~..................""...........',
  '..:.......~~~~~~...........:::::................',
  '..::.......~~~~..........::::...::::............',
  '...::.......~~.........::::........::::.........',
  'ffff::.................::..............::.......',
  'fffff:::..............::................::......',
  'ffffff..::...........::..................::.....',
  'fffff....::.........::.....!!!!!..........::....',
  'ffff......::.......::.....!!!!!!!..........::...',
  '%%%%.......::.....::......!!!!!!!...........::..',
  '%%%%%%......::...::........!!!!!.............::.',
  '%%%%%%%......::.::..............................',
  '%%%%%%........:::...........xxxxx...............',
  '%%%%%..............TTT.....xxxxxxx..............',
  '%%%..............TTTTT.....xxxxxxx.....___~~~~~~',
  '................TTTTT.......xxxxx.....__~~~~~~~~',
  '..............TTTTT..............____~~~~~~~~~~~',
  '...........TTTTT............______~~~~~~~~~~~~~~',
  '........TTTT..........________~~~~~~~~~~~~~~~~~~',
];

/** Colores de cada casilla: base, detalle claro, detalle oscuro. */
export const TERRENO: Record<string, [string, string, string]> = {
  '.': ['#A8496E', '#B85A80', '#8E3A5C'],
  '"': ['#8E3A5C', '#C2648A', '#7A2E4C'],
  ':': ['#E8C88A', '#F5DCA8', '#C9A468'],
  '~': ['#33265C', '#4A3A80', '#241A44'],
  '^': ['#5E4468', '#7E5E88', '#3E2C48'],
  'T': ['#7A2E58', '#9E3C6E', '#561E3E'],
  '%': ['#3E1230', '#5E1C48', '#2A0A20'],
  'x': ['#150A1C', '#2A1236', '#0A040E'],
  '!': ['#4A3A48', '#5E4C5C', '#362834'],
  'f': ['#6E607E', '#8A7C9A', '#584C66'],
  '_': ['#E8C88A', '#F5DCA8', '#C9A468'],
};

/** Casillas que no se pueden pisar. */
export const SOLIDO = '^~x';

export const LUGARES: Lugar[] = [
  {
    slug: 'salto', nombre: 'Pueblo Salto del Ángel', sub: 'El templo oculto de Cladis',
    x: 5, y: 6, estructura: 'templo', deidad: 'cladis',
    paginas: [
      ['LUGAR', 'Un valle entre montañas con una cascada imponente. Casas con huerto, puestos de verdura y pescado del río, y la posada <b>La Sirena del Salto</b>.'],
      ['SECRETO', 'Detrás del velo de agua, una gruta lleva a un <b>templo tallado en la roca</b> con relieves de creación y artesanía. Es el contrapunto de Arténica: allí Cladis es <i>monumento</i>; aquí es <i>secreto</i>.'],
    ],
  },
  {
    slug: 'artenica', nombre: 'Ciudad Arténica', sub: 'La capital de los artesanos',
    x: 8, y: 13, estructura: 'ciudad', deidad: 'cladis',
    paginas: [
      ['LUGAR', 'La joya de la corona entre las cuatro ciudades principales, a ambas orillas de un río inmenso. Calles de piedra pulida, esculturas y fuentes.'],
      ['HITOS', '<b>La Gran Forja de Cladis</b>, el Palacio de los Artesanos, la Plaza de la Creatividad y el <b>Puente de los Sueños</b>.'],
      ['PODER', 'Gobierna un consejo de artesanos elegidos por habilidad. Aquí se fundó en 738 la <i>Orden de los Constructores</i>.'],
    ],
  },
  {
    slug: 'sanroque', nombre: 'El pueblo de San Roque', sub: 'El templo de Armonia',
    x: 33, y: 4, estructura: 'santuario', deidad: 'armonia', pendiente: true,
    paginas: [
      ['LUGAR', 'Un lugar donde la armonía y la creatividad florecen en cada rincón.'],
      ['NOTA', 'El vault sólo guarda una línea sobre él. Esta web lo enseña marcado como <i>entrada por escribir</i>, no lo esconde.'],
    ],
  },
  {
    slug: 'estelaria', nombre: 'Estelaria', sub: 'La ciudad de las luces',
    x: 38, y: 11, estructura: 'torre', deidad: 'zax',
    paginas: [
      ['LUGAR', 'Torres hacia cielos estrellados y calles iluminadas por la luz de las constelaciones.'],
      ['COMERCIO', 'Forja de las Estrellas, Mercado de las Galaxias, Librería de los Mundos y un Taller de Astronavegación que <b>repara naves</b>.'],
      ['TEMPLO', 'El Templo de Zax: Jardines Astrales, Biblioteca Celestial y un <b>observatorio</b> con telescopios mágicos. En 1103 se funda aquí la Academia Arcana.'],
    ],
  },
  {
    slug: 'castillo', nombre: 'Castillo de la Aurora Solitaria', sub: 'Monumento a Aric',
    x: 44, y: 2, estructura: 'castillo',
    paginas: [
      ['LUGAR', 'Un castillo bañado en luz dorada con relieves celestiales. Vacío y silencioso.'],
      ['HISTORIA', 'Cladis se lo regaló a <b>Aric</b>, artista mortal y amigo. Un andamio cedió mientras él trabajaba en lo alto de una torre.'],
      ['ECO', 'De la lágrima que ella derramó nació <b>Lydara</b>. Su rostro recuerda tanto al de Aric que Cladis <i>evita su compañía desde entonces</i>.'],
    ],
  },
  {
    slug: 'neblisco', nombre: 'Ciudad Neblisco', sub: 'La ciudad de los cerrojos',
    x: 2, y: 19, estructura: 'ciudad',
    paginas: [
      ['LUGAR', 'Casas amontonadas formando un laberinto de callejones tortuosos bajo niebla perpetua. Puentes colgantes y escaleras retorcidas.'],
      ['GENTE', 'Cada puerta lleva <b>varios candados</b>. Cuando llamas, oyes desde dentro los cerrojos deslizándose uno tras otro.'],
      ['BAJO', 'Debajo están <b>Los Alcantarillados</b> y el Escondrijo de los Pillos. El crimen es constante… pero nadie ve nada, y eso también protege a la víctima.'],
    ],
  },
  {
    slug: 'bosque', nombre: 'El Bosque de la Locura', sub: 'Prado de Flores Estridentes',
    x: 3, y: 23, estructura: 'ruina',
    paginas: [
      ['LUGAR', 'Desde fuera parece hermoso. Dentro, la luz se difumina, el aire pesa y los senderos se retuercen.'],
      ['PELIGRO', 'Formas fantasmales, voces al oído, imágenes distorsionadas. En el corazón, flores con <b>conciencia propia</b> que usan ilusiones para defenderse.'],
      ['AVISO', 'Quien busca sus propiedades curativas se enfrenta a un desafío que no es físico: <i>es mental</i>.'],
    ],
  },
  {
    slug: 'verdantia', nombre: 'Verdantia', sub: 'El templo de Arbo',
    x: 19, y: 27, estructura: 'santuario', deidad: 'arbo', pendiente: true,
    paginas: [
      ['LUGAR', 'El templo principal de Arbo, el Espíritu de la Naturaleza.'],
      ['NOTA', 'Otra entrada que en el vault sólo existe como nombre. <i>Pendiente de escribir.</i>'],
    ],
  },
  {
    slug: 'necropolis', nombre: 'Necrópolis', sub: 'Zona de impacto · año 367',
    x: 29, y: 21, estructura: 'ruina',
    paginas: [
      ['LUGAR', 'Tierra muerta donde cayó el Parque de las Nubes.'],
      ['HISTORIA', 'Cladis construyó un parque de atracciones flotante <i>sin calcular refuerzos</i>. Cayó sobre la multitud y mató a la mayor parte de la humanidad.'],
      ['LEGADO', 'Ella rechazó la idea de la muerte y repobló el mundo con constructos. <b>Todos los humanos llevan hoy una parte de constructo dentro.</b>'],
    ],
  },
  {
    slug: 'abismo', nombre: 'El Abismo · El Hoyo', sub: 'Vertedero divino',
    x: 28, y: 25, estructura: 'pozo', deidad: 'zarath',
    paginas: [
      ['LUGAR', 'Un pozo sin fondo medido. Creado en 1176 tras el Cataclismo Oscuro.'],
      ['FUNCIÓN', 'Aquí arrojó Cladis todas sus creaciones fallidas y cualquier estructura peligrosa.'],
      ['REY', '<b>Zarath</b> gobierna por descarte. Fue hecho para que ella no estuviera sola… y acabó gobernando la soledad. Su templo está en la entrada, <i>mirando hacia arriba</i>.'],
    ],
  },
  {
    slug: 'coralina', nombre: 'Pueblo Costero Coralina', sub: 'El templo de Lydara',
    x: 39, y: 28, estructura: 'puerto', deidad: 'lydara',
    paginas: [
      ['LUGAR', 'Pueblo pesquero entre arrecifes. Posada del Marinerito, Taberna del Kraken Rojo, Mercado del Pescador.'],
      ['TEMPLO', 'El Templo de Lydara, lleno de figuras de delfines. Los marineros rezan aquí antes de zarpar: <i>+1 a la próxima salvación</i>.'],
      ['ABAJO', 'Cruzando la Puerta de las Profundidades: el Barrio de los Sopladores de Burbujas, la Ciudad de las Esponjas y la Fortaleza de Aguas Oscuras.'],
    ],
  },
  {
    slug: 'profundidades', nombre: 'Reino de las Profundidades', sub: 'Coralina sumergida',
    x: 37, y: 29, estructura: 'puerto',
    paginas: [
      ['LUGAR', 'Un reino entero bajo el agua: arcos de coral, plazas de corrientes cambiantes y jardines vivos.'],
      ['COMERCIO', 'Cangrejos que fabrican <b>burbujas de aire respirable</b> (10 mo), esponjas de secado rápido y gafas de visión submarina.'],
    ],
  },
];

export const porSlug = (slug: string): Lugar | undefined =>
  LUGARES.find((l) => l.slug === slug);

/**
 * Los datos de la portada.
 *
 * Esto es lo único que NO sale del vault: es el análisis del mundo, escrito
 * a partir de leer las 36 notas seguidas. El resto del contenido de la web
 * vendrá de src/content/.
 */

export interface Eje {
  n: string;
  titulo: string;
  texto: string;
}

/** Los seis ejes temáticos que sostienen el mundo. */
export const EJES: Eje[] = [
  {
    n: '01',
    titulo: 'La creación es un daño colateral',
    texto:
      'Cladis no crea dioses: <b>los pierde</b>. Un cabello en unas cuerdas, una lágrima que cae al mar, ' +
      'saliva sobre una moneda, una astilla, un ojo arrancado. Nueve de las trece deidades son residuos ' +
      'de otra cosa que estaba haciendo.',
  },
  {
    n: '02',
    titulo: 'El panteón es un servicio técnico',
    texto:
      'Arbo repara ecosistemas que ella arrasó. Litt consuela a los supervivientes de una obra suya. ' +
      'Vigilis protege lo que ella construyó. <b>Media religión de Lutum existe para tapar los errores ' +
      'de la otra media.</b>',
  },
  {
    n: '03',
    titulo: 'Lo inacabado es la estética oficial',
    texto:
      'El planeta está lleno de construcciones enormes que no llegó a terminar. Hasta el archivo lo copia: ' +
      'la entrada del <b>año 372</b> existe, tiene el título cortado a media palabra y pesa <b>cero bytes</b>. ' +
      'Ese hueco no es un fallo. Es el mundo funcionando como debe.',
  },
  {
    n: '04',
    titulo: 'Rechazo, abandono y culpa',
    texto:
      'Zarath fue creado para que ella no estuviera sola y acabó encerrado. Lydara nació de un duelo y su ' +
      'cara le recuerda al muerto, así que la evita. <b>La emoción dominante del mundo no es el miedo: ' +
      'es la vergüenza.</b>',
  },
  {
    n: '05',
    titulo: 'La humanidad está restaurada',
    texto:
      'Traída de otro planeta en el 138, casi extinguida en el 367, remontada con constructos. ' +
      '<b>Todos los humanos llevan una parte artificial dentro y nadie sabe cuánta.</b>',
  },
  {
    n: '06',
    titulo: 'El entretenimiento salva el universo',
    texto:
      'Armonia hace arte verdadero; Miraxis, arte falso. Sus sacerdotes creen que entre los dos mantienen ' +
      'entretenida a Cladis <b>lo justo para que no decida rehacerlo todo desde cero</b>.',
  },
];

export interface Receta {
  deidad: string;
  sentimiento: string;
  objeto: string;
  parte: string;
  anio: string;
}

/** El patrón más fuerte del lore: sentimiento + objeto + un trozo de Cladis. */
export const RECETA: Receta[] = [
  { deidad: 'Armonia', sentimiento: 'Curiosidad',  objeto: 'Un instrumento antiguo',   parte: 'Un cabello',              anio: '138' },
  { deidad: 'Litt',    sentimiento: 'Compasión',   objeto: 'La luna',                  parte: '— lo crea Lunaris',       anio: '367' },
  { deidad: 'Vigilis', sentimiento: 'Ira',         objeto: 'Una estructura profanada', parte: 'Un ojo arrancado',        anio: '501' },
  { deidad: 'Arbo',    sentimiento: 'Descuido',    objeto: 'Una astilla de árbol',     parte: 'Sangre',                  anio: '612' },
  { deidad: 'Lydara',  sentimiento: 'Duelo',       objeto: 'El océano',                parte: 'Una lágrima',             anio: '708' },
  { deidad: 'Zax',     sentimiento: 'Gratitud',    objeto: 'Un mapa estelar',          parte: '— era mortal',            anio: '1103' },
  { deidad: 'Zarath',  sentimiento: 'Soledad',     objeto: 'El vacío del Abismo',      parte: 'Un fragmento de esencia', anio: '1176' },
  { deidad: 'Miraxis', sentimiento: 'Aburrimiento', objeto: 'Un espejo pulido',        parte: 'Un cabello plateado',     anio: '—' },
  { deidad: 'Valther', sentimiento: 'Orgullo',     objeto: 'Una moneda de oro',        parte: 'Saliva',                  anio: '—' },
];

export interface Portal {
  id: string;
  nombre: string;
  lema: string;
  destino: string;
  sprite: string | null;
  /** Cuando no hay ilustración todavía, se dibuja el marcador provisional. */
  provisional?: boolean;
}

/** La estantería de Cladis: la navegación son objetos, no un menú. */
export const PORTALES: Portal[] = [
  {
    id: 'panteon',
    nombre: 'El Panteón',
    lema: 'Trece dioses girando alrededor de su madre',
    destino: 'panteon',
    sprite: 'assets/objetos/martillo.png',
  },
  {
    id: 'codice',
    nombre: 'El Códice',
    lema: 'Todo el mundo como un cielo de constelaciones',
    destino: 'codice',
    sprite: 'assets/objetos/telescopio.png',
  },
  {
    id: 'cronica',
    nombre: 'La Crónica',
    lema: 'Mil ciento setenta y seis años en línea recta',
    destino: 'cronica',
    sprite: 'assets/objetos/reloj.png',
    provisional: true,
  },
  {
    id: 'lugares',
    nombre: 'Los Lugares',
    lema: 'Doce sitios que puedes recorrer a pie',
    destino: 'lugares',
    sprite: 'assets/objetos/pergamino.png',
  },
];

export const CIFRAS = [
  { n: '13', que: 'deidades' },
  { n: '11', que: 'hechos clave' },
  { n: '12', que: 'lugares' },
  { n: '04', que: 'entradas vacías, a propósito' },
];

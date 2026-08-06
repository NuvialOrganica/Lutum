import type { NombrePaleta } from './sprites';

/**
 * Las trece deidades de Lutum.
 *
 * De momento viven aquí como datos escritos a mano. Cuando se haga la fase 0
 * pasarán a `src/content/deidades/*.md` con esquema Zod, y este fichero se
 * borra: la forma de los campos ya está pensada para esa migración.
 */

export interface Origen {
  /** Lo que sentía Cladis en ese momento. */
  sentimiento: string;
  /** Con qué estaba trasteando. */
  objeto: string;
  /** Qué trozo suyo se dejó por el camino. */
  parte: string;
  /** Nombre de sprite para cada uno, y con qué paleta pintarlo. */
  iconos: [string, NombrePaleta][];
}

export interface Deidad {
  slug: string;
  nombre: string;
  /** El apodo que sale al pasar el ratón. */
  titulo: string;
  seccion: 'superiores' | 'accidente' | 'otros';
  /** Dónde se coloca en la rueda, en grados. */
  angulo: number;
  /** 1 = anillo interior (las tres superiores), 2 = exterior. */
  anillo: 1 | 2;
  anio: number | null;
  anioTexto: string;
  alineamiento: string;
  dominios: string;
  arma: string;
  simbolo: string;
  templo?: string;
  paleta: NombrePaleta;
  /** poder · caos · culto · huella, de 0 a 10 */
  stats: [number, number, number, number];
  origen: Origen;
  cronica: string[];
  vinculos: string[];
  /** Frase corta de La Relatora, para el pie de la ficha. */
  susurro: string;
}

export const ETIQUETAS_STATS = ['PODER', 'CAOS', 'CULTO', 'HUELLA'] as const;

export const SECCIONES: Record<Deidad['seccion'], string> = {
  superiores: 'LAS TRES SUPERIORES',
  accidente: 'NACIDOS POR ACCIDENTE',
  otros: 'OTROS ORÍGENES',
};

export const DEIDADES: Deidad[] = [
  {
    slug: 'cladis', nombre: 'Cladis', titulo: 'La Caprichosa Diosa de la Artesanía y la Arquitectura',
    seccion: 'superiores', angulo: 0, anillo: 1, anio: 0, anioTexto: 'Año 0',
    alineamiento: 'Neutral', dominios: 'Fuerza · Creación · Artificio',
    arma: 'Martillo de forja', simbolo: 'Un martillo y una espada cruzados sobre un yunque',
    templo: 'Ciudad Arténica', paleta: 'rosa', stats: [10, 9, 8, 10],
    origen: {
      sentimiento: 'Todos', objeto: 'Un planeta vacío', parte: 'Ella entera',
      iconos: [['chispa', 'oro'], ['planeta', 'rosa'], ['figura', 'crema']],
    },
    cronica: [
      'Emergió como una chispa de creatividad en un cosmos vacío y encontró un planeta plano, en blanco. Levantó montañas, trazó ríos, abrazó las costas con mares. Lo llamó <b>Lutum</b>: barro.',
      'Un momento pule un detalle milimétrico y al siguiente abandona la obra entera por aburrimiento. <i>El planeta está lleno de construcciones enormes que nunca terminó.</i>',
      'No predica altruismo ni busca fieles: crea porque le gusta crear. De ella salió casi todo el panteón, y casi siempre <b>por accidente</b>.',
    ],
    vinculos: ['egon', 'lunaris', 'zarath', 'lydara', 'vigilis'],
    susurro: 'De ella salió todo. Casi nada a propósito.',
  },
  {
    slug: 'egon', nombre: 'Egon', titulo: 'El Devorador de Almas',
    seccion: 'superiores', angulo: 210, anillo: 1, anio: 0, anioTexto: 'Año 0',
    alineamiento: 'Neutral Malvado', dominios: 'Muerte · Oscuridad · Inevitable',
    arma: 'Un látigo de sombras', simbolo: 'Una rosa con espinas',
    paleta: 'sangre', stats: [9, 5, 6, 8],
    origen: {
      sentimiento: 'Hambre', objeto: 'La primera alma', parte: '—',
      iconos: [['llama', 'sangre'], ['chispa', 'hueso'], ['nada', 'piedra']],
    },
    cronica: [
      'No fue creado: <b>apareció</b>. En el instante en que el primer ser dotado de alma despertó en Lutum, algo despertó con él al otro lado.',
      'Dominante, impaciente, sádico. No es un dios distante ni frío: se acerca a sus víctimas y disfruta del momento exacto en que comprenden.',
      'Exige sumisión absoluta y castiga con humillación… aunque muestra una faceta casi tierna con quien se arrodilla y se arrepiente de verdad. Con Zarath hay una historia que ninguno de los dos cuenta.',
    ],
    vinculos: ['cladis', 'lunaris', 'zarath'],
    susurro: 'No llegó. Apareció, en cuanto hubo algo que perder.',
  },
  {
    slug: 'lunaris', nombre: 'Lunaris', titulo: 'El Juez Lunar de los Ciclos',
    seccion: 'superiores', angulo: 330, anillo: 1, anio: 0, anioTexto: 'Año 0',
    alineamiento: 'Neutral Verdadero', dominios: 'Reencarnación · Purga de almas · Memoria rota',
    arma: 'Hoz de luz negra lunar', simbolo: 'Un disco lunar de fases superpuestas',
    paleta: 'hueso', stats: [9, 6, 4, 9],
    origen: {
      sentimiento: 'Indiferencia', objeto: 'El primer rayo de sol', parte: '—',
      iconos: [['reloj', 'hueso'], ['chispa', 'oro'], ['nada', 'piedra']],
    },
    cronica: [
      'Cuello demasiado largo, piel apagada como la luna sin luz directa, cabello negro que cae sin moverse. Su cabeza gira lentamente, sin huesos que la limiten, mientras te observa.',
      'En su rostro las fases <i>no se suceden: se superponen y compiten</i>. Nueva, creciente, llena y menguante decidiendo a la vez.',
      'No guía almas: las <b>evalúa</b>. El veredicto sólo tiene dos salidas y ninguna es un castigo. Sólo función.',
    ],
    vinculos: ['cladis', 'egon', 'litt'],
    susurro: 'No guía almas. Las evalúa. Es peor.',
  },

  {
    slug: 'armonia', nombre: 'Armonia', titulo: 'El Divino Melodista',
    seccion: 'accidente', angulo: 20, anillo: 2, anio: 138, anioTexto: 'Año 138',
    alineamiento: 'Neutral Bueno', dominios: 'Arte · Música · Belleza · Creatividad',
    arma: 'Una lira dorada', simbolo: 'Una lira entrelazada con una paleta y una rosa',
    templo: 'El pueblo de San Roque', paleta: 'violeta', stats: [5, 3, 7, 5],
    origen: {
      sentimiento: 'Curiosidad', objeto: 'Un instrumento antiguo', parte: 'Un cabello',
      iconos: [['interrogante', 'oro'], ['armonia', 'violeta'], ['cabello', 'crema']],
    },
    cronica: [
      'La <b>primera deidad creada por accidente</b>. Cladis, que jamás había oído música, intentó tocar un instrumento traído de su cosecha de mundos. Un cabello suyo quedó enredado en las cuerdas y aprendió a sonar solo.',
      'Figura etérea y andrógina, de cabellos multicolor que flotan sin viento. Su voz calma las mentes más turbulentas y enciende los corazones apagados. Narcisista y apasionado, pero jamás cruel.',
      'Con Miraxis mantiene la amistad más pura y caótica del panteón: <i>«Si Armonía compone la canción, Miraxis inventa el escenario.»</i>',
    ],
    vinculos: ['cladis', 'miraxis'],
    susurro: 'Un cabello enredado en unas cuerdas. Eso es todo lo que hizo falta.',
  },
  {
    slug: 'litt', nombre: 'Litt', titulo: 'El Mensajero de la Tranquilidad',
    seccion: 'accidente', angulo: 60, anillo: 2, anio: 367, anioTexto: 'Año 367',
    alineamiento: 'Neutral Bueno', dominios: 'Luz · Bienestar · Protección',
    arma: 'Ninguna', simbolo: 'Una llama envuelta en un aura suave',
    templo: 'Estelaria', paleta: 'oro', stats: [4, 1, 8, 6],
    origen: {
      sentimiento: 'Compasión', objeto: 'La luna', parte: '— lo crea Lunaris',
      iconos: [['corazon', 'rosa'], ['lunaris', 'hueso'], ['nada', 'piedra']],
    },
    cronica: [
      'El único dios que <b>no salió de Cladis</b>. Lo hizo Lunaris, la noche siguiente a la caída del Parque de las Nubes, para atender a los pocos humanos que quedaron.',
      'Tiene forma de niño: ojos azules, cabellos dorados, ropas blancas. Es la personificación del hogar.',
      'Recorre los rincones más desolados de Lutum reparando, en silencio, los destrozos que causan los otros dioses. Los teólogos lo llaman «el vendaje del panteón» y nunca lo ha desmentido.',
    ],
    vinculos: ['lunaris', 'cladis'],
    susurro: 'Nació para limpiar lo que ella hizo.',
  },
  {
    slug: 'vigilis', nombre: 'Vigilis', titulo: 'El Dios de la Observación',
    seccion: 'accidente', angulo: 100, anillo: 2, anio: 501, anioTexto: 'Año 501',
    alineamiento: 'Legal Neutral', dominios: 'Protección · Justicia · Vigilancia',
    arma: 'Una lanza de fuego espiritual', simbolo: 'Un ojo resplandeciente rodeado de llamas',
    templo: 'Vigilantes del Abismo', paleta: 'oro', stats: [7, 1, 5, 6],
    origen: {
      sentimiento: 'Ira', objeto: 'Una estructura profanada', parte: 'Un ojo arrancado',
      iconos: [['llama', 'sangre'], ['columna', 'piedra'], ['vigilis', 'oro']],
    },
    cronica: [
      'Unos humanos, deslumbrados por sus construcciones, empezaron a desmontar una. Cladis pasó de la incredulidad a una furia primordial y <b>se arrancó uno de sus propios ojos</b>.',
      'Vigilis es literalmente eso: un globo ocular gigante que observa desde la bóveda celeste. Cada vez que un mortal daña una estructura, arroja una lanza de fuego que sólo hiere al culpable.',
      'No juzga intenciones. No admite atenuantes. Es el recordatorio permanente de que en Lutum <b>la arquitectura vale más que sus habitantes</b>.',
    ],
    vinculos: ['cladis'],
    susurro: 'Vigila los edificios. Nunca prometió vigilaros a vosotros.',
  },
  {
    slug: 'arbo', nombre: 'Arbo', titulo: 'El Espíritu de la Naturaleza',
    seccion: 'accidente', angulo: 140, anillo: 2, anio: 612, anioTexto: 'Año 612',
    alineamiento: 'Legal Bueno', dominios: 'Naturaleza · Vida · Sanación',
    arma: 'Ninguna', simbolo: 'Un árbol frondoso de raíces extendidas',
    templo: 'Verdantia', paleta: 'verde', stats: [6, 1, 5, 7],
    origen: {
      sentimiento: 'Descuido', objeto: 'Una astilla de árbol', parte: 'Sangre',
      iconos: [['chispa', 'verde'], ['astilla', 'crema'], ['gota', 'sangre']],
    },
    cronica: [
      'Una astilla se le clavó en el dedo mientras esculpía montañas. Al retirarla, la chispa divina que salió con la sangre cobró vida: diminuta al principio, hoy más alta que un hombre.',
      'Repara exactamente lo que su creadora rompe: ecosistemas arrasados por un exceso de entusiasmo divino. Donde había desolación deja bosques, prados y ríos.',
      'Con el tiempo se volvió consejero de la propia Cladis. Una figura casi paternal que le recuerda que <i>el equilibrio también es arquitectura</i>.',
    ],
    vinculos: ['cladis'],
    susurro: 'El único hijo que le dice que pare.',
  },
  {
    slug: 'lydara', nombre: 'Lydara', titulo: 'La Dama de las Aguas',
    seccion: 'accidente', angulo: 180, anillo: 2, anio: 708, anioTexto: 'Año 708',
    alineamiento: 'Neutral Bueno', dominios: 'Agua · Vida · Protección',
    arma: 'Escudo largo', simbolo: 'Una perla luminosa sobre una concha azulada',
    templo: 'Pueblo Costero Coralina', paleta: 'agua', stats: [6, 2, 7, 6],
    origen: {
      sentimiento: 'Duelo', objeto: 'El océano', parte: 'Una lágrima',
      iconos: [['gota', 'sombra'], ['olas', 'agua'], ['gota', 'agua']],
    },
    cronica: [
      'Cuando Aric —artista mortal, amigo de una diosa— cayó del andamio de su propia obra maestra, Cladis lloró. Una sola lágrima llegó al océano y se hizo perla; la perla, delfín; el delfín, diosa.',
      'Protege los océanos y a quienes navegan. Aparecer en forma de delfín es su bendición. Sus clérigos —bardos, poetas, cantantes de puerto— median en disputas y calman aguas turbulentas, físicas y metafóricas.',
      '<b>Su rostro recuerda dolorosamente al de Aric.</b> Por eso Cladis, que la creó sin querer, <i>evita su compañía desde entonces</i>.',
    ],
    vinculos: ['cladis'],
    susurro: 'La única diosa a la que su madre no puede mirar a la cara.',
  },
  {
    slug: 'miraxis', nombre: 'Miraxis', titulo: 'La Tejedora de Fantasías',
    seccion: 'accidente', angulo: 260, anillo: 2, anio: null, anioTexto: 'Sin fecha',
    alineamiento: 'Caótico Neutral', dominios: 'Ilusión · Engaño · Sueños · Diversión',
    arma: 'Abanico de espejos', simbolo: 'Un espejo que muestra lo que no está',
    paleta: 'violeta', stats: [5, 8, 6, 4],
    origen: {
      sentimiento: 'Aburrimiento', objeto: 'Un espejo pulido', parte: 'Un cabello plateado',
      iconos: [['reloj', 'violeta'], ['miraxis', 'violeta'], ['cabello', 'hueso']],
    },
    cronica: [
      'Siglos construyendo ciudades, templos y criaturas. Todo empezaba a repetirse. Se miró en un espejo perfecto dejado como ofrenda, intentó imaginar algo nuevo… y no apareció nada.',
      'Suspiró. Un cabello se le quedó enganchado en el marco. El aburrimiento se mezcló con su esencia divina y el cabello atravesó el cristal como si fuera agua. El espejo empezó a mostrar cosas que no estaban allí.',
      'Dogma: <i>«La realidad es aburrida.»</i> Sus clérigos son cuentacuentos, ilusionistas, actores y timadores elegantes. En muchas ciudades su templo y el de Armonia son <b>el mismo edificio</b>: un teatro.',
    ],
    vinculos: ['cladis', 'armonia'],
    susurro: 'Nació del bostezo de una diosa. Y por eso nadie se aburre desde entonces.',
  },
  {
    slug: 'valther', nombre: 'Valther', titulo: 'Señor de las Manos Doradas',
    seccion: 'accidente', angulo: 300, anillo: 2, anio: null, anioTexto: 'Sin fecha',
    alineamiento: 'Neutral', dominios: 'Comercio · Fortuna · Prosperidad',
    arma: 'Balanza encadenada', simbolo: 'Una moneda mordida',
    paleta: 'oro', stats: [4, 2, 7, 5],
    origen: {
      sentimiento: 'Orgullo', objeto: 'Una moneda de oro', parte: 'Saliva',
      iconos: [['corona', 'oro'], ['valther', 'oro'], ['gota', 'hueso']],
    },
    cronica: [
      'Mordió una moneda de tributo para comprobar si el oro era auténtico. Lo era. Sonrió con orgullo por la belleza de las cosas bien hechas… y se distrajo con otra idea arquitectónica.',
      'Escupió la moneda y la olvidó en el suelo, aún cubierta de saliva divina. Esa noche el oro empezó a latir: se dobló, se estiró, creció, y se levantó vestido de mercader con los dedos brillantes como lingotes.',
      'Dogma: <i>«El valor circula.»</i> Sus clérigos —banqueros, cambistas, tasadores— creen que la riqueza es a la civilización lo que la sangre al cuerpo.',
    ],
    vinculos: ['cladis'],
    susurro: 'Una moneda mordida y olvidada en el suelo. Al amanecer, un dios.',
  },
  {
    slug: 'zarath', nombre: 'Zarath', titulo: 'El Señor del Abismo',
    seccion: 'accidente', angulo: 220, anillo: 2, anio: 1176, anioTexto: 'Año 1176',
    alineamiento: 'Caótico Malvado', dominios: 'Oscuridad · Maldición · Locura',
    arma: 'Pica medieval', simbolo: 'Una esfera oscura envuelta en llamas infernales',
    templo: 'El Hoyo, en la entrada', paleta: 'sombra', stats: [8, 10, 3, 8],
    origen: {
      sentimiento: 'Soledad', objeto: 'El vacío del Abismo', parte: 'Un fragmento de esencia',
      iconos: [['figura', 'sombra'], ['vacio', 'sombra'], ['chispa', 'rosa']],
    },
    cronica: [
      'Cladis quiso compañía y se arrancó un fragmento de su propia esencia divina para fabricarla. Salió perfecto. Obsesivamente perfecto, y ése fue el problema.',
      'Cuando dejó de gustarle lo selló en el Abismo junto al resto de creaciones fallidas del Cataclismo. Se convirtió en su rey por descarte.',
      'Bajo la crueldad hay un dolor sencillo: <b>fue hecho para que ella no estuviera sola y acabó gobernando la soledad</b>.',
    ],
    vinculos: ['cladis', 'egon'],
    susurro: 'Lo hicieron para que ella no estuviera sola. Acabó gobernando la soledad.',
  },

  {
    slug: 'zax', nombre: 'Zax', titulo: 'La Estrella Fugaz',
    seccion: 'otros', angulo: 340, anillo: 2, anio: 1103, anioTexto: 'Año ~1103',
    alineamiento: 'Neutral Bueno', dominios: 'Espacio · Exploración · Conocimiento',
    arma: 'Lanza / Tridente', simbolo: 'Una estrella brillante sobre fondo negro',
    templo: 'Estelaria', paleta: 'agua', stats: [5, 3, 6, 5],
    origen: {
      sentimiento: 'Gratitud', objeto: 'Un mapa estelar', parte: '— era mortal',
      iconos: [['corazon', 'oro'], ['zax', 'agua'], ['nada', 'piedra']],
    },
    cronica: [
      'El único dios que empezó siendo mortal. Cladis saltó del planeta creyendo que llegaría al cielo, alcanzó órbita y siguió «nadando» hasta Phaingea, donde encontró a un mago astrónomo.',
      '<i>«Necesito llegar a la mancha rosa de allí arriba, creo…»</i> Zax la guió de vuelta. Ella nunca volvió a salir: desarrolló un miedo profundo al vacío.',
      'Como él ya no podía regresar a casa, Cladis le construyó un castillo y poco a poco lo divinizó en su cabeza como «el hombre del espacio». Ahora viaja una vez cada muchos años a buscarle caprichos entre las galaxias.',
    ],
    vinculos: ['cladis', 'relatora'],
    susurro: '«Necesito llegar a la mancha rosa de allí arriba, creo…»',
  },
  {
    slug: 'relatora', nombre: 'La Relatora', titulo: 'La que narra el mundo',
    seccion: 'otros', angulo: 80, anillo: 2, anio: null, anioTexto: 'Desconocido',
    alineamiento: 'Neutral', dominios: 'Saber · Conocimiento · Destino · Misterio',
    arma: '—', simbolo: 'Un libro abierto con constelaciones flotando encima',
    paleta: 'violeta', stats: [7, 5, 4, 3],
    origen: {
      sentimiento: 'Curiosidad', objeto: 'Una capa blanca', parte: '— ninguna',
      iconos: [['interrogante', 'violeta'], ['capa', 'hueso'], ['nada', 'piedra']],
    },
    cronica: [
      'Una voz melodiosa que susurra al oído de los aventureros mientras narran sus propias historias. Bajo la capa blanca, su rostro y sus manos son un patrón de estrellas que se reordena según lo que cuenta.',
      'Interviene cuando las historias se vuelven monótonas o predecibles: convoca criaturas aberrantes —manifestaciones de sus relatos— para poner a prueba a quien se ha estancado.',
      '<b>Su secreto:</b> si alguien le arrebata la capa blanca, se vuelve invisible hasta recuperarla. La única deidad de Lutum con una debilidad documentada.',
    ],
    vinculos: ['zax'],
    susurro: 'Yo. Sí: la voz que llevas leyendo todo este rato.',
  },
];

export const porSlug = (slug: string): Deidad | undefined =>
  DEIDADES.find((d) => d.slug === slug);

/** Todos los alineamientos que existen, para el filtro. */
export const ALINEAMIENTOS = [...new Set(DEIDADES.map((d) => d.alineamiento))].sort();

import { DEIDADES } from './deidades';

/**
 * El mundo entero como un cielo: cada entrada es una estrella y cada relación,
 * una línea de constelación.
 *
 * Las trece deidades no se repiten aquí: se leen de `deidades.ts`. Lo que se
 * define en este fichero son los lugares, los hechos y los mortales, más el
 * mapa completo de vínculos.
 */

export type Tipo = 'deidad' | 'lugar' | 'hecho' | 'mortal';

export interface Nodo {
  slug: string;
  nombre: string;
  sub: string;
  tipo: Tipo;
  /** Tamaño de la estrella, de 1 a 3. */
  peso: number;
  datos: [string, string][];
  texto: string[];
  susurro: string;
  /** Los que están en blanco en el vault se marcan, no se esconden. */
  pendiente?: boolean;
}

export const TIPOS: Record<Tipo, { nombre: string; color: string }> = {
  deidad: { nombre: 'Deidades', color: '#E85D97' },
  lugar: { nombre: 'Lugares', color: '#F0B25A' },
  hecho: { nombre: 'Hechos', color: '#F7E3B0' },
  mortal: { nombre: 'Mortales y órdenes', color: '#7AC9E8' },
};

/* ---------------------------------------------------------------- lugares */
const LUGARES: Nodo[] = [
  {
    slug: 'artenica', nombre: 'Ciudad Arténica', sub: 'Capital de los artesanos',
    tipo: 'lugar', peso: 2.4,
    datos: [['Deidad', 'Cladis'], ['Gobierno', 'Consejo de artesanos'],
            ['Hito', 'El Puente de los Sueños'], ['Orden', 'Los Constructores']],
    texto: ['La joya de la corona entre las cuatro ciudades principales, a ambas orillas de un río inmenso. Calles de piedra pulida, esculturas y fuentes.',
            'Alberga <b>La Gran Forja de Cladis</b>, el Palacio de los Artesanos y la Plaza de la Creatividad.',
            'Comerciantes de todo el mundo acuden a sus mercados a por joyas, textiles, cerámica y escultura.'],
    susurro: 'Si Cladis tuviera una casa sería ésta. Y aun así no vive aquí.',
  },
  {
    slug: 'estelaria', nombre: 'Estelaria', sub: 'La ciudad de las luces',
    tipo: 'lugar', peso: 2.2,
    datos: [['Deidad', 'Zax'], ['Institución', 'Academia Arcana'],
            ['Rasgo', 'Torres orientadas al cosmos'], ['Templo', 'Observatorio Estelar']],
    texto: ['Torres hacia cielos estrellados y calles iluminadas por la luz de las constelaciones.',
            'Forja de las Estrellas, Mercado de las Galaxias, Librería de los Mundos y un Taller de Astronavegación que <b>repara naves</b>.',
            'El Templo de Zax incluye Jardines Astrales, Biblioteca Celestial y un observatorio con telescopios mágicos.'],
    susurro: 'Aquí las calles se alumbran con constelaciones. Muy caro y muy poco práctico.',
  },
  {
    slug: 'neblisco', nombre: 'Ciudad Neblisco', sub: 'La ciudad de los cerrojos',
    tipo: 'lugar', peso: 1.8,
    datos: [['Visibilidad', 'Casi nula'], ['Cerrojos por puerta', 'Varios'],
            ['Subnivel', 'Los Alcantarillados'], ['Autoridad', 'Ninguna']],
    texto: ['Casas amontonadas formando un laberinto de callejones tortuosos bajo un manto perpetuo de niebla.',
            'Cada puerta lleva <b>múltiples candados</b>. Cuando llamas oyes desde dentro los cerrojos deslizándose, uno tras otro.',
            'El crimen es constante, pero incluso robar aquí es arriesgado: nadie ve nada, y eso también protege a la víctima.'],
    susurro: 'Llama a una puerta y cuenta los cerrojos. Ése es el censo real.',
  },
  {
    slug: 'coralina', nombre: 'Pueblo Costero Coralina', sub: 'El templo de Lydara',
    tipo: 'lugar', peso: 1.8,
    datos: [['Deidad', 'Lydara'], ['Posada', 'La Posada del Marinerito'],
            ['Taberna', 'El Kraken Rojo'], ['Bendición', '+1 a la próxima salvación']],
    texto: ['Pueblo pesquero rodeado de arrecifes, con Academia de Navegación, Biblioteca Marítima y una Alquimia de las Mareas.',
            'En el Templo de Lydara, lleno de figuras de delfines, los marineros piden protección antes de zarpar.'],
    susurro: 'Huele a sal y a suerte comprada barata.',
  },
  {
    slug: 'profundidades', nombre: 'Reino de las Profundidades', sub: 'Coralina sumergida',
    tipo: 'lugar', peso: 1.6,
    datos: [['Acceso', 'La Puerta de las Profundidades'], ['Barrio', 'Sopladores de Burbujas'],
            ['Ciudad', 'De las Esponjas'], ['Defensa', 'Fortaleza de Aguas Oscuras']],
    texto: ['Bajo el pueblo costero se extiende un reino entero: arcos de coral, plazas de corrientes cambiantes y jardines vivos.',
            'Los cangrejos sopladores fabrican burbujas de aire respirable, esponjas de secado rápido y gafas de visión submarina.'],
    susurro: 'Cangrejos que venden aire. El comercio siempre encuentra el hueco.',
  },
  {
    slug: 'salto', nombre: 'Pueblo Salto del Ángel', sub: 'El templo oculto de Cladis',
    tipo: 'lugar', peso: 1.5,
    datos: [['Acceso', 'Gruta tras la cascada'], ['Posada', 'La Sirena del Salto'],
            ['Economía', 'Huerta y pesca'], ['Templo', 'Tallado en la roca']],
    texto: ['Un valle con una cascada imponente y casas con huerto. Puestos de verdura, pescado del río y una posada cálida.',
            'Tras el velo de agua, una gruta lleva a un templo tallado en la roca con relieves de creación y artesanía.'],
    susurro: 'El templo más hermoso del mundo, escondido detrás de una cortina de agua.',
  },
  {
    slug: 'bosque', nombre: 'El Bosque de la Locura', sub: 'Prado de Flores Estridentes',
    tipo: 'lugar', peso: 1.7,
    datos: [['Riesgo', 'Mental'], ['Fenómeno', 'Ilusiones autónomas'],
            ['Núcleo', 'Prado de Flores Estridentes'], ['Cercano', 'Verdantia']],
    texto: ['Desde fuera parece un bosque hermoso. Dentro, la luz se difumina, el aire pesa y los senderos se retuercen.',
            'En el corazón, flores brillantes con <b>conciencia propia</b> usan ilusiones para defenderse, llevando a los incautos a la locura o a la muerte.'],
    susurro: 'Las flores mienten. No es una figura literaria.',
  },
  {
    slug: 'verdantia', nombre: 'Verdantia', sub: 'El templo de Arbo',
    tipo: 'lugar', peso: 1.1, pendiente: true,
    datos: [['Deidad', 'Arbo'], ['Vecino', 'Bosque de la Locura'],
            ['En el vault', 'Sólo la etiqueta'], ['Estado', 'Por escribir']],
    texto: ['El vault sólo guarda el nombre. Es uno de los huecos que esta web enseña marcado como <i>pendiente</i>, en vez de esconderlo.'],
    susurro: 'Una entrada que aún no existe. También eso forma parte del mundo.',
  },
  {
    slug: 'castillo', nombre: 'Castillo de la Aurora Solitaria', sub: 'Monumento a Aric',
    tipo: 'lugar', peso: 1.6,
    datos: [['Año', '708'], ['Encargo', 'Regalo a un mortal'],
            ['Estado', 'Abandonado'], ['Detalle', 'Andamio sin retirar']],
    texto: ['Un castillo bañado en luz dorada, decorado con relieves celestiales, regalado a un artista mortal.',
            'Tras su muerte quedó vacío y silencioso. Conserva toda su belleza: un recordatorio de la generosidad de Cladis y de lo frágil que es un mortal.'],
    susurro: 'Sigue precioso. Ése es el problema.',
  },
  {
    slug: 'sanroque', nombre: 'El pueblo de San Roque', sub: 'El templo de Armonia',
    tipo: 'lugar', peso: 1.1, pendiente: true,
    datos: [['Deidad', 'Armonia'], ['Rasgo', 'Arte en cada rincón'],
            ['En el vault', 'Sólo la etiqueta'], ['Estado', 'Por escribir']],
    texto: ['Un lugar donde la armonía y la creatividad florecen en cada esquina, según la única línea que existe sobre él.'],
    susurro: 'Aquí la armonía florece. Literalmente: no hay nada más escrito.',
  },
  {
    slug: 'necropolis', nombre: 'Necrópolis', sub: 'La zona de impacto del 367',
    tipo: 'lugar', peso: 1.7,
    datos: [['Año', '367'], ['Antes', 'Zona de recreo'],
            ['Después', 'Cementerio'], ['Causa', 'El Parque de las Nubes']],
    texto: ['El lugar donde cayó el Parque de las Nubes y murió la mayor parte de la humanidad de entonces.'],
    susurro: 'Se llamaba de otra forma. Nadie recuerda cuál.',
  },
  {
    slug: 'abismo', nombre: 'El Abismo · El Hoyo', sub: 'Vertedero divino',
    tipo: 'lugar', peso: 2.0,
    datos: [['Año', '1176'], ['Función', 'Depósito de fallos'],
            ['Rey', 'Zarath'], ['Profundidad', 'No medida']],
    texto: ['Creado tras el Cataclismo Oscuro para arrojar dentro todas las creaciones fallidas y cualquier estructura peligrosa.',
            'El templo de Zarath está en la entrada. No para recibir fieles: <i>para mirar hacia arriba</i>.'],
    susurro: 'Todo lo que le salió mal está aquí abajo. Incluido su hijo.',
  },
];

/* ----------------------------------------------------------------- hechos */
const HECHOS: Nodo[] = [
  {
    slug: 'a0', nombre: 'Año 0', sub: 'La Creación Primordial', tipo: 'hecho', peso: 2.4,
    datos: [['Nacen', 'Cladis, Egon, Lunaris'], ['El mundo', 'Plano y vacío'],
            ['Vida', 'Plantas y algún animal'], ['Nombre', 'Lutum: barro']],
    texto: ['Cladis da forma al planeta. Al despertar el primer ser con alma aparece Egon. Al tocar el primer rayo de sol la superficie, nace Lunaris.'],
    susurro: 'Un día muy productivo: creación, muerte y ciclo, todo en la misma jornada.',
  },
  {
    slug: 'a138', nombre: 'Año 138', sub: 'La Cosecha de Mundos', tipo: 'hecho', peso: 1.8,
    datos: [['Trae', 'Humanos, animales, plantas'], ['Motivo', 'Impaciencia'],
            ['Nace', 'Armonia'], ['Método', 'Selección en otros mundos']],
    texto: ['Impaciente con la lentitud de la evolución, viaja a mundos más avanzados y selecciona especies para poblar Lutum.',
            'Entre el botín viene un instrumento musical. Al intentar tocarlo nace Armonia.'],
    susurro: 'No creó a los humanos. Los trajo. Hay diferencia.',
  },
  {
    slug: 'a367', nombre: 'Año 367', sub: 'El Incidente de las Caídas', tipo: 'hecho', peso: 3,
    datos: [['Obra', 'El Parque de las Nubes'], ['Causa', 'Sin refuerzos'],
            ['Efecto', 'Humanos = constructos'], ['Nace', 'Litt']],
    texto: ['La estructura flotante colapsa sobre la multitud. Cladis, horrorizada, rechaza la idea de la muerte y repuebla el mundo con constructos.',
            '<b>Todos los humanos actuales llevan una parte de constructo dentro.</b>'],
    susurro: 'La grieta más grande del mundo. Y la más silenciada.',
  },
  {
    slug: 'a372', nombre: 'Año 372', sub: 'Entrada incompleta', tipo: 'hecho', peso: 1.3, pendiente: true,
    datos: [['Título', '«El…»'], ['Contenido', '0 bytes'],
            ['Estado', 'Perdido o retirado'], ['Decisión', 'Publicarlo vacío']],
    texto: ['Existe una lámina fechada cinco años después del Incidente cuyo título se corta a media palabra. No hay más.',
            'En un mundo cuya diosa abandona todo lo que empieza, <i>un documento inacabado no es un fallo: es coherencia</i>.'],
    susurro: 'Aquí no hay nada. Y eso, en este mundo, es información.',
  },
  {
    slug: 'a501', nombre: 'Año 501', sub: 'La Vigilia Divina', tipo: 'hecho', peso: 1.7,
    datos: [['Detonante', 'Profanación de una obra'], ['Acto', 'Se arranca un ojo'],
            ['Nace', 'Vigilis'], ['Precedente', 'Las obras son intocables']],
    texto: ['Unos humanos desmontan una estructura divina. Cladis se arranca un ojo y de él surge Vigilis, guardián de las creaciones.'],
    susurro: 'Reaccionó al edificio. No a la gente. Recuérdalo.',
  },
  {
    slug: 'a612', nombre: 'Año 612', sub: 'El surgimiento de Arbo', tipo: 'hecho', peso: 1.6,
    datos: [['Origen', 'Astilla y sangre'], ['Misión', 'Restaurar el equilibrio'],
            ['Efecto', 'Bosques y ríos nuevos'], ['Rol', 'Consejero de Cladis']],
    texto: ['Una astilla se clava en el dedo de la diosa; al retirarla, una chispa cobra vida y empieza a curar los paisajes dañados.'],
    susurro: 'Una herida diminuta produjo al único que le lleva la contraria con cariño.',
  },
  {
    slug: 'a708', nombre: 'Año 708', sub: 'El Lamento de las Aguas', tipo: 'hecho', peso: 1.9,
    datos: [['Muere', 'Aric'], ['Causa', 'Un andamio cede'],
            ['Nace', 'Lydara'], ['Consecuencia', 'El castillo queda vacío']],
    texto: ['Aric cae desde una torre del castillo que ella le regaló. Una lágrima de Cladis llega al océano y se convierte en Lydara.'],
    susurro: 'La primera vez que una diosa entendió lo que significa «frágil».',
  },
  {
    slug: 'a738', nombre: 'Año 738', sub: 'La Orden de los Constructores', tipo: 'hecho', peso: 1.6,
    datos: [['Sede', 'Arténica'], ['Admisión', 'Extremadamente selectiva'],
            ['Legado', 'Palacios y obras públicas'], ['Sentido', 'Ordenar el capricho']],
    texto: ['Un grupo selecto de humanos funda la Orden. Bajo su dirección Arténica florece como centro de innovación arquitectónica.'],
    susurro: 'Los mortales inventaron los plazos de entrega. La diosa nunca los usó.',
  },
  {
    slug: 'a978', nombre: 'Año 978', sub: 'La Guerra de las Tierras Fértiles', tipo: 'hecho', peso: 1.8,
    datos: [['Duración', 'Décadas'], ['Motivo', 'Recursos'],
            ['Intervención', 'Los Defensores'], ['Final', 'Tratados de paz']],
    texto: ['Facciones humanas y razas se enfrentan por el valle central. Cladis, furiosa por ver sus obras en escombros, crea a los Defensores.'],
    susurro: 'La paz llegó cuando los monumentos aprendieron a defenderse solos.',
  },
  {
    slug: 'a1103', nombre: 'Año 1103', sub: 'La Academia Arcana', tipo: 'hecho', peso: 1.7,
    datos: [['Sede', 'Estelaria'], ['Honra a', 'Zax'],
            ['Función', 'Estudio de lo arcano'], ['Alcance', 'Todo Lutum']],
    texto: ['Estudiosos y magos se unen para perpetuar el legado de Zax. La academia se convierte en faro de sabiduría mágica.'],
    susurro: 'Fundaron una universidad para agradecer un viaje de vuelta a casa.',
  },
  {
    slug: 'a1176', nombre: 'Año 1176', sub: 'El Cataclismo Oscuro', tipo: 'hecho', peso: 2.4,
    datos: [['Experimento', 'Crear vida desde cero'], ['Resultado', 'Explosión mágica'],
            ['Crea', 'El Abismo'], ['Nace', 'Zarath']],
    texto: ['El experimento estalla y arrasa una región entera. De ahí salen criaturas aberrantes y energías corruptas.',
            'Para tapar el error crea el Abismo y arroja dentro todo lo fallido, incluido su nuevo compañero.'],
    susurro: 'Quiso hacer vida sin copiarla de nadie. Salió el Abismo.',
  },
];

/* --------------------------------------------------- mortales y compañía */
const MORTALES: Nodo[] = [
  {
    slug: 'humanos', nombre: 'Los humanos', sub: 'Especie importada y restaurada',
    tipo: 'mortal', peso: 2.0,
    datos: [['Origen', 'Otro mundo, año 138'], ['Rotos', 'Año 367'],
            ['Reparados', 'Con constructos'], ['Proporción', 'Desconocida']],
    texto: ['Traídos de otro mundo porque la evolución local iba demasiado lenta. Casi extinguidos en el 367 y rehechos con constructos.',
            'Nadie sabe qué proporción de constructo lleva cada linaje. <i>Nadie ha querido inventar la forma de medirlo.</i>'],
    susurro: 'Material importado, roto una vez y remontado con piezas que no eran suyas.',
  },
  {
    slug: 'aric', nombre: 'Aric', sub: 'Artista mortal', tipo: 'mortal', peso: 1.5,
    datos: [['Oficio', 'Artista'], ['Muere', 'Año 708'],
            ['Legado', 'El castillo'], ['Eco', 'El rostro de Lydara']],
    texto: ['Talentoso y devoto, dedicó su vida a crear belleza en honor a Cladis. Ella le regaló un castillo; él lo llenó de obra propia.',
            'Murió al ceder un andamio mientras trabajaba en su pieza más ambiciosa.'],
    susurro: 'El único mortal al que una diosa llamó amigo. Duró lo que dura un andamio.',
  },
  {
    slug: 'parque', nombre: 'El Parque de las Nubes', sub: 'La obra que mató a un mundo',
    tipo: 'mortal', peso: 1.6,
    datos: [['Atracciones', 'Toboganes, laberinto, teatro'], ['Fallo', 'Sin refuerzos'],
            ['Año', '367'], ['Hoy', 'Necrópolis']],
    texto: ['Toboganes en espiral, puentes colgantes, torres de observación, cascadas de nubes, laberinto de niebla, Teatro de las Estrellas, jardines suspendidos y una cafetería flotante.'],
    susurro: 'Un juguete. Ésa es la palabra exacta que usó ella.',
  },
  {
    slug: 'constructores', nombre: 'Orden de los Constructores', sub: 'Institución de Arténica',
    tipo: 'mortal', peso: 1.3,
    datos: [['Fundación', '738'], ['Sede', 'Arténica'],
            ['Miembros', 'Arquitectos e ingenieros'], ['Divisa', 'Perfección']],
    texto: ['Criterios de admisión estrictos: sólo habilidad sobresaliente y devoción inquebrantable. Su legado se estudia siglos después.'],
    susurro: 'Gente que termina las cosas. En este mundo, eso es casi herejía.',
  },
  {
    slug: 'academia', nombre: 'Academia Arcana', sub: 'Bastión del saber mágico',
    tipo: 'mortal', peso: 1.3,
    datos: [['Fundación', '1103'], ['Sede', 'Estelaria'],
            ['Estudia', 'Astronomía y magia'], ['Estandarte', 'El nombre de Zax']],
    texto: ['Faro de sabiduría dedicado a la investigación y enseñanza de las artes arcanas. Atrae estudiantes de todos los rincones del mundo.'],
    susurro: 'Estudian el cielo desde el único planeta cuya diosa le tiene miedo.',
  },
  {
    slug: 'defensores', nombre: 'Los Defensores', sub: 'Gólems de la tierra',
    tipo: 'mortal', peso: 1.2,
    datos: [['Creación', '978'], ['Material', 'Esencia de la tierra'],
            ['Misión', 'Proteger monumentos'], ['Efecto', 'Forzaron la paz']],
    texto: ['Guardianes silenciosos alzados para hacer frente a cualquiera que profane la grandeza de la arquitectura divina.'],
    susurro: 'Incansables y absolutamente indiferentes a quién gana la guerra.',
  },
  {
    slug: 'phaingea', nombre: 'Phaingea', sub: 'El planeta vecino', tipo: 'mortal', peso: 1.2,
    datos: [['Relación', 'Hogar de Zax'], ['Distancia', 'Un salto imprudente'],
            ['Estado', 'Inalcanzable'], ['Motivo', 'Cladis teme el vacío']],
    texto: ['El mundo del que venía Zax, al que ya no puede regresar. La primera señal de vida inteligente que Cladis encontró fuera de Lutum.'],
    susurro: 'Existe otro mundo ahí fuera. Nadie de aquí volverá a verlo.',
  },
];

/* ------------------------------------------------------- todos los nodos */
const DESDE_DEIDADES: Nodo[] = DEIDADES.map((d) => ({
  slug: d.slug,
  nombre: d.nombre,
  sub: d.titulo,
  tipo: 'deidad' as const,
  peso: 1.4 + d.stats[3] / 8,          // la huella que dejó en el mundo
  datos: [
    ['Alineamiento', d.alineamiento],
    ['Dominios', d.dominios],
    ['Arma', d.arma],
    ['Nace', d.anioTexto],
  ] as [string, string][],
  texto: d.cronica,
  susurro: d.susurro,
}));

export const NODOS: Nodo[] = [...DESDE_DEIDADES, ...LUGARES, ...HECHOS, ...MORTALES];

/* ------------------------------------------------------------- vínculos */
export const ENLACES: [string, string][] = [
  // el panteón
  ['cladis', 'egon'], ['cladis', 'lunaris'], ['egon', 'lunaris'], ['egon', 'zarath'],
  ['cladis', 'armonia'], ['cladis', 'miraxis'], ['cladis', 'valther'], ['cladis', 'vigilis'],
  ['cladis', 'arbo'], ['cladis', 'lydara'], ['cladis', 'zax'], ['cladis', 'zarath'],
  ['lunaris', 'litt'], ['armonia', 'miraxis'], ['relatora', 'zax'],
  // la cronología
  ['cladis', 'a0'], ['egon', 'a0'], ['lunaris', 'a0'],
  ['a0', 'a138'], ['a138', 'a367'], ['a367', 'a372'], ['a372', 'a501'], ['a501', 'a612'],
  ['a612', 'a708'], ['a708', 'a738'], ['a738', 'a978'], ['a978', 'a1103'], ['a1103', 'a1176'],
  // qué salió de cada hecho
  ['a138', 'armonia'], ['a138', 'humanos'], ['a367', 'litt'], ['a367', 'parque'],
  ['a367', 'necropolis'], ['a367', 'humanos'], ['a501', 'vigilis'], ['a612', 'arbo'],
  ['a708', 'lydara'], ['a708', 'aric'], ['a708', 'castillo'], ['a738', 'constructores'],
  ['a978', 'defensores'], ['a1103', 'academia'], ['a1103', 'zax'],
  ['a1176', 'zarath'], ['a1176', 'abismo'],
  // geografía
  ['cladis', 'artenica'], ['artenica', 'constructores'], ['zax', 'estelaria'],
  ['estelaria', 'academia'], ['lydara', 'coralina'], ['coralina', 'profundidades'],
  ['cladis', 'salto'], ['arbo', 'verdantia'], ['verdantia', 'bosque'],
  ['miraxis', 'bosque'], ['armonia', 'sanroque'], ['zarath', 'abismo'],
  ['aric', 'castillo'], ['zax', 'phaingea'], ['neblisco', 'valther'],
  ['humanos', 'artenica'], ['humanos', 'vigilis'], ['relatora', 'bosque'],
  ['egon', 'necropolis'], ['lunaris', 'humanos'],
];

export const porSlug = (slug: string): Nodo | undefined =>
  NODOS.find((n) => n.slug === slug);

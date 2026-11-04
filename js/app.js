'use strict';
/**
 * Biblioteca Digital del Turó · comportament de la web.
 *
 * Totes les pàgines carreguen aquest fitxer (i dades.js abans).
 * Quan la pàgina s'acaba de carregar, s'executen totes les funcions
 * "iniciar...". Cadascuna busca els seus elements amb getElementById
 * i, si no els troba, no fa res: així el mateix fitxer serveix per a totes
 * les pàgines.
 */

/* =========================================================
   Utilitats
   ========================================================= */

/**
 * Crea un element HTML amb una classe i un text opcionals.
 * Fem servir textContent (i no innerHTML) perquè el navegador tracti
 * el contingut sempre com a text i mai com a codi HTML.
 * @param {string} etiqueta - Nom de l'etiqueta: "div", "h3", "p"...
 * @param {string} [classe] - Classe CSS que s'hi afegeix.
 * @param {string} [text] - Text que hi haurà a dins.
 * @returns {HTMLElement} L'element creat (encara no és a la pàgina).
 */
function crearElement(etiqueta, classe, text) {
  const element = document.createElement(etiqueta);
  if (classe) {
    element.className = classe;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

/**
 * Llegeix un paràmetre de l'adreça de la pàgina (el que va després de "?").
 * Exemple: a llibre.html?id=BD-0003, llegirParametre("id") retorna "BD-0003".
 * @param {string} nom - Nom del paràmetre.
 * @returns {string|null} El valor, o null si l'adreça no el porta.
 */
function llegirParametre(nom) {
  const parametres = new URLSearchParams(window.location.search);
  return parametres.get(nom);
}

/**
 * Busca un llibre pel seu codi.
 * @param {string} id - Codi del llibre, per exemple "BD-0003".
 * @returns {Llibre|undefined} El llibre, o undefined si no existeix.
 */
function buscarLlibre(id) {
  return LLIBRES.find(function (llibre) {
    return llibre.id === id;
  });
}

/* =========================================================
   Menú (totes les pàgines)
   ========================================================= */

/**
 * Obre i tanca el menú principal quan es fa clic a la icona ☰.
 */
function iniciarMenu() {
  const boto = document.getElementById('obrir-menu');
  const menu = document.getElementById('menu');
  if (!boto || !menu) {
    return;
  }
  boto.addEventListener('click', function () {
    // toggle afegeix la classe si no hi és i la treu si hi és
    menu.classList.toggle('obert');
  });
}

/* =========================================================
   Targetes de llibre (inici i catàleg)
   ========================================================= */

/**
 * Crea la targeta d'un llibre: portada, títol i autor.
 * En fer-hi clic, s'obre la fitxa del llibre.
 * @param {Llibre} llibre - El llibre que es mostra.
 * @returns {HTMLElement} La targeta.
 */
function crearTargeta(llibre) {
  const targeta = crearElement('div', 'targeta');

  const portada = document.createElement('img');
  portada.src = 'img/portades/' + llibre.id + '.jpg';
  portada.alt = llibre.titol;

  targeta.appendChild(portada);
  targeta.appendChild(crearElement('h3', '', llibre.titol));
  targeta.appendChild(crearElement('p', '', llibre.autor));

  targeta.addEventListener('click', function () {
    window.location.href = 'llibre.html?id=' + llibre.id;
  });
  return targeta;
}

/**
 * Afegeix una llista de targetes dins d'un contenidor, buidant-lo abans.
 * @param {HTMLElement} contenidor - On es posen les targetes.
 * @param {Llibre[]} llibres - Els llibres que es mostren.
 */
function mostrarTargetes(contenidor, llibres) {
  contenidor.textContent = ''; // buida el contenidor
  for (const llibre of llibres) {
    contenidor.appendChild(crearTargeta(llibre));
  }
}

/* =========================================================
   Pàgina d'inici
   ========================================================= */

/**
 * Mostra quatre llibres a l'apartat «Novetats».
 */
function iniciarNovetats() {
  const novetats = document.getElementById('novetats');
  if (!novetats) {
    return;
  }
  // slice(2, 6) agafa els llibres de les posicions 2, 3, 4 i 5
  mostrarTargetes(novetats, LLIBRES.slice(2, 6));
}

/**
 * Cercador de la pàgina d'inici: envia el text cercat al catàleg.
 */
function iniciarCercaInici() {
  const formulari = document.getElementById('cerca');
  if (!formulari) {
    return;
  }
  formulari.addEventListener('submit', function (event) {
    event.preventDefault(); // evitem que el formulari recarregui la pàgina
    const text = document.getElementById('cerca').value;
    window.location.href = 'cataleg.html?q=' + encodeURIComponent(text);
  });
}

/* =========================================================
   Catàleg
   ========================================================= */

/** Nombre de llibres que es mostren a cada pàgina del catàleg. */
const LLIBRES_PER_PAGINA = 4;

/** Estat del catàleg: resultats de l'última cerca i pàgina que es mostra. */
let resultats = [];
let paginaActual = 1;

/**
 * Cerca llibres que continguin el text dins del títol.
 * @param {string} text - Text cercat.
 * @returns {Llibre[]} Els llibres trobats (tots, si el text és buit).
 */
function cercarLlibres(text) {
  if (!text) {
    return LLIBRES.slice(); // una còpia de tota la llista
  }
  return LLIBRES.filter(function (llibre) {
    return llibre.titol.includes(text);
  });
}

/**
 * Mostra la pàgina actual de resultats i els números de pàgina.
 */
function pintarCataleg() {
  const contenidor = document.getElementById('resultats');
  const paginacio = document.getElementById('paginacio');

  // Quins resultats toca mostrar en aquesta pàgina
  const inici = (paginaActual - 1) * LLIBRES_PER_PAGINA;
  const pagina = resultats.slice(inici, inici + LLIBRES_PER_PAGINA);

  if (pagina.length === 0) {
    contenidor.textContent = '0';
  } else {
    mostrarTargetes(contenidor, pagina);
  }

  // Números de pàgina
  paginacio.textContent = '';
  const totalPagines = Math.ceil(resultats.length / LLIBRES_PER_PAGINA);
  for (let numero = 1; numero <= totalPagines; numero++) {
    const enllac = crearElement('span', numero === paginaActual ? 'actual' : '', String(numero));
    enllac.addEventListener('click', function () {
      paginaActual = numero;
      pintarCataleg();
    });
    paginacio.appendChild(enllac);
  }
}

/**
 * Prepara el catàleg: llegeix la cerca que ve de l'inici (si n'hi ha)
 * i fa funcionar el cercador de la pàgina.
 */
function iniciarCataleg() {
  const formulari = document.getElementById('form-opac');
  const camp = document.getElementById('cerca-opac');
  if (!formulari || !camp) {
    return;
  }

  // Cerca que arriba des de la pàgina d'inici (cataleg.html?q=...)
  camp.value = llegirParametre('q') || '';
  resultats = cercarLlibres(camp.value);
  pintarCataleg();

  formulari.addEventListener('submit', function (event) {
    event.preventDefault();
    resultats = cercarLlibres(camp.value);
    paginaActual = 1;
    pintarCataleg();
  });
}

/* =========================================================
   Fitxa d'un llibre
   ========================================================= */

/**
 * Converteix una valoració (1-5) en estrelles: 4 → "★★★★☆".
 * @param {number} valoracio - Valoració de 1 a 5.
 * @returns {string} Les estrelles.
 */
function estrelles(valoracio) {
  return '★'.repeat(valoracio) + '☆'.repeat(5 - valoracio);
}

/**
 * Omple la fitxa amb les dades del llibre que indica l'adreça (llibre.html?id=...).
 */
function iniciarFitxa() {
  const fitxa = document.getElementById('fitxa');
  if (!fitxa) {
    return;
  }
  // Si l'adreça no porta cap id vàlid, mostrem «Jo confesso»
  const llibre = buscarLlibre(llegirParametre('id')) || buscarLlibre('BD-0003');

  // Columna esquerra: portada
  const columnaPortada = document.createElement('div');
  const portada = document.createElement('img');
  portada.src = 'img/portades/' + llibre.id + '.jpg';
  portada.alt = 'Portada';
  columnaPortada.appendChild(portada);

  // Columna dreta: dades del llibre
  const columnaDades = document.createElement('div');
  columnaDades.appendChild(crearElement('h1', '', llibre.titol));
  columnaDades.appendChild(crearElement('p', '', llibre.autor + ' · ' + llibre.any + ' · ' + llibre.genere));

  const disponibilitat = document.createElement('p');
  disponibilitat.appendChild(crearElement('span', llibre.disponible ? 'punt si' : 'punt no'));
  columnaDades.appendChild(disponibilitat);

  columnaDades.appendChild(crearElement('p', 'estrelles', estrelles(llibre.valoracio)));
  columnaDades.appendChild(crearElement('h2', '', 'Resum'));
  columnaDades.appendChild(crearElement('p', '', llibre.resum));
  columnaDades.appendChild(crearElement('p', '', llibre.resum + ' Edició revisada amb pròleg i notes. Inclou una cronologia de l\'autor i una selecció de crítiques publicades en el moment de la primera edició.'));

  const botons = document.createElement('p');
  botons.appendChild(crearElement('button', 'btn-compartir', 'Compartir a les xarxes'));
  botons.appendChild(crearElement('button', 'btn-compartir btn-desitjos', 'Afegir a llista de desitjos'));
  columnaDades.appendChild(botons);

  columnaDades.appendChild(crearElement('p', 'codi', 'Codi: ' + llibre.id));

  const prestec = crearElement('a', 'enllac-discret', 'Sol·licitar préstec');
  prestec.href = 'reserva.html';
  const paragrafPrestec = document.createElement('p');
  paragrafPrestec.appendChild(prestec);
  columnaDades.appendChild(paragrafPrestec);

  fitxa.appendChild(columnaPortada);
  fitxa.appendChild(columnaDades);
}

/* =========================================================
   Sol·licitud de préstec (reserva)
   ========================================================= */

/** Nombre de passos del procés de reserva (pas1 ... pas6 a l'HTML). */
const TOTAL_PASSOS = 6;
let pasActual = 1;

/**
 * Mostra només el pas indicat i amaga la resta.
 * Cada pas és una secció amb id "pas1", "pas2"... a reserva.html.
 * @param {number} numero - Pas que es vol mostrar (1-6).
 */
function mostrarPas(numero) {
  for (let i = 1; i <= TOTAL_PASSOS; i++) {
    const pas = document.getElementById('pas' + i);
    // El segon paràmetre de toggle diu si la classe ha d'hi ser (true) o no (false)
    pas.classList.toggle('visible', i === numero);
  }
  pasActual = numero;
}

/**
 * Avisa que hi ha hagut un error i torna a començar el procés.
 */
function errorReserva() {
  alert('Error');
  document.getElementById('form-reserva').reset();
  mostrarPas(1);
}

/**
 * Comprova les dades del pas actual. Si són correctes, passa al següent.
 */
function continuarReserva() {
  if (pasActual === 1) {
    const carnet = document.getElementById('carnet').value;
    const pin = document.getElementById('pin').value;
    // Expressions regulars: ^ inici, \d dígit, {14} exactament 14 vegades, $ final
    if (!/^\d{14}$/.test(carnet) || !/^\d{4}$/.test(pin)) {
      errorReserva();
      return;
    }
  }
  if (pasActual === 2 && !/^BD-\d{4}$/.test(document.getElementById('document').value)) {
    errorReserva();
    return;
  }
  if (pasActual === 3 && document.getElementById('biblioteca').value === '') {
    errorReserva();
    return;
  }
  if (pasActual === 4 && document.getElementById('data').value === '') {
    errorReserva();
    return;
  }
  if (pasActual === 5) {
    if (!document.getElementById('accepto').checked) {
      errorReserva();
      return;
    }
    omplirResum();
  }
  mostrarPas(pasActual + 1);
}

/**
 * Escriu el resum de la sol·licitud a l'últim pas.
 */
function omplirResum() {
  const resum = document.getElementById('resum');
  resum.textContent = '';
  const linies = [
    'Carnet: ' + document.getElementById('carnet').value,
    'Document: ' + document.getElementById('document').value,
    'Recollida: ' + document.getElementById('biblioteca').value
  ];
  for (const linia of linies) {
    resum.appendChild(document.createTextNode(linia));
    resum.appendChild(document.createElement('br'));
  }
}

/**
 * Prepara la pàgina de reserva: omple la llista de biblioteques
 * i connecta els botons de cada pas.
 */
function iniciarReserva() {
  const llista = document.getElementById('biblioteca');
  if (!llista) {
    return;
  }

  // Primera opció buida i després una opció per biblioteca
  const buida = crearElement('option', '', '--');
  buida.value = '';
  llista.appendChild(buida);
  for (const biblioteca of BIBLIOTEQUES) {
    llista.appendChild(crearElement('option', '', biblioteca));
  }

  // Botons «Continuar» dels passos 1 a 5 (ids continuar-1 ... continuar-5)
  for (let i = 1; i < TOTAL_PASSOS; i++) {
    document.getElementById('continuar-' + i).addEventListener('click', continuarReserva);
  }
  // Per si algú prem Retorn dins d'un camp: el formulari no s'ha d'enviar sol
  document.getElementById('form-reserva').addEventListener('submit', function (event) {
    event.preventDefault();
  });

  document.getElementById('processar').addEventListener('click', function () {
    window.location.href = 'index.html';
  });

  mostrarPas(1);
}

/* =========================================================
   El meu espai (perfil)
   ========================================================= */

/**
 * Aplica les preferències de lectura marcades a la pàgina actual.
 * Cada preferència activa o desactiva una classe al <body> (vegeu estils.css).
 */
function aplicarPreferencies() {
  document.body.classList.toggle('lletra-gran', document.getElementById('pref-lletra').checked);
  document.body.classList.toggle('contrast', document.getElementById('pref-contrast').checked);
  document.body.classList.toggle('fosc', document.getElementById('pref-fosc').checked);
}

/**
 * Connecta el botó de les preferències de lectura.
 */
function iniciarPerfil() {
  const boto = document.getElementById('aplicar-preferencies');
  if (!boto) {
    return;
  }
  boto.addEventListener('click', aplicarPreferencies);
}

/* =========================================================
   Arrencada
   ========================================================= */

// DOMContentLoaded: l'HTML ja s'ha llegit i ja podem buscar elements per id
document.addEventListener('DOMContentLoaded', function () {
  iniciarMenu();
  iniciarNovetats();
  iniciarCercaInici();
  iniciarCataleg();
  iniciarFitxa();
  iniciarReserva();
  iniciarPerfil();
});

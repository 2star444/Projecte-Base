"use strict";
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
  const boto = document.getElementById("obrir-menu");
  const menu = document.getElementById("menu");
  if (!boto || !menu) {
    return;
  }
  boto.addEventListener("click", function () {
    const obert = menu.classList.toggle("obert");
    boto.setAttribute("aria-expanded", String(obert));
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
  const targeta = crearElement("div", "targeta");

  const portada = document.createElement("img");
  portada.src = "img/portades/" + llibre.id + ".jpg";
  portada.alt = llibre.titol;

  targeta.appendChild(portada);
  targeta.appendChild(crearElement("h3", "", llibre.titol));
  targeta.appendChild(crearElement("p", "", llibre.autor));

  targeta.addEventListener("click", function () {
    window.location.href = "llibre.html?id=" + llibre.id;
  });
  return targeta;
}

/**
 * Afegeix una llista de targetes dins d'un contenidor, buidant-lo abans.
 * @param {HTMLElement} contenidor - On es posen les targetes.
 * @param {Llibre[]} llibres - Els llibres que es mostren.
 */
function mostrarTargetes(contenidor, llibres) {
  contenidor.textContent = ""; // buida el contenidor
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
  const novetats = document.getElementById("novetats");
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
  const formulari = document.getElementById("cerca");
  if (!formulari) {
    return;
  }
  formulari.addEventListener("submit", function (event) {
    event.preventDefault(); // evitem que el formulari recarregui la pàgina
    const text = document.getElementById("cerca").value;
    window.location.href = "cataleg.html?q=" + encodeURIComponent(text);
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
  const contenidor = document.getElementById("resultats");
  const paginacio = document.getElementById("paginacio");

  // Quins resultats toca mostrar en aquesta pàgina
  const inici = (paginaActual - 1) * LLIBRES_PER_PAGINA;
  const pagina = resultats.slice(inici, inici + LLIBRES_PER_PAGINA);

  if (pagina.length === 0) {
    contenidor.textContent = "0";
  } else {
    mostrarTargetes(contenidor, pagina);
  }

  // Números de pàgina
  paginacio.textContent = "";
  const totalPagines = Math.ceil(resultats.length / LLIBRES_PER_PAGINA);
  for (let numero = 1; numero <= totalPagines; numero++) {
    const enllac = crearElement(
      "span",
      numero === paginaActual ? "actual" : "",
      String(numero),
    );
    enllac.addEventListener("click", function () {
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
  const formulari = document.getElementById("form-opac");
  const camp = document.getElementById("cerca-opac");
  if (!formulari || !camp) {
    return;
  }

  // Cerca que arriba des de la pàgina d'inici (cataleg.html?q=...)
  camp.value = llegirParametre("q") || "";
  resultats = cercarLlibres(camp.value);
  pintarCataleg();

  formulari.addEventListener("submit", function (event) {
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
  return "★".repeat(valoracio) + "☆".repeat(5 - valoracio);
}

/**
 * Omple la fitxa amb les dades del llibre que indica l'adreça (llibre.html?id=...).
 */
function iniciarFitxa() {
  const fitxa = document.getElementById("fitxa");
  if (!fitxa) {
    return;
  }
  // Si l'adreça no porta cap id vàlid, mostrem «Jo confesso»
  const llibre = buscarLlibre(llegirParametre("id")) || buscarLlibre("BD-0003");

  // Columna esquerra: portada
  const columnaPortada = document.createElement("div");
  const portada = document.createElement("img");
  portada.src = "img/portades/" + llibre.id + ".jpg";
  portada.alt = "Portada";
  columnaPortada.appendChild(portada);

  // Columna dreta: dades del llibre
  const columnaDades = document.createElement("div");
  columnaDades.appendChild(crearElement("h1", "", llibre.titol));
  columnaDades.appendChild(
    crearElement(
      "p",
      "",
      llibre.autor + " · " + llibre.any + " · " + llibre.genere,
    ),
  );

  const disponibilitat = document.createElement("p");
  disponibilitat.appendChild(
    crearElement("span", llibre.disponible ? "punt si" : "punt no"),
  );
  columnaDades.appendChild(disponibilitat);

  columnaDades.appendChild(
    crearElement("p", "estrelles", estrelles(llibre.valoracio)),
  );
  columnaDades.appendChild(crearElement("h2", "", "Resum"));
  columnaDades.appendChild(crearElement("p", "", llibre.resum));
  columnaDades.appendChild(
    crearElement(
      "p",
      "",
      llibre.resum +
        " Edició revisada amb pròleg i notes. Inclou una cronologia de l'autor i una selecció de crítiques publicades en el moment de la primera edició.",
    ),
  );

  const botons = document.createElement("p");
  botons.appendChild(
    crearElement("button", "btn-compartir", "Compartir a les xarxes"),
  );
  botons.appendChild(
    crearElement(
      "button",
      "btn-compartir btn-desitjos",
      "Afegir a llista de desitjos",
    ),
  );
  columnaDades.appendChild(botons);

  columnaDades.appendChild(crearElement("p", "codi", "Codi: " + llibre.id));

  const prestec = crearElement("a", "enllac-discret", "Sol·licitar préstec");
  prestec.href = "reserva.html?id=" + llibre.id;
  const paragrafPrestec = document.createElement("p");
  paragrafPrestec.appendChild(prestec);
  columnaDades.appendChild(paragrafPrestec);

  fitxa.appendChild(columnaPortada);
  fitxa.appendChild(columnaDades);
}

/* =========================================================
   Sol·licitud de préstec (reserva)
   ========================================================= */

/**
 * Mostra a la reserva el llibre triat a la fitxa (reserva.html?id=BD-0003)
 * i en desa el codi al camp ocult del formulari: l'usuari no l'ha de recordar.
 */
function iniciarReserva() {
  const titol = document.getElementById("llibre-reserva");
  const campDocument = document.getElementById("document");
  if (!titol || !campDocument) {
    return; // no som a la pàgina de reserva
  }
  const llibre = buscarLlibre(llegirParametre("id"));
  if (llibre) {
    titol.textContent = llibre.titol + " · " + llibre.autor;
    campDocument.value = llibre.id;
  } else {
    titol.textContent = "Cap llibre triat. Tria'n un al catàleg.";
  }
}

/* =========================================================
   El meu espai (perfil)
   ========================================================= */

/**
 * Aplica les preferències de lectura marcades a la pàgina actual.
 * Cada preferència activa o desactiva una classe al <body> (vegeu estils.css).
 */
function aplicarPreferencies() {
  document.body.classList.toggle(
    "lletra-gran",
    document.getElementById("pref-lletra").checked,
  );
  document.body.classList.toggle(
    "contrast",
    document.getElementById("pref-contrast").checked,
  );
  document.body.classList.toggle(
    "fosc",
    document.getElementById("pref-fosc").checked,
  );
}

/**
 * Connecta el botó de les preferències de lectura.
 */
function iniciarPerfil() {
  const boto = document.getElementById("aplicar-preferencies");
  if (!boto) {
    return;
  }
  boto.addEventListener("click", aplicarPreferencies);
}

/* =========================================================
   Arrencada
   ========================================================= */

// DOMContentLoaded: l'HTML ja s'ha llegit i ja podem buscar elements per id
document.addEventListener("DOMContentLoaded", function () {
  iniciarMenu();
  iniciarNovetats();
  iniciarCercaInici();
  iniciarCataleg();
  iniciarFitxa();
  iniciarReserva();
  iniciarPerfil();
});

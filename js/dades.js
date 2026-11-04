'use strict';
/**
 * Dades del catàleg de la Biblioteca Digital del Turó.
 * En una web real vindrien d'un servidor; aquí les tenim en un fitxer
 * perquè la web funcioni sense base de dades.
 */

/**
 * Un llibre del catàleg.
 * @typedef {Object} Llibre
 * @property {string} id - Codi del document, per exemple "BD-0003".
 * @property {string} titol - Títol del llibre.
 * @property {string} autor - Autor o autora.
 * @property {number} any - Any de la primera edició.
 * @property {string} genere - Gènere o col·lecció.
 * @property {boolean} disponible - true si es pot endur en préstec ara mateix.
 * @property {number} valoracio - Valoració mitjana dels lectors, de 1 a 5.
 * @property {string} resum - Breu descripció de l'obra.
 */

/** @type {Llibre[]} */
const LLIBRES = [
  { id: 'BD-0001', titol: 'Mirall trencat', autor: 'Mercè Rodoreda', any: 1974, genere: 'Novel·la', disponible: true, valoracio: 5,
    resum: "La història d'una família benestant barcelonina al llarg de tres generacions, explicada a través de la casa que habiten i dels secrets que s'hi guarden." },
  { id: 'BD-0002', titol: 'Solitud', autor: 'Víctor Català', any: 1905, genere: 'Novel·la', disponible: false, valoracio: 4,
    resum: "La Mila s'instal·la amb el seu marit en una ermita de muntanya i hi descobreix un paisatge, una solitud i una força interior que la transformen." },
  { id: 'BD-0003', titol: 'Jo confesso', autor: 'Jaume Cabré', any: 2011, genere: 'Novel·la', disponible: true, valoracio: 5,
    resum: "Adrià Ardèvol repassa la seva vida i la d'un violí que ha passat per moltes mans al llarg de la història europea." },
  { id: 'BD-0004', titol: 'Pedra de tartera', autor: 'Maria Barbal', any: 1985, genere: 'Novel·la', disponible: true, valoracio: 4,
    resum: "La vida de la Conxa, nascuda en un poble del Pirineu, des de la infantesa fins a la vellesa, marcada pels canvis del segle XX." },
  { id: 'BD-0005', titol: 'Incerta glòria', autor: 'Joan Sales', any: 1956, genere: 'Novel·la', disponible: false, valoracio: 5,
    resum: "Diversos personatges viuen la Guerra Civil al front d'Aragó i a la rereguarda, entre la fe, el desencís i l'amor." },
  { id: 'BD-0006', titol: 'La plaça del Diamant', autor: 'Mercè Rodoreda', any: 1962, genere: 'Novel·la', disponible: true, valoracio: 5,
    resum: "La Colometa narra la seva vida a Gràcia abans, durant i després de la guerra, amb una veu íntima i directa." },
  { id: 'BD-0007', titol: 'Canto jo i la muntanya balla', autor: 'Irene Solà', any: 2019, genere: 'Novel·la', disponible: true, valoracio: 4,
    resum: "Veus humanes i no humanes d'un racó del Pirineu expliquen una història familiar que travessa generacions." },
  { id: 'BD-0008', titol: "L'últim patriarca", autor: 'Najat El Hachmi', any: 2008, genere: 'Novel·la', disponible: false, valoracio: 4,
    resum: "Una noia explica la història del seu pare, des del Marroc fins a Catalunya, i el seu propi camí per alliberar-se'n." },
  { id: 'BD-0009', titol: 'Tirant lo Blanc', autor: 'Joanot Martorell', any: 1490, genere: 'Clàssics', disponible: true, valoracio: 3,
    resum: "Les aventures del cavaller Tirant, des d'Anglaterra fins a Constantinoble, en una de les grans novel·les cavalleresques europees." },
  { id: 'BD-0010', titol: 'Aloma', autor: 'Mercè Rodoreda', any: 1938, genere: 'Novel·la', disponible: true, valoracio: 4,
    resum: "Una noia jove descobreix l'amor i el desengany a la Barcelona dels anys trenta." }
];

/**
 * Punts de servei on es pot recollir un préstec.
 * @type {string[]}
 */
const BIBLIOTEQUES = ['Bib. Sant Pere', 'Bib. Can Fabra', 'Bib. del Turó (central)', 'Bibliobús 3', 'Bib. Els Pins',
  "Bib. Ca l'Oliveres", 'Bib. Nord', 'Punt de lectura Mercat', 'Bib. Sud', 'Bib. Can Comas', 'Bibliobús 1',
  'Bib. La Riera', 'Bib. Font Vella', 'Bib. Les Moreres', 'Bibliobús 2', 'Bib. Est', 'Bib. Oest', 'Bib. Can Pujades'];

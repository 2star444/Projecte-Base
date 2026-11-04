# Biblioteca Digital del Turó (projecte base)

Web de la biblioteca digital d'un municipi fictici. És el projecte sobre el qual treballareu tota la Pt1.2: l'analitzareu, la millorareu i la provareu amb usuaris.

## Com obrir-la a l'aula (Ubuntu MATE)

1. Descomprimiu la carpeta `biblioteca-digital` i obriu-la amb VS Code (`Fitxer > Obre una carpeta`).
2. Obriu `index.html` i premeu **Go Live** a la barra d'estat inferior de VS Code (o clic dret sobre `index.html` > *Open with Live Server*).
3. S'obrirà el navegador a `http://127.0.0.1:5500/index.html`. Copieu l'adreça a Chromium i a Firefox per provar-la als dos.

Treballeu sempre a través de Live Server i no obrint els fitxers amb doble clic: algunes eines (Lighthouse, mode dispositiu, accés des del mòbil) no funcionen bé amb adreces `file://`. Live Server recarrega la pàgina automàticament cada cop que deseu un fitxer.

Per veure la web al mòbil, connecteu-lo a la mateixa xarxa i obriu `http://IP-DEL-VOSTRE-ORDINADOR:5500` (la IP es consulta amb `hostname -I`). Si no hi arriba, activeu l'opció `Live Server › Settings: Use Local Ip` a la configuració de VS Code. Si la xarxa del centre no ho permet, feu servir el mode dispositiu de les DevTools.

El validador del W3C no pot accedir a `127.0.0.1`: valideu pujant el fitxer o enganxant-ne el codi.

## Estructura

- `index.html` · inici
- `cataleg.html` · cerca al catàleg
- `llibre.html?id=BD-0003` · fitxa d'un llibre
- `reserva.html` · sol·licitud de préstec
- `perfil.html` · espai personal
- `ajuda.html` · ajuda
- `css/estils.css`, `js/dades.js`, `js/app.js`, `img/`

## Control dels canvis

Cada millora que feu ha de quedar registrada: què heu canviat i quina heurística o criteri ho justifica. Trieu una de les dues opcions (valen igual):

**Opció A · Git (recomanada).** Inicialitzeu el repositori des del panell **Control de codi font** de VS Code (Ctrl+Maj+G > *Inicialitza el repositori*), escriviu «Projecte base» com a missatge i premeu *Confirma*. Després, un commit per millora, per exemple: `[H6] La reserva recorda el llibre triat`.

**Opció B · Registre de canvis (si no teniu Git).** Abans de cada fase, feu una còpia de la carpeta (`biblioteca-fase2-inici`…). Per a cada millora, ompliu una fila de la taula «Registre de canvis» de l'enunciat de la Pt1.2, amb una captura d'abans i una de després.

Per comprovar si teniu Git, obriu el terminal de VS Code i escriviu `git --version`. Si respon amb un número de versió, el teniu.

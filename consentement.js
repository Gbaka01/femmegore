/*!
 * Bandeau de consentement aux cookies — femmegore.fr
 * Autonome : aucun fichier CSS ni bibliothèque à ajouter.
 *
 * Intégration :
 *   <script src="/consentement.js" defer></script>   (avant </body>, sur chaque page)
 *
 * Scripts soumis au consentement :
 *   <script type="text/plain" data-consent="audience" data-src="https://..."></script>
 *   <script type="text/plain" data-consent="audience"> ...code... </script>
 *
 * Contenus tiers (vidéos, cartes) :
 *   <iframe data-consent="tiers" data-src="https://..." title="..."></iframe>
 *
 * Lien « Gérer mes cookies » (pied de page) :
 *   <a href="#" data-fgc-ouvrir>Gérer mes cookies</a>
 */
(function () {
  "use strict";
 
  /* ------------------------------------------------------------------ */
  /* Réglages                                                            */
  /* ------------------------------------------------------------------ */
  var CONFIG = {
    cle: "fg-consentement",
    version: 1,              // incrémenter pour redemander le consentement à tous
    dureeJours: 182,         // 6 mois, durée recommandée par la CNIL
    lienPolitique: "/mentions-legales.html#cookies",
    categories: [
      {
        id: "essentiels",
        titre: "Essentiels",
        texte: "Nécessaires au fonctionnement du site, dont la mémorisation de vos choix. Toujours actifs.",
        obligatoire: true
      },
      {
        id: "audience",
        titre: "Mesure d’audience",
        texte: "Statistiques de fréquentation, pour savoir quelles pages et quels dessins sont les plus consultés.",
        cookies: ["_ga", "_gid", "_pk_", "_hj"] // préfixes supprimés en cas de retrait
      },
      {
        id: "tiers",
        titre: "Contenus tiers",
        texte: "Vidéos et cartes intégrées depuis d’autres sites. Ces services peuvent déposer leurs propres cookies."
      }
    ]
  };
 
  /* ------------------------------------------------------------------ */
  /* Styles                                                              */
  /* ------------------------------------------------------------------ */
  var CSS = [
    ".fgc-bandeau,.fgc-voile{--fgc-papier:#fff;--fgc-graphite:#262628;--fgc-mine:#5f5f66;--fgc-trait:#d4d4d8;--fgc-estompe:#f2f2f3;",
    "font-family:inherit;color:var(--fgc-graphite);box-sizing:border-box}",
    ".fgc-bandeau *,.fgc-voile *{box-sizing:inherit}",
    ".fgc-bandeau[hidden],.fgc-voile[hidden]{display:none!important}",
 
    /* Bandeau */
    ".fgc-bandeau{position:fixed;left:0;right:0;bottom:0;z-index:9998;background:var(--fgc-papier);",
    "padding:1.4rem 1.5rem calc(1.4rem + env(safe-area-inset-bottom,0px))}",
    ".fgc-ligne{position:absolute;top:-5px;left:0;width:100%;height:10px;overflow:visible;pointer-events:none}",
    ".fgc-ligne path{fill:none;stroke:var(--fgc-graphite);stroke-width:1.3;stroke-linecap:round;",
    "vector-effect:non-scaling-stroke;stroke-dasharray:1;stroke-dashoffset:1;animation:fgc-dessin 1.4s cubic-bezier(.6,0,.2,1) .15s forwards}",
    "@keyframes fgc-dessin{to{stroke-dashoffset:0}}",
    ".fgc-interieur{max-width:72rem;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:1.2rem 2.5rem}",
    ".fgc-texte{flex:1 1 30rem;max-width:62ch;margin:0;font-size:.95rem;line-height:1.6}",
    ".fgc-texte strong{font-weight:600}",
    ".fgc-bandeau a,.fgc-voile a{color:inherit;text-underline-offset:3px}",
    ".fgc-actions{display:flex;flex-wrap:wrap;gap:.5rem}",
 
    /* Boutons : « Tout refuser » et « Tout accepter » ont exactement le même poids visuel */
    ".fgc-btn{font:inherit;font-size:.9rem;line-height:1.2;min-height:44px;padding:.7rem 1.15rem;cursor:pointer;",
    "border:1px solid var(--fgc-graphite);border-radius:2px;background:var(--fgc-graphite);color:var(--fgc-papier)}",
    ".fgc-btn:hover{background:var(--fgc-mine);border-color:var(--fgc-mine)}",
    ".fgc-btn--leger{background:transparent;color:var(--fgc-graphite)}",
    ".fgc-btn--leger:hover{background:var(--fgc-estompe);border-color:var(--fgc-graphite)}",
    ".fgc-btn:focus-visible,.fgc-bandeau a:focus-visible,.fgc-voile a:focus-visible,.fgc-fermer:focus-visible,",
    ".fgc-interrupteur input:focus-visible+.fgc-piste{outline:2px solid var(--fgc-graphite);outline-offset:3px}",
 
    /* Panneau de préférences */
    ".fgc-voile{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;",
    "padding:1rem;background:rgba(38,38,40,.45)}",
    ".fgc-panneau{position:relative;width:100%;max-width:34rem;max-height:calc(100% - 2rem);overflow:auto;",
    "background:var(--fgc-papier);border-radius:2px;padding:2rem 2rem 1.6rem}",
    ".fgc-panneau h2{margin:0 2.5rem .6rem 0;font-size:1.4rem;font-weight:400;line-height:1.3}",
    ".fgc-panneau>p{margin:0 0 1.2rem;font-size:.95rem;line-height:1.6;color:var(--fgc-mine)}",
    ".fgc-fermer{position:absolute;top:1rem;right:1rem;width:44px;height:44px;border:0;background:none;",
    "font-size:1.6rem;line-height:1;color:var(--fgc-graphite);cursor:pointer;border-radius:2px}",
    ".fgc-categorie{display:grid;grid-template-columns:1fr auto;gap:.25rem 1.5rem;align-items:center;",
    "padding:1rem 0;border-top:1px solid var(--fgc-trait)}",
    ".fgc-categorie:last-of-type{border-bottom:1px solid var(--fgc-trait)}",
    ".fgc-categorie h3{margin:0;font-size:1rem;font-weight:600}",
    ".fgc-categorie p{grid-column:1;margin:0;font-size:.88rem;line-height:1.55;color:var(--fgc-mine)}",
    ".fgc-categorie .fgc-interrupteur,.fgc-categorie .fgc-toujours{grid-column:2;grid-row:1/span 2}",
    ".fgc-toujours{font-size:.85rem;color:var(--fgc-mine)}",
 
    /* Interrupteur */
    ".fgc-interrupteur{position:relative;display:inline-block;cursor:pointer}",
    ".fgc-interrupteur input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}",
    ".fgc-piste{display:block;width:46px;height:26px;border:1px solid var(--fgc-graphite);border-radius:13px;",
    "background:var(--fgc-papier);transition:background .2s}",
    ".fgc-piste::after{content:'';position:absolute;top:4px;left:4px;width:18px;height:18px;border-radius:50%;",
    "background:var(--fgc-graphite);transition:transform .2s,background .2s}",
    ".fgc-interrupteur input:checked+.fgc-piste{background:var(--fgc-graphite)}",
    ".fgc-interrupteur input:checked+.fgc-piste::after{transform:translateX(20px);background:var(--fgc-papier)}",
    ".fgc-panneau .fgc-actions{margin-top:1.4rem;justify-content:flex-end}",
 
    /* Remplaçant des contenus tiers bloqués */
    ".fgc-substitut{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:.8rem;",
    "padding:1.5rem;min-height:12rem;border:1px solid #d4d4d8;background:#f2f2f3;color:#262628;font-size:.92rem;line-height:1.55}",
    ".fgc-substitut p{margin:0;max-width:48ch}",
 
    "@media (max-width:640px){.fgc-actions{width:100%}.fgc-actions .fgc-btn{flex:1 1 auto}",
    ".fgc-panneau{padding:1.6rem 1.25rem 1.25rem}}",
    "@media (prefers-reduced-motion:reduce){.fgc-ligne path{animation:none;stroke-dashoffset:0}",
    ".fgc-piste,.fgc-piste::after{transition:none}}"
  ].join("");
 
  /* ------------------------------------------------------------------ */
  /* Stockage du choix                                                   */
  /* ------------------------------------------------------------------ */
  function lire() {
    try {
      var v = JSON.parse(localStorage.getItem(CONFIG.cle));
      if (!v || v.version !== CONFIG.version) return null;
      if (Date.now() - v.date > CONFIG.dureeJours * 864e5) return null;
      return v.choix;
    } catch (e) {
      return null;
    }
  }
 
  function ecrire(choix) {
    try {
      localStorage.setItem(CONFIG.cle, JSON.stringify({ version: CONFIG.version, date: Date.now(), choix: choix }));
    } catch (e) { /* stockage indisponible : le bandeau réapparaîtra */ }
  }
 
  function choixComplet(valeur) {
    var c = {};
    CONFIG.categories.forEach(function (cat) { c[cat.id] = cat.obligatoire ? true : valeur; });
    return c;
  }
 
  function supprimerCookies(prefixes) {
    var hotes = [location.hostname, "." + location.hostname.replace(/^www\./, "")];
    document.cookie.split(";").forEach(function (c) {
      var nom = c.split("=")[0].trim();
      if (!prefixes.some(function (p) { return nom.indexOf(p) === 0; })) return;
      var expire = nom + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = expire;
      hotes.forEach(function (h) { document.cookie = expire + "; domain=" + h; });
    });
  }
 
  /* ------------------------------------------------------------------ */
  /* Activation des scripts et contenus autorisés                        */
  /* ------------------------------------------------------------------ */
  function activer(choix) {
    var scripts = document.querySelectorAll('script[type="text/plain"][data-consent]');
    Array.prototype.forEach.call(scripts, function (ancien) {
      if (!choix[ancien.getAttribute("data-consent")] || ancien.hasAttribute("data-fgc-actif")) return;
      var s = document.createElement("script");
      Array.prototype.forEach.call(ancien.attributes, function (a) {
        if (["type", "data-consent", "data-src"].indexOf(a.name) === -1) s.setAttribute(a.name, a.value);
      });
      if (ancien.getAttribute("data-src")) s.src = ancien.getAttribute("data-src");
      else s.text = ancien.text;
      ancien.setAttribute("data-fgc-actif", "");
      ancien.parentNode.insertBefore(s, ancien.nextSibling);
    });
 
    var cadres = document.querySelectorAll("iframe[data-consent][data-src]");
    Array.prototype.forEach.call(cadres, function (cadre) {
      var autorise = !!choix[cadre.getAttribute("data-consent")];
      var substitut = cadre.previousElementSibling;
      var aSubstitut = substitut && substitut.classList.contains("fgc-substitut");
      if (autorise) {
        if (aSubstitut) substitut.remove();
        cadre.hidden = false;
        if (!cadre.src) cadre.src = cadre.getAttribute("data-src");
      } else if (!aSubstitut) {
        cadre.hidden = true;
        var bloc = document.createElement("div");
        bloc.className = "fgc-substitut";
        bloc.innerHTML =
          "<p>Ce contenu est hébergé par un autre site, qui peut déposer des cookies. " +
          "Il s’affichera si vous autorisez les contenus tiers.</p>" +
          '<button type="button" class="fgc-btn">Autoriser et afficher</button>';
        bloc.querySelector("button").addEventListener("click", function () {
          var c = lire() || choixComplet(false);
          c.tiers = true;
          enregistrer(c);
        });
        cadre.parentNode.insertBefore(bloc, cadre);
      }
    });
  }
 
  /* ------------------------------------------------------------------ */
  /* Interface                                                           */
  /* ------------------------------------------------------------------ */
  var bandeau, voile, derniereCible;
 
  function construire() {
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
 
    bandeau = document.createElement("div");
    bandeau.className = "fgc-bandeau";
    bandeau.setAttribute("role", "region");
    bandeau.setAttribute("aria-label", "Consentement aux cookies");
    bandeau.hidden = true;
    bandeau.innerHTML =
      '<svg class="fgc-ligne" viewBox="0 0 600 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<path pathLength="1" d="M1 6 C 90 3, 170 8, 260 5 S 420 2, 500 6 S 580 5, 599 4"/></svg>' +
      '<div class="fgc-interieur">' +
      '<p class="fgc-texte"><strong>Vos choix sur ce site.</strong> Avec votre accord, femmegore.fr mesure sa fréquentation ' +
      "et affiche des contenus venant d’autres sites. Si vous refusez, les dessins restent visibles de la même façon. " +
      '<a href="' + CONFIG.lienPolitique + '">En savoir plus</a></p>' +
      '<div class="fgc-actions">' +
      '<button type="button" class="fgc-btn" data-fgc="refuser">Tout refuser</button>' +
      '<button type="button" class="fgc-btn fgc-btn--leger" data-fgc="personnaliser">Personnaliser</button>' +
      '<button type="button" class="fgc-btn" data-fgc="accepter">Tout accepter</button>' +
      "</div></div>";
 
    var lignes = CONFIG.categories.map(function (cat) {
      var commande = cat.obligatoire
        ? '<span class="fgc-toujours">Toujours actifs</span>'
        : '<label class="fgc-interrupteur"><input type="checkbox" role="switch" data-cat="' + cat.id +
          '" aria-labelledby="fgc-cat-' + cat.id + '" aria-describedby="fgc-desc-' + cat.id + '">' +
          '<span class="fgc-piste" aria-hidden="true"></span></label>';
      return '<div class="fgc-categorie"><h3 id="fgc-cat-' + cat.id + '">' + cat.titre + "</h3>" + commande +
        '<p id="fgc-desc-' + cat.id + '">' + cat.texte + "</p></div>";
    }).join("");
 
    voile = document.createElement("div");
    voile.className = "fgc-voile";
    voile.hidden = true;
    voile.innerHTML =
      '<div class="fgc-panneau" role="dialog" aria-modal="true" aria-labelledby="fgc-titre">' +
      '<button type="button" class="fgc-fermer" data-fgc="fermer" aria-label="Fermer">×</button>' +
      '<h2 id="fgc-titre">Préférences de cookies</h2>' +
      "<p>Choisissez les services que vous autorisez. Vous pourrez modifier ce choix à tout moment " +
      "depuis le lien « Gérer mes cookies » en bas de page.</p>" +
      lignes +
      '<div class="fgc-actions">' +
      '<button type="button" class="fgc-btn fgc-btn--leger" data-fgc="refuser">Tout refuser</button>' +
      '<button type="button" class="fgc-btn fgc-btn--leger" data-fgc="accepter">Tout accepter</button>' +
      '<button type="button" class="fgc-btn" data-fgc="enregistrer">Enregistrer mes choix</button>' +
      "</div></div>";
 
    document.body.appendChild(bandeau);
    document.body.appendChild(voile);
 
    [bandeau, voile].forEach(function (el) {
      el.addEventListener("click", function (e) {
        var b = e.target.closest("[data-fgc]");
        if (!b) {
          if (e.target === voile) fermerPanneau();
          return;
        }
        var action = b.getAttribute("data-fgc");
        if (action === "accepter") enregistrer(choixComplet(true));
        else if (action === "refuser") enregistrer(choixComplet(false));
        else if (action === "personnaliser") ouvrirPanneau();
        else if (action === "fermer") fermerPanneau();
        else if (action === "enregistrer") {
          var c = choixComplet(false);
          voile.querySelectorAll("input[data-cat]").forEach(function (i) { c[i.getAttribute("data-cat")] = i.checked; });
          enregistrer(c);
        }
      });
    });
 
    voile.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { fermerPanneau(); return; }
      if (e.key !== "Tab") return;
      var f = voile.querySelectorAll("button, a[href], input");
      var premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    });
 
    document.addEventListener("click", function (e) {
      var lien = e.target.closest("[data-fgc-ouvrir]");
      if (lien) { e.preventDefault(); ouvrirPanneau(); }
    });
  }
 
  function ouvrirPanneau() {
    derniereCible = document.activeElement;
    var c = lire() || choixComplet(false);
    voile.querySelectorAll("input[data-cat]").forEach(function (i) { i.checked = !!c[i.getAttribute("data-cat")]; });
    voile.hidden = false;
    voile.querySelector("h2").setAttribute("tabindex", "-1");
    voile.querySelector("h2").focus();
  }
 
  function fermerPanneau() {
    voile.hidden = true;
    if (!lire()) { bandeau.hidden = false; bandeau.querySelector("[data-fgc='personnaliser']").focus(); }
    else if (derniereCible && derniereCible.focus) derniereCible.focus();
  }
 
  function enregistrer(nouveau) {
    var ancien = lire();
    ecrire(nouveau);
    voile.hidden = true;
    bandeau.hidden = true;
    document.dispatchEvent(new CustomEvent("fgc:choix", { detail: nouveau }));
 
    // Retrait d'un consentement : on efface les cookies concernés et on recharge
    // pour arrêter les scripts déjà lancés.
    var retrait = false;
    if (ancien) {
      CONFIG.categories.forEach(function (cat) {
        if (ancien[cat.id] && !nouveau[cat.id]) {
          retrait = true;
          if (cat.cookies) supprimerCookies(cat.cookies);
        }
      });
    }
    if (retrait) { location.reload(); return; }
    activer(nouveau);
    if (derniereCible && derniereCible.focus && document.contains(derniereCible)) derniereCible.focus();
  }
 
  /* ------------------------------------------------------------------ */
  /* Démarrage                                                           */
  /* ------------------------------------------------------------------ */
  function demarrer() {
    construire();
    var choix = lire();
    if (choix) activer(choix);
    else { activer(choixComplet(false)); bandeau.hidden = false; }
  }
 
  window.FGConsentement = {
    ouvrir: function () { ouvrirPanneau(); },
    choix: function () { return lire(); }
  };
 
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
 
const semaine = [
  'dimanche',
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi'
];

const moisAnnee = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre'
];

function afficherDate() {
  const time = new Date();
  const heure = String(time.getHours()).padStart(2, '0');
  const minute = String(time.getMinutes()).padStart(2, '0');
  const second = String(time.getSeconds()).padStart(2, '0');
  const jourDeLaSemaine = time.getDay();
  const jour = time.getDate();
  const mois = time.getMonth();
  const annee = time.getFullYear();

  const affichage = document.querySelector('.jeu');

  if (affichage) {
    affichage.textContent =
      "Aujourd'hui, nous sommes le " +
      semaine[jourDeLaSemaine] +
      ' ' +
      jour +
      ' ' +
      moisAnnee[mois] +
      ' ' +
      annee +
      ' — il est : ' +
      heure +
      ':' +
      minute +
      ':' +
      second;
  }
}

afficherDate();
setInterval(afficherDate, 1000);

const coeur = [
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,
  0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
  0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,
  0,1,0,0,0,0,0,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,0,0,0,0,1,0,
  0,0,1,0,0,0,1,0,1,0,0,1,1,0,0,0,0,1,1,0,0,1,0,1,0,0,0,1,0,0,
  0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,
  0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,
  0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
  0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
  0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
  0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
  0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
  0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
  0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,
  0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
  0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
  0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0
];

const cadre = document.getElementById('cadre');

if (cadre) {
  coeur.forEach((nombre) => {
    const div = document.createElement('div');
    div.classList.add('pixel');

    if (nombre === 1) {
      div.classList.add('rouge');
    }

    cadre.appendChild(div);
  });
}
    const pages = [
      {
        titre: "Les Trois Grâces",
        description: "Dessin de GOLI Gore Gbaka",
        url: "les-trois-graces.html",
        motsCles: "trois graces"
      },
      {
        titre: "Les Baigneuses",
        description: "Dessin de GOLI Gore Gbaka",
        url: "les-baigneuses.html",
        motsCles: "baigneuses"
      },
      {
        titre: "Le marché aux esclaves",
        description: "Dessin de GOLI Gore Gbaka",
        url: "le-marche-aux esclaves.html",
        motsCles: "marche esclaves"
      },
      {
        titre: "Le Christ et la SAmaritaine",
        description: "Dessin de GOLI Gore Gbaka",
        url: "le-christ-et-la-samaritaine.html",
        motsCles: "christ samaritaine"
      },
      {
        titre: "La Mort de la Vierge",
        description: "Dessin de GOLI Gore Gbaka",
        url: "la-mort-de-la-vierge.html",
        motsCles: "mort vierge"
      },
      {
        titre: "La conversion de saint paul",
        description: "Dessin de GOLI Gore Gbaka",
        url: "la-conversion-de-saint-paul.html",
        motsCles: "conversion saint paul"
      },
      {
        titre: "La visitation",
        description: "Dessin de GOLI Gore Gbaka",
        url: "la-visitation.html",
        motsCles: "visitation"
      },
      {
        titre: "The woman taken in adultery",
        description: "Dessin de GOLI Gore Gbaka",
        url: "the-woman-taken-in-adultery.html",
        motsCles: "woman taken adultery"
      },
      {
        titre: "La Naissance de Vénus",
        description: "Dessin de GOLI Gore Gbaka",
        url: "la-naissance-de-venus.html",
        motsCles: "naissance venus"
      },
      {
        titre: "La Madone des pèlerins",
        description: "Dessin de GOLI Gore Gbaka",
        url: "la-madone-des-pelerins.html",
        motsCles: "madone pelerins"
      },
      {
        titre: "La Madone des palefreniers",
        description: "Dessin de GOLI Gore Gbaka",
        url: "la-madone-des-palefreniers.html",
        motsCles: "madone palefreniers"
      },
      {
        titre: "La Liberté guidant le peuple",
        description: "Dessin de GOLI Gore Gbaka",
        url: "la-liberté-guidant-le-peuple.html",
        motsCles: "liberté guidant peuple"
      },
      {
        titre: "La Force",
        description: "Dessin de GOLI Gore Gbaka",
        url: "la-force.html",
        motsCles: "force"
      },
      {
        titre: "La Fiancée juive",
        description: "Dessin de GOLI Gore Gbaka",
        url: "la-fiancee-juive.html",
        motsCles: "fiancee juive"
      },
      {
        titre: "L'Odalisque blonde",
        description: "Dessin de GOLI Gore Gbaka",
        url: "l-odalisque-blonde.html",
        motsCles: "odalisque blonde"
      },
      {
        titre: "L'origine du monde",
        description: "Dessin de GOLI Gore Gbaka",
        url: "l-origine-du-monde.html",
        motsCles: "origine monde"
      },
      {
        titre: "L'heureuse mère",
        description: "Dessin de GOLI Gore Gbaka",
        url: "l-heureuse-mere.html",
        motsCles: "heureuse mere"
      },
      {
        titre: "Jupiter et Thétis",
        description: "Dessin de GOLI Gore Gbaka",
        url: "jupiter-et-thetis.html",
        motsCles: "jupiter thetis"
      },
      {
        titre: "Jésus et la Cananéenne",
        description: "Dessin de GOLI Gore Gbaka",
        url: "jesus-et-la-cananeenne.html",
        motsCles: "jesus cananeenne"
      },
      {
        titre: "Eglise Notre Dame de France Juvisy sur orge",
        description: "Dessin de GOLI Gore Gbaka",
        url: "eglise-notre-dame-de-france-juvisy-sur-orge.html",
        motsCles: "eglise dame  france juvisy sur orge"
      },
      {
        titre: "Bethsabée au bain tenant la lettre du roi david",
        description: "Dessin de GOLI Gore Gbaka",
        url: "bethsabee-au-bain-tenant-la-lettre-du-roi-david.html",
        motsCles: "bethsabee bain lettre  roi david"
      },


      {
        titre: "À propos",
        description: "Présentation de Goli Gore Gbaka",
        url: "a-propos.html",
        motsCles: "artiste biographie parcours"
      },
      {
        titre: "Galerie",
        description: "Découvrez les différents dessins",
        url: "galerie.html",
        motsCles: "dessins œuvres images art"
      },
      {
        titre: "Produits",
        description: "Présentation des œuvres disponibles",
        url: "produits.html",
        motsCles: "vente prix tableaux dessins"
      },
      {
        titre: "Cotation",
        description: "Cotation AKOUN",
        url: "cotation.html",
        motsCles: "cotation akoun"
      }
    ];

  document.addEventListener("DOMContentLoaded", () => {
  const formulaire = document.getElementById("formulaire-recherche");
  const champRecherche = document.getElementById("recherche");
  const zoneResultats = document.getElementById("resultats");

  if (!formulaire || !champRecherche || !zoneResultats) {
    console.error(
      "Éléments introuvables. Vérifiez les identifiants " +
      "formulaire-recherche, recherche et resultats."
    );
    return;
  }

  function normaliser(texte = "") {
    return String(texte)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  formulaire.addEventListener("submit", (event) => {
    event.preventDefault();

    const recherche = normaliser(champRecherche.value);

    if (!recherche) {
      afficherMessage("Veuillez saisir un mot-clé.");
      return;
    }

    const pagesTrouvees = pages.filter((page) => {
      const contenu = normaliser(
        `${page.titre} ${page.description} ${page.motsCles}`
      );

      return contenu.includes(recherche);
    });

    if (pagesTrouvees.length === 1) {
      window.location.assign(pagesTrouvees[0].url);
      return;
    }

    afficherResultats(pagesTrouvees);
  });

  function afficherMessage(texte) {
    zoneResultats.replaceChildren();

    const message = document.createElement("p");
    message.textContent = texte;

    zoneResultats.appendChild(message);
  }

  function afficherResultats(resultats) {
    zoneResultats.replaceChildren();

    if (resultats.length === 0) {
      afficherMessage("Aucune page trouvée.");
      return;
    }

    const titre = document.createElement("h2");
    titre.textContent = `${resultats.length} résultats trouvés`;

    const liste = document.createElement("ul");

    resultats.forEach((page) => {
      const element = document.createElement("li");
      const lien = document.createElement("a");

      lien.href = page.url;
      lien.textContent = page.titre;

      element.appendChild(lien);
      liste.appendChild(element);
    });

    zoneResultats.append(titre, liste);
  }
});
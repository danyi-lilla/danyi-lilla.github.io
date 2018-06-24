

export const hu = {
  app: {
    title: 'Logotools',
  },
  help: {
    title: 'Logopediai segedeszkozok',
    footer: {
      version: 'v1.0.0',
      legal: 'Az alkalmazas a Creative Commons Nevezd meg! - Ne add el! - Így add tovább! 2.5 Magyarország Licenc feltételeinek megfelelően felhasználható.',
    },
  },
  dates: {
    title: 'Datumok',
    format: 'YYYY MMMM DD',
    age: {
      title: 'Hany eves?',
      year: 'ev',
      month: 'honap',
      day: 'nap',
    },
    birth: {
      title: 'Mikor szuletett?',
      year: 'eves',
      month: 'honapos',
    },
    help: {
      title: 'Datumok',
      content: {__html: 'Kor es szuletesi ido szamolo kalkulator.<br /><br />A <b>HANY EVES?</b> modban kiszamolhato a <b>gyerek</b> szuletesi datuma alapjan a <b>pontos kora</b>. A szuletesi datum megadasa gyors es intuitiv. eloszor az evet valasztjuk ki, majd a honapot es a napot. Ha a keresett ev nem szerepel az elso oldalon, a fenti nyilakkal lapozni lehet az elozo es kovetkezo evekre. Hiba eseten visszalepesre is van lehetoseg. Ha kiszamoltunk egy datumot, a kalkulator egy gombnyomasra alaphelyzetbe is allithato.<br /><br />A <b>MIKOR SZULETETT?</b> modban a <b>gyerek szuletesi datuma</b> szamolhato ki a megadott korhoz kepest.'},
    },
  },
  words: {
    title: 'Szokereso',
    search: {
      title: 'Szokereso',
      inputs: {
        start: 'Kezdet',
        inner: 'Belso betuk',
        end: 'Vegzodes'
      },
      method: (m) => {
        switch (m) {
          case "irrelevant":
            return 'nem szamit'
          case "min":
            return 'minimum'
          case "max":
            return 'maximum'
          case "exactly":
            return 'pontosan'
          default:
            return ""
        }
      },
    },
    collection: {
      title: 'Mentett szavak',
      save: 'Szolista letoltese',
    },
    help: {
      title: 'Szokereso',
      content: {__html: 'Keress a tobb, mint <i>10.000</i> szavas <b>szogyujtemenyben</b> a megadott felteteleknek megfeleloen.<br /><br />Meghatarozhatod, hogy hogyan <b>kezdodjon</b> es <b>vegzodjon</b> a szo, megadhatod, hogy a szo belseje milyen <b>betuket tartalmazzon</b> (a sorrend tetszoleges lesz), valamint megkoteseket tehetsz a <b>szo hosszara</b> is.<br /><br />A keresesi eredmenybol a szavakat <b>elmentheted</b> az adott szora kattintva. A mentett szavak a bongeszod atmeneti tarolojaba kerulnek <i>(local storage)</i>, ahonnan le is tudod menteni azokat egy <b>txt fajl</b> formajaban.'}
    },
  },
  dice:{
    title: 'Dobokocka',
    regular: {
      title: 'Hagyomanyos',
    },
    multi: {
      title: 'Tetszoleges',
      roll: 'Dobas',
      lower: 'also hatar',
      upper: 'felso hatar',
    },
    help: {
      title: 'Dobokocka',
      content: {__html: 'Hagyomanyos <b>hatoldalu dobokocka</b> es <b>veletlenszam generator</b> tetszolegesen allithato also es felso hatarokkal.<br /><br />A hagyomanyos kockaval a kepernyore kattintva lehet dobni. Az eredmeny 1 es 6 kozott lesz.<br /><br />A veletlenszam generatorral egy also egy felso hatar kozott general az alkalmazas veletlenszeruen szamokat.'},
    },
  }
}

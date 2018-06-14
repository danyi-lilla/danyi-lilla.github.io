

export const hu = {
  app: {
    title: 'Logotools',
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
  },
  words: {
    title: 'Szokereso',
    search: {
      title: 'Szokereso',
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
      title: 'Mentett szavak'
    },
  },
  dice:{
    title: 'Dobokocka',
  }
}

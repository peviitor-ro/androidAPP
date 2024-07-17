# PeViitor

![GitHub](https://img.shields.io/github/license/peviitor/peviitor)

## Cuprins

- [Descriere](#descriere)
- [Prerequisite](#prerequisite)
- [Instalare](#instalare)
- [Rulare](#rulare)
- [Structura proiectului](#structura-proiectului)
- [Construirea aplicației](#construirea-aplicației)
- [Contribuții](#contribuții)
- [Licență](#licență)
- [Download (Android)](https://expo.dev/artifacts/eas/kPcnUzuySxqBPGQefupQAk.apk)

## Descriere

PeViitor este un motor de cautare pentru joburi. Motorul de cautare agregheaza joburi din mai multe surse. Utilizatorii pot vizualiza detalii și pot aplica direct pe site-ul angajatorului.

## Prerequisite

Înainte de a putea rula acest proiect, asigură-te că ai instalat următoarele:

- [Node.js](https://nodejs.org/) (versiunea LTS recomandată)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) sau [Xcode](https://developer.apple.com/xcode/) (pentru a rula aplicația pe dispozitive mobile)

Pentru a instala Expo CLI, folosește următoarea comandă:

```sh
npm install -g expo-cli
```

## Instalare

1. Clonează proiectul de pe GitHub:

```sh
git clone https://github.com/peviitor-ro/androidAPP.git
```

2. Intră în directorul proiectului:

```sh
cd androidAPP
```

3. Instalează dependențele proiectului:

```sh
npm install
```

## Rulare

Pentru a rula aplicația, folosește următoarea comandă:

```sh
npx expo start
```

## Structura proiectului

```
androidAPP
├── assets
│   ├── images
│   └── svgs
├── components
│   ├── About.js
│   ├── Button.js
│   ├── Card.js
│   ├── Dropdown.js
│   ├── Header.js
│   ├── Search.js
│   └── Web.js
├── constants
│   └── COLORS.js
├── landing
│   └── landing.queries.js
├── navigation
│   └── AppNavigator.js
├── screens
│   ├── Home.js
│   └── Results.js
├── services
│   ├── landing
│   │   └── landing.service.js
│   ├── Api.js
│   └── CONSTANTS.js
├── store
│   ├── jobs.selectors.js
│   └── jobs.state.js
├── .eslintrc.js
├── .gitignore
├── App.js
├── app.json
├── babel.config.js
├── eas.json
├── local.properties
├── metro.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Construirea aplicației

Pentru a construi aplicația, folosește următoarea comandă:

```sh
npx expo build:android
```

## Contribuții

...

## Licență

...

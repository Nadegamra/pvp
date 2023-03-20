# Produkto vystymo projektas
### APIE MUS:

Esame Kauno Technologijos Universiteto studentai ir kuriame projektą, kurio sprendžiama problema yra didelis nenaudojamų konsolių kiekis žmonių namuose.

Šio projekto galutinis rezultatas būtų platforma, kuri:

***leistų žmonėms skolinti savo nenaudojamas konsolės***

***leistų konsoles nuomojančioms įmonėms skolintis įvairias konsoles nuomai***

# Naudojimosi gidas

## Frontend paleidimas:

Platforma reikalauja Javascript paketų menedžerio NPM". NPM galima įdiegti su šia komanda:

#### `curl -qL https://www.npmjs.com/install.sh | sh`

Prieš paleidžiant programą reikia įvykdyti komanda:

#### `npm install`

(Komanda reikia vykdyti frontend aplanke)

Paleidimas:

#### `npm start`

## Backend paleidimas:

Norint pilnai išbandyti platformą reikia sukurti lokalią duomenų bazę'.  Projektas duomenų bazės valdymui naudoja Entity Framework Core (EF Core) paketą.

Paleidimas:

#### `Update-Database`

Prisijungimus prie duomenų bazės galima rasti AuthController.cs faile.
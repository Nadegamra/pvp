import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    header: {
                        home: 'Home',
                        contacts: 'Contacts',
                        FAQ: 'FAQ',
                        settings: {
                            light: 'Toggle light mode',
                            dark: 'Toggle dark mode'
                        },
                        profile: {
                            profile: 'Profile',
                            logout: 'Logout'
                        },
                        login: 'Login',
                        register: 'Register',
                        manageConsoles: 'Manage Consoles',
                        myConsoles: 'My Consoles',
                        borrowConsoles: 'Borrow Consoles',
                        chats: 'Chats',
                        lendRequests: 'Lend requests'
                    },
                    contacts: {
                        contactInfo: 'Contact Information',
                        businessInfo: 'Business Information',
                        companyCode: 'Company Code: ',
                        VATCode: 'VAT payer code: ',
                        address: 'Address: ',
                        email: 'Email: ',
                        phone: 'Phone: ',
                        fax: 'Fax: ',
                        businessHours1: 'Business hours',
                        businessHours2: 'Mon-Fri - 8am-5pm',
                        businessHours3: 'Sat-Sun - closed',
                        contactUs: 'Contact Us',
                        information: 'Information: ',
                        collaborationProposals: 'Collaboration proposals: ',
                        customerService: 'Customer service: '
                    },
                    faq: {
                        faq: 'Frequently asked questions',
                        q1: 'How is the protection of page data ensured?',
                        q2: 'How is the delivery of the selected option organized?',
                        q3: 'What to do if the delivery of the selected option is delayed?',
                        q4: 'Is it safe to use electronic banking on your website? What are the security requirements?',
                        q5: 'What is the goal of your website?',
                        q6: 'How long does it take to receive an order?',
                        q7: 'What rules do you apply for delivery and returns of goods?',
                        q8: "Is it possible to track a customer's order?",
                        q9: 'Are discounts or various benefits, gift coupons applied and used?',
                        q10: 'What are the prices of goods?',
                        q11: 'What to do if a customer wants to change an order?',
                        q12: 'Can a customer change or cancel an order if the shipment is already prepared or is traveling?',
                        q13: 'What to do if the shipment did not arrive?',
                        q14: 'Is it possible to return and get a refund?',
                        a1: 'It is ensured by European Union legislation, the General Data Protection Regulation, national data protection institutions, and their principles of operation.',
                        a2: 'Deliveries are organized with the help of couriers, sending the package directly to the home post or the appropriate post office.',
                        a3: 'In that case, you can wait up to 30 minutes. If the shipment is delayed for more than 30 minutes, ask for compensation.',
                        a4: 'Yes, it is safe. Our website will be linked to the national cyber security center and the website of the State Consumer Rights Protection Service.',
                        a5: 'Our goal is to create a website that acts as an intermediary between people who want to rent devices and companies that lend devices, and the measured impact corresponds to the result that lending companies will have more items that they can lend, and people who have rarely used devices will borrow them and earn from them.',
                        a6: 'Within 3 business days.',
                        a7: "The customer who comes to pick up the rented game console comes to pick it up himself. For example, if the customer rented a game console for 1 day, at 12:00, he can return it until 15:00 the next day. We give the customer time to make it convenient to return it. We usually adapt to the customer, how it suits him to return it. Extension is possible, but we ask customers to notify us in advance, not at the last minute, as there may be other customers waiting in line. We usually deduct the extension fee from the deposit and return a smaller deposit for the convenience of the customer, so that he does not have to think about the additional rental cost. Everything depends on the rental period. It can be 2, 4, 10 days, etc. We don't have specific hours for returning the item. The item is returned when both parties have time. Our shortest basic console rental period is 1 day. Some cheaper consoles are rented for 2 days. The customer is given the opportunity to extend the rental period as much as they want if the console is not reserved by another customer.",
                        a8: 'Yes, in your account.',
                        a9: 'Discounts are applied to older generation consoles, used devices, and poorly functioning devices.',
                        a10: 'They depend on the product.',
                        a11: 'It is possible to change or cancel the order no later than when the shipment is sent to the customer.',
                        a12: 'It is possible to change or cancel the order no later than when the shipment is sent to the customer.',
                        a13: 'In such a case, you may have to wait up to 30 minutes as you will not receive compensation until that time. If the shipment is delayed for more than 30 minutes, please request compensation.',
                        a14: 'Yes'
                    },
                    profile: {
                        personalInfo: 'Personal information',
                        companyInfo: 'Company information',
                        email: 'Email',
                        security: 'Security',
                        saveChanges: 'Save changes',
                        emailStatus: 'Email status',
                        firstName: 'First name',
                        lastName: 'Last name',
                        companyCode: 'Company code',
                        companyName: 'Company name',
                        dataSuccessMessage: 'Data has been updated successfully',
                        address: 'Address'
                    },
                    emailChangeForm: {
                        currentEmail: 'Current email',
                        unconfirmedEmails: 'Unconfirmed emails',
                        newEmail: 'New email address',
                        enterNewEmail: 'Enter new email address',
                        saveChanges: 'Save changes',
                        emailErrorRequired: 'New email adress is required'
                    },
                    passwordChangeForm: {
                        currentPassword: 'Current password',
                        enterCurrentPassword: 'Enter current password',
                        currentPasswordError: 'Current password is required',
                        newPassword: 'New password',
                        enterNewPassword: 'Enter new password',
                        newPasswordError: 'New password is required',
                        repeatNewPassword: 'Repeat new password',
                        enterRepeatNewPassword: 'Repeat new password',
                        repeatNewPasswordError: 'Repeating new password is required',
                        passwordMatchError: 'Passwords do not match',
                        saveChanges: 'Save changes',
                        passwordSuccessMessage: 'Password has been changed successfully',
                        passwordFailureMessage: 'Current password is incorrect'
                    },
                    addressForm: {
                        country: 'Country',
                        enterCountry: 'Enter country',
                        countryError: 'Country is required',
                        county: 'County',
                        enterCounty: 'Enter county',
                        countyError: 'County is required',
                        city: 'City',
                        enterCity: 'Enter city name',
                        cityError: 'City is required',
                        streetAddress: 'Street address',
                        enterStreetAddress: 'Enter street address',
                        streetAddressError: 'Street address is required',
                        postalCode: 'Postal code',
                        enterPostalCode: 'Enter postal code',
                        postalCodeError: 'Postal code is required',
                        saveChanges: 'Save changes',
                        addressSuccessMessage: 'Address has been updated successfully'
                    },
                    home: {
                        title1: 'Console Rental',
                        title2: 'We act as intermediaries between console renters',
                        selectBorrowText: 'Is your business in need of console rentals?',
                        selectBorrowButton: 'For Borrowers',
                        selectLendText:
                            'Do you have an unused console and want to earn some money?',
                        selectLendButton: 'For Lenders',
                        borrowers1: 'For Borrowers',
                        borrowers2:
                            'We can offer you a new source of consoles for rent for your business. You can borrow consoles from us for a fixed daily rate.',
                        borrowers3: 'Submit registration request',
                        lenders1: 'For Lenders',
                        lenders2:
                            "Do you have rarely used consoles? Maybe you bought a console for a specific game and don't use it anymore? Or do you just want to get your money back for it? In that case, this platform is for you.",
                        lenders3:
                            'You can rent out your console to others for a fixed daily rate, which depends on the console.',
                        lenders4: 'You can register now'
                    },
                    login: {
                        login: 'Login',
                        username: 'Email',
                        password: 'Password',
                        rememberMe: 'Remember Me'
                    },
                    footer: {
                        contacts: 'Contacts',
                        faq: 'Frequently asked questions',
                        register: 'Lender registration page',
                        registerRequest: 'Submit borrower registration request',
                        languages: 'Available languages: '
                    },
                    consoleManagementForm: {
                        console: 'Console Information',
                        name: 'Name',
                        nameError: 'Name is required',
                        description: 'Description',
                        descriptionError: 'Description is required',
                        dailyPrice: 'Daily Price',
                        dailypriceError: 'Daily Price is required',
                        images: 'Images',
                        imagesError: 'At least 2 images are required',
                        update: 'Update',
                        create: 'Create',
                        newConsole: 'New Console',
                        new: 'New'
                    },
                    userConsoleManagementForm: {
                        title: 'Console Information',
                        amount: 'Amount',
                        amountError: 'Amount is required',
                        accessories: 'Accessories',
                        accessoriesError: 'Accessories is required',
                        consoleCategory: 'Console Category',
                        consoleCategoryError: 'Console Category is required',
                        images: 'Images',
                        imagesError: 'At least 2 images are required',
                        update: 'Update',
                        create: 'Create',
                        newConsole: 'New Console',
                        new: 'New',
                        selectImages: 'Select images',
                        imagesL: 'images',
                        noImage: 'No images selected'
                    },
                    userConsolePage: {
                        consoleTitle: 'About console',
                        consoleName: 'Name',
                        consoleDescription: 'Description',
                        consoleIncome: 'Average monthly income (1 unit)',
                        lendTitle: 'Product details',
                        lendAmount: 'Amount (units)',
                        lendAccessories: 'Accessories',
                        lendStatus: 'Current status',
                        userTitle: 'About lender',
                        userFname: 'First name',
                        userLname: 'Last name',
                        userEmail: 'Email',
                        initiateTermination: 'Initiate console return',
                        contactUser: 'Contact user',
                        statusUnconfirmed: 'Awaiting contract signing',
                        statusAtPlatform: 'Awaiting to be lended',
                        statusReserved: 'Reserved',
                        statusAtLender: 'At lender',
                        statusTerminating: 'Awaiting contract termination',
                        changeStatus: 'Change Status',
                        dailyPrice: 'Daily price'
                    },
                    borrowerConsolePage: {
                        selectConsole: 'Select'
                    },
                    emailConfirmation: {
                        success: 'The email has been confirmed. You can now ',
                        login: 'login',
                        failure: 'The email confirmation code is invalid or expired.'
                    },
                    emailChange: {
                        success: 'The email has been changed. You can now ',
                        login: 'login',
                        failure: 'The email change code is invalid or expired.'
                    },
                    button: {
                        dialogTitle1: 'Confirmation message',
                        dialogBody1: 'Do you really wish to terminate the contract?',
                        dialogBody2: 'Do you really wish to change the console state?',
                        dialogBody3: 'Do you really wish to select this console for borrow?',
                        confirm: 'Yes',
                        deny: 'No'
                    },
                    borrowing: {
                        statusPending: 'Awaiting contract signing',
                        statusActive: 'Active',
                        statusTerminating: 'Awaiting console return'
                    }
                }
            },
            lt: {
                translation: {
                    header: {
                        home: 'Namai',
                        contacts: 'Kontaktai',
                        FAQ: 'DUK',
                        settings: {
                            light: 'Šviesus rėžimas',
                            dark: 'Tamsus rėžimas'
                        },
                        profile: {
                            profile: 'Profilis',
                            logout: 'Atsijungti'
                        },
                        login: 'Prisijungimas',
                        register: 'Registracija',
                        manageConsoles: 'Konsolių valdymas',
                        myConsoles: 'Mano konsolės',
                        borrowConsoles: 'Išnuomoti konsoles',
                        chats: 'Pokalbiai',
                        lendRequests: 'Skolinimo užklausos'
                    },
                    contacts: {
                        contactInfo: 'Kontaktinė informacija',
                        businessInfo: 'Rekvizitai',
                        companyCode: 'Įmonės kodas: ',
                        VATCode: 'PVM mokėtojo kodas: ',
                        address: 'Adresas: ',
                        email: 'El paštas: ',
                        phone: 'Telefonas: ',
                        fax: 'Faksas: ',
                        businessHours1: 'Darbo laikas',
                        businessHours2: 'I-V - 8-17h',
                        businessHours3: 'VI-VII - nedirbame',
                        contactUs: 'Galite susisiekti',
                        information: 'Informacija: ',
                        collaborationProposals: 'Bendradarbiavimo pasiūlymai: ',
                        customerService: 'Klientų aptarnavimas: '
                    },
                    faq: {
                        faq: 'Dažnai užduodami klausimai',
                        q1: 'Kaip užtikrinama puslapio duomenų apsauga?',
                        q2: 'Kaip organizuojamas pasirinkto varianto pristatymas?',
                        q3: 'Ką daryti jei pasirinkto varianto pristatymas vėluoja?',
                        q4: 'Ar saugu naudotis elektronine bankininkyste jūsų svetainėje? Kokie taikomi saugumo reikalavimai?',
                        q5: 'Koks jūsų svetainės tikslas?',
                        q6: 'Per kiek laiko bus gautas užsakymas?',
                        q7: 'Kokias taisykles taikote prekių pristatyme ir grąžinime?',
                        q8: 'Ar įmanoma sekti kliento užsakymą?',
                        q9: 'Ar taikomos ir naudojamos nuolaidos arba įvairios lengvatos, dovanų kuponai?',
                        q10: 'Kokie yra prekių įkainiai?',
                        q11: 'Ką daryti jei klientas nori pakeisti užsakymą?',
                        q12: 'Ar klientas gali pakeisti arba nutraukti užsakymą jei siunta jau paruošta arba keliauja?',
                        q13: 'Ką daryti jei siunta neatkeliavo?',
                        q14: 'Ar įmanomas grąžinimas ir pinigų atgavimas?',
                        a1: 'Ji yra užtikrinama Europos Sąjungos teisės aktais,bendruoju duomenų apsaugos reglamentu, nacionalinės duomenų apsaugos institucijomis ir jų veikimo principais.',
                        a2: 'Pristatymai organizuojami kurjerių pagalba atsiunčiant siuntą tiesiai į namų paštą arba atitinkamą paštomatą.',
                        a3: 'Tokiu atveju galite palaukti iki 30 minučių. Jei siunta vėluoja daugiau nei 30 minučių prašykite kompensacijos.',
                        a4: 'Taip , saugu . Mūsų tinklapis bus susietas su nacionaliniu kibernetinio saugumo centru bei su valstybinės vartotojų tesių apsaugos tarnybos tinklapiu.',
                        a5: 'Mūsų tikslas yra kuriamas interneto puslapis, skirtas tarpininkauti tarp žmonių, kurie nori skolinti įrenginius ir įmonių, kurios skolina įrenginius, o pamatuojamas poveikis atitinka rezultatą, kad skolinančios įmonės turės daugiau daiktų, kuriuos galės skolinti, o žmonės, kurie turi retai naudojamų įrenginių juos skolins ir iš jų užsidirbs.',
                        a6: 'Per 3 darbo dienas.',
                        a7: 'Klientas atvykęs atsiimti išsinuomotos žaidimo konsoles atvyksta pasiimti pats, jei klientas issinuomavo žaidimo konsolė 1 parai, kaip pavyzdys 12:00 valandą, tai sekančią dieną gali gražinti iki 15:00 valandos, mes duodame laiko klientui, kad būtų patogu gražinti. Dažniausiai prisitaikome prie kliento, kaip jam tinka grąžinti.Pratęsimas yra galimas, bet klientų prašome is anksto apie tai  pranešti, tai yra ne paskutinę minutę, kadangi galbūt yra jau yra laukiantys kiti klientai eilėje. Dažniausiai pratęsimo mokestį nuimame nuo depozito ir grąžiname mažesni depozitą dėl kliento patogumo, kad jam nereiktų galvoti dėl papildomos nuomos kainos.Viskas priklauso nuo to, kuriam laikotarpiui išnuomota konsolė. Gali būti 2,4,10 parų ir pan. Grąžinimo dieną konkrečios valandos neturime. Daiktas grąžinamas kuomet abi puses turi laiko. Mūsų trumpiausias bazinis konsolės skolinimosi terminas yra 1 para. Kaikurių pigių konsolių 2 paros. Klientui paliekama galimybė prasitesti nuomos laikotarpį tiek, kiek jis nori jeigu konsolė nėra rezervuota kito kliento.',
                        a8: 'Taip, savo paskyroje.',
                        a9: 'Taikomos  nuolaidos senesnių kartų konsolėms, naudotiems įrenginiams, bei prasčiau veikiantiems įrenginiams.',
                        a10: 'Jie priklauso nuo prekės.',
                        a11: 'Užsakymą pakeisti t.y atšaukti galima ne vėliau nei siunta yra pradėta siųsti klientui.',
                        a12: 'Užsakymą pakeisti t.y atšaukti galima ne vėliau nei siunta yra pradėta siųsti klientui.',
                        a13: 'Tokiu atveju galite palaukti iki 30 minučių, nes negausite kompensacijos iki tokio laiko. Jei siunta vėluoja daugiau nei 30 minučių prašykite kompensacijos.',
                        a14: 'Taip'
                    },
                    addressForm: {
                        country: 'Šalis',
                        enterCountry: 'Įveskite šalį',
                        countryError: 'Šalis yra privaloma',
                        county: 'Apskritis',
                        enterCounty: 'Įveskite apskritį',
                        countyError: 'Apskritis yra privaloma',
                        city: 'Miestas',
                        enterCity: 'Įveskite miestą',
                        cityError: 'Miestas yra privalomas',
                        streetAddress: 'Gatvės adresas',
                        enterStreetAddress: 'Įveskite gatvės adresą',
                        streetAddressError: 'Gatvės adresas yra privalomas',
                        postalCode: 'Pašto kodas',
                        enterPostalCode: 'Įveskite pašto kodą',
                        postalCodeError: 'Pašto kodas yra privalomas',
                        saveChanges: 'Išsaugoti pakeitimus',
                        addressSuccessMessage: 'Adresas atnaujintas sėkmingai'
                    },
                    profile: {
                        personalInfo: 'Asmeninė informacija',
                        companyInfo: 'Įmonės informacija',
                        email: 'El. pašto adresas',
                        security: 'Sauga',
                        saveChanges: 'Išsaugoti pakeitimus',
                        emailStatus: 'El pašto būsena',
                        firstName: 'Vardas',
                        lastName: 'Pavardė',
                        companyCode: 'Įmonės kodas',
                        companyName: 'Įmonės pavadinimas',
                        dataSuccessMessage: 'Duomenys atnaujinti sėkmingai',
                        address: 'Adresas'
                    },
                    emailChangeForm: {
                        currentEmail: 'Dabartinis el. pašto adresas',
                        unconfirmedEmails: 'Nepatvirtinti el. pašto adresai',
                        newEmail: 'Naujas el. pašto adresas',
                        enterNewEmail: 'Įveskite naują el. pašto adresą',
                        saveChanges: 'Išsaugoti pakeitimus',
                        emailErrorRequired: 'Naujas el. pašto adresas yra privalomas'
                    },
                    passwordChangeForm: {
                        currentPassword: 'Dabartinis slaptažodis',
                        enterCurrentPassword: 'Įveskite dabartinį slaptažodį',
                        currentPasswordError: 'Dabartinis slaptažodis yra privalimas',
                        newPassword: 'Naujas slaptažodis',
                        enterNewPassword: 'Įveskite naują slaptažodį',
                        newPasswordError: 'Naujas slaptažodis yra privalomas',
                        repeatNewPassword: 'Pakartokite naują slaptažodį',
                        enterRepeatNewPassword: 'Pakartokite naują slaptažodį',
                        repeatNewPasswordError: 'Naujo slaptažodžio pakartojimas yra privalomas',
                        saveChanges: 'Save changes',
                        passwordSuccessMessage: 'Slaptažodis pakeistas sėkmingai',
                        passwordFailureMessage: 'Neteisingas dabartinis slaptažodis',
                        passwordMatchError: 'Pateikti slaptažodžiai nesutampa'
                    },
                    home: {
                        title1: 'Konsolių nuoma',
                        title2: 'Tarpininkaujame tarp konsolių nuomotojų',
                        selectBorrowText: 'Jūsų verslui trūksta konsolių nuomai?',
                        selectBorrowButton: 'Besiskolinantiems',
                        selectLendText: 'Turite nenaudojamą konsolę ir norite uždirbti?',
                        selectLendButton: 'Skolintojams',
                        borrowers1: 'Besiskolinantiems',
                        borrowers2:
                            'Jūsų verslui galime pasiūlyti naują konsolių šaltinį nuomai. Pas mus galite skolintis konsoles nuomai už fiksuotą dieninį tarifą.',
                        borrowers3: 'Pateikti registracijos prašymą',
                        lenders1: 'Skolintojams',
                        lenders2:
                            'Ar jūs turite retai naudojamų konsolių? Galbūt jums pinigų nusipirktisekančios kartos konsolei? Ar tiesiog norite atgauti pinigus sumokėtus užją? Tokiu atveju ši platforma yra skirta jums.',
                        lenders3:
                            'Pas mus galite nuomoti savo konsolę už nustatytą dieninį tarifą, kuris priklauso nuo konsolės.',
                        lenders4: 'Galite užsiregistruoti dabar'
                    },
                    login: {
                        login: 'Prisijungimas',
                        username: 'El paštas',
                        password: 'Slaptažodis',
                        rememberMe: 'Prisimink mane'
                    },
                    footer: {
                        contacts: 'Kontaktai',
                        faq: 'Dažnai užduodami klausimai',
                        register: 'Skolintojų registracijos puslapis',
                        registerRequest: 'Pateikti besiskolinančio registracijos prašymą',
                        languages: 'Galimos kalbos: '
                    },
                    consoleManagementForm: {
                        console: 'Konsolės informacija',
                        name: 'Pavadinimas',
                        nameError: 'Reikia nurodyti pavadinimą',
                        description: 'Aprašymas',
                        descriptionError: 'Reikia nurodyti aprašymą',
                        dailyPrice: 'Dieninis tarifas',
                        dailypriceError: 'Reikia nurodyti dieninį tarifą',
                        images: 'Nuotraukos',
                        imagesError: 'Reikia įkelti bent 2 nuotraukas',
                        update: 'Atnaujinti',
                        create: 'Sukurti',
                        newConsole: 'Nauja konsolė',
                        new: 'Pridėti naują'
                    },
                    userConsoleManagementForm: {
                        title: 'Konsolės informacija',
                        amount: 'Kiekis',
                        amountError: 'Reikia nurodyti kiekį',
                        accessories: 'Priedai',
                        accessoriesError: 'Reikia nurodyti konsolės priedus',
                        consoleCategory: 'Konsolės kategorija',
                        consoleCategoryError: 'Reikia nurodyti konsolės kategoriją',
                        images: 'Nuotraukos',
                        imagesError: 'Reikia įkelti bent 2 nuotraukas',
                        update: 'Atnaujinti',
                        create: 'Sukurti',
                        newConsole: 'Nauja konsolė',
                        new: 'Pridėti konsolę',
                        selectImages: 'Įkelti nuotraukas',
                        imagesL: 'nuotraukos',
                        noImage: 'Nepasirinkta jokia nuotrauka'
                    },
                    userConsolePage: {
                        consoleTitle: 'Apie konsolę',
                        consoleName: 'Pavadinimas',
                        consoleDescription: 'Aprašymas',
                        consoleIncome: 'Vidutinės mėnesio pajamos (1vnt.)',
                        lendTitle: 'Nuomos detalės',
                        lendAmount: 'Nuomojamas kiekis (vnt.)',
                        lendAccessories: 'Priedai',
                        lendStatus: 'Dabartinė būsena',
                        userTitle: 'Apie skolintoją',
                        userFname: 'Vardas',
                        userLname: 'Pavardė',
                        userEmail: 'El. paštas',
                        initiateTermination: 'Inicijuoti konsolės grąžinimą',
                        contactUser: 'Susisiekti su vartotoju',
                        statusUnconfirmed: 'Laukiama sutarties pasirašymo',
                        statusAtPlatform: 'Laukiama nuomos',
                        statusReserved: 'Rezervuota',
                        statusAtLender: 'Pas nuomotoją',
                        statusTerminating: 'Laukiama sutarties nutraukimo',
                        changeStatus: 'Pakeisti būseną',
                        dailyPrice: 'Dienos kaina'
                    },
                    borrowerConsolePage: {
                        selectConsole: 'Pasirinkti'
                    },
                    emailConfirmation: {
                        success: 'Elektroninis paštas sėkmingai patvirtintas. Dabar galite ',
                        login: 'prisijungti',
                        failure:
                            'Elektroninio pašto patvirtinimo kodas yra neteisingas arba pasibaigusio galiojimo.'
                    },
                    emailChange: {
                        success: 'Elektroninis paštas sėkmingai pakeistas. Dabar galite ',
                        login: 'prisijungti',
                        failure:
                            'Elektroninio pašto pakeitimo kodas yra neteisingas arba pasibaigusio galiojimo.'
                    },
                    button: {
                        dialogTitle1: 'Patvirtinimo žinutė',
                        dialogBody1: 'Ar tikrai norite inicijuoti konsolės grąžinimą?',
                        dialogBody2: 'Ar tikrai norite pakeisti konsolės būseną?',
                        dialogBody3: 'Ar tikrai norite pasirinkti šią konsolę?',
                        confirm: 'Taip',
                        deny: 'Ne'
                    },
                    borrowing: {
                        statusPending: 'Laukiama sutarties pasirašymo',
                        statusActive: 'Aktyvu',
                        statusTerminating: 'Laukiama konsolės grąžinimo'
                    }
                }
            }
        }
    })

export default i18n

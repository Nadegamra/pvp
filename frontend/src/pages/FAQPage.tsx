import FaqCard from '../components/faq/FaqCard';

function FAQPage() {
    return (
        <div className="pb-10">
            <div className="text-fs-heading font-bold m-5">Dažnai užduodami klausimai</div>
            <FaqCard
                id={1}
                pos="top"
                buttonText="Kaip užtikrinama puslapio duomenų apsauga?"
                content="Ji yra užtikrinama Europos Sąjungos 
                        teisės aktais,bendruoju duomenų apsaugos 
                        reglamentu, nacionalinės duomenų apsaugos 
                        institucijomis ir jų veikimo principais."
            />
            <FaqCard
                id={2}
                pos="middle"
                buttonText="Kaip organizuojamas pasirinkto varianto pristatymas?"
                content="Pristatymai organizuojami kurjerių 
                        pagalba atsiunčiant siuntą tiesiai į 
                        namų paštą arba atitinkamą paštomatą."
            />
            <FaqCard
                id={3}
                pos="middle"
                buttonText="Ką daryti jei pasirinkto varianto pristatymas vėluoja?"
                content="Tokiu atveju galite palaukti iki 30 
                        minučių. Jei siunta vėluoja daugiau nei 
                        30 minučių prašykite kompensacijos."
            />
            <FaqCard
                id={4}
                pos="middle"
                buttonText="Ar saugu naudotis elektronine bankininkyste jūsų svetainėje? Kokie taikomi saugumo reikalavimai?"
                content="Taip , saugu . Mūsų tinklapis bus susietas 
                        su nacionaliniu kibernetinio saugumo centru bei su 
                        valstybinės vartotojų tesių apsaugos tarnybos tinklapiu."
            />
            <FaqCard
                id={5}
                pos="middle"
                buttonText="Koks jūsų svetainės tikslas?"
                content="Mūsų tikslas yra kuriamas interneto puslapis, 
                        skirtas tarpininkauti tarp žmonių, kurie nori 
                        skolinti įrenginius ir įmonių, kurios skolina 
                        įrenginius, o pamatuojamas poveikis atitinka 
                        rezultatą, kad skolinančios įmonės turės daugiau 
                        daiktų, kuriuos galės skolinti, o žmonės, kurie 
                        turi retai naudojamų įrenginių juos skolins ir 
                        iš jų užsidirbs."
            />
            <FaqCard
                id={6}
                pos="middle"
                buttonText="Per kiek laiko bus gautas užsakymas?"
                content="Per 3 darbo dienas."
            />
            <FaqCard
                id={7}
                pos="middle"
                buttonText="Kokius vėžėjus prekėms atsiųsti naudojate?"
                content="Naudojami visi Lietuvoje veikiantys kurjeriai."
            />
            <FaqCard
                id={8}
                pos="middle"
                buttonText="Ar įmanoma sekti kliento užsakymą?"
                content="Taip, internetinėje savo paskyroje galite."
            />
            <FaqCard
                id={9}
                pos="middle"
                buttonText="Ar taikomos ir naudojamos nuolaidos arba įvairios lengvatos, dovanų kuponai?"
                content="Taikomos  nuolaidos senesnių kartų konsolėms, naudotiems 
                        įrenginiams, bei prasčiau veikiantiems įrenginiams."
            />
            <FaqCard
                id={10}
                pos="middle"
                buttonText="Kokie yra prekių įkainiai?"
                content="Jie konkrečiai priklauso nuo atitinkamos prekės."
            />
            <FaqCard
                id={11}
                pos="middle"
                buttonText="Ką daryti jei klientas nori pakeisti užsakymą?"
                content="Užsakymą pakeisti t.y atšaukti galima ne 
                        vėliau nei siunta yra pradėta siųsti klientui."
            />
            <FaqCard
                id={12}
                pos="middle"
                buttonText="Ar klientas gali pakeisti arba nutraukti 
                            užsakymą jei siunta jau paruošta arba keliauja?"
                content="Užsakymą pakeisti t.y atšaukti galima ne 
                        vėliau nei siunta yra pradėta siųsti klientui."
            />
            <FaqCard
                id={13}
                pos="middle"
                buttonText="Ką daryti jei siunta neatkeliavo?"
                content="Tokiu atveju galite palaukti iki 30 minučių, 
                        nes negausite kompensacijos iki tokio laiko. 
                        Jei siunta vėluoja daugiau nei 30 minučių 
                        prašykite kompensacijos."
            />
            <FaqCard
                id={14}
                pos="middle"
                buttonText="Ar įmanomas grąžinimas ir pinigų atgavimas?"
                content="Tokiu atveju galite palaukti iki 30 minučių, 
                        nes negausite kompensacijos iki tokio laiko. 
                        Jei siunta vėluoja daugiau nei 30 minučių 
                        prašykite kompensacijos."
            />
            <FaqCard
                id={15}
                pos="middle"
                buttonText="Ar galima pasiskolinti įrenginius ir jei taip ar įmanoma ilgesniam laikotarpiui nei numatyta sutartyje?"
                content="Ne, nebent primokama atitinkama dalis prieš gaunant įrenginį"
            />
            <FaqCard
                id={16}
                pos="bottom"
                buttonText="Kokias taisykles taikote prekių pristatyme ir grąžinime?"
                content="Klientas atvykęs atsiimti išsinuomotos žaidimo konsoles 
                        atvyksta pasiimti pats, jei klientas issinuomavo žaidimo 
                        konsolė 1 parai, kaip pavyzdys 12:00 valandą, tai sekančią 
                        dieną gali gražinti iki 15:00 valandos, mes duodame laiko 
                        klientui, kad būtų patogu gražinti. Dažniausiai prisitaikome 
                        prie kliento, kaip jam tinka grąžinti.
                        Pratęsimas yra galimas, bet klientų prašome is anksto apie tai  
                        pranešti, tai yra ne paskutinę minutę, kadangi galbūt yra jau 
                        yra laukiantys kiti klientai eilėje. Dažniausiai pratęsimo mokestį 
                        nuimame nuo depozito ir grąžiname mažesni depozitą dėl kliento patogumo, 
                        kad jam nereiktų galvoti dėl papildomos nuomos kainos.
                        Viskas priklauso nuo to, kuriam laikotarpiui išnuomota konsolė. 
                        Gali būti 2,4,10 parų ir pan. Grąžinimo dieną konkrečios valandos 
                        neturime. Daiktas grąžinamas kuomet abi puses turi laiko. Mūsų 
                        trumpiausias bazinis konsolės skolinimosi terminas yra 1 para. 
                        Kaikurių pigių konsolių 2 paros. Klientui paliekama galimybė 
                        prasitesti nuomos laikotarpį tiek, kiek jis nori jeigu konsolė 
                        nėra rezervuota kito kliento."
            />
        </div>
    );
}

export default FAQPage;

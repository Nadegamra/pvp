import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <div className="bg-bg-tertiary py-3 pt-32">
                <div className="text-right text-fs-h1 mr-[20%] ">Konsolių nuoma</div>
                <div className="text-right text-fs-h1 mr-[20%]">ShareIt</div>
                <div className="text-right text-fs-h2 mr-[20%] mb-10">
                    Tarpininkaujame tarp konsolių nuomotojų
                </div>
                <div className="flex-row flex mt-60 mb-60">
                    <div className="flex-1"></div>
                    <div className="flex flex-col">
                        Jūsų verslui trūksta konsolių nuomai?
                        <a
                            href="#besiskolinantiems"
                            className="p-5 bg-bg-extra rounded-lg text-center m-3">
                            Besiskolinantiems
                        </a>
                    </div>
                    <div className="flex-1"></div>
                    <div className="flex flex-col">
                        Turite nenaudojamą konsolę ir norite uždirbti?
                        <a
                            href="#skolintojams"
                            className="p-5 bg-bg-extra rounded-lg text-center m-3">
                            Skolintojams
                        </a>
                    </div>
                    <div className="flex-1"></div>
                </div>
            </div>
            <div className="h-60"></div>
            <div id="besiskolinantiems" className="h-20"></div>
            <div className="bg-bg-tertiary mt-32 mb-80 py-5 h-96">
                <div className="text-fs-h1 ml-10 ">Besiskolinantiems</div>
                <div className="text-fs-h2 ml-14">
                    Jūsų verslui galime pasiūlyti naują konsolių šaltinį nuomai. Pas mus galite
                    skolintis konsoles nuomai už fiksuotą dieninį tarifą.
                    <div className="mt-5">
                        <Link
                            to="#"
                            className="cursor-pointer select-none my-auto mr-7 bg-bg-extra p-3 rounded-lg w-64">
                            Registracija
                        </Link>
                    </div>
                </div>
            </div>
            <div id="skolintojams" className="h-20"></div>
            <div className="bg-bg-tertiary mt-32 mb-80 py-5 h-96">
                <div className="text-fs-h1 ml-10">Skolintojams</div>
                <div className="text-fs-h2 ml-14 mb-60">
                    <div>
                        Ar jūs turite retai naudojamų konsolių? Galbūt jums pinigų nusipirkti
                        sekančios kartos konsolei? Ar tiesiog norite atgauti pinigus sumokėtus už
                        ją? Tokiu atveju ši platforma yra skirta jums.
                    </div>
                    <div>
                        Pas mus galite nuomoti savo konsolę už nustatytą dieninį tarifą, kuris
                        priklauso nuo konsolės.
                    </div>
                    <div className="mt-5">
                        <Link
                            to="/register"
                            className="cursor-pointer select-none my-auto mr-7 bg-bg-extra p-3 rounded-lg w-64">
                            Galite užsiregistruoti dabar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

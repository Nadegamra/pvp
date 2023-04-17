function ContactInfoPage() {
    return (
        <div>
            <div className="font-bold p-5 text-[30px]">Kontaktinė informacija</div>
            <div className="flex flex-col lg:flex-row">
                <div className="m-5 p-5 w-[300px] bg-bg-tertiary rounded-lg">
                    <span className="material-symbols-outlined align-middle pr-3 text-[70px]">
                        article
                    </span>
                    <div className="text-fs-heading">Rekvizitai</div>
                    <div className="text-fs-primary">MB „Įrenginių pernuomavimas”</div>
                    <div className="text-fs-primary">Įmonės kodas: 300030000 </div>
                    <div className="text-fs-primary">PVM mokėtojo kodas: LT123456789 </div>
                    <div className="text-fs-primary">Adresas: Studentų g. 40, Kaunas</div>
                    <div className="text-fs-primary">El paštas: info@nuoma.lt</div>
                    <div className="text-fs-primary">Telefonas: +370 6 123 4567 </div>
                    <div className="text-fs-primary">Faksas: +370 5 123 4567</div>
                </div>
                <div className="m-5 p-5 w-[200px] bg-bg-tertiary rounded-lg">
                    <span className="material-symbols-outlined align-middle pr-3 text-[70px]">
                        schedule
                    </span>
                    <div className="text-fs-heading">Darbo laikas</div>
                    <div className="text-fs-primary">I-V - 8-17h</div>
                    <div className="text-fs-primary">VI-VII - nedirbame</div>
                </div>
                <div className="m-5 p-5 w-[350px] bg-bg-tertiary rounded-lg">
                    <span className="material-symbols-outlined align-middle pr-3 text-[70px]">
                        mail
                    </span>
                    <div className="text-fs-heading">Galite susisiekti</div>
                    <div className="text-fs-primary">Informacija: info@nuoma.lt</div>
                    <div className="text-fs-primary">
                        Bendradarbiavimo pasiūlymai: bend@nuoma.lt
                    </div>
                    <div className="text-fs-primary">"Customer support": support@nuoma.lt</div>
                </div>
            </div>
        </div>
    );
}

export default ContactInfoPage;

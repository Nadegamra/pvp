function HomePage() {
    return (
        <div>
            <div>Konsolių nuoma</div>
            <div>Platformos pavadinimas</div>
            <div className="flex flex-row content-around">
                <div className="flex flex-col">
                    <button className="border p-5 mr-5">Besiskolinantiems</button>
                    Jūsų verslui trūksta konsolių skolinimui?
                </div>
                <div className="flex flex-col">
                    <button className="border p-5">Skolintojams</button>
                    Turite nenaudojamą konsolę ir norite uždirbti?
                </div>
            </div>
        </div>
    );
}

export default HomePage;

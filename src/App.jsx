import Calendar from 'src/components/Calendar.jsx';
import Map from './components/Map';
import Marketplace from './components/Marketplace';
import ClimateAlert from './components/ClimateAlert';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Frutos do Cerrado</h1>
                <nav>
                    <a href="#calendar">Calendário</a>
                    <a href="#map">Mapas</a>
                    <a href="#marketplace">Marketplace</a>
                    <a href="#climate">Dados Climáticos</a>
                </nav>
            </header>
            <main>
                <section id="calendar"><Calendar /></section>
                <section id="map"><Map /></section>
                <section id="marketplace"><Marketplace /></section>
                <section id="climate"><ClimateAlert /></section>
            </main>
        </div>
    );
}

export default App;

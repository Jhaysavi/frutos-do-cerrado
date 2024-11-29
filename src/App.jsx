import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '/src/pages/Home';
import Calendar from '/src/components/Calendar';
import Map from '/src/components/Map';
import Marketplace from '/src/components/Marketplace';
import ClimateAlert from '/src/components/ClimateAlert';
import About from '/src/pages/About';
import NotFound from '/src/pages/ NotFound.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Frutos do Cerrado</h1>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/calendar">Calendário</a>
                        <a href="/map">Mapa</a>
                        <a href="/marketplace">Marketplace</a>
                        <a href="/climate-alert">Dados Climáticos</a>
                        <a href="/about">Sobre</a>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/map" element={<Map />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/climate-alert" element={<ClimateAlert />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

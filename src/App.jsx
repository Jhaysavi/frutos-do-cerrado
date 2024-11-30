import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaHome, FaCalendarAlt, FaMapMarkedAlt, FaShoppingCart, FaCloudSun, FaUser, FaSearch } from 'react-icons/fa';
import Home from '/src/pages/Home';
import Calendar from '/src/components/Calendar';
import Map from '/src/components/Map';
import Marketplace from '/src/components/Marketplace';
import ClimateAlert from '/src/components/ClimateAlert';
import About from '/src/pages/About';
import NotFound from '/src/pages/ NotFound.jsx';

function App() {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <Router>
            <div className="App">
                {/* Top Header */}
                <header className="top-header">
                    <div className="logo-container">
                        <img src="logo.png" alt="logo frutos do cerrado" className="logo" />
                    </div>
                    <div className="actions">
                        <button className="search-icon" onClick={() => setShowSearch(!showSearch)}>
                            <FaSearch />
                        </button>
                        {showSearch && <input type="text" placeholder="Buscar..." className="search-input" />}
                        <div className="profile">
                            <FaUser />
                            <span>Perfil</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
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

                {/* Bottom Navigation */}
                <nav className="bottom-nav">
                    <Link to="/" className="nav-item">
                        <FaHome />
                        <span>Início</span>
                    </Link>
                    <Link to="/calendar" className="nav-item">
                        <FaCalendarAlt />
                        <span>Calendário</span>
                    </Link>
                    <Link to="/map" className="nav-item">
                        <FaMapMarkedAlt />
                        <span>Mapa</span>
                    </Link>
                    <Link to="/marketplace" className="nav-item">
                        <FaShoppingCart />
                        <span>Conteúdo</span>
                    </Link>
                    <Link to="/climate-alert" className="nav-item">
                        <FaCloudSun />
                        <span>Clima</span>
                    </Link>
                </nav>
            </div>
        </Router>
    );
}

export default App;

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    return (
        <MapContainer center={[-15.7942, -47.8822]} zoom={6} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-15.7942, -47.8822]}>
                <Popup>Área de Plantio Comunitário</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;

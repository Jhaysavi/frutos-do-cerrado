import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const mapRef = useRef(null); // Referência para o div onde o mapa será renderizado

  useEffect(() => {
    // Inicializa o mapa somente após o componente ser montado
    const map = L.map(mapRef.current).setView([-16.328125, -49.090977], 7);

    // Camada base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Grupos de camadas
    const quilombos = L.layerGroup();
    const reflorestamento = L.layerGroup();
    const desmatamento = L.layerGroup();
    const artesanato = L.layerGroup();

    // Adiciona pontos ao grupo de quilombos com cor laranja
    const quilombosData = [
      { code: "5200605", city: "Alto Paraíso de Goiás", name: "Vão do Rio Ocão", coords: [-14.131, -47.510] },
      { code: "5203203", city: "Barro Alto", name: "Associação Quilombola Antônio Borges", coords: [-14.968, -48.914] },
      { code: "5205307", city: "Cavalcante", name: "Altamira", coords: [-13.797, -47.457] },
      { code: "5208905", city: "Goiás", name: "Água de São João", coords: [-15.932, -50.140] },
      { code: "5213509", city: "Monte Alegre de Goiás", name: "Curral da Taboca", coords: [-13.229, -46.903] },
      { code: "5220603", city: "Silvânia", name: "Comunidade da GO - 010", coords: [-16.659, -48.608] },
      { code: "5217401", city: "Pires do Rio", name: "Arraial do Negro", coords: [-17.300, -48.278] },
      { code: "5219209", city: "Santa Cruz de Goiás", name: "Santa Cruz (Urbana)", coords: [-17.315, -48.476] },
      { code: "5213103", city: "Mineiros", name: "Cedro", coords: [-17.565, -52.556] },
      { code: "5204904", city: "Campos Belos", name: "Taquarussu", coords: [-13.036, -46.770] }
    ];

    quilombosData.forEach(q =>
      L.marker(q.coords, { icon: L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        shadowSize: [41, 41]
      }) }).bindPopup(`<b>${q.name}</b><br>${q.city} - Código IBGE: ${q.code}`).addTo(quilombos)
    );

    // Adiciona pontos de reflorestamento com cor verde
    const reflorestamentoData = [
      { city: "Anápolis", area: 2602.05, participation: 1.634, coords: [-16.326, -48.953] },
      { city: "Jaraguá", area: 2303.56, participation: 1.447, coords: [-15.756, -49.335] },
      { city: "Itaberaí", area: 1945.89, participation: 1.222, coords: [-16.020, -49.802] },
      { city: "Campo Limpo de Goiás", area: 1018.03, participation: 0.639, coords: [-16.299, -48.623] },
      { city: "Inhumas", area: 724.27, participation: 0.455, coords: [-16.356, -49.501] },
      { city: "Petrolina de Goiás", area: 708.54, participation: 0.445, coords: [-16.097, -49.338] },
      { city: "São Francisco de Goiás", area: 383.12, participation: 0.241, coords: [-15.926, -49.253] },
      { city: "Ouro Verde de Goiás", area: 261.93, participation: 0.165, coords: [-16.223, -49.170] },
      { city: "Brazabrantes", area: 180.7, participation: 0.113, coords: [-16.428, -49.394] },
      { city: "Heitoraí", area: 113.57, participation: 0.071, coords: [-15.719, -49.823] }
    ];

    reflorestamentoData.forEach(r =>
      L.marker(r.coords, { icon: L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        shadowSize: [41, 41]
      }) }).bindPopup(`<b>Reflorestamento</b><br>Município: ${r.city}<br>Área: ${r.area} ha<br>Participação: ${r.participation}%`).addTo(reflorestamento)
    );

    // Adiciona pontos de desmatamento com cor vermelha
    const desmatamentoData = [
      { city: "Simolândia", coords: [-14.464, -46.485] },
      { city: "Alvorada do Norte", coords: [-14.479, -46.490] },
      { city: "Damianópolis", coords: [-14.560, -46.178] },
      { city: "Flores de Goiás", coords: [-14.451, -47.060] },
      { city: "Sítio d’Abadia", coords: [-14.800, -46.258] }
    ];

    desmatamentoData.forEach(d =>
      L.marker(d.coords, { icon: L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        shadowSize: [41, 41]
      }) }).bindPopup(`<b>Desmatamento</b><br>Município: ${d.city}`).addTo(desmatamento)
    );

    // Adiciona controles de camadas
    const overlayMaps = {
      "Quilombos": quilombos,
      "Reflorestamento": reflorestamento,
      "Desmatamento": desmatamento,
      "Artesanato": artesanato
    };

    L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

    // Adiciona os grupos ao mapa por padrão
    quilombos.addTo(map);
    reflorestamento.addTo(map);
    desmatamento.addTo(map);

    // Limpeza: remove o mapa quando o componente for desmontado
    return () => {
      map.remove();
    };
  }, []); // A dependência vazia significa que o efeito rodará uma única vez, ao montar o componente

  return (
    <div style={{ height: '100vh' }}>
      <div ref={mapRef} style={{ height: '100%' }}></div>
    </div>
  );
};

export default MapComponent;

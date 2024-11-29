const climateData = {
    temperature: 28,
    humidity: 70,
    alert: 'Nenhum evento extremo detectado.',
};

const ClimateAlert = () => {
    return (
        <div>
            <h2>Dados Climáticos</h2>
            <p>Temperatura: {climateData.temperature}°C</p>
            <p>Umidade: {climateData.humidity}%</p>
            <p>Alerta: {climateData.alert}</p>
        </div>
    );
};

export default ClimateAlert;

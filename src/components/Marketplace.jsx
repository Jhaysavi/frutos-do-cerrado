const products = [
    { name: 'Mel Artesanal', contact: 'https://wa.me/123456789', image: 'https://via.placeholder.com/150' },
    { name: 'Artesanato em Palha', contact: 'https://wa.me/987654321', image: 'https://via.placeholder.com/150' },
];

const Marketplace = () => {
    return (
        <div>
            <h2>Marketplace Sustentável</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                {products.map((product, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                        <img src={product.image} alt={product.name} style={{ width: '150px' }} />
                        <h3>{product.name}</h3>
                        <a href={product.contact} target="_blank" rel="noopener noreferrer">
                            Contatar via WhatsApp
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;

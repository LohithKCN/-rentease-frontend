import React, { useEffect, useState } from "react";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://rentease-production-4.up.railway.app/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>RentEase Products</h1>

      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Rent: ₹{product.monthlyRent}</p>
        </div>
      ))}

    </div>
  );
}

export default App;
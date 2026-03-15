import React, { useEffect, useState } from "react";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://rentease-production-4.up.railway.app/api/products/all")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>RentEase Products</h1>

      {products.map(product => (
        <div key={product.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Rent: ₹{product.monthlyRent}</p>
        </div>
      ))}

    </div>
  );
}

export default App;
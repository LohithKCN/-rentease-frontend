import React, { useEffect, useState } from "react";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://rentease-production-4.up.railway.app/api/products/all")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  const rentProduct = async (productId) => {

    const rental = {
      product: { id: productId },
      quantity: 1,
      status: "ACTIVE"
    };

    await fetch(
      "https://rentease-production-4.up.railway.app/api/rentals/rent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rental)
      }
    );

    alert("Product rented successfully 🚀");
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>RentEase Products</h1>

      {products.map(product => (

        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px",
            width: "300px"
          }}
        >

          <img
            src={product.imageUrl || "https://picsum.photos/400/300"}
            alt={product.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover"
            }}
          />

          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>₹{product.monthlyRent} / month</p>

          <button
            onClick={() => rentProduct(product.id)}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer"
            }}
          >
            Rent Now
          </button>

        </div>

      ))}

    </div>
  );
}

export default App;
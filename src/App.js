import React, { useEffect, useState } from "react";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://rentease-production-4.up.railway.app/api/products/all")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4">RentEase Products</h1>

      <div className="row">

        {products.map(product => (

          <div className="col-md-4" key={product.id}>

            <div className="card mb-4 shadow">

              <div className="card-body">

                <h5 className="card-title">{product.name}</h5>

                <p className="card-text">{product.description}</p>

                <p><b>Category:</b> {product.category}</p>

                <p><b>City:</b> {product.city}</p>

                <p className="text-success">
                  ₹{product.monthlyRent} / month
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;
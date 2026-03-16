import React, { useEffect, useState } from "react";
import Rentals from "./Rentals";

function App() {

const [products, setProducts] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [page, setPage] = useState("products");

useEffect(() => {
fetch("https://rentease-production-4.up.railway.app/api/products/all")
.then(res => res.json())
.then(data => setProducts(data))
.catch(err => console.log(err));
}, []);

const confirmRent = async () => {

  if (!startDate || !endDate) {
    alert("Please select rental dates");
    return;
  }

  const rental = {
    product: { id: selectedProduct.id },
    quantity: 1,
    startDate: startDate,
    endDate: endDate,
    status: "ACTIVE",
    totalAmount: selectedProduct.monthlyRent
  };

  try {

    const response = await fetch(
      "https://rentease-production-4.up.railway.app/api/rentals/rent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rental)
      }
    );

    if (!response.ok) {
      throw new Error("Network error");
    }

    alert("Product rented successfully 🚀");

    setSelectedProduct(null);
    setStartDate("");
    setEndDate("");

  } catch (error) {
    console.log(error);
    alert("Error renting product");
  }

};

return (
<div style={{ padding: "20px" }}>


  <h1>RentEase</h1>

  <div style={{ marginBottom: "20px" }}>
    <button onClick={() => setPage("products")} style={{ marginRight: "10px" }}>
      Products
    </button>

    <button onClick={() => setPage("rentals")}>
      My Rentals
    </button>
  </div>

  {page === "products" && (

    <div>

      {selectedProduct && (

        <div style={{
          border: "1px solid black",
          padding: "20px",
          marginBottom: "20px",
          width: "300px"
        }}>

          <h3>Rent {selectedProduct.name}</h3>

          <label>From Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <br /><br />

          <label>To Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <br /><br />

          <button onClick={confirmRent}>
            Confirm Rent
          </button>

          <button
            onClick={() => setSelectedProduct(null)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>

        </div>
      )}

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px"
      }}>

        {products.map(product => (

          <div
            key={product.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px",
              width: "300px",
              borderRadius: "10px"
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
              onClick={() => setSelectedProduct(product)}
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

    </div>

  )}

  {page === "rentals" && <Rentals />}

</div>


);
}

export default App;

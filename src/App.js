import React, { useEffect, useState } from "react";
import Rentals from "./Rentals";

function App() {

  const BASE_URL = "https://rentease-production-4.up.railway.app";

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // 💬 CHAT STATES
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // ✅ LOAD PRODUCTS
  useEffect(() => {
    if (page === "products") {
      fetch(BASE_URL + "/api/products/all")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.log(err));
    }
  }, [page]);

  // ✅ LOGIN
  const login = async () => {
    try {
      const res = await fetch(BASE_URL + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const text = await res.text();

      if (text.includes("Invalid")) {
        alert("Login failed ❌");
      } else {
        localStorage.setItem("token", text);
        alert("Login success ✅");
        setPage("products");
      }

    } catch (error) {
      console.log(error);
      alert("Login error ❌");
    }
  };

  // ✅ REGISTER
  const register = async () => {
    try {
      const res = await fetch(BASE_URL + "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "USER"
        })
      });

      await res.json();
      alert("Registered successfully ✅");

    } catch (error) {
      console.log(error);
      alert("Register failed ❌");
    }
  };

  // 💬 SEND MESSAGE
  const sendMessage = () => {
    if (!message) return;
    setMessages([...messages, message]);
    setMessage("");
  };

  // ✅ RENT FUNCTION
  const confirmRent = async () => {

    if (!startDate || !endDate) {
      alert("Please select rental dates");
      return;
    }

    const token = localStorage.getItem("token");

    const rental = {
      product: { id: selectedProduct.id },
      quantity: 1,
      startDate,
      endDate,
      status: "ACTIVE",
      totalAmount: selectedProduct.monthlyRent
    };

    try {
      const response = await fetch(BASE_URL + "/api/rentals/rent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(rental)
      });

      if (!response.ok) throw new Error("Network error");

      alert("Product rented successfully 🚀");

      setSelectedProduct(null);
      setStartDate("");
      setEndDate("");

    } catch (error) {
      console.log(error);
      alert("Error renting product");
    }
  };

  // 🔐 LOGIN PAGE
  if (page === "login") {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

        <button onClick={login}>Login</button>

        <hr />

        <h3>Register</h3>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br /><br />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

        <button onClick={register}>Register</button>
      </div>
    );
  }

  // 🏠 MAIN APP
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

        <button
          onClick={() => {
            localStorage.removeItem("token");
            setPage("login");
          }}
          style={{ marginLeft: "10px", background: "red", color: "white" }}
        >
          Logout
        </button>
      </div>

      {/* PRODUCTS */}
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

              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /><br /><br />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /><br /><br />

              <button onClick={confirmRent}>Confirm Rent</button>
              <button onClick={() => setSelectedProduct(null)} style={{ marginLeft: "10px" }}>Cancel</button>
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {products.map(product => (
              <div key={product.id} style={{
                border: "1px solid gray",
                padding: "10px",
                width: "300px",
                borderRadius: "10px"
              }}>
                <img
                  src={product.imageUrl || "https://picsum.photos/400/300"}
                  alt={product.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
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

      {/* 💬 CHAT BUTTON */}
      <button
        onClick={() => setShowChat(!showChat)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "15px",
          borderRadius: "50%",
          background: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        💬
      </button>

      {/* 💬 CHAT BOX */}
      {showChat && (
        <div style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          width: "300px",
          height: "400px",
          background: "white",
          border: "1px solid gray",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          padding: "10px"
        }}>
          <h4>Chat Support</h4>

          <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>

          <input
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      )}

    </div>
  );
}

export default App;
import React, { useEffect, useState } from "react";

function Rentals() {

  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetch("https://rentease-production-4.up.railway.app/api/rentals/all")
      .then(res => res.json())
      .then(data => setRentals(data))
      .catch(err => console.log(err));
  }, []);

  return (

    <div style={{padding:"20px"}}>

      <h1>My Rentals</h1>

      {rentals.map(r => (

        <div key={r.id} style={{
          border:"1px solid gray",
          padding:"10px",
          margin:"10px",
          width:"300px"
        }}>

          <img
            src={r.product.imageUrl || "https://picsum.photos/400/300"}
            alt={r.product.name}
            style={{
              width:"100%",
              height:"200px",
              objectFit:"cover"
            }}
          />

          <h3>{r.product.name}</h3>

          <p><b>Status:</b> {r.status}</p>

          <p><b>Start Date:</b> {r.startDate}</p>

          <p><b>End Date:</b> {r.endDate}</p>

          <p><b>Price:</b> ₹{r.totalAmount}</p>

        </div>

      ))}

    </div>

  );
}

export default Rentals;
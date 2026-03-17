import React, { useEffect, useState } from "react";

function Rentals(){

 const [rentals,setRentals] = useState([]);

 useEffect(()=>{
   fetch("https://rentease-production-4.up.railway.app/api/rentals/all")
   .then(res=>res.json())
   .then(data=>setRentals(data));
 },[]);

 const returnProduct = async (id) => {

   await fetch(
     `https://rentease-production-4.up.railway.app/api/rentals/return/${id}`,
     {
       method:"PUT"
     }
   );

   alert("Product returned successfully");

   window.location.reload();
 };

 return(
  <div>

   <h2>My Rentals</h2>

   {rentals.map(r => (

     <div key={r.id} style={{border:"1px solid gray",margin:"10px",padding:"10px"}}>

       <p><b>Product:</b> {r.product.name}</p>

       <p><b>Status:</b> {r.status}</p>

       <p><b>From:</b> {r.startDate}</p>

       <p><b>To:</b> {r.endDate}</p>

       {r.status === "ACTIVE" && (

        <button onClick={()=>returnProduct(r.id)}>
          Return Product
        </button>

       )}

     </div>

   ))}

  </div>
 );
}

export default Rentals;
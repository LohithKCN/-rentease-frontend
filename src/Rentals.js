import React, { useEffect, useState } from "react";

function Rentals(){

 const [rentals,setRentals] = useState([]);

 useEffect(()=>{
   fetch("https://rentease-production-4.up.railway.app/api/rentals/all")
   .then(res=>res.json())
   .then(data=>setRentals(data));
 },[]);

 return(
  <div>

   <h2>My Rentals</h2>

   {rentals.map(r => (

     <div key={r.id}>
       <p>Product ID: {r.product.id}</p>
       <p>Status: {r.status}</p>
     </div>

   ))}

  </div>
 );
}

export default Rentals;
<div className="card mb-4 shadow">

<img
  src={product.imageUrl ? product.imageUrl : "https://picsum.photos/400/300"}
  alt={product.name}
  style={{ width: "100%", height: "200px", objectFit: "cover" }}
/>

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
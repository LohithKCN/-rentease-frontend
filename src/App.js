<div className="card mb-4 shadow">

  <img
    src={product.imageUrl ? product.imageUrl : "https://via.placeholder.com/300"}
    className="card-img-top"
    alt={product.name}
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
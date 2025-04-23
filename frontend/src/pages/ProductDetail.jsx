import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">Product not found.</div>;
  }
  console.log("Logged In?", isLoggedIn);

  return (
    <>
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-md-6">
        <img src={product.image?.startsWith("http") ? product.image : `/${product.image}`} alt={product.title} className="img-fluid rounded"/>
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Subcategory:</strong> {product.subcategory}</p>
          <p><strong>Metal & Purity:</strong> {product.purity}</p>
          <p><strong>Weight:</strong> {product.weight} grams</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>

          <div className="mt-4">
            <button
              className="btn btn-warning me-3"
              disabled={!isLoggedIn}
              onClick={() => alert("Added to cart")}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-success"
              disabled={!isLoggedIn}
              onClick={() => alert("Proceeding to buy")}
            >
              Buy Now
            </button>
            {!isLoggedIn && <p className="text-danger mt-2">Please login to make a purchase.</p>}
          </div>
        </div>
      </div>
    </div>
    <Footer />

    </>
  );
};

export default ProductDetail;

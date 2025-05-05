import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Checkout = ({ toastRef }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, cartItems } = location.state || {};

  const showToast = (message, type) => {
    toastRef.current?.show(message, type);
  };

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  // Combine cart or buy now item(s) into a common structure
  const itemsToCheckout = product
    ? [{ product, quantity: quantity || 1 }]
    : cartItems || [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) return showToast("Please log in to place the order.", "danger");
  
    // Basic validation
    const requiredFields = ["fullName", "phone", "email", "address", "city", "state", "zip", "country"];
    for (let field of requiredFields) {
      if (!form[field]?.trim()) {
        return showToast(`Please fill in ${field}`, "danger");
      }
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return showToast("Please enter a valid email address.", "danger");
    }
  
    if (!/^\d{10}$/.test(form.phone)) {
      return showToast("Please enter a valid 10-digit phone number.", "danger");
    }
  
    if (!/^\d{6}$/.test(form.zip)) {
      return showToast("Please enter a valid 6-digit ZIP code.", "danger");
    }
  
    // Calculate total amount
    const totalAmount = itemsToCheckout.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  
    // Razorpay Options
    const options = {
      key: "rzp_test_4rdgre6savrrmw", // ✅ Use your Razorpay Test Key
      amount: totalAmount * 100, // in paisa
      currency: "INR",
      name: "Jewellery Shop",
      description: "Order Payment",
      handler: async function (response) {
        try {
          // Simulate saving payment/order (you can connect this to your backend)
          console.log("Payment Success:", response);
  
          // Simulate order saving call
          const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              payment: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                // razorpay_signature: response.razorpay_signature, // optional
              },
              items: itemsToCheckout.map((item) => ({
                productId: item.product._id,
                quantity: item.quantity,
              })),
              shippingDetails: form,
            }),
          });
  
          const data = await res.json();
          if (res.ok) {
            showToast("✅ Order placed successfully!", "success");
            navigate("/order-success");
          } else {
            showToast("❌ " + data.message, "danger");
          }
        } catch (err) {
          console.error("Order error:", err);
          showToast("⚠️ Payment succeeded, but order failed. Contact support.", "danger");
        }
      },
      prefill: {
        name: form.fullName,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#f37254",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  // const handlePlaceOrder = async () => {
  //   key=process.env.REACT_APP_RAZORPAY_KEY_ID;
  //   if (!key) return showToast("Razorpay key not found.", "danger");
    
  //   const token = localStorage.getItem("token");
  //   if (!token) return showToast("Please log in to place the order.", "danger");
  
  //   // 🔍 Basic Form Validation
  //   const requiredFields = ["fullName", "phone", "email", "address", "city", "state", "zip", "country"];
  //   for (let field of requiredFields) {
  //     if (!form[field]?.trim()) {
  //       return showToast(`Please fill in ${field}`, "danger");
  //     }
  //   }
  
  //   // 📧 Email format validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(form.email)) {
  //     return showToast("Please enter a valid email address.", "danger");
  //   }
  
  //   // 📞 Phone number validation (basic 10-digit check for India)
  //   if (!/^\d{10}$/.test(form.phone)) {
  //     return showToast("Please enter a valid 10-digit phone number.", "danger");
  //   }
  
  //   // 🧾 Zip code validation (6 digits for India)
  //   if (!/^\d{6}$/.test(form.zip)) {
  //     return showToast("Please enter a valid 6-digit ZIP code.", "danger");
  //   }
  
  //   // ✅ All good — proceed with placing order
  //   try {
  //     const res = await fetch("/api/orders", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         items: itemsToCheckout.map((item) => ({
  //           productId: item.product._id,
  //           quantity: item.quantity,
  //         })),
  //         shippingDetails: form,
  //       }),
  //     });
  
  //     const data = await res.json();
  //     if (res.ok) {
  //       showToast("✅ Order placed successfully!", "success");
  //       navigate("/order-success");
  //     } else {
  //       showToast("❌ " + data.message, "danger");
  //     }
  //   } catch (err) {
  //     console.error("Order error:", err);
  //     showToast("Something went wrong.", "danger");
  //   }
  // };
  

  if (itemsToCheckout.length === 0) {
    return <div className="text-center mt-5">No items to checkout.</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Checkout</h2>
        <div className="row">
          {/* Shipping Details Form */}
          <div className="col-md-6">
            <div
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff3d3",
                  padding: "15px",
                  textAlign: "center",
                  borderRadius: "10px 10px 0 0",
                  marginBottom: "20px",
                }}
              >
                <h4 className="mb-3 rounded-3">Shipping Details</h4>
              </div>

              <form>
                {[
                  "fullName",
                  "phone",
                  "email",
                  "address",
                  "city",
                  "state",
                  "zip",
                  "country",
                ].map((field) => (
                  <div className="mb-3" key={field}>
                    <label htmlFor={field} className="form-label">
                      {field[0].toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={field}
                      className="form-control"
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      style={{ minWidth: "250px" }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-success w-100 mt-4"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Product Details (Order Summary) */}
          <div className="col-md-6">
            <div
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                backgroundColor: "#fff",
              }}
            >
              <h4 className="mb-3">Order Summary</h4>
              {itemsToCheckout.map((item, index) => (
                <div key={index} className="d-flex mb-3">
                  <img
                    src={
                      item.product.image?.startsWith("http")
                        ? item.product.image
                        : `/${item.product.image}`
                    }
                    alt={item.product.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    className="me-3"
                  />
                  <div>
                    <h5>{item.product.title}</h5>
                    <p>Price: ₹{item.product.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
              <hr />
              <h5>
                Total: ₹
                {itemsToCheckout.reduce(
                  (total, item) => total + item.quantity * item.product.price,
                  0
                )}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

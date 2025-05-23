import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const OurStory = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <>
      <img className="img-fluid" src="/desk-top-wear.jpg" alt="" />
      <div className="container mt-5">
        <h1
          className="text-center text-danger"
          style={{
            fontFamily: "Merriweather, serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)", 
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          Wear Your Legacy
        </h1>

        <p
          className="text-center"
          style={{
            fontFamily: "Merriweather, serif",
            fontSize: "clamp(1rem, 2.5vw, 2rem)", 
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          Discover timeless elegance with Wear Your Legacy jewellery.
          Handcrafted pieces designed to celebrate your unique story and lasting
          legacy.
        </p>

        <div className="d-flex justify-content-center">
          <img src="/custom-img-desktop.png" alt="" className="img-fluid" />
        </div>
      </div>

      {/* Contact Section */}
      <div className="container my-5">
        <h2
          className="text-center fw-bold mb-4"
          style={{
            fontFamily: "Merriweather, serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)", 
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          CONTACT US
        </h2>

        {/* Second Flex Row: All Contact Info Sections in Cards */}
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 text-start">
          {/* Ecommerce Contact */}
          <div className="flex-fill" data-aos="zoom-in">
            <div className="card h-100 shadow-sm border-warning border-2">
              <div className="card-body border-start border-4 border-warning ps-3">
                <h5 className="fw-bold">Get In Touch – Ecommerce</h5>
                <p className="mb-1">Toll Free: 1800 212 4558</p>
                <p className="mb-1">Direct: +91 8606 083 922</p>
                <p className="mb-1">
                  Email: ecomsupport@dhandapanijewellery.com
                </p>
                <strong>Easybuy Gold Scheme</strong>
                <p className="mb-1">Mob: 85900 99994</p>
                <p>Email: easybuy@dhandapanijewellery.com</p>
              </div>
            </div>
          </div>

          {/* Registered Address */}
          <div className="flex-fill" data-aos="zoom-in" data-aos-delay="100">
            <div className="card h-100 shadow-sm border-warning border-2">
              <div className="card-body border-start border-4 border-warning ps-3">
                <h5 className="fw-bold">Registered Office Address</h5>
                <p className="mb-1">Dhandapani Jewellery India Pvt Ltd</p>
                <p className="mb-1">Ward No.81, Door No.18, Dickenson Rd</p>
                <p>Near RBANM' School, Bengaluru, Karnataka, India - 560042</p>
              </div>
            </div>
          </div>

          {/* Corporate Office */}
          <div className="flex-fill" data-aos="zoom-in" data-aos-delay="200">
            <div className="card h-100 shadow-sm border-warning border-2">
              <div className="card-body border-start border-4 border-warning ps-3">
                <h5 className="fw-bold">Corporate Office</h5>
                <p className="mb-1">
                  Dhandapani Jewellery Corporate office,
                  <br />
                  Fathima Nagar, Aristo Road, East Fort,
                  <br />
                  Thrissur - 680005
                </p>
                <p className="mb-1">Ph: 0487-2443791, 2443810</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OurStory;

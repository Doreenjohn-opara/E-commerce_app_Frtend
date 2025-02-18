import TopBar from "../../components/Layouts/TopNav/topBar";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Checkout = () => {
  const [deliveryOption, setDeliveryOption] = useState("deliver"); // Default to "Deliver to me"

  const handleDeliveryOptionChange = (option: any) => {
    setDeliveryOption(option);
  };

  return (
    <>
      <TopBar />

      <section>
        <div className="d-flex justify-content-between align-items-center mb-1 font-aeonik">
          <div className="d-flex align-items-center">
            <div
              className="flash-sales-title text-warning"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "20px 300px",
              }}>
              KOP MALL
            </div>

            <div className="d-flex align-items-center timer">
              <div className="text-center">
                <p
                  style={{
                    margin: "0 1px",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}>
                  Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="d-flex justify-content-center align-items-right alert alert-warning">
          <img 
          src="../../../images/favs/speaker.png" 
          alt="Notification speaker" 
          className="img-fluid mx-3 "
          style={{ width: "40px" }}
          />
          <div className="text-center">
            To complete your order delivery, you'll receive a One-Time Password
            (OTP) on your phone. Be ready to use it and receive your goodies!
          </div>
        </div>
        
        <div className="row">
          {/* Left Side: Delivery Options */}
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">1. CHOOSE DELIVERY OPTION</h5>

                {/* Delivery to me */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="deliveryOption"
                    id="deliverToMe"
                    value="deliver"
                    checked={deliveryOption === "deliver"}
                    onChange={() => handleDeliveryOptionChange("deliver")}
                  />
                  <label className="form-check-label" htmlFor="deliverToMe">
                    Deliver to me
                  </label>
                  {deliveryOption === "deliver" && (
                    <div className="mt-3 p-3 border rounded bg-light">
                      <p className="mb-3">
                        Hi Buchi, click on "Add Delivery Address" to specify an
                        address
                      </p>
                      <button className="btn btn-warning">
                        Add Delivery Address
                      </button>
                    </div>
                  )}
                </div>

                {/* Pickup from store */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="deliveryOption"
                    id="pickupFromStore"
                    value="pickup"
                    checked={deliveryOption === "pickup"}
                    onChange={() => handleDeliveryOptionChange("pickup")}
                  />
                  <label className="form-check-label" htmlFor="pickupFromStore">
                    Pickup from store
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Order Details */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">ORDER DETAILS</h5>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="../../../images/favs/Gamepad.png"
                    alt="Product"
                    className="img-thumbnail me-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div>
                    <div>Havic HV G-92 Gamepad</div>
                    <div>Price: $192</div>
                    <div>Quantity: 1</div>
                  </div>
                </div>
                <hr />
                <div className="pt-3">
                  <div className="d-flex justify-content-between">
                    <span>Sub total:</span>
                    <span>$192.00</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold pt-1">
                    <span>Total:</span>
                    <span>$192.00</span>
                  </div>
                  <button className="btn btn-warning w-100 mt-3">
                    CHECKOUT ($192)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

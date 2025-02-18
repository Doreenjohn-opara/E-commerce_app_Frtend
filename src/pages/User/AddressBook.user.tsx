import Sidebar from "./Sidebar.user";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditAddress = () => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
    reciepientName: ""
    // city: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {/* Sidebar */}
          <Sidebar />

          <div className="col-md-9 border border-subtle-dark py-4 bg">
            <h4>Edit Address</h4>
            <hr />
            <form>
              <div className="row">
                <div className="row-md-6 mb-3">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="row-md-6 mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div className="row">
                <div className="row-md-6 mb-3">
                  <label className="form-label">State</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="mobileNumber"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className="row-md-6 mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="deliveryAddress"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter delivery address"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Zip Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="region"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter region"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-warning">
                Save Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAddress;

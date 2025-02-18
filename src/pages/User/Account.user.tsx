import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.user";

const AccountOverview = () => {
  return (
    <div className="container my-5">
      <div className="row">

        {/* Sidebar */}
        <Sidebar/>

        {/* Account Overview */}
        <div className="col-md-9 border border-subtle-dark pt-3" style={{borderRadius: '8px'}}>
          <h5 className="mb-4">Account Overview</h5>
          <hr className="py-1"/>
          <div className="row">
            {/* Account Details */}
            <div className="col-md-6">
              <div className="border p-3 rounded">
                <h6 className="text-dark">Account Details</h6>
                <hr />
                <p className="mb-0">Wave Adom</p>
                <p className="text-muted">iamwaveofficial@gmail.com</p>
              </div>
            </div>

            {/* Address Book */}
            <div className="col-md-6">
              <div className="border p-3 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="text-dark">Address Book</h6>
                  <Link to="/user/address-book" className="text-warning"><SlPencil color={"dark-yellow"}/></Link>
                </div>
                <hr />
                <p className="mb-0"><strong>Your default shipping address:</strong></p>
                <p className="mb-0">Wave Adom</p>
                <p className="mb-0">Shop G8-18 Arena market, Oshodi, Lagos</p>
                <p className="mb-0">OSHODI-BOLADE, Lagos</p>
                <p className="mb-0">+234 8072101662 / +234 8033542913</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;

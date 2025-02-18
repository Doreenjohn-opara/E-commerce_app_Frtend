import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { brandLogos } from "./categoryList/officialStores";

const OfficialStore = () => {
  return (
    <div>
      <h3 className="text-center m-5 font-aeonik fw-semibold">Official Store</h3>
      <div className="row text-center">
        {brandLogos.map((brand, index) => (
          <div key={index} className="col-md-2 col-6 mb-4">
            <img
              src={brand.logo}
              alt={brand.name}
              className="img-fluid"
              style={{ maxWidth: "100px", height: "auto" }}
            />
          </div>
        ))}
      </div>

      <img 
      className="mt-5 my-5 img-fluid"
      src="../../../images/essentials/guarantee.png" 
      alt="Guarantee Logo" 
      style={{ margin: "0 200px" }}
      />

      <div className="d-flex justify-content-evenly align-item-center mt-5">
      <img 
      src="../../../images/favs/Slider 3.png" 
      alt="Banner 1" 
      className="img-fluid my-4" style={{ width: "40%", height: "auto" }}
      />
        <img 
        src="../../../images/favs/Slider 2.jpg" 
        alt="Banner 2" 
        className="img-fluid my-4" style={{ width: "40%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default OfficialStore;

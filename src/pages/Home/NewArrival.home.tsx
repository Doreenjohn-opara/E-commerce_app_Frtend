import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewArrival = () => {
  return (
    <div className="font-aeonik">
        <div className="today-box fs-3">Featured</div>
      <h3 className="fw-bold text-dark mb-3">New Arrival</h3>
      <img
                src="../../../images/favs/new_arrivals.jpg" // Replace with product images
                className="card-img-top"
                alt="Products"
              />
    </div>
  );
};

export default NewArrival;

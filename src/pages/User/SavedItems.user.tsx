import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Sidebar from "./Sidebar.user";
import { RiDeleteBin6Line } from "react-icons/ri";

const SavedItems = () => {
    const [savedItems, setSavedItems] = useState([
        { 
            id: 1, 
            name: "Havic HV G-92 Gamepad", 
            price: "$162", 
            image: "../../../images/favs/Gamepad.png" 
        }
      ]);
  
      const handleRemove = (id: number) => {
        setSavedItems(savedItems.filter((item) => item.id !== id));
      };


  return (
    <>
      <div className="container my-5">
        <div className="row">
          {/* Sidebar */}
          <Sidebar />

          <div className="col-md-9 border border-subtle-dark py-4 bg">
            <h4>Saved Items</h4>
            {savedItems.length > 0 ? (
            <div className="card p-3">
                {savedItems.map((item) => (
              <div className="row align-items-center">
                <div className="col-md-2">
                  <img src={item.image} alt={item.name} className="img-fluid border py-2" style={{width: "80px", height: "80px", borderRadius: "6px"}}/>
                </div>
                <div className="col-md-6" style={{margin: "10px 3px"}}>
                  <h5>{item.name}</h5>
                  <p className="fw-bold">{item.price}</p>
                </div>
                <div className="col-md-2 text-end">
                  <Button variant="warning" className="fw-bold">
                    Buy Now!
                  </Button>
                  <div className="col-md-2 text-end">
                  <Button variant="text-decoration-none text-nowrap" className="text-dark mx-4 my-3" onClick={() => handleRemove(item.id)}>
                    <RiDeleteBin6Line size={20} /> Remove
                  </Button>
                </div>
                </div>
               
              </div>
               ))}
            </div>
            ) : (
                <div className="text-center p-5 border rounded">
                <img
                  src="../../../images/favs/savedItems.svg" 
                  alt="No saved items"
                  className="img-fluid mb-3"
                  style={{ maxWidth: "200px" }}
                />
                <h5>You don’t have any item saved yet!</h5>
                <p>
                  Found something you like? Tap on the heart-shaped icon next to the item to add it to your wishlist!
                  All your saved items will appear here.
                </p>
                <button className="btn btn-warning">Continue Shopping</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedItems;

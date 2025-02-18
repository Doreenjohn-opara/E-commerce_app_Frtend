import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.user";
import { useState } from "react";

// Define the type for an order
type Order = {
    id: number;
    name: string;
    date: string;
    status: string;
    image: string;
  };
  
  // Define the type for the orders object
  type Orders = {
    ongoing: Order[];
    closed: Order[];
  };

const Order = () => {
    const [activeTab, setActiveTab] = useState<"ongoing" | "closed">("ongoing");

    const orders = {
        ongoing: [
          {
            id: 217892,
            name: "Havic HV G-92 Gamepad",
            date: "21-06-2024",
            status: "Delivered",
            image: "../../../images/favs/Gamepad.png", // Replace with the actual image URL
          },
          {
            id: 217893,
            name: "SONY HV G-92 Television",
            date: "21-06-2024",
            status: "Delivered",
            image: "../../../images/favs/television.png", // Replace with the actual image URL
          },
        ],
        closed: [
          {
            id: 217894,
            name: "Havic HV G-92 Gamepad",
            date: "15-05-2024",
            status: "Closed",
            image: "../../../images/favs/black_gamepad.png", 
          },
          {
            id: 21567,
            name: "Havic HV G-92 Gamepad",
            date: "15-05-2024",
            status: "Refunded",
            image: "../../../images/favs/black_gamepad.png", 
          },
        ],
      };
    
      const handleTabClick = (tab: "ongoing" | "closed") => {
        setActiveTab(tab);
      };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {/* Sidebar */}
          <Sidebar />

            {/* Order */}
          <div className="col-md-9 border border-subtle-dark pt-3">
          <h5 className="mb-4">Orders</h5>
          <hr />
          <div className="d-flex mb-3">
            <button
              className={`btn btn-link border-none me-3 p-0 ${
                activeTab === "ongoing"
                  ? "text-warning border-bottom border-warning fw-bold"
                  : "text-secondary"
              }`}
              onClick={() => handleTabClick("ongoing")}
            >
              ONGOING/DELIVERED ({orders.ongoing.length})
            </button>
            <button
              className={`btn btn-link border-none p-0 ${
                activeTab === "closed"
                  ? "text-warning border-bottom border-warning fw-bold"
                  : "text-secondary"
              }`}
              onClick={() => handleTabClick("closed")}
            >
              CLOSED ORDERS ({orders.closed.length})
            </button>
          </div>
          <div className="row">
            {orders[activeTab].map((order: Order) => (
              <div key={order.id} className="col-12 mb-3">
                <div className="border p-3 rounded d-flex align-items-center">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="img-fluid rounded me-3"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{order.name}</h6>
                    <p className="mb-1 text-muted">Order {order.id}</p>
                    <p className="mb-0">
                      <span
                        className={`badge ${
                          order.status === "Delivered"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {order.status}
                      </span>
                    </p>
                    <p className="text-muted mb-0">On {order.date}</p>
                  </div>
                  <Link to="/user/order-details" className="text-warning">
                    SEE DETAILS
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Order;

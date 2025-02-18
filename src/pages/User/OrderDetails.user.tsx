import React from "react";
import Sidebar from "./Sidebar.user";

const OrderDetails = () => {
  const order = {
    id: 217892,
    date: "21-06-2024",
    items: [
      {
        name: "Havic HV G-92 Gamepad",
        quantity: 1,
        price: 162,
        status: "Delivered",
        image: "../../../images/favs/Gamepad.png",
      },
    ],
    payment: {
      method: "Transfer",
      total: 167,
      itemTotal: 162,
      deliveryFee: 5,
    },
    delivery: {
      method: "Door Delivery",
      address: "Wave Adom, This is a placeholder for the delivery address",
    },
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {/* Sidebar */}
          <Sidebar />

            <div className="col-md-9 border border-subtle-dark py-4 bg-white rounded-lg shadow-md max-w-3xl mx-auto font-aeonik">
              <h3 className="fw-2 fw-semibold">Order Details</h3>
              <hr />
              <p className="text-gray-600">
                Order <span className="text-decoration-underline">no {order.id}</span>
              </p>
              <p className="text-body-secondary">{order.items.length} items</p>
              <p className="text-body-secondary">Placed on {order.date}</p>
              <p className="fw-semibold text-body-secondary">Total: ${order.payment.total}</p>

              <h3 className="mt-5 fw-2 fw-semibold">ITEMS IN YOUR ORDER</h3>
              {order.items.map((item, index) => (
                <div key={index} className="p-3 border rounded mt-2">
                  <span className="badge bg-success text-white mb-3">
                    {item.status}
                  </span>
                  <p className="text-muted">{order.date}</p>
                  <div className="d-flex align-items-center mt-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ width: '80px', height: '80px' }}
                    />
                    <div className="ms-3">
                      <p className="fw-semibold">{item.name}</p>
                      <p className="text-muted">QUANTITY: {item.quantity}</p>
                      <p className="fw-bold">${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="p-3 border rounded">
                  <h4 className="fw-semibold">PAYMENT INFORMATION</h4>
                  <p className="fs-5">Payment Method</p>
                  <p className="text-muted">{order.payment.method}</p>
                  <h5 className="mt-2 fw-semibold">Payment Details</h5>
                  <p className="text-muted">
                    Items total: ${order.payment.itemTotal}
                  </p>
                  <p className="text-muted">
                    Delivery fees: ${order.payment.deliveryFee}
                  </p>
                  <p className="fw-bold">Total: ${order.payment.total}</p>
                </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 border rounded">
                  <h4 className="fw-semibold">DELIVERY INFORMATION</h4>
                  <p className="text-muted">Delivery Method</p>
                  <p className="text-muted">{order.delivery.method}</p>
                  <h5 className="mt-2 fw-semibold">Shipping Address</h5>
                  <p className="text-muted">{order.delivery.address}</p>
                </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;

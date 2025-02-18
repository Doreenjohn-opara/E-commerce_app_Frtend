import { ICartSummary } from "../../utils/interface.utils";

const CartSummary: React.FC<ICartSummary>  = ({ subtotal, onCheckout }) => {
    return (
      <>
      <div className="card w-45">
        <div className="card-body">
            <h5 className="card-title">Cart Summary</h5>
            <hr />
            <p className="card-text text-left">Subtotal: NGN {subtotal.toFixed(2)}</p>
            <hr />
            <button className="btn btn-warning w-30 mt-2" onClick={onCheckout}>
              Checkout (NGN {subtotal.toFixed(2)})
            </button>
        </div>
      </div>
      </>
    );
  };
  
  export default CartSummary;
  
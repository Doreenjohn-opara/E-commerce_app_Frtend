import { IProduct } from "../../utils/interface.utils";


const Tabs: React.FC<{ productData: IProduct }> = ({ productData }) => {
    return (<></>
    // <div>
    //   <ul className="nav nav-tabs my-4" id="productTab" role="tablist">
    //     <li className="nav-item" role="presentation">
    //       <button className="nav-link active" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-selected="true">
    //         Description
    //       </button>
    //     </li>
    //     <li className="nav-item" role="presentation">
    //       <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab" aria-selected="false">
    //         Reviews
    //       </button>
    //     </li>
    //   </ul>
    //   <div className="tab-content">
    //     {/* Description Tab */}
    //     <div className="tab-pane fade show active" id="details" role="tabpanel">
    //       <table className="table">
    //         <tbody>
    //           <tr>
    //             <th>Weight</th>
    //             <td>{productData.tabs.weight}</td>
    //           </tr>
    //           <tr>
    //             <th>Color</th>
    //             <td>{productData.tabs.color}</td>
    //           </tr>
    //           <tr>
    //             <th>Brand</th>
    //             <td>{productData.tabs.brand}</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //       <p>{productData.description}</p>
    //     </div>
  
    //     {/* Reviews Tab */}
    //     {/* <div className="tab-pane fade" id="reviews" role="tabpanel">
    //       {productData.reviews.length > 0 ? (
    //         productData.reviews.map((review, index) => <p key={index}>{review}</p>)
    //       ) : (
    //         <p>No reviews for this product.</p>
    //       )}
    //     </div> */}
    //   </div>
    // </div>
    );
};

export default Tabs;

  
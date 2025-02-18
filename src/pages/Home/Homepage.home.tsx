import React, { useEffect } from "react";
import Slider from "../Home/Slider.home";
import FlashSales from "../Home/FlashSale.home";
import NewArrival from "../Home/NewArrival.home";
import BrowseCategory from "../Home/BrowseCategory.home";
import OfficialStore from "../Home/OfficialStore.home";
import OurProducts from "../Home/OurProduct.home";
import { useProductContext } from "../../Hook/useProduct.hook";
import { productService } from "../../services/Product.service";
import { Spinner } from "react-bootstrap";

const Homepage = () => {
  const { state, dispatch } = useProductContext()

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_PRODUCTS_START" })
      try {
        const products = await productService.getProducts()
        dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: products })

        const flashSales = await productService.getFlashSales()
        dispatch({ type: "FETCH_FLASH_SALES_SUCCESS", payload: flashSales })

      } catch (error) {
        dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: "Failed to fetch products" })
      }
    }
    fetchData()
    }, [dispatch])


    if (state.isLoading) {
      return (
        <div>
          <Spinner animation="border" size="sm" /> Loading...
        </div>
      );
    }
  
    // if (state.error) {
    //   return <div>Error: {state.error}</div>
    // }



  return (
    <>
      {/* Slider Section */}
      <Slider />

      {/* Flash Sales Section */}
      <section className="container my-4">
        <FlashSales products={state.flashSales}/>
      </section>

      <section>
        <img 
        src="../../../images/favs/Banner 1.jpg" 
        alt="Advert banner" 
        className="w-100 my-5"
        />
      </section>

      {/* New Arrival Section */}
      <section className="container my-4">
        <NewArrival />
      </section>

      {/* Our Products Section */}
      <section className="container my-4">
        <OurProducts productsProp={state.products}/>
      </section>

      {/* Browse by Category Section */}
      <section className="container my-4">
        <BrowseCategory />
      </section>

      {/* Official Store Section */}
      <section className="container my-4">
        <OfficialStore />
      </section>
    </>
  );
};

export default Homepage;

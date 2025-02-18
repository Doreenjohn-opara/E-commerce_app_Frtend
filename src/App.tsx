import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Auth/Signup.auth';
import Login from './pages/Auth/Login.auth';
import ForgotPassword from './pages/Auth/ForgotPassword.auth';
import ResetPassword from './pages/Auth/ResetPassword.auth';
import SuccessPage from './pages/Auth/SuccessPage';
import ErrorPage from './pages/Auth/ErrorPage';
import MasterLayout from './components/Layouts/MasterLayout/masterLayout';
import CheckEmail from './pages/Auth/CheckEmail.auth';
import VerifyToken from './pages/Auth/VerifyToken.auth';
import Homepage from './pages/Home/Homepage.home';
import SearchProduct from './pages/Product/Search.product';
import CartPage from './pages/Cart/CartPage.cart';
import Checkout from './pages/Cart/Checkout.cart';
import ProductDetails from './pages/Product/ProductDetail.product';
import AccountOverview from './pages/User/Account.user';
import Order from './pages/User/Order.user';
import OrderDetails from './pages/User/OrderDetails.user';
import SavedItem from './pages/User/SavedItems.user';
import EditAddress from './pages/User/AddressBook.user';


const App: React.FC = () => {

  return (
    <Router>
        <div className='app'>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/check-email" element={<CheckEmail />}/>
            <Route path="/verify-token" element={<VerifyToken />}/>
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/" element={<MasterLayout />}>
                <Route path="" element={<Homepage />} />
                <Route path="/search" element={<SearchProduct />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/user/account" element={<AccountOverview />} />
                <Route path="/user/orders" element={<Order />} />
                <Route path="/user/order-details" element={<OrderDetails />} />
                <Route path="/user/saved-items" element={<SavedItem />} />
                <Route path="/user/edit-address" element={<EditAddress />} />
                



            </Route>
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
    </Router> 
  );
}

export default App;

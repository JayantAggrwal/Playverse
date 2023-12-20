import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { Header, Footer, Loader } from "./Component";
import {
  Home,
  ProductList,
  Cart,
  WishList,
  ProductDetail,
  PageNotFound,
  Profile,
  Login,
  SignUp,
  Checkout,
  OrderSuccess,
} from "./Pages";
import {
  UserProfile,
  UserAddress,
  UserOrders,
} from "./Pages/Profile/Components";
import MockMan from "mockman-js";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import { useData } from "./Context/DataContext";

function App() {
  const { loader } = useData();
  return (
    <div className="app">
      {loader && <Loader />}
      <ToastContainer
        position="top-right"
        // autoClose={false}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
        autoClose={5000}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/productList/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mock" element={<MockMan />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route path="user" element={<UserProfile />} />
          <Route path="address" element={<UserAddress />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/orderSuccess"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishList"
          element={
            <PrivateRoute>
              <WishList />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

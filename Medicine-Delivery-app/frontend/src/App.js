import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LabTests from "./pages/LabTests";
import Cart from "./pages/Cart";
import MultipleShops from "./pages/MultipleShops";
import Products from "./pages/Products";
import Singleproduct from "./pages/Singleproduct";
<<<<<<< HEAD
import  Success  from "./pages/SuccessPage";
=======
import { useSelector } from "react-redux";
>>>>>>> 9d4d52b2ddcd47ee7f16d2d2c8ebceeb5e46beab

const App = () => {
  const user = useSelector(state => state.user.currentUser)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {user ? (
          <Route path="/login" element={<Navigate to="/" />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/labtests" element={<LabTests />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/nearbypharmacies" element={<MultipleShops />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/product/:id" element={<Singleproduct />} />
        
        
        
      </Routes>
    </Router>
  );
};

export default App;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem"
import { useEffect, useState } from "react";

const Cart = () => {
  const {cart} = useSelector((state) => state)
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect( () => {
    setTotalAmount(cart.reduce( (acc, curr) => acc + curr.price,0) )
  }, [cart])

  return (
    <div className="w-full max-w-[1000px] mx-auto pt-4 relative">
      {
        cart.length > 0 ? 
        (<div className="flex justify-between">
          <div className="mt-16">
            {
              cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))
            }
          </div>
          <div className="mt-32 flex flex-col justify-between h-[500px] fixed right-72">
            <div>
              <div className="uppercase text-green-700 font-semibold">Your Cart</div>
              <div className="uppercase text-green-700 font-bold text-4xl">Summary</div>
              <p className="mt-3 font-bold">
                <span>Total Item: {cart.length}</span>
              </p>
            </div>

            <div>
              <p className="">Total Amount: <span className="font-bold">${totalAmount.toFixed(2)}</span></p>
              <button className="mt-2 bg-green-700 w-full text-white py-2 rounded-md">Checkout Now</button>
            </div>
            
          </div>
        </div>) :

        (<div className="h-screen flex justify-center items-center flex-col">
          <h1>Your cart is Empty</h1>
          <Link to="/">
            <button className="bg-green-700 py-3 px-8 mt-3 rounded-lg text-white">
              Shop Now
            </button>
          </Link>
        </div>)
      }


    </div>
  );
};

export default Cart;



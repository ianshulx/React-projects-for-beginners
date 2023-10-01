import {MdDelete} from "react-icons/md"
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import {toast} from "react-hot-toast";

const CartItem = ({item}) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  }

  return (
    <div className="w-full border-b-2 p-6 mt-3 flex border-black">

      <div className="w-full flex justify-between gap-x-10">
    
        <div className="w-[170px] object-fill">
          <img src={item.image} alt="" className=""/>
        </div>

        <div className="w-[450px] flex flex-col gap-y-4">
          <h1 className="font-semibold text-lg">{item.title}</h1>
          <h1 className="text-sm">{item.description.split(" ").slice(1,20).join(" ") + "..."}</h1>
          <div className="flex justify-between">
            <p className="text-green-700 font-semibold">${item.price}</p>
            <div
              className="bg-pink-200 p-3 rounded-full hover:cursor-pointer"
              onClick={removeFromCart}
            >
              <MdDelete />
            </div>
          </div>

        </div>
      
      
      </div>

    </div>
  );
};

export default CartItem;



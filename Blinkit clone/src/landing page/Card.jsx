import { useDispatch, useSelector } from "react-redux";
import { addToBag } from "../store/slices/SliceWish";
import toast from "react-hot-toast";

export default function Card({ id, img, title, desc, price }) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const cartData = useSelector((state) => state.cart);

    const handleAddToCart = (id) => {
        if (!isLoggedIn) {
            toast("Please login first to add items to cart!");
            return;
        }
        const exists = cartData.find((e) => e.id === id);
        if (exists) {
          toast("Already added! 😅");
          return;
        }

        dispatch(addToBag({ id, img, title, desc, price }));
        toast.success("Successfully Added 😀")
    };

    return (
        <div className="min-w-[180px] max-w-[180px] bg-white rounded-lg shadow-sm border p-3 flex flex-col">
            <img src={img} alt={title} className="h-24 object-contain mb-2" />

            <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
            <p className="text-xs text-gray-500 mb-2">{desc}</p>

            <div className="flex justify-between items-center mt-auto">
                <p className="font-semibold text-sm">₹{price}</p>
                <button
                    onClick={() => handleAddToCart(id)}
                    className="border border-green-700 text-green-700 px-3 py-1 rounded-md text-xs hover:bg-green-700 hover:text-white transition"
                >
                    ADD
                </button>
            </div>
        </div>
    );
}

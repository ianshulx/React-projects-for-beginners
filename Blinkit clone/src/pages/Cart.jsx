import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Trash } from "lucide-react";
import toast from 'react-hot-toast';
import {
  deleteCartData,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from '../store/slices/SliceWish';

const formatPrice = (value) => {
    const num = Number(value) || 0;
    return `₹${num.toLocaleString('en-IN')}`;
};

const AVAILABLE_DISCOUNTS = {
    SAVE10: { type: 'percent', value: 10 },
    FLAT50: { type: 'flat', value: 50 },
    WELCOME5: { type: 'percent', value: 5 },
};

const Cart = () => {
    const dispatch = useDispatch()

    // robust selector: support common cart shapes (array, { items: [] }, slice names)
    const cartData = useSelector((state) => {
        if (!state) return [];
        if (Array.isArray(state.cart)) return state.cart;
        if (state.cart && Array.isArray(state.cart.items)) return state.cart.items;
        if (state.SliceWish && Array.isArray(state.SliceWish.cart)) return state.SliceWish.cart;
        if (state.wish && Array.isArray(state.wish.cart)) return state.wish.cart;
        // fallback tries
        return state.cart?.items || state.cart?.cartItems || [];
    });

    // local quantity state (defaults to item.qty or 1)
    const [quantities, setQuantities] = useState({});
    const [discountInput, setDiscountInput] = useState('');
    const [appliedCode, setAppliedCode] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);

    // Address editable state
    const [address, setAddress] = useState({
        name: 'Jessica Taylor',
        line: 'Neubaugasse 30, 1070 Vienna, Austria'
    });
    const [editingAddress, setEditingAddress] = useState(false);
    const [addressDraft, setAddressDraft] = useState(address);

    // Payment editable state
    const [payment, setPayment] = useState({
        method: 'card',
        cardLast4: '5057'
    });
    const [editingPayment, setEditingPayment] = useState(false);
    const [paymentDraft, setPaymentDraft] = useState(payment);

    useEffect(() => {
        // initialize quantities from current cart (keep synced, avoid stale ids)
        const q = {};
        (cartData || []).forEach(item => {
            q[item.id] = (typeof item.qty === 'number' && item.qty > 0) ? item.qty : 1;
        });
        setQuantities(q);
    }, [cartData]);

    const handleDeleteCart = (id) => {
        if (!id) return;
        if (!confirm('Remove this item from cart?')) return;
        dispatch(deleteCartData(id));
        toast.success("Item removed");
    }

    const handleClearCart = () => {
        if (!cartData || cartData.length === 0) {
            toast('Cart is already empty');
            return;
        }
        
        if (!confirm('Clear all items from cart?')) return;
        
        try {
            dispatch({ type: 'cart/clearCart' }); // Direct action dispatch
            setQuantities({}); // Clear local quantities
            toast.success('Cart cleared');
        } catch (err) {
            console.error('Failed to clear cart:', err);
            toast.error('Failed to clear cart');
        }
    }

    const changeQty = (id, delta) => {
        setQuantities(prev => {
            const current = prev[id] || 1;
            const next = Math.max(1, current + delta);

            // update UI immediately
            const updated = { ...prev, [id]: next };

            // synchronize with Redux: dispatch increment/decrement for the difference
            const diff = next - current;
            if (diff > 0) {
                for (let i = 0; i < diff; i++) dispatch(incrementQuantity(id));
            } else if (diff < 0) {
                for (let i = 0; i < Math.abs(diff); i++) dispatch(decrementQuantity(id));
            }

            return updated;
        });
    }

    const handleSetQty = (id, value) => {
        const num = Math.max(1, parseInt(value || '1', 10) || 1);

        // update UI
        setQuantities(prev => ({ ...prev, [id]: num }));

        // find current qty in Redux (fallback to UI qty if not found)
        const itemInCart = (cartData || []).find(it => String(it.id) === String(id));
        const currentInCart = (itemInCart && Number(itemInCart.qty)) || (quantities[id] || 1);
        const diff = num - currentInCart;

        if (diff > 0) {
            for (let i = 0; i < diff; i++) dispatch(incrementQuantity(id));
        } else if (diff < 0) {
            for (let i = 0; i < Math.abs(diff); i++) dispatch(decrementQuantity(id));
        }
    }

    const subtotal = useMemo(() => {
        return (cartData || []).reduce((sum, item) => {
            const qty = quantities[item.id] || 1;
            const price = Number(item.price) || 0;
            return sum + price * qty;
        }, 0);
    }, [cartData, quantities]);

    const shipping = subtotal > 0 ? 0 : 0; // business logic: free shipping
    const total = Math.max(0, subtotal + shipping - discountAmount);

    // Recalculate discountAmount when subtotal or appliedCode changes
    useEffect(() => {
        if (!appliedCode) {
            setDiscountAmount(0);
            return;
        }
        const rule = AVAILABLE_DISCOUNTS[appliedCode];
        if (!rule) {
            setDiscountAmount(0);
            return;
        }
        let amt = 0;
        if (rule.type === 'percent') {
            amt = Math.round(subtotal * (rule.value / 100));
        } else if (rule.type === 'flat') {
            amt = Math.min(rule.value, subtotal);
        }
        setDiscountAmount(amt);
    }, [appliedCode, subtotal]);

    const handleApplyDiscount = () => {
        const code = (discountInput || '').trim().toUpperCase();
        if (!code) {
            toast.error('Enter a discount code first');
            return;
        }
        const rule = AVAILABLE_DISCOUNTS[code];
        if (!rule) {
            toast.error('Invalid discount code');
            return;
        }
        setAppliedCode(code);
        setDiscountInput('');
        toast.success(`Applied ${code}`);
    }

    const handleRemoveDiscount = () => {
        setAppliedCode(null);
        setDiscountAmount(0);
        toast('Discount removed');
    }

    const handleCheckout = () => {
        if (!cartData || cartData.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
        // Prepare payload (demo) and proceed
        toast.success('Proceeding to checkout (demo)');
    }

    // Address edit handlers
    const startEditAddress = () => {
        setAddressDraft(address);
        setEditingAddress(true);
    };
    const cancelEditAddress = () => {
        setEditingAddress(false);
        setAddressDraft(address);
    };
    const saveAddress = () => {
        setAddress(addressDraft);
        setEditingAddress(false);
        toast.success('Address updated');
    };

    // Payment edit handlers
    const startEditPayment = () => {
        setPaymentDraft(payment);
        setEditingPayment(true);
    };
    const cancelEditPayment = () => {
        setEditingPayment(false);
        setPaymentDraft(payment);
    };
    const savePayment = () => {
        // normalize last4 if card provided
        if (paymentDraft.method === 'card' && paymentDraft.cardNumber) {
            const raw = String(paymentDraft.cardNumber).replace(/\D/g, '');
            paymentDraft.cardLast4 = raw.slice(-4) || payment.cardLast4;
            delete paymentDraft.cardNumber;
        }
        setPayment(paymentDraft);
        setEditingPayment(false);
        toast.success('Payment updated');
    };

    return (
        <Fragment>
            <div className="min-h-screen bg-gray-50 mt-20 px-6 py-10">
                <div className="sm:max-w-6xl sm:mx-auto grid lg:grid-cols-3 gap-10">
                    {/* Left: Cart Items */}
                    <div className="lg:col-span-2 w-full bg-white rounded-2xl shadow p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold">
                                Shopping Cart{" "}
                                <span className="text-pink-500 text-lg">
                                    {(cartData || []).length} items
                                </span>
                            </h1>
                            <button
                                onClick={handleClearCart}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Clear cart
                            </button>
                        </div>

                        {(cartData || []).length === 0 ? (
                            <div className="py-20 text-center text-gray-500">
                                Your cart is empty.
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cartData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex sm:flex-row flex-col items-center justify-between pb-4 border-b"
                                    >
                                        {/* Product Info */}
                                        <div className="flex sm:flex-row flex-col items-center gap-4">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="sm:w-20 sm:h-20 w-28 h-28 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h2 className="font-semibold text-gray-800">
                                                    {item.title}
                                                </h2>
                                                <p className="text-sm text-gray-500">{item.desc}</p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <button
                                                        onClick={() => changeQty(item.id, -1)}
                                                        className="px-2 py-1 border rounded-md"
                                                        aria-label={`decrease-${item.id}`}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={quantities[item.id] || 1}
                                                        onChange={(e) => handleSetQty(item.id, e.target.value)}
                                                        className="w-14 text-center border rounded-md px-2 py-1"
                                                    />
                                                    <button
                                                        onClick={() => changeQty(item.id, 1)}
                                                        className="px-2 py-1 border rounded-md"
                                                        aria-label={`increase-${item.id}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price + Delete */}
                                        <div className="flex justify-center items-center gap-6">
                                            <div className="text-right">
                                                <div className="font-semibold text-gray-800">
                                                    {formatPrice((Number(item.price) || 0) * (quantities[item.id] || 1))}
                                                </div>
                                                <div className="text-sm text-gray-500">₹{item.price} each</div>
                                            </div>
                                            <button onClick={() => handleDeleteCart(item.id)} className="text-gray-400 cursor-pointer hover:text-red-500 transition">
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Summary */}
                    <div className="w-full rounded-2xl shadow p-6">
                        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                        {/* Address */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-gray-700">{address.name}</p>
                                    <p className="text-sm text-gray-500">{address.line}</p>
                                </div>
                                {!editingAddress ? (
                                    <button onClick={startEditAddress} className="text-pink-500 text-sm">Edit</button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={saveAddress} className="text-sm text-green-600">Save</button>
                                        <button onClick={cancelEditAddress} className="text-sm text-red-500">Cancel</button>
                                    </div>
                                )}
                            </div>

                            {editingAddress && (
                                <div className="mt-3 space-y-2">
                                    <input className="w-full border rounded px-3 py-2" value={addressDraft.name}
                                        onChange={(e) => setAddressDraft(prev => ({ ...prev, name: e.target.value }))} />
                                    <textarea className="w-full border rounded px-3 py-2" rows={2} value={addressDraft.line}
                                        onChange={(e) => setAddressDraft(prev => ({ ...prev, line: e.target.value }))} />
                                </div>
                            )}
                        </div>

                        {/* Payment */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-gray-700">Payment Method</p>
                                    <p className="text-sm text-gray-500">
                                        {payment.method === 'card' ? `Credit Card •••• ${payment.cardLast4}` : payment.method === 'cod' ? 'Cash on Delivery' : payment.method}
                                    </p>
                                </div>
                                {!editingPayment ? (
                                    <button onClick={startEditPayment} className="text-pink-500 text-sm">Edit</button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={savePayment} className="text-sm text-green-600">Save</button>
                                        <button onClick={cancelEditPayment} className="text-sm text-red-500">Cancel</button>
                                    </div>
                                )}
                            </div>

                            {editingPayment && (
                                <div className="mt-3 space-y-2">
                                    <div className="flex gap-2 items-center">
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="pm" checked={paymentDraft.method === 'card'} onChange={() => setPaymentDraft(prev => ({ ...prev, method: 'card' }))} />
                                            <span>Card</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="pm" checked={paymentDraft.method === 'cod'} onChange={() => setPaymentDraft(prev => ({ ...prev, method: 'cod' }))} />
                                            <span>Cash on Delivery</span>
                                        </label>
                                    </div>
                                    {paymentDraft.method === 'card' && (
                                        <input className="w-full border rounded px-3 py-2" placeholder="Card number" value={paymentDraft.cardNumber || ''} onChange={(e) => setPaymentDraft(prev => ({ ...prev, cardNumber: e.target.value }))} />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Discount Code */}
                        <div className="mb-6">
                            <p className="font-semibold text-gray-700 mb-1">
                                Do you have a discount code?
                            </p>
                            <div className="flex sm:flex-row flex-col gap-2 items-center">
                                <input
                                    type="text"
                                    value={discountInput}
                                    onChange={(e) => setDiscountInput(e.target.value)}
                                    placeholder="Your code here"
                                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                    disabled={!!appliedCode}
                                />
                                {!appliedCode ? (
                                    <button onClick={handleApplyDiscount} className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                                        Apply
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-green-700 font-medium px-3 py-1 bg-green-50 rounded">{appliedCode}</span>
                                        <button onClick={handleRemoveDiscount} className="text-sm text-red-500">Remove</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="space-y-2 border-t pt-4">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal ({(cartData || []).length} items)</span>
                                <span className="font-medium">{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span className="text-green-500 font-medium">{subtotal > 0 ? 'FREE' : formatPrice(shipping)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Discount {appliedCode ? `(${appliedCode})` : ''}</span>
                                <span>-{formatPrice(discountAmount)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2">
                                <span>Total (incl. VAT)</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            className="w-full mt-6 font-semibold py-3 bg-pink-500 text-white rounded-lg disabled:opacity-50"
                            disabled={(cartData || []).length === 0}
                            style={{ border: "1px solid gray" }}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Cart
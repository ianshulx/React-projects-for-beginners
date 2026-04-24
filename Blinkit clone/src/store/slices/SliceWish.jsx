import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// helper to get a stable string id from various shapes
const resolveId = (value) => {
  if (value == null) return null;
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object") {
    if (value.$oid) return String(value.$oid);
    if (value.id) return String(value.id);
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
};

const findIndexById = (state, id) => {
  const needle = resolveId(id);
  return state.findIndex((e) => {
    return (
      resolveId(e.id) === needle ||
      resolveId(e._id) === needle ||
      resolveId(e.productId) === needle
    );
  });
};

// ===== Cart Slice =====
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToBag(state, action) {
      const payload = action.payload || {};
      const incomingId =
        resolveId(payload.id) ||
        resolveId(payload._id) ||
        resolveId(payload.productId) ||
        `gen-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      const idx = findIndexById(state, incomingId);
      if (idx !== -1) {
        // existing — increase qty
        state[idx].qty = (Number(state[idx].qty) || 1) + 1;
        toast("Increased quantity in cart");
      } else {
        // normalize item: ensure id is a string and qty exists
        const normalized = {
          ...payload,
          id: incomingId,
          qty: Number(payload.qty) || 1,
        };
        state.push(normalized);
        toast.success("Added to cart");
      }
    },

    deleteCartData(state, action) {
      const idToRemove = resolveId(action.payload);
      return state.filter(
        (e) =>
          resolveId(e.id) !== idToRemove &&
          resolveId(e._id) !== idToRemove &&
          resolveId(e.productId) !== idToRemove
      );
    },

    incrementQuantity(state, action) {
      const idToInc = resolveId(action.payload);
      const idx = findIndexById(state, idToInc);
      if (idx !== -1) {
        state[idx].qty = (Number(state[idx].qty) || 1) + 1;
      }
    },

    decrementQuantity(state, action) {
      const idToDec = resolveId(action.payload);
      const idx = findIndexById(state, idToDec);
      if (idx === -1) return state;
      const currentQty = Number(state[idx].qty) || 1;
      if (currentQty > 1) {
        state[idx].qty = currentQty - 1;
      } else {
        // remove item
        return state.filter(
          (e) =>
            resolveId(e.id) !== idToDec &&
            resolveId(e._id) !== idToDec &&
            resolveId(e.productId) !== idToDec
        );
      }
    },

    clearCart: (state) => {
      return []; // Simply return empty array to clear cart
    },
  },
});

// ===== Auth Slice =====
const initialAuthState = {
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
  isLoggedIn: !!localStorage.getItem("currentUser"),
  users: JSON.parse(localStorage.getItem("users")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    register: (state, action) => {
      const exists = state.users.find((u) => u.email === action.payload.email);
      if (exists) {
        toast.error("User already registered!");
        return;
      }
      state.users.push(action.payload);
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      toast.success("Registration successful");
    },
    login: (state, action) => {
      const foundUser = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (foundUser) {
        state.user = foundUser;
        state.isLoggedIn = true;
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        toast.success("Logged in");
      } else {
        toast.error("User not found or wrong password!");
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("currentUser");
      toast("Logged out");
    },
  },
});

// ===== Exports =====
export const {
  addToBag,
  deleteCartData,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export const { register, login, logout } = authSlice.actions;

export const cartReducer = cartSlice.reducer;
export const authReducer = authSlice.reducer;

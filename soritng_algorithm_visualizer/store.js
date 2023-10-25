import { createStore } from "redux";
import rootReducer from "./src/reducer";

const store = createStore(rootReducer);

export default store;

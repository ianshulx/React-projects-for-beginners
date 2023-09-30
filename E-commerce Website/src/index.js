import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/Store";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
      <BrowserRouter>
        <Provider store={store}>
          <Toaster />
          <App />
        </Provider>
      </BrowserRouter>
  </>

);











// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";
// import { store } from "./redux/Store";
// import { ToastContainer } from "react-toastify";
// import { Toaster } from "react-hot-toast";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//     <BrowserRouter>
//         <Provider store={store}>
//           <App />   
//           <Toaster/>  
//         </Provider>
//     </BrowserRouter>



  
// );


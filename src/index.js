import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LogInPage from "../src/Pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/Controller/store";
import PrivateRoute from "../src/Components/PrivateRoute";
import Loader from "./Components/Loader";
import HomePage from "./Pages/HomePage";
import ActivityPage from "./Pages/ActivityPage";
import WalletPage from "./Pages/WalletPage";
import CryptoCurrencyPage from './Pages/CryptoCurrencyPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "LogIn",
    element: <LogInPage />,
  },
  {
    path: "Loader",
    element: <Loader />,
  },
  {
    path: "Home",
    element: <HomePage />,
  },
  {
    path: "Activity",
    element: <ActivityPage />,
  },
  {
    path: "Wallet",
    element: <WalletPage />,
  },
  {
    path: "Cryptocurrency",
    element: <CryptoCurrencyPage />,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

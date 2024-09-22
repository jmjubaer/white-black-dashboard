import { createBrowserRouter } from "react-router-dom";

import AddProduct from "../src/components/AddProduct";
import App from "../src/App";
import UpDateProduct from "../src/components/UpdateProduct";
import Dashboard from "../src/components/Dashboard";
import CustomerOrder from "../src/components/CustomerOrder";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/admin-dashboard",
                element: <Dashboard></Dashboard>,
            },
            {
                path: "/add-product",
                element: <AddProduct></AddProduct>,
            },
            {
                path: "/update-product",
                element: <UpDateProduct></UpDateProduct>,
            },
            {
                path: "/customerOrder",
                element: <CustomerOrder></CustomerOrder>,
            },

        ],
    },

]);

export default router;

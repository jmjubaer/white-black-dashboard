import { createBrowserRouter } from "react-router-dom";

import AddProduct from "../src/components/AddProduct";
import App from "../src/App";
import UpDateProduct from "../src/components/UpdateProduct";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/add-product",
                element: <AddProduct></AddProduct>,
            },
            {
                path: "/update-product",
                element: <UpDateProduct></UpDateProduct>,
            },

        ],
    },

]);

export default router;

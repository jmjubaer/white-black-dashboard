import { createBrowserRouter } from "react-router-dom";

import AddProduct from "../src/components/AddProduct";
import App from "../src/App";
import UpDateProduct from "../src/components/UpdateProduct";
import Dashboard from "../src/components/Dashboard";
import CustomerOrder from "../src/components/CustomerOrder";
import TopMovingText from "../src/components/TopMovingText";
import BannerMovingText from "../src/components/BannerMovingText";
import SecondBannerMovingText from "../src/components/SecondBannerMovingText";



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
                path: "/top-moving-text",
                element: <TopMovingText></TopMovingText>,
            },
            {
                path: "/banner-moving-text",
                element: <BannerMovingText></BannerMovingText>,
            },
            {
                path: "/second-banner-moving-text",
                element: <SecondBannerMovingText></SecondBannerMovingText>,
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

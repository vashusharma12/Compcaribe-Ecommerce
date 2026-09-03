import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import LayoutRental from "../layouts/LayoutRental";
import LayoutShop from "../layouts/LayoutShop";

import Home from "../pages/rental/Home";
import ShopIndex from "../pages/shop/ShopIndex";
import ShopCategories from "../pages/shop/ShopCategories";
import ProductDetailPage from "../pages/rental/ProductDetailPage";

import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgetPassword from "../pages/auth/ForgetPassword";

import Faq from "../pages/Faq";
import ContactUs from "../pages/ContactUs";
import DeliveryInfo from "../pages/DeliveryInfo";
import WarrantyInfo from "../pages/WarrantyInfo";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsCondition from "../pages/TermsCondition";
import AboutUs from "../pages/AboutUs";

import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import Orders from "../pages/dashboard/Orders";
import Wishlist from "../pages/dashboard/Wishlist";
import Addresses from "../pages/dashboard/Addresses";

import ScrollToTop from "../components/ScrollToTop";
import SignupModal from "../components/SignupModel";

const router = createBrowserRouter([

  // ================= Rental =================

  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <LayoutRental />
        <SignupModal />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: ":category", element: <ShopCategories /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      
    ],
  },

  // ================= Shop =================

  {
    path: "/shop-index",
    element: (
      <>
        <ScrollToTop />
        <LayoutShop />
      </>
    ),
    children: [

      { index: true, element: <ShopIndex /> },

      // Authentication

      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "forget-password", element: <ForgetPassword /> },

      // Shop

      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },

      // Dashboard (Protected)

      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },

      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },

      {
        path: "addresses",
        element: (
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        ),
      },

      // Other Pages

      { path: "faq", element: <Faq /> },
      { path: "contact", element: <ContactUs /> },
      { path: "delivery-info", element: <DeliveryInfo /> },
      { path: "warranty-info", element: <WarrantyInfo /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-condition", element: <TermsCondition /> },
      { path: "about-us", element: <AboutUs /> },

      { path: ":category", element: <ShopCategories /> },

    ],
  },

]);

export default router;
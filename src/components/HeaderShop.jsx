import {
    Link,
    NavLink,
    useNavigate,
    useLocation
} from "react-router-dom";

import {
    getCurrentUser,
    logoutUser
} from "../utils/auth";

import { useState } from "react";
import { useSelector } from "react-redux";

import logo from "../assets/logo.png";
import products from "../data/products";

const HeaderShop = () => {

    // ==============================
    // REDUX CART
    // ==============================

    const cartItems = useSelector(
        (state) => state.cart?.items ?? []
    );

    // ==============================
    // STATE
    // ==============================

    const [user, setUser] = useState(getCurrentUser());
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    // ==============================
    // FORMAT FIRST NAME
    // ==============================

    const getFirstName = () => {

        if (!user) {
            return "User";
        }

        // New signup structure
        if (user.firstName) {

            const firstName = user.firstName.trim();

            if (!firstName) {
                return "User";
            }

            return (
                firstName.charAt(0).toUpperCase() +
                firstName.slice(1).toLowerCase()
            );
        }

        // Support old users
        if (user.name) {

            const firstName = user.name
                .trim()
                .split(" ")[0];

            if (!firstName) {
                return "User";
            }

            return (
                firstName.charAt(0).toUpperCase() +
                firstName.slice(1).toLowerCase()
            );
        }

        return "User";
    };

    const firstName = getFirstName();

    // ==============================
    // CLOSE MOBILE NAVBAR
    // ==============================

    const closeNavbar = () => {

        const navbar = document.getElementById(
            "navbarLightExample"
        );

        if (
            navbar &&
            navbar.classList.contains("show")
        ) {
            navbar.classList.remove("show");
        }
    };

    // ==============================
    // LOGOUT
    // ==============================

    const handleLogout = () => {

        logoutUser();

        setUser(null);

        navigate("/shop-index/login");
    };

    // ==============================
    // SEARCH
    // ==============================

    const handleSearch = (value) => {

        setSearchTerm(value);

        if (value.trim() === "") {
            setSuggestions([]);
            return;
        }

        const filtered = products.filter((product) =>
            product.name
                .toLowerCase()
                .includes(value.toLowerCase())
        );

        setSuggestions(filtered.slice(0, 5));
    };

    // ==============================
    // SELECT SEARCH PRODUCT
    // ==============================

    const handleSelect = (product) => {

        setSearchTerm("");
        setSuggestions([]);

        if (product.type === "rental") {

            navigate(`/product/${product.id}`);

        } else {

            navigate(`/shop-index/product/${product.id}`);

        }
    };

    return (
        <header className="header">

            {/* =================================
                TOP HEADER
            ================================= */}

            <div className="container">

                <div className="header_top">

                    {/* LOGO */}

                    <div className="logo">

                        <Link to="/">
                            <img
                                src={logo}
                                alt="Logo"
                            />
                        </Link>

                    </div>


                    {/* RENTAL / SHOP */}

                    <div className="view_tabs">

                        <NavLink
                            to="/"
                            className={() =>
                                location.pathname.startsWith(
                                    "/shop-index"
                                )
                                    ? "rental"
                                    : "rental active"
                            }
                        >
                            <span>Rental</span>
                        </NavLink>


                        <NavLink
                            to="/shop-index"
                            className={() =>
                                location.pathname.startsWith(
                                    "/shop-index"
                                )
                                    ? "shop active"
                                    : "shop"
                            }
                        >
                            <span>Shop</span>
                        </NavLink>

                    </div>


                    {/* SEARCH */}

                    <div className="search_bar">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="What are you searching for?"
                            value={searchTerm}
                            onChange={(e) =>
                                handleSearch(e.target.value)
                            }
                        />

                        <button
                            type="button"
                            className="btn btn-link"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>


                        {suggestions.length > 0 && (

                            <div className="search_dropdown">

                                {suggestions.map((item) => (

                                    <div
                                        key={item.id}
                                        className="search_item"
                                        onClick={() =>
                                            handleSelect(item)
                                        }
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                        <div className="search_info">

                                            <span
                                                className={`search_title ${item.type === "rental"
                                                        ? "text-rental"
                                                        : "text-shop"
                                                    }`}
                                            >
                                                {item.name}
                                            </span>

                                            <br />

                                            <small className="text-muted">
                                                £{item.price}

                                                {item.type === "rental" &&
                                                    " /month"}
                                            </small>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>


                    {/* =================================
                        USER / LOGIN
                    ================================= */}

                    <div className="cta_btn">

                        {user ? (

                            <>

                                {/* CONTACT */}

                                <div className="phone_no">

                                    <Link
                                        to="/shop-index/contact"
                                        className="btn btn-outline-secondary"
                                    >
                                        <i className="fa-solid fa-phone-volume"></i> <span>Contact</span>
                                    </Link>

                                </div>


                                {/* USER DROPDOWN */}

                                <div className="dropdown user-dropdown">

                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                    >

                                        <i className="fa-solid fa-user"></i>

                                        <span className="ms-2">
                                            {firstName}
                                        </span>

                                    </button>


                                    <ul className="dropdown-menu dropdown-menu-end">

                                        <li>
                                            <Link
                                                className="dropdown-item fw-semibold"
                                                to="/shop-index/dashboard"
                                            >
                                                <i className="fa-solid fa-house-user me-2"></i>
                                                Dashboard
                                            </Link>
                                        </li>


                                        <li>
                                            <Link
                                                className="dropdown-item fw-semibold"
                                                to="/shop-index/profile"
                                            >
                                                <i className="fa-solid fa-user me-2"></i>
                                                Profile
                                            </Link>
                                        </li>


                                        <li>
                                            <Link
                                                className="dropdown-item fw-semibold"
                                                to="/shop-index/orders"
                                            >
                                                <i className="fa-solid fa-box-open me-2"></i>
                                                Orders
                                            </Link>
                                        </li>


                                        <li>
                                            <Link
                                                className="dropdown-item fw-semibold"
                                                to="/shop-index/wishlist"
                                            >
                                                <i className="fa-solid fa-heart me-2"></i>
                                                Wishlist
                                            </Link>
                                        </li>


                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>


                                        <li>

                                            <button
                                                type="button"
                                                className="dropdown-item text-danger"
                                                onClick={handleLogout}
                                            >
                                                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                                                Logout
                                            </button>

                                        </li>

                                    </ul>

                                </div>

                            </>

                        ) : (

                            <div className="d-flex align-items-center gap-2">

                                <Link
                                    to="/shop-index/login"
                                    className="btn btn-outline-secondary"
                                >
                                    <i className="fa-solid fa-arrow-right-to-bracket me-2"></i>
                                    Login
                                </Link>


                                <Link
                                    to="/shop-index/signup"
                                    className="btn btn-secondary"
                                >
                                    <i className="fa-solid fa-user-plus me-2"></i>
                                    Sign Up
                                </Link>

                            </div>

                        )}

                    </div>

                </div>

            </div>


            {/* =================================
                SHOP NAVIGATION
            ================================= */}

            <div
                id="shop"
                className="main_content shop_view"
            >

                <nav className="navbar navbar-expand-lg navbar-light">

                    <div className="container d-flex align-items-center position-relative">

                        {/* MOBILE TOGGLE */}

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarLightExample"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>


                        {/* NAVIGATION */}

                        <div
                            className="collapse navbar-collapse"
                            id="navbarLightExample"
                        >

                            <ul className="navbar-nav gap-2">

                                <li className="nav-item">
                                    <NavLink
                                        to="/shop-index/monitor-shop"
                                        className="nav-link"
                                        onClick={closeNavbar}
                                    >
                                        Monitors & Displays
                                    </NavLink>
                                </li>


                                <li className="nav-item">
                                    <NavLink
                                        to="/shop-index/desktop-shop"
                                        className="nav-link"
                                        onClick={closeNavbar}
                                    >
                                        Desktop
                                    </NavLink>
                                </li>


                                <li className="nav-item">
                                    <NavLink
                                        to="/shop-index/laptop-shop"
                                        className="nav-link"
                                        onClick={closeNavbar}
                                    >
                                        Laptops
                                    </NavLink>
                                </li>


                                <li className="nav-item">
                                    <NavLink
                                        to="/shop-index/servers-shop"
                                        className="nav-link"
                                        onClick={closeNavbar}
                                    >
                                        Servers & Racks
                                    </NavLink>
                                </li>


                                <li className="nav-item">
                                    <NavLink
                                        to="/shop-index/office-shop"
                                        className="nav-link"
                                        onClick={closeNavbar}
                                    >
                                        Office Components
                                    </NavLink>
                                </li>

                            </ul>

                        </div>


                        {/* =================================
                            CART
                        ================================= */}

                        <Link
                            to="/shop-index/cart"
                            className="my_cart"
                        >

                            <span className="mobile-cart-icon">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </span>

                            <span className="my_cart_head">
                                Your Cart
                            </span>

                            <span className="cart-count">
                                {cartItems.length}
                            </span>

                        </Link>

                    </div>

                </nav>

            </div>

        </header>
    );
};

export default HeaderShop;
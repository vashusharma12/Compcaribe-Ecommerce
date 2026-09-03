import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/auth";

const DashboardContent = () => {

    // =========================================
    // USER
    // =========================================

    const [user, setUser] = useState(
        getCurrentUser()
    );


    // =========================================
    // CART
    // =========================================

    const cartItems = useSelector(
        (state) =>
            state.cart?.items ||
            state.cart?.cartItems ||
            []
    );


    // =========================================
    // DASHBOARD DATA
    // =========================================

    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [addresses, setAddresses] = useState([]);


    // =========================================
    // GET CURRENT USER
    // =========================================

    useEffect(() => {

        const refreshUser = () => {

            setUser(
                getCurrentUser()
            );

        };


        refreshUser();


        window.addEventListener(
            "storage",
            refreshUser
        );

        window.addEventListener(
            "userDataUpdated",
            refreshUser
        );


        return () => {

            window.removeEventListener(
                "storage",
                refreshUser
            );

            window.removeEventListener(
                "userDataUpdated",
                refreshUser
            );

        };

    }, []);


    // =========================================
    // LOAD DASHBOARD DATA
    // =========================================

    useEffect(() => {

        const loadDashboardData = () => {

            const currentUser =
                getCurrentUser();


            // =========================================
            // USER NOT LOGGED IN
            // =========================================

            if (!currentUser?.email) {

                setOrders([]);
                setWishlist([]);
                setAddresses([]);

                return;

            }


            // =========================================
            // ORDERS
            // =========================================

            const savedOrders =
                JSON.parse(
                    localStorage.getItem(
                        `orders_${currentUser.email}`
                    )
                ) || [];


            const userOrders =
                Array.isArray(currentUser.orders)
                    ? currentUser.orders
                    : savedOrders;


            // =========================================
            // WISHLIST
            // =========================================

            const savedWishlist =
                JSON.parse(
                    localStorage.getItem(
                        `wishlist_${currentUser.email}`
                    )
                ) || [];


            const userWishlist =
                Array.isArray(currentUser.wishlist)
                    ? currentUser.wishlist
                    : savedWishlist;


            // =========================================
            // ADDRESSES
            // =========================================

            const savedAddresses =
                JSON.parse(
                    localStorage.getItem(
                        `addresses_${currentUser.email}`
                    )
                ) || [];


            const userAddresses =
                Array.isArray(currentUser.addresses)
                    ? currentUser.addresses
                    : savedAddresses;


            // =========================================
            // UPDATE STATES
            // =========================================

            setOrders(
                Array.isArray(userOrders)
                    ? userOrders
                    : []
            );


            setWishlist(
                Array.isArray(userWishlist)
                    ? userWishlist
                    : []
            );


            setAddresses(
                Array.isArray(userAddresses)
                    ? userAddresses
                    : []
            );

        };


        // =========================================
        // INITIAL LOAD
        // =========================================

        loadDashboardData();


        // =========================================
        // SAME TAB UPDATES
        // =========================================

        window.addEventListener(
            "ordersUpdated",
            loadDashboardData
        );

        window.addEventListener(
            "wishlistUpdated",
            loadDashboardData
        );

        window.addEventListener(
            "addressesUpdated",
            loadDashboardData
        );

        window.addEventListener(
            "userDataUpdated",
            loadDashboardData
        );


        // =========================================
        // OTHER TAB UPDATES
        // =========================================

        window.addEventListener(
            "storage",
            loadDashboardData
        );


        // =========================================
        // CLEANUP
        // =========================================

        return () => {

            window.removeEventListener(
                "ordersUpdated",
                loadDashboardData
            );

            window.removeEventListener(
                "wishlistUpdated",
                loadDashboardData
            );

            window.removeEventListener(
                "addressesUpdated",
                loadDashboardData
            );

            window.removeEventListener(
                "userDataUpdated",
                loadDashboardData
            );

            window.removeEventListener(
                "storage",
                loadDashboardData
            );

        };

    }, [user]);


    // =========================================
    // FORMAT NAME
    // =========================================

    const capitalizeName = (name = "") => {

        return name
            .trim()
            .toLowerCase()
            .replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase()
            );

    };


    const getDisplayName = () => {

        if (
            user?.firstName ||
            user?.lastName
        ) {

            return [

                capitalizeName(
                    user?.firstName || ""
                ),

                capitalizeName(
                    user?.lastName || ""
                )

            ]
                .filter(Boolean)
                .join(" ");

        }


        if (user?.name) {

            return capitalizeName(
                user.name
            );

        }


        return "User";

    };


    const displayName =
        getDisplayName();


    // =========================================
    // DATE FORMAT
    // =========================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }


        return new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // =========================================
    // RENDER
    // =========================================

    return (
        <>

            {/* =========================================
                WELCOME
            ========================================= */}

            <div className="card border-0 shadow-sm rounded-4 mb-4">

                <div className="card-body p-4">

                    <h2 className="fw-bold">

                        Welcome Back,

                        <span className="text-shop">

                            {" "}
                            {displayName} 👋

                        </span>

                    </h2>


                    <p className="text-muted mb-3">

                        Manage your profile, orders,
                        wishlist and addresses from
                        one place.

                    </p>


                    <div className="d-flex flex-wrap gap-2">

                        <Link
                            to="/shop-index/profile"
                            className="btn btn-secondary"
                        >
                            Edit Profile
                        </Link>


                        <Link
                            to="/shop-index/orders"
                            className="btn btn-outline-secondary"
                        >
                            View Orders
                        </Link>


                        <Link
                            to="/shop-index"
                            className="btn btn-outline-primary"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>

            </div>


            {/* =========================================
                DASHBOARD STATISTICS
            ========================================= */}

            <div className="row g-4">


                {/* ORDERS */}

                <div className="col-6 col-md-3">

                    <Link
                        to="/shop-index/orders"
                        className="text-decoration-none"
                    >

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body text-center">

                                <i className="fa-solid fa-box fa-2x text-primary mb-3"></i>


                                <h2 className="fw-bold">

                                    {orders.length}

                                </h2>


                                <p className="text-muted mb-0">

                                    Orders

                                </p>

                            </div>

                        </div>

                    </Link>

                </div>


                {/* WISHLIST */}

                <div className="col-6 col-md-3">

                    <Link
                        to="/shop-index/wishlist"
                        className="text-decoration-none"
                    >

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body text-center">

                                <i className="fa-solid fa-heart fa-2x text-danger mb-3"></i>


                                <h2 className="fw-bold">

                                    {wishlist.length}

                                </h2>


                                <p className="text-muted mb-0">

                                    Wishlist

                                </p>

                            </div>

                        </div>

                    </Link>

                </div>


                {/* CART */}

                <div className="col-6 col-md-3">

                    <Link
                        to="/shop-index/cart"
                        className="text-decoration-none"
                    >

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body text-center">

                                <i className="fa-solid fa-cart-shopping fa-2x text-success mb-3"></i>


                                <h2 className="fw-bold">

                                    {cartItems.length}

                                </h2>


                                <p className="text-muted mb-0">

                                    Cart Items

                                </p>

                            </div>

                        </div>

                    </Link>

                </div>


                {/* ADDRESSES */}

                <div className="col-6 col-md-3">

                    <Link
                        to="/shop-index/addresses"
                        className="text-decoration-none"
                    >

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body text-center">

                                <i className="fa-solid fa-location-dot fa-2x text-warning mb-3"></i>


                                <h2 className="fw-bold">

                                    {addresses.length}

                                </h2>


                                <p className="text-muted mb-0">

                                    Addresses

                                </p>

                            </div>

                        </div>

                    </Link>

                </div>

            </div>


            {/* =========================================
                RECENT ORDERS
            ========================================= */}

            <div className="card shadow-sm border-0 rounded-4 mt-5">

                <div className="card-header bg-white">

                    <div className="d-flex justify-content-between align-items-center">

                        <h5 className="fw-semibold mb-0">

                            Recent Orders

                        </h5>


                        {orders.length > 0 && (

                            <Link
                                to="/shop-index/orders"
                                className="small text-decoration-none"
                            >
                                View All
                            </Link>

                        )}

                    </div>

                </div>


                <div className="card-body">

                    {orders.length === 0 ? (

                        <div className="text-center py-5">

                            <i className="fa-solid fa-box-open fa-3x text-muted mb-3"></i>


                            <h5>
                                No Orders Yet
                            </h5>


                            <p className="text-muted">

                                Your first purchase will
                                appear here.

                            </p>


                            <Link
                                to="/shop-index"
                                className="btn btn-secondary"
                            >
                                Start Shopping
                            </Link>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table align-middle">

                                <thead>

                                    <tr>

                                        <th>
                                            Order ID
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Total
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {orders
                                        .slice(0, 5)
                                        .map((order) => (

                                            <tr key={order.id}>

                                                <td>
                                                    #{order.id}
                                                </td>


                                                <td>
                                                    {formatDate(
                                                        order.date
                                                    )}
                                                </td>


                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            order.status === "Delivered"
                                                                ? "bg-success"
                                                                : order.status === "Cancelled"
                                                                    ? "bg-danger"
                                                                    : "bg-warning text-dark"
                                                        }`}
                                                    >

                                                        {order.status ||
                                                            "Processing"}

                                                    </span>

                                                </td>


                                                <td>

                                                    £
                                                    {Number(
                                                        order.total || 0
                                                    ).toFixed(2)}

                                                </td>

                                            </tr>

                                        ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>


            {/* =========================================
                RECENT ACTIVITY
            ========================================= */}

            <div className="card shadow-sm border-0 rounded-4 mt-4">

                <div className="card-header bg-white">

                    <h5 className="fw-semibold mb-0">

                        Recent Activity

                    </h5>

                </div>


                <div className="card-body">

                    <ul className="list-group list-group-flush">


                        {/* LOGIN */}

                        <li className="list-group-item">

                            <i className="fa-solid fa-user text-secondary me-2"></i>

                            Logged in successfully.

                        </li>


                        {/* WISHLIST */}

                        <li className="list-group-item">

                            <i className="fa-solid fa-heart text-danger me-2"></i>

                            {wishlist.length > 0
                                ? `${wishlist.length} item${wishlist.length > 1 ? "s" : ""} in your wishlist.`
                                : "Your wishlist is currently empty."
                            }

                        </li>


                        {/* CART */}

                        <li className="list-group-item">

                            <i className="fa-solid fa-cart-shopping text-success me-2"></i>

                            {cartItems.length > 0
                                ? `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} currently in your cart.`
                                : "Your cart is currently empty."
                            }

                        </li>


                        {/* ADDRESSES */}

                        <li className="list-group-item">

                            <i className="fa-solid fa-location-dot text-warning me-2"></i>

                            {addresses.length > 0
                                ? `${addresses.length} saved address${addresses.length > 1 ? "es" : ""}.`
                                : "No saved addresses yet."
                            }

                        </li>


                        {/* ORDERS */}

                        <li className="list-group-item">

                            <i className="fa-solid fa-box text-primary me-2"></i>

                            {orders.length > 0
                                ? `${orders.length} order${orders.length > 1 ? "s" : ""} placed.`
                                : "No orders placed yet."
                            }

                        </li>

                    </ul>

                </div>

            </div>

        </>

    );

};

export default DashboardContent;
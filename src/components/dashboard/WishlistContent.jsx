import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { addToCart } from "../../redux/slices/cartSlice";
import { getCurrentUser } from "../../utils/auth";


const WishlistContent = () => {

    // =========================================
    // REDUX
    // =========================================

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) =>
            state.cart?.items ||
            state.cart?.cartItems ||
            []
    );


    // =========================================
    // USER STATE
    // =========================================

    const [user, setUser] = useState(
        getCurrentUser()
    );


    // =========================================
    // WISHLIST STATE
    // =========================================

    const [wishlist, setWishlist] = useState(
        user?.wishlist || []
    );


    // =========================================
    // PENDING REMOVAL
    // =========================================
    /*
     * Stores product IDs which have been
     * added to cart and are waiting for
     * the 5-second automatic wishlist removal.
     */

    const [pendingRemoval, setPendingRemoval] =
        useState([]);


    // =========================================
    // LOAD / REFRESH USER + WISHLIST
    // =========================================

    useEffect(() => {

        const loadWishlist = () => {

            const currentUser =
                getCurrentUser();


            setUser(
                currentUser
            );


            setWishlist(
                currentUser?.wishlist || []
            );

        };


        // Initial load
        loadWishlist();


        // Same-tab wishlist update
        window.addEventListener(
            "wishlistUpdated",
            loadWishlist
        );


        // Same-tab user update
        window.addEventListener(
            "userDataUpdated",
            loadWishlist
        );


        // Other-tab localStorage update
        window.addEventListener(
            "storage",
            loadWishlist
        );


        return () => {

            window.removeEventListener(
                "wishlistUpdated",
                loadWishlist
            );


            window.removeEventListener(
                "userDataUpdated",
                loadWishlist
            );


            window.removeEventListener(
                "storage",
                loadWishlist
            );

        };

    }, []);


    // =========================================
    // REMOVE FROM WISHLIST
    // =========================================

    const handleRemove = (productId) => {

        const currentUser =
            getCurrentUser();


        if (!currentUser) {
            return;
        }


        // =========================================
        // REMOVE PRODUCT
        // =========================================

        const updatedWishlist = (
            currentUser.wishlist || []
        ).filter(
            (item) =>
                item.id !== productId
        );


        // =========================================
        // UPDATE USER
        // =========================================

        const updatedUser = {

            ...currentUser,

            wishlist:
                updatedWishlist

        };


        // =========================================
        // SAVE CURRENT USER
        // =========================================

        localStorage.setItem(
            "currentUser",
            JSON.stringify(
                updatedUser
            )
        );


        // =========================================
        // UPDATE USERS ARRAY
        // =========================================

        const users =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];


        const updatedUsers =
            users.map(
                (item) =>
                    item.email ===
                    currentUser.email
                        ? updatedUser
                        : item
            );


        localStorage.setItem(
            "users",
            JSON.stringify(
                updatedUsers
            )
        );


        // =========================================
        // UPDATE LOCAL STATE
        // =========================================

        setUser(
            updatedUser
        );


        setWishlist(
            updatedWishlist
        );


        // =========================================
        // REMOVE FROM PENDING
        // =========================================

        setPendingRemoval(
            (prev) =>
                prev.filter(
                    (id) =>
                        id !== productId
                )
        );


        // =========================================
        // NOTIFY OTHER COMPONENTS
        // =========================================

        window.dispatchEvent(
            new Event(
                "wishlistUpdated"
            )
        );


        window.dispatchEvent(
            new Event(
                "userDataUpdated"
            )
        );

    };


    // =========================================
    // ADD TO CART
    // =========================================

    const handleAddToCart = (item) => {

        // =========================================
        // CHECK CART
        // =========================================

        const alreadyInCart =
            cartItems.some(
                (cartItem) =>
                    cartItem.id === item.id
            );


        if (alreadyInCart) {
            return;
        }


        // =========================================
        // ADD TO REDUX CART
        // =========================================

        dispatch(
            addToCart({

                id: item.id,

                name: item.name,

                price: item.price,

                image: item.image,

                quantity: 1,

                duration:
                    item.type === "rental"
                        ? "1 Month"
                        : null,

                type: item.type,

            })
        );


        // =========================================
        // SHOW PENDING STATE
        // =========================================

        setPendingRemoval(
            (prev) => {

                if (
                    prev.includes(
                        item.id
                    )
                ) {
                    return prev;
                }


                return [
                    ...prev,
                    item.id
                ];

            }
        );


        // =========================================
        // REMOVE AFTER 5 SECONDS
        // =========================================

        setTimeout(() => {

            const currentUser =
                getCurrentUser();


            if (!currentUser) {
                return;
            }


            // =========================================
            // REMOVE PRODUCT FROM USER WISHLIST
            // =========================================

            const updatedWishlist = (
                currentUser.wishlist || []
            ).filter(
                (wishlistItem) =>
                    wishlistItem.id !== item.id
            );


            // =========================================
            // UPDATED USER
            // =========================================

            const updatedUser = {

                ...currentUser,

                wishlist:
                    updatedWishlist

            };


            // =========================================
            // SAVE CURRENT USER
            // =========================================

            localStorage.setItem(
                "currentUser",
                JSON.stringify(
                    updatedUser
                )
            );


            // =========================================
            // UPDATE USERS ARRAY
            // =========================================

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "users"
                    )
                ) || [];


            const updatedUsers =
                users.map(
                    (userItem) =>
                        userItem.email ===
                        currentUser.email
                            ? updatedUser
                            : userItem
                );


            localStorage.setItem(
                "users",
                JSON.stringify(
                    updatedUsers
                )
            );


            // =========================================
            // UPDATE COMPONENT STATE
            // =========================================

            setUser(
                updatedUser
            );


            setWishlist(
                updatedWishlist
            );


            // =========================================
            // REMOVE PENDING STATE
            // =========================================

            setPendingRemoval(
                (prev) =>
                    prev.filter(
                        (id) =>
                            id !== item.id
                    )
            );


            // =========================================
            // NOTIFY OTHER COMPONENTS
            // =========================================

            window.dispatchEvent(
                new Event(
                    "wishlistUpdated"
                )
            );


            window.dispatchEvent(
                new Event(
                    "userDataUpdated"
                )
            );

        }, 5000);

    };


    // =========================================
    // USER NOT LOGGED IN
    // =========================================

    if (!user) {

        return (

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body text-center py-5">

                    <i
                        className="fa-regular fa-heart text-danger mb-4"
                        style={{
                            fontSize: "70px"
                        }}
                    ></i>


                    <h4 className="fw-bold">

                        Login Required

                    </h4>


                    <p className="text-muted mb-4">

                        Please login to view
                        your wishlist.

                    </p>


                    <Link
                        to="/shop-index/login"
                        className="btn btn-primary"
                    >

                        Login

                    </Link>

                </div>

            </div>

        );

    }


    // =========================================
    // MAIN
    // =========================================

    return (

        <div className="card shadow-sm border-0 rounded-4">

            <div className="card-body p-4">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">

                    <div>

                        <h3 className="fw-bold mb-1">

                            My Wishlist

                        </h3>


                        <p className="text-muted mb-0">

                            {wishlist.length > 0

                                ? `${wishlist.length} saved product${wishlist.length > 1 ? "s" : ""}.`

                                : "Save your favourite products for later."

                            }

                        </p>

                    </div>


                    {wishlist.length > 0 && (

                        <Link
                            to="/shop-index"
                            className="btn btn-outline-primary"
                        >

                            <i className="fa-solid fa-cart-shopping me-2"></i>

                            Continue Shopping

                        </Link>

                    )}

                </div>


                <hr />


                {/* =====================================
                    EMPTY WISHLIST
                ===================================== */}

                {wishlist.length === 0 ? (

                    <div className="text-center py-5">

                        <i
                            className="fa-regular fa-heart text-danger mb-4"
                            style={{
                                fontSize: "70px"
                            }}
                        ></i>


                        <h4 className="fw-bold">

                            Your Wishlist is Empty

                        </h4>


                        <p className="text-muted mb-4">

                            Browse products and add
                            your favourites to the wishlist.

                        </p>


                        <Link
                            to="/shop-index"
                            className="btn btn-secondary"
                        >

                            Continue Shopping

                        </Link>

                    </div>

                ) : (


                    /* =====================================
                       WISHLIST PRODUCTS
                    ===================================== */

                    <div className="row g-4">

                        {wishlist.map((item) => {

                            const isRental =
                                item.type === "rental";


                            const isInCart =
                                cartItems.some(
                                    (cartItem) =>
                                        cartItem.id === item.id
                                );


                            const isPendingRemoval =
                                pendingRemoval.includes(
                                    item.id
                                );


                            return (

                                <div
                                    className="col-xl-4 col-lg-6 col-md-6"
                                    key={item.id}
                                >

                                    <div className="card h-100 border-0 shadow rounded-4 overflow-hidden">


                                        {/* =================================
                                            PRODUCT IMAGE
                                        ================================= */}

                                        <Link
                                            to={
                                                isRental
                                                    ? `/product/${item.id}`
                                                    : `/shop-index/product/${item.id}`
                                            }
                                        >

                                            <div
                                                className="bg-white"
                                                style={{
                                                    height: "160px",
                                                    padding: "20px"
                                                }}
                                            >

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-100 h-100"
                                                    style={{
                                                        objectFit: "contain"
                                                    }}
                                                />

                                            </div>

                                        </Link>


                                        {/* =================================
                                            PRODUCT DETAILS
                                        ================================= */}

                                        <div className="card-body wishlist-card">

                                            <h6 className="fw-semibold mb-2">

                                                {item.name}

                                            </h6>


                                            {/* PRICE */}

                                            <div className="mb-3">

                                                <span className="fs-5 fw-bold">

                                                    £
                                                    {Number(
                                                        item.price || 0
                                                    ).toFixed(2)}

                                                </span>


                                                {isRental && (

                                                    <small className="text-muted ms-1">

                                                        /month

                                                    </small>

                                                )}

                                            </div>


                                            {/* PRODUCT TYPE */}

                                            <span
                                                className={`badge ${
                                                    isRental
                                                        ? "bg-primary"
                                                        : "bg-secondary"
                                                }`}
                                            >

                                                {isRental
                                                    ? "Rental Product"
                                                    : "Shop Product"
                                                }

                                            </span>

                                        </div>


                                        {/* =================================
                                            ACTIONS
                                        ================================= */}

                                        <div className="card-footer bg-white border-0 p-3">

                                            <div className="d-flex gap-2">


                                                {/* =================================
                                                    ADD TO CART
                                                ================================= */}

                                                <button
                                                    type="button"
                                                    className={`btn flex-fill ${
                                                        isInCart
                                                            ? "btn-success"
                                                            : isRental
                                                                ? "btn-rental"
                                                                : "btn-secondary"
                                                    }`}
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        isInCart ||
                                                        isPendingRemoval
                                                    }
                                                >

                                                    {isInCart ? (

                                                        <>

                                                            <i className="fa-solid fa-check me-2"></i>

                                                            Added

                                                        </>

                                                    ) : isPendingRemoval ? (

                                                        <>

                                                            <i className="fa-solid fa-clock me-2"></i>

                                                            Added — Removing...

                                                        </>

                                                    ) : (

                                                        <>

                                                            <i className="fa-solid fa-cart-shopping me-2"></i>

                                                            Add to Cart

                                                        </>

                                                    )}

                                                </button>


                                                {/* =================================
                                                    REMOVE
                                                ================================= */}

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        handleRemove(
                                                            item.id
                                                        )
                                                    }
                                                    title="Remove from wishlist"
                                                >

                                                    <i className="fa-solid fa-trash"></i>

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>

    );

};


export default WishlistContent;
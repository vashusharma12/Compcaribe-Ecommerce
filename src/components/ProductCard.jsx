import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { addToCart } from "../redux/slices/cartSlice";
import { getCurrentUser } from "../utils/auth";

function ProductCard({ product, view }) {

    const isRental = product.type === "rental";


    // =========================================
    // REDUX CART
    // =========================================

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) =>
            state.cart?.items ||
            state.cart?.cartItems ||
            []
    );


    // =========================================
    // USER
    // =========================================

    const [user, setUser] = useState(
        getCurrentUser()
    );


    // =========================================
    // WISHLIST
    // =========================================

    const [wishlist, setWishlist] = useState(
        user?.wishlist || []
    );


    // =========================================
    // REFRESH USER DATA
    // =========================================

    useEffect(() => {

        const refreshUser = () => {

            const currentUser = getCurrentUser();

            setUser(currentUser);

            setWishlist(
                currentUser?.wishlist || []
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

        window.addEventListener(
            "wishlistUpdated",
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

            window.removeEventListener(
                "wishlistUpdated",
                refreshUser
            );

        };

    }, []);


    // =========================================
    // CART STATUS
    // =========================================

    const isAdded = cartItems.some(
        (item) =>
            item.id === product.id
    );


    // =========================================
    // WISHLIST STATUS
    // =========================================

    const isWishlisted = wishlist.some(
        (item) =>
            item.id === product.id
    );


    // =========================================
    // ADD TO CART
    // =========================================

    const handleAddToCart = (e) => {

        e.preventDefault();
        e.stopPropagation();


        if (isAdded) {
            return;
        }


        dispatch(
            addToCart({

                id: product.id,

                name: product.name,

                price: product.price,

                image: product.image,

                quantity: 1,

                duration: isRental
                    ? "1 Month"
                    : null,

                type: product.type,

            })
        );

    };


    // =========================================
    // WISHLIST
    // =========================================

    const handleWishlist = (e) => {

        e.preventDefault();
        e.stopPropagation();


        // -----------------------------------------
        // LOGIN CHECK
        // -----------------------------------------

        if (!user) {

            alert(
                "Please login to add products to your wishlist."
            );

            return;

        }


        let updatedWishlist;


        // -----------------------------------------
        // REMOVE FROM WISHLIST
        // -----------------------------------------

        if (isWishlisted) {

            updatedWishlist =
                wishlist.filter(
                    (item) =>
                        item.id !== product.id
                );

        }


        // -----------------------------------------
        // ADD TO WISHLIST
        // -----------------------------------------

        else {

            updatedWishlist = [

                ...wishlist,

                {

                    id: product.id,

                    name: product.name,

                    price: product.price,

                    image: product.image,

                    type: product.type,

                    brand:
                        product.brand || "",

                    category:
                        product.category || "",

                }

            ];

        }


        // -----------------------------------------
        // UPDATE LOCAL STATE
        // -----------------------------------------

        setWishlist(
            updatedWishlist
        );


        // -----------------------------------------
        // GET CURRENT USER
        // -----------------------------------------

        const currentUser =
            getCurrentUser();


        if (!currentUser) {
            return;
        }


        // -----------------------------------------
        // UPDATE USER
        // -----------------------------------------

        const updatedUser = {

            ...currentUser,

            wishlist:
                updatedWishlist

        };


        // -----------------------------------------
        // SAVE CURRENT USER
        // -----------------------------------------

        localStorage.setItem(
            "currentUser",
            JSON.stringify(
                updatedUser
            )
        );


        // -----------------------------------------
        // UPDATE USERS ARRAY
        // -----------------------------------------

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


        // -----------------------------------------
        // UPDATE USER STATE
        // -----------------------------------------

        setUser(
            updatedUser
        );


        // -----------------------------------------
        // NOTIFY OTHER COMPONENTS
        // -----------------------------------------

        window.dispatchEvent(
            new Event(
                "userDataUpdated"
            )
        );


        window.dispatchEvent(
            new Event(
                "wishlistUpdated"
            )
        );

    };


    // =========================================
    // RENDER
    // =========================================

    return (

        <div
            className={`product_block ${
                view === "list"
                    ? "list_view"
                    : ""
            }`}
        >

            <div
                className={`product_item ${
                    isRental
                        ? "rental_card"
                        : "shop_card"
                }`}
            >


                {/* =========================================
                    WISHLIST BUTTON
                ========================================= */}

                <button
                    type="button"
                    className={`wishlist_btn ${
                        isWishlisted
                            ? "active"
                            : ""
                    }`}
                    onClick={
                        handleWishlist
                    }
                    aria-label={
                        isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }
                >

                    <i
                        className={
                            isWishlisted
                                ? "fa-solid fa-heart"
                                : "fa-regular fa-heart"
                        }
                    ></i>

                </button>


                {/* =========================================
                    PRODUCT LINK
                ========================================= */}

                <Link
                    to={
                        isRental
                            ? `/product/${product.id}`
                            : `/shop-index/product/${product.id}`
                    }
                    className="product_item_link"
                >


                    {/* PRODUCT IMAGE */}

                    <div className="product_img">

                        <img
                            src={product.image}
                            alt={product.name}
                        />

                    </div>


                    {/* PRODUCT INFO */}

                    <div className="product_info">

                        <h4 className="mt-2 title-heading fw-semibold">

                            {product.name}

                        </h4>

                    </div>


                    {/* PRODUCT CTA */}

                    <div className="product_cta">


                        {/* PRICE */}

                        <div className="rent_price">

                            <span className="price fs-5 fw-bold">

                                £{product.price}


                                {isRental && (

                                    <span className="ms-1 small text-muted">

                                        /month

                                    </span>

                                )}

                            </span>

                        </div>


                        {/* CART BUTTON */}

                        <div className="cart_btn mt-2">

                            <button
                                type="button"
                                className={`btn w-100 ${
                                    isAdded

                                        ? "btn-success"

                                        : isRental

                                            ? "btn-rental"

                                            : "btn-primary"
                                }`}
                                onClick={
                                    handleAddToCart
                                }
                            >

                                {isAdded

                                    ? "Added"

                                    : "Add To Cart"
                                }


                                <i
                                    className={`ms-2 ${
                                        isAdded

                                            ? "fa-solid fa-check"

                                            : "fa-solid fa-arrow-right-long"
                                    }`}
                                ></i>

                            </button>

                        </div>

                    </div>

                </Link>

            </div>

        </div>

    );

}


export default ProductCard;
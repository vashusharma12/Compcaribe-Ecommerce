import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    removeFromCart,
    updateQuantity
} from "../redux/slices/cartSlice";


const AddToCart = () => {

    const dispatch = useDispatch();


    // ========================================
    // REDUX CART
    // ========================================

    const cartItems = useSelector(
        (state) => state.cart?.items ?? []
    );


    // ========================================
    // TOTAL COST
    // ========================================

    const totalCost = cartItems.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            Number(item.quantity || 1),
        0
    );


    // ========================================
    // SHIPPING
    // ========================================

    const shipping =
        cartItems.length > 0
            ? 4.90
            : 0;


    // ========================================
    // RENTAL DEPOSIT
    // ========================================

    const deposit = cartItems.reduce(
        (total, item) => {

            if (item.type === "rental") {

                return (
                    total +
                    17 *
                    Number(item.quantity || 1)
                );

            }

            return total;

        },
        0
    );


    // ========================================
    // GRAND TOTAL
    // ========================================

    const total =
        totalCost +
        shipping +
        deposit;


    const isCartEmpty =
        cartItems.length === 0;


    // ========================================
    // QUANTITY
    // ========================================

    const handleQuantityChange = (
        id,
        duration,
        quantity
    ) => {

        const newQuantity =
            Number(quantity);

        if (newQuantity >= 1) {

            dispatch(
                updateQuantity({
                    id,
                    duration,
                    quantity: newQuantity
                })
            );

        }
    };


    // ========================================
    // REMOVE
    // ========================================

    const handleRemove = (
        id,
        duration
    ) => {

        dispatch(
            removeFromCart({
                id,
                duration
            })
        );

    };


    return (

        <div className="container py-4">

            <div className="cart-block">

                <div className="row g-4">


                    {/* ==================================
                        CART PRODUCTS
                    ================================== */}

                    <div className="col-lg-8">

                        <div className="card mb-3">

                            <div className="card-header bg-white">

                                <h4 className="fw-bold my-2">
                                    Cart
                                </h4>

                            </div>


                            <div className="card-body p-3">

                                {isCartEmpty ? (

                                    <div className="text-center py-5">

                                        <i
                                            className="fa-solid fa-cart-shopping mb-3"
                                            style={{
                                                fontSize: "40px"
                                            }}
                                        />

                                        <h5>
                                            Your cart is empty
                                        </h5>

                                        <p className="text-muted">
                                            Add some products to continue.
                                        </p>

                                        <Link
                                            to="/"
                                            className="btn btn-primary"
                                        >
                                            Continue Shopping
                                        </Link>

                                    </div>

                                ) : (

                                    cartItems.map(
                                        (item, index) => (

                                            <div
                                                key={`${item.id}-${item.duration || "shop"}-${index}`}
                                                className="d-flex align-items-center border-bottom py-3 cart-product"
                                            >


                                                {/* PRODUCT */}

                                                <Link
                                                    to={
                                                        item.type === "rental"
                                                            ? `/product/${item.id}`
                                                            : `/shop-index/product/${item.id}`
                                                    }
                                                    className="d-flex align-items-center text-decoration-none text-dark product-title"
                                                    style={{
                                                        flex: 1
                                                    }}
                                                >

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        style={{
                                                            width: "100px",
                                                            height: "80px",
                                                            objectFit: "contain"
                                                        }}
                                                    />


                                                    <div className="mx-3">

                                                        <h6 className="fw-semibold mb-1">
                                                            {item.name}
                                                        </h6>

                                                        {item.type === "rental" &&
                                                            item.duration && (
                                                                <div className="small text-muted">

                                                                    Rental Tenure:{" "}

                                                                    {item.duration}

                                                                </div>
                                                            )}
                                                        <small
                                                            className={
                                                                item.type === "rental"
                                                                    ? "text-rental"
                                                                    : "text-shop"
                                                            }
                                                        >Type : 
                                                            {item.type === "rental"
                                                                ? " Rental"
                                                                : " Shop"}
                                                        </small>

                                                    </div>

                                                </Link>

                                                {/* QUANTITY */}

                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={
                                                        item.quantity || 1
                                                    }
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            item.duration,
                                                            e.target.value
                                                        )
                                                    }
                                                    style={{
                                                        width: "70px"
                                                    }}
                                                    className="form-control me-3"
                                                />


                                                {/* PRICE */}

                                                <div className="text-end">

                                                    <h5 className="fw-bold">

                                                        £
                                                        {(
                                                            Number(
                                                                item.price || 0
                                                            ) *
                                                            Number(
                                                                item.quantity || 1
                                                            )
                                                        ).toFixed(2)}

                                                    </h5>


                                                    {item.type === "rental" && (

                                                        <small className="text-muted">

                                                            per month

                                                        </small>

                                                    )}

                                                    <div className="mt-2">

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm text-danger border"
                                                            onClick={() =>
                                                                handleRemove(
                                                                    item.id,
                                                                    item.duration
                                                                )
                                                            }
                                                        >

                                                            <i className="fa-solid fa-trash-can"></i>

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    )

                                )}

                            </div>

                        </div>

                    </div>


                    {/* ==================================
                        ORDER SUMMARY
                    ================================== */}

                    <div className="col-lg-4">

                        <div className="card">

                            <div className="card-header bg-white">

                                <h5 className="fw-semibold my-2">
                                    Order Summary
                                </h5>

                            </div>


                            <div className="card-body p-3">

                                <div className="d-flex justify-content-between mb-2">

                                    <span>
                                        Total Cost
                                    </span>

                                    <span>
                                        £{totalCost.toFixed(2)}
                                    </span>

                                </div>


                                <div className="d-flex justify-content-between mb-2">

                                    <span>
                                        Shipping
                                    </span>

                                    <span>
                                        £{shipping.toFixed(2)}
                                    </span>

                                </div>


                                {deposit > 0 && (

                                    <div className="d-flex justify-content-between mb-2">

                                        <span>

                                            Refundable Deposit

                                            <small className="text-muted d-block">
                                                Charged for each rental product
                                            </small>

                                        </span>


                                        <span>
                                            £{deposit.toFixed(2)}
                                        </span>

                                    </div>

                                )}


                                <hr />


                                <div className="d-flex justify-content-between fw-bold mb-3">

                                    <span>
                                        Total incl. VAT
                                    </span>

                                    <span>
                                        £{total.toFixed(2)}
                                    </span>

                                </div>


                                {isCartEmpty ? (

                                    <button
                                        type="button"
                                        className="btn btn-secondary w-100"
                                        disabled
                                    >
                                        Cart is Empty
                                    </button>

                                ) : (

                                    <Link
                                        to="/checkout"
                                        className="btn btn-secondary w-100"
                                    >
                                        Continue to checkout →
                                    </Link>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default AddToCart;
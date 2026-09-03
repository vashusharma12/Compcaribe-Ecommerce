import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/auth";

const OrdersContent = () => {

    // =========================================
    // USER
    // =========================================

    const user = getCurrentUser();


    // =========================================
    // STATE
    // =========================================

    const [orders, setOrders] = useState([]);


    // =========================================
    // USER-SPECIFIC ORDER KEY
    // =========================================

    const ordersKey = user
        ? `orders_${user.email}`
        : "orders_guest";


    // =========================================
    // LOAD ORDERS
    // =========================================

    useEffect(() => {

        const loadOrders = () => {

            const savedOrders =
                JSON.parse(
                    localStorage.getItem(ordersKey)
                ) || [];


            setOrders(savedOrders);

        };


        loadOrders();


        // Same-tab updates

        window.addEventListener(
            "ordersUpdated",
            loadOrders
        );


        window.addEventListener(
            "userDataUpdated",
            loadOrders
        );


        // Other-tab updates

        window.addEventListener(
            "storage",
            loadOrders
        );


        return () => {

            window.removeEventListener(
                "ordersUpdated",
                loadOrders
            );

            window.removeEventListener(
                "userDataUpdated",
                loadOrders
            );

            window.removeEventListener(
                "storage",
                loadOrders
            );

        };

    }, [ordersKey]);


    // =========================================
    // LOGIN CHECK
    // =========================================

    if (!user) {

        return (

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body text-center py-5">

                    <i
                        className="fa-solid fa-box-open text-secondary mb-4"
                        style={{
                            fontSize: "70px"
                        }}
                    ></i>


                    <h4 className="fw-bold">
                        Login Required
                    </h4>


                    <p className="text-muted mb-4">

                        Please login to view your orders.

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
    // PAYMENT METHOD
    // =========================================

    const getPaymentMethod = (
        paymentMethod
    ) => {

        switch (paymentMethod) {

            case "card":
                return "Credit / Debit Card";

            case "upi":
                return "UPI";

            case "cod":
                return "Cash on Delivery";

            default:
                return "Not specified";

        }

    };


    // =========================================
    // STATUS CLASS
    // =========================================

    const getStatusClass = (
        status
    ) => {

        switch (status) {

            case "Delivered":
                return "bg-success";

            case "Cancelled":
                return "bg-danger";

            case "Shipped":
                return "bg-info text-dark";

            default:
                return "bg-warning text-dark";

        }

    };


    // =========================================
    // RENDER
    // =========================================

    return (

        <div className="card shadow-sm border-0 rounded-4">

            <div className="card-body p-4">


                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h3 className="fw-bold mb-1">

                            My Orders

                        </h3>


                        <p className="text-muted mb-0">

                            {orders.length > 0
                                ? `${orders.length} order${orders.length > 1 ? "s" : ""} placed.`
                                : "View and track all your orders."
                            }

                        </p>

                    </div>


                    {orders.length > 0 && (

                        <span className="badge bg-secondary fs-6">

                            {orders.length}{" "}
                            {orders.length === 1
                                ? "Order"
                                : "Orders"}

                        </span>

                    )}

                </div>


                <hr />


                {/* =========================================
                    EMPTY ORDERS
                ========================================= */}

                {orders.length === 0 ? (

                    <div className="text-center py-5">

                        <i
                            className="fa-solid fa-box-open text-secondary mb-4"
                            style={{
                                fontSize: "70px"
                            }}
                        ></i>


                        <h4 className="fw-bold">

                            No Orders Found

                        </h4>


                        <p className="text-muted mb-4">

                            You haven't placed any
                            orders yet.

                        </p>


                        <Link
                            to="/shop-index"
                            className="btn btn-secondary"
                        >

                            Continue Shopping

                        </Link>

                    </div>

                ) : (


                    /* =========================================
                       ORDERS
                    ========================================= */

                    <div className="d-flex flex-column gap-4">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="border rounded-4 p-4 shadow"
                            >


                                {/* =================================
                                    ORDER HEADER
                                ================================= */}

                                <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">

                                    <div>

                                        <h5 className="fw-bold mb-1">

                                            Order #{order.id}

                                        </h5>


                                        <small className="text-muted">

                                            Placed on{" "}

                                            {formatDate(
                                                order.date
                                            )}

                                        </small>

                                    </div>


                                    <span
                                        className={`badge ${getStatusClass(
                                            order.status
                                        )}`}
                                    >

                                        {order.status ||
                                            "Processing"}

                                    </span>

                                </div>


                                <hr />


                                {/* =================================
                                    PRODUCTS
                                ================================= */}

                                <div>

                                    {order.items?.map(
                                        (item, index) => (

                                            <div
                                                key={`${item.id}-${index}`}
                                                className="d-flex align-items-center justify-content-between gap-3 mb-3"
                                            >


                                                <div className="d-flex align-items-center gap-3">


                                                    {/* IMAGE */}

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        style={{
                                                            width: "65px",
                                                            height: "65px",
                                                            objectFit: "contain",
                                                            borderRadius: "8px",
                                                            border: "1px solid #eee"
                                                        }}
                                                    />


                                                    {/* DETAILS */}

                                                    <div>

                                                        <h6 className="fw-semibold mb-1">

                                                            {item.name}

                                                        </h6>


                                                        <small className="text-muted">

                                                            Qty:{" "}
                                                            {item.quantity}

                                                        </small>


                                                        <div>

                                                            <small
                                                                className={
                                                                    item.type ===
                                                                    "rental"
                                                                        ? "text-primary"
                                                                        : "text-secondary"
                                                                }
                                                            >

                                                                {item.type ===
                                                                "rental"
                                                                    ? "Rental"
                                                                    : "Shop Product"}

                                                            </small>

                                                        </div>

                                                    </div>

                                                </div>


                                                <div className="fw-semibold">

                                                    £
                                                    {(
                                                        Number(
                                                            item.price || 0
                                                        ) *
                                                        Number(
                                                            item.quantity || 1
                                                        )
                                                    ).toFixed(2)}

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>


                                <hr />


                                {/* =================================
                                    ORDER TOTALS
                                ================================= */}

                                <div className="row justify-content-end">

                                    <div className="col-md-6">


                                        {/* SUBTOTAL */}

                                        <div className="d-flex justify-content-between mb-2">

                                            <span>
                                                Subtotal
                                            </span>

                                            <span>

                                                £
                                                {Number(
                                                    order.subtotal || 0
                                                ).toFixed(2)}

                                            </span>

                                        </div>


                                        {/* SHIPPING */}

                                        <div className="d-flex justify-content-between mb-2">

                                            <span>
                                                Shipping
                                            </span>

                                            <span>

                                                £
                                                {Number(
                                                    order.shipping || 0
                                                ).toFixed(2)}

                                            </span>

                                        </div>


                                        {/* DEPOSIT */}

                                        {Number(
                                            order.deposit || 0
                                        ) > 0 && (

                                            <div className="d-flex justify-content-between mb-2">

                                                <span>
                                                    Refundable Deposit
                                                </span>

                                                <span>

                                                    £
                                                    {Number(
                                                        order.deposit
                                                    ).toFixed(2)}

                                                </span>

                                            </div>

                                        )}


                                        {/* DISCOUNT */}

                                        {Number(
                                            order.discount || 0
                                        ) > 0 && (

                                            <div className="d-flex justify-content-between mb-2 text-success">

                                                <span>
                                                    Discount
                                                </span>

                                                <span>

                                                    -£
                                                    {Number(
                                                        order.discount
                                                    ).toFixed(2)}

                                                </span>

                                            </div>

                                        )}


                                        <hr />


                                        {/* TOTAL */}

                                        <div className="d-flex justify-content-between fw-bold fs-5">

                                            <span>
                                                Total
                                            </span>

                                            <span>

                                                £
                                                {Number(
                                                    order.total || 0
                                                ).toFixed(2)}

                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================
                                    CUSTOMER + PAYMENT
                                ================================= */}

                                <div className="mt-4 pt-3 border-top">

                                    <div className="row g-4">


                                        {/* CUSTOMER */}

                                        <div className="col-md-6">

                                            <h6 className="fw-semibold mb-3">

                                                Customer Details

                                            </h6>


                                            <p className="mb-1">

                                                <strong>
                                                    Name:
                                                </strong>{" "}

                                                {order.customer?.firstName}{" "}
                                                {order.customer?.lastName}

                                            </p>


                                            <p className="mb-1">

                                                <strong>
                                                    Email:
                                                </strong>{" "}

                                                {order.customer?.email ||
                                                    "-"}

                                            </p>


                                            <p className="mb-0">

                                                <strong>
                                                    Phone:
                                                </strong>{" "}

                                                {order.customer?.phone ||
                                                    "-"}

                                            </p>

                                        </div>


                                        {/* PAYMENT */}

                                        <div className="col-md-6">

                                            <h6 className="fw-semibold mb-3">

                                                Payment & Delivery

                                            </h6>


                                            <p className="mb-2">

                                                <strong>
                                                    Payment:
                                                </strong>{" "}

                                                {getPaymentMethod(
                                                    order.paymentMethod
                                                )}

                                            </p>


                                            <p className="mb-0">

                                                <strong>
                                                    Delivery:
                                                </strong>{" "}

                                                {order.address?.city ||
                                                    "-"}
                                                {order.address?.state &&
                                                    `, ${order.address.state}`}

                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================
                                    FULL ADDRESS
                                ================================= */}

                                {order.address && (

                                    <div className="mt-4 pt-3 border-top">

                                        <h6 className="fw-semibold mb-3">

                                            <i className="fa-solid fa-location-dot me-2 text-warning"></i>

                                            Delivery Address

                                        </h6>


                                        <p className="mb-1">

                                            {order.address.address1}

                                            {order.address.address2 &&
                                                `, ${order.address.address2}`}

                                        </p>


                                        {order.address.landmark && (

                                            <p className="mb-1 text-muted">

                                                Landmark:{" "}
                                                {order.address.landmark}

                                            </p>

                                        )}


                                        <p className="mb-1">

                                            {order.address.city},{" "}
                                            {order.address.state},{" "}
                                            {order.address.country}

                                        </p>


                                        <p className="mb-0">

                                            Postal Code:{" "}
                                            {order.address.postalCode}

                                        </p>


                                        {order.address.instructions && (

                                            <div className="alert alert-light border mt-3 mb-0">

                                                <strong>
                                                    Delivery Instructions:
                                                </strong>{" "}

                                                {
                                                    order.address
                                                        .instructions
                                                }

                                            </div>

                                        )}

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

};

export default OrdersContent;
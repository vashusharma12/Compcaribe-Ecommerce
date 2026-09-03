import { useState } from "react";
import { getCurrentUser } from "../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCart } from "../redux/slices/cartSlice";


const CheckoutEnd = () => {

    // =====================================================
    // REDUX
    // =====================================================

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(
        (state) => state.cart?.items ?? []
    );


    // =====================================================
    // PAYMENT
    // =====================================================

    const [paymentMethod, setPaymentMethod] = useState("card");

    const [paymentData, setPaymentData] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        upiId: ""
    });


    // =====================================================
    // COUPON
    // =====================================================

    const [coupon, setCoupon] = useState("");

    const [discount, setDiscount] = useState(0);

    const [couponMessage, setCouponMessage] = useState("");


    // =====================================================
    // BILLING FORM
    // =====================================================

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        email: "",
        phone: "",

        address1: "",
        address2: "",
        landmark: "",
        instructions: "",

        city: "",
        state: "",
        country: "",
        postalCode: ""

    });


    // =====================================================
    // VALIDATION STATE
    // =====================================================

    const [errors, setErrors] = useState({});

    const [touched, setTouched] = useState({});


    // =====================================================
    // CALCULATIONS
    // =====================================================

    const subtotal = cartItems.reduce(
        (acc, item) =>
            acc +
            Number(item.price || 0) *
            Number(item.quantity || 1),
        0
    );


    const shipping =
        cartItems.length > 0
            ? 4.90
            : 0;


    /*
     * Refundable deposit:
     * £17 for every rental product quantity.
     */

    const deposit = cartItems.reduce(
        (acc, item) => {

            if (item.type === "rental") {

                return (
                    acc +
                    17 *
                    Number(item.quantity || 1)
                );

            }

            return acc;

        },
        0
    );


    const total =
        subtotal +
        shipping +
        deposit -
        discount;


    // =====================================================
    // FIELD VALIDATION
    // =====================================================

    const validateField = (name, value) => {

        const trimmedValue = value.trim();


        switch (name) {


            // =============================================
            // FIRST NAME
            // =============================================

            case "firstName":

                if (!trimmedValue) {
                    return "This field is required";
                }

                if (trimmedValue.length < 2) {
                    return "First name must be at least 2 characters";
                }

                if (!/^[a-zA-Z\s'-]+$/.test(trimmedValue)) {
                    return "Please enter a valid first name";
                }

                return "";


            // =============================================
            // LAST NAME
            // =============================================

            case "lastName":

                if (!trimmedValue) {
                    return "This field is required";
                }

                if (trimmedValue.length < 2) {
                    return "Last name must be at least 2 characters";
                }

                if (!/^[a-zA-Z\s'-]+$/.test(trimmedValue)) {
                    return "Please enter a valid last name";
                }

                return "";


            // =============================================
            // EMAIL
            // =============================================

            case "email":

                if (!trimmedValue) {
                    return "This field is required";
                }

                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        trimmedValue
                    )
                ) {
                    return "Please enter a valid email address";
                }

                return "";


            // =============================================
            // PHONE
            // =============================================

            case "phone": {

                if (!trimmedValue) {
                    return "This field is required";
                }

                const phone =
                    trimmedValue.replace(/\D/g, "");

                if (phone.length < 10) {
                    return "Phone number must contain at least 10 digits";
                }

                if (phone.length > 15) {
                    return "Please enter a valid phone number";
                }

                return "";
            }


            // =============================================
            // ADDRESS
            // =============================================

            case "address1":

                if (!trimmedValue) {
                    return "This field is required";
                }

                if (trimmedValue.length < 5) {
                    return "Please enter a complete address";
                }

                return "";


            // =============================================
            // CITY
            // =============================================

            case "city":

                if (!trimmedValue) {
                    return "This field is required";
                }

                return "";


            // =============================================
            // STATE
            // =============================================

            case "state":

                if (!trimmedValue) {
                    return "This field is required";
                }

                return "";


            // =============================================
            // COUNTRY
            // =============================================

            case "country":

                if (!trimmedValue) {
                    return "This field is required";
                }

                return "";


            // =============================================
            // POSTAL CODE
            // =============================================

            case "postalCode":

                if (!trimmedValue) {
                    return "This field is required";
                }

                if (
                    !/^[a-zA-Z0-9\s-]{3,10}$/.test(
                        trimmedValue
                    )
                ) {
                    return "Please enter a valid postal code";
                }

                return "";


            // =============================================
            // OPTIONAL FIELDS
            // =============================================

            case "address2":
            case "landmark":
            case "instructions":

                return "";


            default:

                return "";
        }
    };


    // =====================================================
    // HANDLE BILLING CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));


        /*
         * If user has already touched this field,
         * validate while typing.
         */

        if (touched[name]) {

            setErrors((prev) => ({
                ...prev,
                [name]: validateField(
                    name,
                    value
                )
            }));

        }
    };


    // =====================================================
    // HANDLE BILLING BLUR
    // =====================================================

    const handleBlur = (e) => {

        const {
            name,
            value
        } = e.target;


        setTouched((prev) => ({
            ...prev,
            [name]: true
        }));


        setErrors((prev) => ({
            ...prev,
            [name]: validateField(
                name,
                value
            )
        }));
    };


    // =====================================================
    // HANDLE PAYMENT CHANGE
    // =====================================================

    const handlePaymentChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setPaymentData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // =====================================================
    // APPLY COUPON
    // =====================================================

    const handleApplyCoupon = () => {

        const enteredCoupon =
            coupon.trim().toUpperCase();


        if (enteredCoupon === "FLAT10") {

            const discountValue =
                subtotal * 0.10;


            setDiscount(discountValue);


            setCouponMessage(
                "Coupon applied! 10% discount added."
            );

        } else {

            setDiscount(0);


            setCouponMessage(
                "Invalid coupon."
            );
        }
    };


    // =====================================================
    // VALIDATE COMPLETE FORM
    // =====================================================

    const validateForm = () => {

        const newErrors = {};


        Object.keys(formData).forEach(
            (key) => {

                const error =
                    validateField(
                        key,
                        formData[key]
                    );


                if (error) {

                    newErrors[key] =
                        error;

                }

            }
        );


        setErrors(newErrors);


        /*
         * Mark every field as touched.
         * This makes all validation messages
         * visible after Place Order is clicked.
         */

        const allTouched = {};


        Object.keys(formData).forEach(
            (key) => {

                allTouched[key] = true;

            }
        );


        setTouched(allTouched);


        return newErrors;
    };


    // =====================================================
    // HANDLE PLACE ORDER
    // =====================================================

   const handleSubmit = () => {

    // =========================================
    // VALIDATE FORM
    // =========================================

    const newErrors = validateForm();


    if (Object.keys(newErrors).length > 0) {

        const firstErrorField =
            Object.keys(newErrors)[0];


        const el = document.querySelector(
            `[name="${firstErrorField}"]`
        );


        if (el) {

            el.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });


            el.focus();

        }


        return;

    }


    // =========================================
    // GET CURRENT USER
    // =========================================

    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        navigate(
            "/shop-index/login"
        );

        return;

    }


    // =========================================
    // USER-SPECIFIC STORAGE KEYS
    // =========================================

    const ordersKey =
        `orders_${currentUser.email}`;


    const addressesKey =
        `addresses_${currentUser.email}`;


    // =========================================
    // CREATE ORDER
    // =========================================

    const newOrder = {

        id: `ORD-${Date.now()}`,

        date:
            new Date().toISOString(),

        status:
            "Processing",


        // =====================================
        // PRODUCTS
        // =====================================

        items: cartItems.map(
            (item) => ({

                id: item.id,

                name: item.name,

                image: item.image,

                price:
                    Number(
                        item.price || 0
                    ),

                quantity:
                    Number(
                        item.quantity || 1
                    ),

                type:
                    item.type,

            })
        ),


        // =====================================
        // ORDER AMOUNTS
        // =====================================

        subtotal:
            Number(
                subtotal.toFixed(2)
            ),

        shipping:
            Number(
                shipping.toFixed(2)
            ),

        deposit:
            Number(
                deposit.toFixed(2)
            ),

        discount:
            Number(
                discount.toFixed(2)
            ),

        total:
            Number(
                total.toFixed(2)
            ),


        // =====================================
        // PAYMENT
        // =====================================

        paymentMethod,


        // =====================================
        // CUSTOMER
        // =====================================

        customer: {

            firstName:
                formData.firstName,

            lastName:
                formData.lastName,

            email:
                formData.email,

            phone:
                formData.phone,

        },


        // =====================================
        // ADDRESS
        // =====================================

        address: {

            address1:
                formData.address1,

            address2:
                formData.address2,

            landmark:
                formData.landmark,

            city:
                formData.city,

            state:
                formData.state,

            country:
                formData.country,

            postalCode:
                formData.postalCode,

            instructions:
                formData.instructions,

        },

    };


    // =========================================
    // SAVE ORDER
    // =========================================

    const existingOrders =
        JSON.parse(
            localStorage.getItem(
                ordersKey
            )
        ) || [];


    existingOrders.unshift(
        newOrder
    );


    localStorage.setItem(
        ordersKey,
        JSON.stringify(
            existingOrders
        )
    );


    // =========================================
    // CREATE ADDRESS
    // =========================================

    const newAddress = {

        id:
            `ADDR-${Date.now()}`,

        firstName:
            formData.firstName,

        lastName:
            formData.lastName,

        email:
            formData.email,

        phone:
            formData.phone,

        address1:
            formData.address1,

        address2:
            formData.address2,

        landmark:
            formData.landmark,

        city:
            formData.city,

        state:
            formData.state,

        country:
            formData.country,

        postalCode:
            formData.postalCode,

        instructions:
            formData.instructions,

    };


    // =========================================
    // SAVE ADDRESS
    // =========================================

    const existingAddresses =
        JSON.parse(
            localStorage.getItem(
                addressesKey
            )
        ) || [];


    /*
     * Check whether the same address
     * already exists.
     */

    const addressExists =
        existingAddresses.some(
            (address) =>
                address.address1 ===
                    newAddress.address1 &&
                address.city ===
                    newAddress.city &&
                address.state ===
                    newAddress.state &&
                address.postalCode ===
                    newAddress.postalCode
        );


    if (!addressExists) {

        existingAddresses.unshift(
            newAddress
        );


        localStorage.setItem(
            addressesKey,
            JSON.stringify(
                existingAddresses
            )
        );

    }


    // =========================================
    // NOTIFY DASHBOARD
    // =========================================

    window.dispatchEvent(
        new Event(
            "ordersUpdated"
        )
    );


    window.dispatchEvent(
        new Event(
            "addressesUpdated"
        )
    );


    window.dispatchEvent(
        new Event(
            "userDataUpdated"
        )
    );


    // =========================================
    // CLEAR CART
    // =========================================

    dispatch(
        clearCart()
    );


    // =========================================
    // GO TO ORDERS
    // =========================================

    navigate(
        "/shop-index/orders"
    );

};


    // =====================================================
    // INPUT CLASS HELPER
    // =====================================================

    const getInputClass = (name) => {

        if (
            touched[name] &&
            errors[name]
        ) {

            return "form-control is-invalid";

        }


        if (
            touched[name] &&
            !errors[name] &&
            formData[name].trim()
        ) {

            return "form-control is-valid";

        }


        return "form-control";
    };


    // =====================================================
    // ERROR MESSAGE
    // =====================================================

    const ErrorMessage = ({
        name
    }) => {

        if (
            !touched[name] ||
            !errors[name]
        ) {
            return null;
        }


        return (
            <div className="text-danger small mt-1">

                <i className="fa-solid fa-circle-exclamation me-1"></i>

                {errors[name]}

            </div>
        );
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="container my-5 checkout">

            <div className="row">


                {/* =================================================
                    BILLING DETAILS
                ================================================= */}

                <div className="col-md-7">

                    <h4 className="mb-3 fw-bold">
                        Billing Details
                    </h4>


                    <div className="card p-4 shadow-sm">


                        {/* =========================================
                            FIRST + LAST NAME
                        ========================================= */}

                        <div className="row">


                            {/* FIRST NAME */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">

                                    First Name

                                    <span className="text-danger ms-1">
                                        *
                                    </span>

                                </label>


                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    className={getInputClass(
                                        "firstName"
                                    )}
                                    placeholder="Enter first name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />


                                <ErrorMessage
                                    name="firstName"
                                />

                            </div>


                            {/* LAST NAME */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">

                                    Last Name

                                    <span className="text-danger ms-1">
                                        *
                                    </span>

                                </label>


                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    className={getInputClass(
                                        "lastName"
                                    )}
                                    placeholder="Enter last name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />


                                <ErrorMessage
                                    name="lastName"
                                />

                            </div>

                        </div>


                        {/* =========================================
                            EMAIL
                        ========================================= */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Email Address

                                <span className="text-danger ms-1">
                                    *
                                </span>

                            </label>


                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                className={getInputClass(
                                    "email"
                                )}
                                placeholder="Enter your email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />


                            <ErrorMessage
                                name="email"
                            />

                        </div>


                        {/* =========================================
                            PHONE
                        ========================================= */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Phone Number

                                <span className="text-danger ms-1">
                                    *
                                </span>

                            </label>


                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                className={getInputClass(
                                    "phone"
                                )}
                                placeholder="Enter phone number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />


                            <ErrorMessage
                                name="phone"
                            />

                        </div>


                        {/* =========================================
                            ADDRESS 1
                        ========================================= */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Address Line 1

                                <span className="text-danger ms-1">
                                    *
                                </span>

                            </label>


                            <input
                                type="text"
                                name="address1"
                                value={formData.address1}
                                className={getInputClass(
                                    "address1"
                                )}
                                placeholder="House number, street name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />


                            <ErrorMessage
                                name="address1"
                            />

                        </div>


                        {/* =========================================
                            ADDRESS 2
                        ========================================= */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Address Line 2

                                <small className="text-muted ms-2">
                                    Optional
                                </small>

                            </label>


                            <input
                                type="text"
                                name="address2"
                                value={formData.address2}
                                className="form-control"
                                placeholder="Apartment, suite, etc."
                                onChange={handleChange}
                            />

                        </div>


                        {/* =========================================
                            LANDMARK
                        ========================================= */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Landmark

                                <small className="text-muted ms-2">
                                    Optional
                                </small>

                            </label>


                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                className="form-control"
                                placeholder="Nearby landmark"
                                onChange={handleChange}
                            />

                        </div>


                        {/* =========================================
                            DELIVERY INSTRUCTIONS
                        ========================================= */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Delivery Instructions

                                <small className="text-muted ms-2">
                                    Optional
                                </small>

                            </label>


                            <textarea
                                name="instructions"
                                value={
                                    formData.instructions
                                }
                                className="form-control"
                                placeholder="Any special delivery instructions?"
                                rows="3"
                                onChange={handleChange}
                            />

                        </div>


                        {/* =========================================
                            CITY + STATE
                        ========================================= */}

                        <div className="row">


                            {/* CITY */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">

                                    City

                                    <span className="text-danger ms-1">
                                        *
                                    </span>

                                </label>


                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    className={getInputClass(
                                        "city"
                                    )}
                                    placeholder="Enter city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />


                                <ErrorMessage
                                    name="city"
                                />

                            </div>


                            {/* STATE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">

                                    State

                                    <span className="text-danger ms-1">
                                        *
                                    </span>

                                </label>


                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    className={getInputClass(
                                        "state"
                                    )}
                                    placeholder="Enter state"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />


                                <ErrorMessage
                                    name="state"
                                />

                            </div>

                        </div>


                        {/* =========================================
                            COUNTRY + POSTAL CODE
                        ========================================= */}

                        <div className="row">


                            {/* COUNTRY */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">

                                    Country

                                    <span className="text-danger ms-1">
                                        *
                                    </span>

                                </label>


                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    className={getInputClass(
                                        "country"
                                    )}
                                    placeholder="Enter country"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />


                                <ErrorMessage
                                    name="country"
                                />

                            </div>


                            {/* POSTAL CODE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">

                                    Postal Code

                                    <span className="text-danger ms-1">
                                        *
                                    </span>

                                </label>


                                <input
                                    type="text"
                                    name="postalCode"
                                    value={
                                        formData.postalCode
                                    }
                                    className={getInputClass(
                                        "postalCode"
                                    )}
                                    placeholder="Enter postal code"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />


                                <ErrorMessage
                                    name="postalCode"
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    RIGHT COLUMN
                ================================================= */}

                <div className="col-md-5">


                    {/* =================================================
                        ORDER SUMMARY
                    ================================================= */}

                    <div className="card shadow-sm mb-3 order-summary">


                        <div className="card-header bg-white">

                            <h5 className="my-2 fw-semibold">
                                Order Summary
                            </h5>

                        </div>


                        <div className="card-body p-3">


                            {cartItems.map(
                                (item) => (

                                    <div
                                        key={item.id}
                                        className="d-flex align-items-start gap-2 justify-content-between mb-3"
                                    >


                                        <div className="d-flex align-items-center gap-3">


                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    border: "1px solid #eee"
                                                }}
                                            />


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
                                                                ? "text-rental"
                                                                : "text-shop"
                                                        }
                                                    >

                                                        Type:{" "}

                                                        {item.type ===
                                                            "rental"
                                                            ? "Rental"
                                                            : "Shop"}

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


                            <hr />


                            {/* SUBTOTAL */}

                            <div className="d-flex justify-content-between">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    £{subtotal.toFixed(2)}
                                </span>

                            </div>


                            {/* SHIPPING */}

                            <div className="d-flex justify-content-between">

                                <span>
                                    Shipping
                                </span>

                                <span>
                                    £{shipping.toFixed(2)}
                                </span>

                            </div>


                            {/* DISCOUNT */}

                            {discount > 0 && (

                                <div className="d-flex justify-content-between text-success">

                                    <span>
                                        Discount (FLAT10)
                                    </span>

                                    <span>
                                        -£{discount.toFixed(2)}
                                    </span>

                                </div>

                            )}


                            {/* REFUNDABLE DEPOSIT */}

                            {deposit > 0 && (

                                <div className="d-flex justify-content-between text-primary">

                                    <div>

                                        <span>
                                            Refundable Deposit - £17
                                        </span>


                                        <small className="text-muted d-block fst-italic">

                                            (Charged for each rental product)

                                        </small>

                                    </div>


                                    <span>
                                        £{deposit.toFixed(2)}
                                    </span>

                                </div>

                            )}


                            <hr />


                            {/* TOTAL */}

                            <div className="d-flex justify-content-between fw-bold">

                                <span>
                                    Total
                                </span>

                                <span>
                                    £{total.toFixed(2)}
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        COUPON
                    ================================================= */}

                    <div className="card p-4 shadow-sm mb-3">


                        <h6 className="fw-semibold">
                            Apply Coupon
                        </h6>


                        <div className="d-flex gap-2">


                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter coupon"
                                value={coupon}
                                onChange={(e) =>
                                    setCoupon(
                                        e.target.value
                                    )
                                }
                            />


                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={
                                    handleApplyCoupon
                                }
                            >
                                Apply
                            </button>

                        </div>


                        {couponMessage && (

                            <small
                                className={
                                    discount > 0
                                        ? "text-success d-block mt-2"
                                        : "text-danger d-block mt-2"
                                }
                            >
                                {couponMessage}
                            </small>

                        )}

                    </div>


                    {/* =================================================
                        PAYMENT
                    ================================================= */}

                    <div className="card p-4 shadow-sm">


                        <div className="d-flex justify-content-between align-items-center mb-3">


                            <h6 className="fw-semibold mb-0">
                                Payment Method
                            </h6>


                            <div className="text-success small">

                                <i className="fa-solid fa-lock me-1"></i>

                                Secure Payment

                            </div>

                        </div>


                        {/* =================================================
                            PAYMENT OPTIONS
                        ================================================= */}

                        <div className="payment_methods">


                            {/* =================================================
                                CARD
                            ================================================= */}

                            <div
                                className={`payment_option ${
                                    paymentMethod === "card"
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setPaymentMethod(
                                        "card"
                                    )
                                }
                            >


                                <div className="d-flex align-items-center">


                                    <div className="form-check mb-0">

                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="paymentMethod"
                                            checked={
                                                paymentMethod ===
                                                "card"
                                            }
                                            onChange={() =>
                                                setPaymentMethod(
                                                    "card"
                                                )
                                            }
                                        />

                                    </div>


                                    <div className="payment_icon ms-2">

                                        <i className="fa-regular fa-credit-card"></i>

                                    </div>


                                    <div className="ms-3">

                                        <div className="fw-semibold">

                                            Credit / Debit Card

                                        </div>


                                        <small className="text-muted">

                                            Visa, Mastercard, Amex

                                        </small>

                                    </div>

                                </div>


                                {paymentMethod === "card" && (

                                    <div
                                        className="payment_details mt-3"
                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }
                                    >


                                        {/* CARD NAME */}

                                        <div className="mb-3">

                                            <label className="form-label small fw-semibold">

                                                Cardholder Name

                                            </label>


                                            <input
                                                type="text"
                                                name="cardName"
                                                value={
                                                    paymentData.cardName
                                                }
                                                className="form-control"
                                                placeholder="Name on card"
                                                onChange={
                                                    handlePaymentChange
                                                }
                                            />

                                        </div>


                                        {/* CARD NUMBER */}

                                        <div className="mb-3">

                                            <label className="form-label small fw-semibold">

                                                Card Number

                                            </label>


                                            <div className="input-group">


                                                <span className="input-group-text">

                                                    <i className="fa-regular fa-credit-card"></i>

                                                </span>


                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={
                                                        paymentData.cardNumber
                                                    }
                                                    className="form-control"
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength="19"
                                                    onChange={(e) => {

                                                        let value =
                                                            e.target.value
                                                                .replace(
                                                                    /\D/g,
                                                                    ""
                                                                )
                                                                .slice(
                                                                    0,
                                                                    16
                                                                );


                                                        value =
                                                            value
                                                                .match(
                                                                    /.{1,4}/g
                                                                )
                                                                ?.join(
                                                                    " "
                                                                ) ||
                                                            "";


                                                        setPaymentData(
                                                            (prev) => ({
                                                                ...prev,
                                                                cardNumber:
                                                                    value
                                                            })
                                                        );

                                                    }}
                                                />

                                            </div>

                                        </div>


                                        {/* EXPIRY + CVV */}

                                        <div className="row">


                                            <div className="col-6">

                                                <label className="form-label small fw-semibold">

                                                    Expiry Date

                                                </label>


                                                <input
                                                    type="text"
                                                    name="expiry"
                                                    value={
                                                        paymentData.expiry
                                                    }
                                                    className="form-control"
                                                    placeholder="MM / YY"
                                                    maxLength="7"
                                                    onChange={(e) => {

                                                        let value =
                                                            e.target.value
                                                                .replace(
                                                                    /\D/g,
                                                                    ""
                                                                )
                                                                .slice(
                                                                    0,
                                                                    4
                                                                );


                                                        if (
                                                            value.length >=
                                                            3
                                                        ) {

                                                            value =
                                                                value.slice(
                                                                    0,
                                                                    2
                                                                ) +
                                                                " / " +
                                                                value.slice(
                                                                    2
                                                                );

                                                        }


                                                        setPaymentData(
                                                            (prev) => ({
                                                                ...prev,
                                                                expiry:
                                                                    value
                                                            })
                                                        );

                                                    }}
                                                />

                                            </div>


                                            <div className="col-6">

                                                <label className="form-label small fw-semibold">

                                                    CVV

                                                </label>


                                                <input
                                                    type="password"
                                                    name="cvv"
                                                    value={
                                                        paymentData.cvv
                                                    }
                                                    className="form-control"
                                                    placeholder="•••"
                                                    maxLength="4"
                                                    onChange={(e) => {

                                                        const value =
                                                            e.target.value
                                                                .replace(
                                                                    /\D/g,
                                                                    ""
                                                                )
                                                                .slice(
                                                                    0,
                                                                    4
                                                                );


                                                        setPaymentData(
                                                            (prev) => ({
                                                                ...prev,
                                                                cvv:
                                                                    value
                                                            })
                                                        );

                                                    }}
                                                />

                                            </div>

                                        </div>


                                        <div className="mt-3 small text-muted">

                                            <i className="fa-solid fa-shield-halved me-1"></i>

                                            Your card information is encrypted and secure.

                                        </div>

                                    </div>

                                )}

                            </div>


                            {/* =================================================
                                UPI
                            ================================================= */}

                            <div
                                className={`payment_option ${
                                    paymentMethod === "upi"
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setPaymentMethod(
                                        "upi"
                                    )
                                }
                            >


                                <div className="d-flex align-items-center">


                                    <div className="form-check mb-0">

                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="paymentMethod"
                                            checked={
                                                paymentMethod ===
                                                "upi"
                                            }
                                            onChange={() =>
                                                setPaymentMethod(
                                                    "upi"
                                                )
                                            }
                                        />

                                    </div>


                                    <div className="payment_icon ms-2">

                                        <i className="fa-solid fa-mobile-screen-button"></i>

                                    </div>


                                    <div className="ms-3">

                                        <div className="fw-semibold">
                                            UPI
                                        </div>


                                        <small className="text-muted">

                                            Google Pay, PhonePe, Paytm & more

                                        </small>

                                    </div>

                                </div>


                                {paymentMethod === "upi" && (

                                    <div
                                        className="payment_details mt-3"
                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }
                                    >


                                        <label className="form-label small fw-semibold">

                                            UPI ID

                                        </label>


                                        <div className="input-group">


                                            <span className="input-group-text">

                                                <i className="fa-solid fa-at"></i>

                                            </span>


                                            <input
                                                type="text"
                                                name="upiId"
                                                value={
                                                    paymentData.upiId
                                                }
                                                className="form-control"
                                                placeholder="example@upi"
                                                onChange={
                                                    handlePaymentChange
                                                }
                                            />

                                        </div>


                                        <div className="d-flex gap-2 mt-3">


                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                            >

                                                <i className="fa-brands fa-google-pay me-1"></i>

                                                Google Pay

                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                            >
                                                PhonePe
                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                            >
                                                Paytm
                                            </button>

                                        </div>

                                    </div>

                                )}

                            </div>


                            {/* =================================================
                                COD
                            ================================================= */}

                            <div
                                className={`payment_option ${
                                    paymentMethod === "cod"
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setPaymentMethod(
                                        "cod"
                                    )
                                }
                            >


                                <div className="d-flex align-items-center">


                                    <div className="form-check mb-0">

                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="paymentMethod"
                                            checked={
                                                paymentMethod ===
                                                "cod"
                                            }
                                            onChange={() =>
                                                setPaymentMethod(
                                                    "cod"
                                                )
                                            }
                                        />

                                    </div>


                                    <div className="payment_icon ms-2">

                                        <i className="fa-solid fa-truck"></i>

                                    </div>


                                    <div className="ms-3">

                                        <div className="fw-semibold">

                                            Cash on Delivery

                                        </div>


                                        <small className="text-muted">

                                            Pay when your order arrives

                                        </small>

                                    </div>

                                </div>


                                {paymentMethod === "cod" && (

                                    <div
                                        className="alert alert-light border mt-3 mb-0 small"
                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }
                                    >

                                        <i className="fa-solid fa-circle-info me-2"></i>

                                        Please keep the exact amount ready when your
                                        order is delivered.

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* =================================================
                            SECURITY
                        ================================================= */}

                        <div className="row g-2 mt-4">


                            <div className="col-4">

                                <div className="text-center small text-muted">

                                    <i className="fa-solid fa-lock d-block mb-1"></i>

                                    Secure Checkout

                                </div>

                            </div>


                            <div className="col-4">

                                <div className="text-center small text-muted">

                                    <i className="fa-solid fa-shield-halved d-block mb-1"></i>

                                    Protected Payment

                                </div>

                            </div>


                            <div className="col-4">

                                <div className="text-center small text-muted">

                                    <i className="fa-solid fa-headset d-block mb-1"></i>

                                    Support

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            PLACE ORDER
                        ================================================= */}

                        <button
                            type="button"
                            className="btn btn-primary w-100 mt-4 py-2 fw-semibold"
                            onClick={handleSubmit}
                        >

                            <i className="fa-solid fa-lock me-2"></i>

                            Place Order

                            <span className="ms-2">

                                £{total.toFixed(2)}

                            </span>

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default CheckoutEnd;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const SignupModal = () => {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        // Don't show modal if user is already logged in
        if (getCurrentUser()) {
            return;
        }

        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000);

        return () => clearTimeout(timer);

    }, []);

    const handleClose = () => {
        setShowModal(false);
    };

    if (!showModal) {
        return null;
    }

    return (
        <>
            {/* ==============================
                BACKDROP
            ============================== */}

            <div
                className="signup-modal-backdrop"
                onClick={handleClose}
            ></div>


            {/* ==============================
                MODAL
            ============================== */}

            <div
                className="signup-modal-wrapper"
                role="dialog"
                aria-modal="true"
            >

                <div className="signup-modal">


                    {/* ==============================
                        CLOSE BUTTON
                    ============================== */}

                    <button
                        type="button"
                        className="signup-modal-close"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>


                    {/* ==============================
                        TOP ICON
                    ============================== */}

                    <div className="signup-modal-icon">

                        <i className="fa-solid fa-user-plus"></i>

                    </div>


                    {/* ==============================
                        CONTENT
                    ============================== */}

                    <div className="signup-modal-content">

                        <span className="signup-modal-badge">
                            Welcome!
                        </span>


                        <h3>
                            Create Your Account
                        </h3>


                        <p className="signup-modal-description">
                            Join us today and enjoy a faster,
                            easier and more personalized
                            shopping & rental experience.
                        </p>


                        {/* ==============================
                            BENEFITS
                        ============================== */}

                        <div className="signup-benefits">

                            <div className="signup-benefit">

                                <span className="benefit-icon">
                                    <i className="fa-solid fa-box"></i>
                                </span>

                                <span>
                                    Track your orders
                                </span>

                            </div>


                            <div className="signup-benefit">

                                <span className="benefit-icon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </span>

                                <span>
                                    Save your addresses
                                </span>

                            </div>


                            <div className="signup-benefit">

                                <span className="benefit-icon">
                                    <i className="fa-solid fa-heart"></i>
                                </span>

                                <span>
                                    Save your favourites
                                </span>

                            </div>

                        </div>


                        {/* ==============================
                            SIGN UP BUTTON
                        ============================== */}

                        <Link
                            to="/shop-index/signup"
                            className="btn signup-primary-btn"
                            onClick={handleClose}
                        >

                            <i className="fa-solid fa-user-plus me-2"></i>

                            Create Account

                        </Link>


                        {/* ==============================
                            LOGIN
                        ============================== */}

                        <div className="signup-login-text">

                            Already have an account?

                            <Link
                                to="/shop-index/login"
                                onClick={handleClose}
                            >
                                Login
                            </Link>

                        </div>


                        {/* ==============================
                            MAYBE LATER
                        ============================== */}

                        <button
                            type="button"
                            className="signup-later-btn"
                            onClick={handleClose}
                        >
                            Maybe Later
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
};

export default SignupModal;
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUsers, saveUsers } from "../utils/auth";

const Signup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

        // Remove error when user starts correcting field
        setErrors({
            ...errors,
            [name]: ""
        });

        // Confirm password validation
        if (name === "password" || name === "confirmPassword") {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
                confirmPassword: ""
            }));
        }
    };

    // =========================
    // VALIDATION
    // =========================

    const validateForm = () => {
        const newErrors = {};

        if (!form.firstName.trim()) {
            newErrors.firstName = "First Name is required";
        }

        if (!form.lastName.trim()) {
            newErrors.lastName = "Last Name is required";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email.trim()
            )
        ) {
            newErrors.email = "Please enter a valid email";
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Phone Number is required";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword =
                "Confirm Password is required";
        } else if (
            form.password !== form.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = (e) => {
        e.preventDefault();

        // Stop if validation fails
        if (!validateForm()) {
            return;
        }

        const users = getUsers();

        // Check duplicate email
        const alreadyExists = users.find(
            (user) =>
                user.email.toLowerCase() ===
                form.email.trim().toLowerCase()
        );

        if (alreadyExists) {
            setErrors({
                email: "Email already exists"
            });

            return;
        }

        // Clean names
        const firstName = form.firstName
            .trim()
            .replace(/\s+/g, " ");

        const lastName = form.lastName
            .trim()
            .replace(/\s+/g, " ");

        const fullName = `${firstName} ${lastName}`;

        // Save user
        users.push({
            id: Date.now(),

            firstName,
            lastName,
            name: fullName,

            email: form.email
                .trim()
                .toLowerCase(),

            phone: form.phone.trim(),

            password: form.password
        });

        saveUsers(users);

        alert("Account Created Successfully");

        // Clear form
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        });

        setErrors({});

        navigate("/shop-index/login");
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-6">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body p-5">

                            <h2 className="fw-bold text-center">
                                Create Account
                            </h2>

                            <p className="text-center text-muted mb-4">
                                Join CompCaribe today.
                            </p>

                            <form onSubmit={handleSubmit}>

                                {/* =========================
                                    FIRST NAME / LAST NAME
                                ========================== */}

                                <div className="row g-3 mb-3">

                                    <div className="col-md-6">

                                        <input
                                            type="text"
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            className={`form-control ${
                                                errors.firstName
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="First Name"
                                        />

                                        {errors.firstName && (
                                            <div className="text-danger small mt-1">
                                                {errors.firstName}
                                            </div>
                                        )}

                                    </div>

                                    <div className="col-md-6">

                                        <input
                                            type="text"
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            className={`form-control ${
                                                errors.lastName
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Last Name"
                                        />

                                        {errors.lastName && (
                                            <div className="text-danger small mt-1">
                                                {errors.lastName}
                                            </div>
                                        )}

                                    </div>

                                </div>

                                {/* =========================
                                    EMAIL
                                ========================== */}

                                <div className="mb-3">

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={`form-control ${
                                            errors.email
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Email"
                                    />

                                    {errors.email && (
                                        <div className="text-danger small mt-1">
                                            {errors.email}
                                        </div>
                                    )}

                                </div>

                                {/* =========================
                                    PHONE
                                ========================== */}

                                <div className="mb-3">

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className={`form-control ${
                                            errors.phone
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Phone Number"
                                    />

                                    {errors.phone && (
                                        <div className="text-danger small mt-1">
                                            {errors.phone}
                                        </div>
                                    )}

                                </div>

                                {/* =========================
                                    PASSWORD
                                ========================== */}

                                <div className="mb-3">

                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className={`form-control ${
                                            errors.password
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Password"
                                    />

                                    {errors.password && (
                                        <div className="text-danger small mt-1">
                                            {errors.password}
                                        </div>
                                    )}

                                </div>

                                {/* =========================
                                    CONFIRM PASSWORD
                                ========================== */}

                                <div className="mb-4">

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        className={`form-control ${
                                            errors.confirmPassword
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        placeholder="Confirm Password"
                                    />

                                    {errors.confirmPassword && (
                                        <div className="text-danger small mt-1">
                                            {errors.confirmPassword}
                                        </div>
                                    )}

                                </div>

                                {/* =========================
                                    SUBMIT
                                ========================== */}

                                <button
                                    type="submit"
                                    className="btn btn-secondary w-100"
                                >
                                    Create Account
                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0">

                                Already have an account?

                                <Link
                                    to="/shop-index/login"
                                    className="ms-2"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Signup;
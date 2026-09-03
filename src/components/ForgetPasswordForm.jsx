import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUsers, saveUsers } from "../utils/auth";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showReset, setShowReset] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckEmail = (e) => {
        e.preventDefault();

        if (!form.email.trim()) {
            alert("Please enter your email.");
            return;
        }

        const users = getUsers();

        const user = users.find(
            (u) =>
                u.email.toLowerCase() === form.email.trim().toLowerCase()
        );

        if (!user) {
            alert("No account found with this email.");
            return;
        }

        setShowReset(true);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!form.password || !form.confirmPassword) {
            alert("Please enter your new password.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        let users = getUsers();

        users = users.map((user) => {
            if (
                user.email.toLowerCase() ===
                form.email.trim().toLowerCase()
            ) {
                return {
                    ...user,
                    password: form.password
                };
            }

            return user;
        });

        saveUsers(users);

        alert("Password updated successfully.");

        navigate("/shop-index/login");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="card shadow border-0 rounded-4">
                        <div className="card-body p-5">

                            <h2 className="fw-bold text-center">
                                Forgot Password
                            </h2>

                            <p className="text-center text-muted mb-4">
                                {!showReset
                                    ? "Enter your registered email."
                                    : "Create your new password."}
                            </p>

                            {!showReset ? (
                                <form onSubmit={handleCheckEmail}>

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="form-control mb-4"
                                        placeholder="Enter Email"
                                    />

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Continue
                                    </button>

                                </form>
                            ) : (
                                <form onSubmit={handleResetPassword}>

                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="form-control mb-3"
                                        placeholder="New Password"
                                    />

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        className="form-control mb-4"
                                        placeholder="Confirm New Password"
                                    />

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Reset Password
                                    </button>

                                </form>
                            )}

                            <hr />

                            <div className="text-center">
                                <Link to="/shop-index/login">
                                    Back to Login
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
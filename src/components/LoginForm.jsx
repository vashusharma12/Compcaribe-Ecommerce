import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers, loginUser } from "../utils/auth";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const users = getUsers();

        const user = users.find(

            item =>

                item.email === form.email &&

                item.password === form.password

        );

        if (!user) {

            alert("Invalid Email or Password");

            return;

        }

        loginUser(user);

        navigate("/");

    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">

                <div className="col-lg-5 col-md-7">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body p-5">

                            <h2 className="fw-bold text-center mb-2">
                                Welcome Back
                            </h2>

                            <p className="text-center text-muted mb-4">
                                Login to continue shopping and renting.
                            </p>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter password"
                                    />
                                </div>

                                <div className="text-end mb-4">
                                    <Link
                                        to="/shop-index/forget-password"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-secondary w-100"
                                >
                                    Login
                                </button>

                            </form>

                            <hr />

                            <p className="text-center">

                                Don't have an account?

                                <Link
                                    to="/shop-index/signup"
                                    className="ms-2"
                                >
                                    Create Account
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Login;
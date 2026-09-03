import { useState } from "react";
import {
    getCurrentUser,
    getUsers,
    saveUsers,
    loginUser
} from "../../utils/auth";

const ProfileContent = () => {

    const currentUser = getCurrentUser();

    const [form, setForm] = useState({
        ...currentUser,
        confirmPassword: currentUser.password
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {

        if (!form.name.trim()) {
            alert("Please enter your name.");
            return;
        }

        if (!form.phone.trim()) {
            alert("Please enter your phone number.");
            return;
        }

        if (form.password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        let users = getUsers();

        const updatedUser = {
            id: form.id,
            name: form.name.trim(),
            email: form.email,
            phone: form.phone.trim(),
            password: form.password
        };

        users = users.map((user) =>
            user.id === form.id ? updatedUser : user
        );

        saveUsers(users);

        loginUser(updatedUser);

        alert("Profile updated successfully.");
    };

    return (

        <div className="card shadow-sm border-0 rounded-4">

            <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">

                    <div>

                        <h3 className="fw-bold mb-1">
                            My Profile
                        </h3>

                        <p className="text-muted mb-0">
                            Update your personal information.
                        </p>

                    </div>

                    <button
                        className="btn btn-secondary"
                        onClick={handleSave}
                    >
                        <i className="fa-solid fa-floppy-disk me-2"></i>
                        Save Changes
                    </button>

                </div>

                <hr />

                <div className="row align-items-center">

                    <div className="col-lg-3 text-center mb-4 mb-lg-0">

                        <div
                            className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center mx-auto"
                            style={{
                                width: "120px",
                                height: "120px",
                                fontSize: "40px",
                                fontWeight: "700"
                            }}
                        >
                            {form.name
                                ?.split(" ")
                                .map(word => word[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                        </div>

                        <button
                            className="btn btn-outline-secondary btn-sm mt-3"
                            disabled
                        >
                            <i className="fa-solid fa-camera me-2"></i>
                            Change Photo
                        </button>

                        <small className="d-block text-muted mt-2">
                            Coming Soon
                        </small>

                    </div>

                    <div className="col-lg-9">

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="form-control"
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={form.email}
                                    className="form-control"
                                    disabled
                                />

                                <small className="text-muted">
                                    Email cannot be changed.
                                </small>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="form-control"
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">
                                    Password
                                </label>

                                <div className="input-group">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="form-control"
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <i
                                            className={`fa-solid ${
                                                showPassword
                                                    ? "fa-eye-slash"
                                                    : "fa-eye"
                                            }`}
                                        ></i>
                                    </button>

                                </div>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">
                                    Confirm Password
                                </label>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="form-control"
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold">
                                    Member Since
                                </label>

                                <input
                                    type="text"
                                    value="August 2026"
                                    className="form-control"
                                    disabled
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default ProfileContent;
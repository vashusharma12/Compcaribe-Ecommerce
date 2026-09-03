import { useState } from "react";

const ContactContent = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // 🔍 VALIDATION
    const validateField = (name, value) => {
        switch (name) {
            case "name":
                return !value ? "Name is required" : "";
            case "email":
                if (!value) return "Email is required";
                if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email";
                return "";
            case "phone":
                if (!value) return "Phone is required";
                if (value.length < 10) return "Invalid phone";
                return "";
            case "message":
                if (!value) return "Message is required";
                if (value.length < 10) return "Minimum 10 characters required";
                return "";
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        setErrors({
            ...errors,
            [name]: validateField(name, value)
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        alert("Message sent successfully ✅");
    };

    const isFormValid =
        Object.values(errors).every((e) => !e) &&
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.message;

    return (
        <div>
            <div className="contact_us container mb-3">
                <div className="row">

                    {/* LEFT SIDE */}
                    <div className="col-lg-8 my-3">
                        <div className="contact_info">
                            <h3>Contact Us</h3>
                            <p>If you have questions or feedback about CompCaribe site, need order tracking help, or want to place an order, contact us via phone or email.</p>

                            <div className="row g-3 mt-5">

                                {/* CALL */}
                                <div className="col-md-6">
                                    <div className="card p-3">
                                        <div className="icon">
                                            <img src="/images/call_icon.svg" alt="" />
                                        </div>
                                        <h5>Call Us</h5>
                                        <p>
                                            Need help? Call our team on <strong>12345 67890</strong>.
                                        </p>
                                        <a
                                            className="btn d-block btn-secondary"
                                            href="tel:+911234567890"
                                        >
                                            Call Now
                                        </a>
                                    </div>
                                </div>

                                {/* EMAIL */}
                                <div className="col-md-6">
                                    <div className="card p-3 email-block">
                                        <div className="icon">
                                            <img src="/images/email_icon.svg" alt="" />
                                        </div>
                                        <h5>Email</h5>
                                        <p>
                                            Contact us at <strong>sales@compcaribe.com</strong>
                                        </p>
                                        <a
                                            className="btn d-block btn-primary"
                                            href="mailto:sales@compcaribe.com"
                                        >
                                            Send Email
                                        </a>
                                    </div>
                                </div>

                                {/* CUSTOMER SERVICE HOURS (RESTORED) */}
                                <div className="col-md-12">
                                    <div className="card customer_services p-3">
                                        <h5>
                                            <img src="/images/support_icon.svg" alt="" /> Customer Service Hours
                                        </h5>

                                        <div className="block_row">
                                            <div className="block_label">
                                                <img src="/images/clock_icon.svg" alt="" /> Monday-Friday
                                            </div>
                                            <div className="block_hour">09:00am - 5:30pm (BST)</div>
                                        </div>

                                        <div className="block_row">
                                            <div className="block_label">
                                                <img src="/images/clock_icon.svg" alt="" /> Saturday
                                            </div>
                                            <div className="block_hour">09:00am - 2:00pm (BST)</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE FORM */}
                    <div className="col-lg-4 my-3">
                        <div className="contact_form">
                            <h3>Send Us a Message</h3>
                            <p>Please fill in the form below to get in touch with us.</p>

                            <form onSubmit={handleSubmit}>

                                {/* NAME */}
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>

                                {/* EMAIL */}
                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div className="invalid-feedback">{errors.email}</div>
                                </div>

                                {/* PHONE */}
                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div className="invalid-feedback">{errors.phone}</div>
                                </div>

                                {/* MESSAGE */}
                                <div className="mb-3">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        name="message"
                                        rows="6"
                                        className={`form-control ${touched.message && errors.message ? "is-invalid" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></textarea>
                                    <div className="invalid-feedback">{errors.message}</div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={!isFormValid}
                                >
                                    Submit <i className="fa-solid fa-arrow-right-long"></i>
                                </button>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactContent;
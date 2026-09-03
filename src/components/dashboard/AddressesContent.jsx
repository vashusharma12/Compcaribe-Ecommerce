import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../utils/auth";


const AddressesContent = () => {

    // =========================================
    // CURRENT USER
    // =========================================

    const user = getCurrentUser();


    // =========================================
    // STORAGE KEY
    // =========================================

    const storageKey = user
        ? `addresses_${user.email}`
        : "addresses_guest";


    // =========================================
    // ADDRESS STATE
    // =========================================

    const [addresses, setAddresses] = useState([]);


    // =========================================
    // EDITING STATE
    // =========================================

    const [editingId, setEditingId] = useState(null);


    // =========================================
    // FORM STATE
    // =========================================

    const emptyForm = {
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
    };


    const [form, setForm] = useState(emptyForm);


    // =========================================
    // LOAD ADDRESSES
    // =========================================

    useEffect(() => {

        const saved =
            JSON.parse(
                localStorage.getItem(storageKey)
            ) || [];


        setAddresses(saved);

    }, [storageKey]);


    // =========================================
    // HANDLE INPUT
    // =========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setForm((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // =========================================
    // OPEN ADD ADDRESS MODAL
    // =========================================

    const handleAddNew = () => {

        setEditingId(null);

        setForm({

            ...emptyForm,

            // Automatically use user's name
            fullName:
                user?.firstName || user?.lastName
                    ? [
                        user?.firstName || "",
                        user?.lastName || ""
                    ]
                        .filter(Boolean)
                        .join(" ")
                    : user?.name || "",

            // Use user's phone if available
            phone:
                user?.phone ||
                user?.mobile ||
                ""

        });

    };


    // =========================================
    // OPEN EDIT MODAL
    // =========================================

    const handleEdit = (address) => {

        setEditingId(address.id);

        setForm({

            fullName: address.fullName || "",

            phone: address.phone || "",

            street: address.street || "",

            city: address.city || "",

            state: address.state || "",

            country: address.country || "",

            zipCode: address.zipCode || ""

        });

    };


    // =========================================
    // SAVE / UPDATE ADDRESS
    // =========================================

    const handleSaveAddress = () => {

        // =========================================
        // VALIDATION
        // =========================================

        if (
            !form.fullName.trim() ||
            !form.phone.trim() ||
            !form.street.trim() ||
            !form.city.trim() ||
            !form.state.trim() ||
            !form.country.trim() ||
            !form.zipCode.trim()
        ) {

            alert("Please fill all address fields.");

            return;

        }


        let updatedAddresses;


        // =========================================
        // UPDATE EXISTING ADDRESS
        // =========================================

        if (editingId !== null) {

            updatedAddresses = addresses.map(
                (address) => {

                    if (address.id === editingId) {

                        return {

                            ...address,

                            ...form

                        };

                    }

                    return address;

                }
            );

        }


        // =========================================
        // ADD NEW ADDRESS
        // =========================================

        else {

            const newAddress = {

                id: Date.now(),

                ...form,

                default:
                    addresses.length === 0

            };


            updatedAddresses = [

                ...addresses,

                newAddress

            ];

        }


        // =========================================
        // UPDATE STATE
        // =========================================

        setAddresses(
            updatedAddresses
        );


        // =========================================
        // SAVE LOCAL STORAGE
        // =========================================

        localStorage.setItem(

            storageKey,

            JSON.stringify(
                updatedAddresses
            )

        );


        // =========================================
        // RESET FORM
        // =========================================

        setForm({
            ...emptyForm
        });

        setEditingId(null);


        // =========================================
        // NOTIFY OTHER COMPONENTS
        // =========================================

        window.dispatchEvent(
            new Event("addressesUpdated")
        );


        // =========================================
        // CLOSE MODAL
        // =========================================

        const modalElement =
            document.getElementById(
                "addressModal"
            );


        if (
            modalElement &&
            window.bootstrap
        ) {

            const modal =
                window.bootstrap.Modal.getInstance(
                    modalElement
                );


            if (modal) {

                modal.hide();

            }

        }

    };


    // =========================================
    // DELETE ADDRESS
    // =========================================

    const handleDelete = (id) => {

        const addressToDelete =
            addresses.find(
                (address) =>
                    address.id === id
            );


        if (!addressToDelete) {
            return;
        }


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this address?"
            );


        if (!confirmed) {
            return;
        }


        let updated =
            addresses.filter(
                (address) =>
                    address.id !== id
            );


        // =========================================
        // IF DEFAULT WAS DELETED
        // MAKE FIRST ADDRESS DEFAULT
        // =========================================

        if (
            addressToDelete.default &&
            updated.length > 0
        ) {

            updated = updated.map(
                (address, index) => ({

                    ...address,

                    default: index === 0

                })
            );

        }


        setAddresses(updated);


        localStorage.setItem(
            storageKey,
            JSON.stringify(updated)
        );


        window.dispatchEvent(
            new Event("addressesUpdated")
        );

    };


    // =========================================
    // SET DEFAULT ADDRESS
    // =========================================

    const handleDefault = (id) => {

        const updated =
            addresses.map(
                (address) => ({

                    ...address,

                    default:
                        address.id === id

                })
            );


        setAddresses(updated);


        localStorage.setItem(
            storageKey,
            JSON.stringify(updated)
        );


        window.dispatchEvent(
            new Event("addressesUpdated")
        );

    };


    // =========================================
    // LOGIN CHECK
    // =========================================

    if (!user) {

        return (

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body text-center py-5">

                    <i
                        className="fa-solid fa-location-dot text-secondary mb-4"
                        style={{
                            fontSize: "70px"
                        }}
                    ></i>


                    <h4 className="fw-bold">

                        Login Required

                    </h4>


                    <p className="text-muted mb-4">

                        Please login to manage
                        your addresses.

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
    // MAIN
    // =========================================

    return (

        <>

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body p-4">


                    {/* =========================================
                        HEADER
                    ========================================= */}

                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

                        <div>

                            <h3 className="fw-bold mb-1">

                                My Addresses

                            </h3>


                            <p className="text-muted mb-0">

                                Manage your shipping and
                                billing addresses.

                            </p>

                        </div>


                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#addressModal"
                            onClick={handleAddNew}
                        >

                            <i className="fa-solid fa-plus me-2"></i>

                            Add New Address

                        </button>

                    </div>


                    <hr />


                    {/* =========================================
                        EMPTY
                    ========================================= */}

                    {addresses.length === 0 ? (

                        <div className="text-center py-5">

                            <i
                                className="fa-solid fa-location-dot text-secondary mb-4"
                                style={{
                                    fontSize: "70px"
                                }}
                            ></i>


                            <h4 className="fw-bold">

                                No Address Added

                            </h4>


                            <p className="text-muted mb-4">

                                Add your first delivery address
                                to speed up checkout.

                            </p>


                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#addressModal"
                                onClick={handleAddNew}
                            >

                                <i className="fa-solid fa-plus me-2"></i>

                                Add Address

                            </button>

                        </div>

                    ) : (


                        /* =========================================
                           ADDRESS CARDS
                        ========================================= */

                        <div className="row g-4">

                            {addresses.map(
                                (address) => (

                                    <div
                                        className="col-xl-6 col-lg-6 col-md-12"
                                        key={address.id}
                                    >

                                        <div
                                            className={`card h-100 shadow-sm rounded-4 ${
                                                address.default
                                                    ? "border-success"
                                                    : "border"
                                            }`}
                                        >

                                            <div className="card-body p-4">


                                                {/* =================================
                                                    HEADER
                                                ================================= */}

                                                <div className="d-flex justify-content-between align-items-start mb-3">

                                                    <div>

                                                        <h5 className="fw-bold mb-1">

                                                            <i className="fa-solid fa-user me-2 text-secondary"></i>

                                                            {address.fullName}

                                                        </h5>

                                                    </div>


                                                    {address.default && (

                                                        <span className="badge bg-success">

                                                            Default

                                                        </span>

                                                    )}

                                                </div>


                                                <hr />


                                                {/* =================================
                                                    PHONE
                                                ================================= */}

                                                <div className="mb-3">

                                                    <small className="text-muted d-block">

                                                        Phone Number

                                                    </small>

                                                    <strong>

                                                        <i className="fa-solid fa-phone me-2 text-secondary"></i>

                                                        {address.phone}

                                                    </strong>

                                                </div>


                                                {/* =================================
                                                    STREET
                                                ================================= */}

                                                <div className="mb-3">

                                                    <small className="text-muted d-block">

                                                        Street Address

                                                    </small>

                                                    <strong>

                                                        <i className="fa-solid fa-house me-2 text-secondary"></i>

                                                        {address.street}

                                                    </strong>

                                                </div>


                                                {/* =================================
                                                    CITY
                                                ================================= */}

                                                <div className="row g-3 mb-3">

                                                    <div className="col-sm-6">

                                                        <small className="text-muted d-block">

                                                            City

                                                        </small>

                                                        <strong>

                                                            {address.city}

                                                        </strong>

                                                    </div>


                                                    <div className="col-sm-6">

                                                        <small className="text-muted d-block">

                                                            State

                                                        </small>

                                                        <strong>

                                                            {address.state}

                                                        </strong>

                                                    </div>

                                                </div>


                                                {/* =================================
                                                    COUNTRY + ZIP
                                                ================================= */}

                                                <div className="row g-3 mb-4">

                                                    <div className="col-sm-6">

                                                        <small className="text-muted d-block">

                                                            Country

                                                        </small>

                                                        <strong>

                                                            {address.country}

                                                        </strong>

                                                    </div>


                                                    <div className="col-sm-6">

                                                        <small className="text-muted d-block">

                                                            ZIP / Postal Code

                                                        </small>

                                                        <strong>

                                                            {address.zipCode}

                                                        </strong>

                                                    </div>

                                                </div>


                                                {/* =================================
                                                    ACTIONS
                                                ================================= */}

                                                <div className="d-flex gap-2 flex-wrap">


                                                    {/* EDIT */}

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary btn-sm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#addressModal"
                                                        onClick={() =>
                                                            handleEdit(
                                                                address
                                                            )
                                                        }
                                                    >

                                                        <i className="fa-solid fa-pen me-1"></i>

                                                        Edit

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                address.id
                                                            )
                                                        }
                                                    >

                                                        <i className="fa-solid fa-trash me-1"></i>

                                                        Delete

                                                    </button>


                                                    {/* DEFAULT */}

                                                    {!address.default && (

                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-success btn-sm"
                                                            onClick={() =>
                                                                handleDefault(
                                                                    address.id
                                                                )
                                                            }
                                                        >

                                                            <i className="fa-solid fa-check me-1"></i>

                                                            Set Default

                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>


            {/* =====================================================
                ADD / EDIT ADDRESS MODAL
            ===================================================== */}

            <div
                className="modal fade"
                id="addressModal"
                tabIndex="-1"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-lg modal-dialog-centered">

                    <div className="modal-content rounded-4">


                        {/* =========================================
                            MODAL HEADER
                        ========================================= */}

                        <div className="modal-header">

                            <h5 className="modal-title fw-bold">

                                <i className="fa-solid fa-location-dot me-2"></i>

                                {editingId !== null
                                    ? "Edit Address"
                                    : "Add New Address"
                                }

                            </h5>


                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setEditingId(null);
                                    setForm(emptyForm);
                                }}
                            ></button>

                        </div>


                        {/* =========================================
                            MODAL BODY
                        ========================================= */}

                        <div className="modal-body p-4">

                            <div className="row">


                                {/* FULL NAME */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-semibold">

                                        Full Name

                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter full name"
                                    />

                                </div>


                                {/* PHONE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-semibold">

                                        Phone Number

                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter phone number"
                                    />

                                </div>


                                {/* STREET */}

                                <div className="col-12 mb-3">

                                    <label className="form-label fw-semibold">

                                        Street Address

                                    </label>

                                    <input
                                        type="text"
                                        name="street"
                                        value={form.street}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="House number, street, area"
                                    />

                                </div>


                                {/* CITY */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-semibold">

                                        City

                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter city"
                                    />

                                </div>


                                {/* STATE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-semibold">

                                        State

                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter state"
                                    />

                                </div>


                                {/* COUNTRY */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-semibold">

                                        Country

                                    </label>

                                    <input
                                        type="text"
                                        name="country"
                                        value={form.country}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter country"
                                    />

                                </div>


                                {/* ZIP */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-semibold">

                                        ZIP / Postal Code

                                    </label>

                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={form.zipCode}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter ZIP / postal code"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* =========================================
                            MODAL FOOTER
                        ========================================= */}

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setEditingId(null);
                                    setForm(emptyForm);
                                }}
                            >

                                Cancel

                            </button>


                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleSaveAddress}
                            >

                                <i
                                    className={`fa-solid ${
                                        editingId !== null
                                            ? "fa-rotate"
                                            : "fa-check"
                                    } me-2`}
                                ></i>

                                {editingId !== null
                                    ? "Update Address"
                                    : "Save Address"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

};


export default AddressesContent;
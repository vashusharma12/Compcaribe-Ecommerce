// import { NavLink } from "react-router-dom";
// import { getCurrentUser } from "../../utils/auth";

// const DashboardSidebar = () => {

//     const user = getCurrentUser();


//     // =========================================
//     // CAPITALIZE FIRST LETTER OF EACH NAME
//     // =========================================

//     const capitalizeName = (name = "") => {

//         return name
//             .trim()
//             .toLowerCase()
//             .replace(/\b\w/g, (letter) =>
//                 letter.toUpperCase()
//             );

//     };


//     // =========================================
//     // GET DISPLAY NAME
//     // =========================================

//     const getDisplayName = () => {

//         // First Name + Last Name
//         if (user?.firstName || user?.lastName) {

//             return [
//                 capitalizeName(user?.firstName || ""),
//                 capitalizeName(user?.lastName || "")
//             ]
//                 .filter(Boolean)
//                 .join(" ");

//         }


//         // Fallback for old user data
//         if (user?.name) {

//             return capitalizeName(user.name);

//         }


//         return "User";

//     };


//     const displayName = getDisplayName();


//     // =========================================
//     // GET INITIAL
//     // =========================================

//     const userInitial = displayName
//         .charAt(0)
//         .toUpperCase();


//     return (

//         <div className="card shadow-sm rounded-4 border-0 dashboard-sidebar">

//             <div className="card-body">


//                 {/* =========================================
//                     USER INFO
//                 ========================================= */}

//                 <div className="text-center mb-4">


//                     {/* USER AVATAR */}

//                     <div
//                         className="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto btn-secondary"
//                         style={{
//                             width: "80px",
//                             height: "80px",
//                             fontSize: "30px"
//                         }}
//                     >

//                         {userInitial}

//                     </div>


//                     {/* USER NAME */}

//                     <h5 className="mt-3 mb-0">

//                         {displayName}

//                     </h5>


//                     {/* EMAIL */}

//                     <small className="text-muted">

//                         {user?.email || ""}

//                     </small>


//                 </div>


//                 {/* =========================================
//                     DASHBOARD MENU
//                 ========================================= */}

//                 <div className="list-group list-group-flush">


//                     {/* DASHBOARD */}

//                     <NavLink
//                         to="/shop-index/dashboard"
//                         className="list-group-item list-group-item-action"
//                     >

//                         <i className="fa-solid fa-house me-2"></i>

//                         Dashboard

//                     </NavLink>


//                     {/* PROFILE */}

//                     <NavLink
//                         to="/shop-index/profile"
//                         className="list-group-item list-group-item-action"
//                     >

//                         <i className="fa-solid fa-user me-2"></i>

//                         Profile

//                     </NavLink>


//                     {/* ORDERS */}

//                     <NavLink
//                         to="/shop-index/orders"
//                         className="list-group-item list-group-item-action"
//                     >

//                         <i className="fa-solid fa-box me-2"></i>

//                         Orders

//                     </NavLink>


//                     {/* WISHLIST */}

//                     <NavLink
//                         to="/shop-index/wishlist"
//                         className="list-group-item list-group-item-action"
//                     >

//                         <i className="fa-solid fa-heart me-2"></i>

//                         Wishlist

//                     </NavLink>


//                     {/* ADDRESSES */}

//                     <NavLink
//                         to="/shop-index/addresses"
//                         className="list-group-item list-group-item-action"
//                     >

//                         <i className="fa-solid fa-location-dot me-2"></i>

//                         Addresses

//                     </NavLink>


//                 </div>

//             </div>

//         </div>

//     );

// };

// export default DashboardSidebar;



import { NavLink } from "react-router-dom";
import { getCurrentUser } from "../../utils/auth";
import { useState } from "react";

const DashboardSidebar = () => {

    const user = getCurrentUser();

    const [isOpen, setIsOpen] = useState(false);


    // =========================================
    // CAPITALIZE FIRST LETTER OF EACH NAME
    // =========================================

    const capitalizeName = (name = "") => {

        return name
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );

    };


    // =========================================
    // GET DISPLAY NAME
    // =========================================

    const getDisplayName = () => {

        if (user?.firstName || user?.lastName) {

            return [
                capitalizeName(user?.firstName || ""),
                capitalizeName(user?.lastName || "")
            ]
                .filter(Boolean)
                .join(" ");

        }

        if (user?.name) {

            return capitalizeName(user.name);

        }

        return "User";

    };


    const displayName = getDisplayName();


    // =========================================
    // GET INITIAL
    // =========================================

    const userInitial = displayName
        .charAt(0)
        .toUpperCase();


    // =========================================
    // CLOSE SIDEBAR WHEN NAV LINK IS CLICKED
    // =========================================

    const handleNavClick = () => {

        setIsOpen(false);

    };


    return (

        <>

            {/* =========================================
                MOBILE / TABLET DASHBOARD BUTTON
            ========================================= */}

            <button
                type="button"
                className="dashboard-toggle-btn"
                onClick={() => setIsOpen(true)}
            >

                <span>D</span>
                <span>A</span>
                <span>S</span>
                <span>H</span>
                <span>B</span>
                <span>O</span>
                <span>A</span>
                <span>R</span>
                <span>D</span>

            </button>


            {/* =========================================
                MOBILE / TABLET OVERLAY
            ========================================= */}

            {isOpen && (
                <div
                    className="dashboard-sidebar-overlay"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}


            {/* =========================================
                DASHBOARD SIDEBAR
            ========================================= */}

            <div
                className={`card shadow-sm rounded-4 border-0 dashboard-sidebar ${
                    isOpen ? "dashboard-sidebar-open" : ""
                }`}
            >

                <div className="card-body">


                    {/* =========================================
                        CLOSE BUTTON
                    ========================================= */}

                    <button
                        type="button"
                        className="dashboard-sidebar-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close dashboard menu"
                    >

                        <i className="fa-solid fa-xmark"></i>

                    </button>


                    {/* =========================================
                        USER INFO
                    ========================================= */}

                    <div className="text-center mb-4">


                        {/* USER AVATAR */}

                        <div
                            className="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto btn-secondary"
                            style={{
                                width: "80px",
                                height: "80px",
                                fontSize: "30px"
                            }}
                        >

                            {userInitial}

                        </div>


                        {/* USER NAME */}

                        <h5 className="mt-3 mb-0">

                            {displayName}

                        </h5>


                        {/* EMAIL */}

                        <small className="text-muted">

                            {user?.email || ""}

                        </small>


                    </div>


                    {/* =========================================
                        DASHBOARD MENU
                    ========================================= */}

                    <div className="list-group list-group-flush">


                        {/* DASHBOARD */}

                        <NavLink
                            to="/shop-index/dashboard"
                            onClick={handleNavClick}
                            className="list-group-item list-group-item-action"
                        >

                            <i className="fa-solid fa-house me-2"></i>

                            Dashboard

                        </NavLink>


                        {/* PROFILE */}

                        <NavLink
                            to="/shop-index/profile"
                            onClick={handleNavClick}
                            className="list-group-item list-group-item-action"
                        >

                            <i className="fa-solid fa-user me-2"></i>

                            Profile

                        </NavLink>


                        {/* ORDERS */}

                        <NavLink
                            to="/shop-index/orders"
                            onClick={handleNavClick}
                            className="list-group-item list-group-item-action"
                        >

                            <i className="fa-solid fa-box me-2"></i>

                            Orders

                        </NavLink>


                        {/* WISHLIST */}

                        <NavLink
                            to="/shop-index/wishlist"
                            onClick={handleNavClick}
                            className="list-group-item list-group-item-action"
                        >

                            <i className="fa-solid fa-heart me-2"></i>

                            Wishlist

                        </NavLink>


                        {/* ADDRESSES */}

                        <NavLink
                            to="/shop-index/addresses"
                            onClick={handleNavClick}
                            className="list-group-item list-group-item-action"
                        >

                            <i className="fa-solid fa-location-dot me-2"></i>

                            Addresses

                        </NavLink>


                    </div>

                </div>

            </div>

        </>

    );

};

export default DashboardSidebar;

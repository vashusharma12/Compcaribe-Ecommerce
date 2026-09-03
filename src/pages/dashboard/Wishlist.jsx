import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import WishlistContent from "../../components/dashboard/WishlistContent";


function Wishlist() {
    return (
        <div className="dashboard-page my-4">
            <div className="container">

                <div className="row g-4 dashboard-layout">

                    <div className="col-lg-3">
                        <DashboardSidebar />
                    </div>

                    <div className="col-lg-9">
                        <WishlistContent />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Wishlist;
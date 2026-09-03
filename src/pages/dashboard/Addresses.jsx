import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import AddressesContent from "../../components/dashboard/AddressesContent";


function Addresses() {
    return (
        <div className="dashboard-page my-4">
            <div className="container">
                <div className="row g-4 dashboard-layout">
                    <div className="col-lg-3">
                        <DashboardSidebar />
                    </div>

                    <div className="col-lg-9">
                        <AddressesContent />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Addresses;
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardContent from "../../components/dashboard/DashboardContent";

function Dashboard() {
    return (
        <div className="dashboard-page my-4">

        <div className="container">

            <div className="row dashboard-layout">

                <div className="col-lg-3">
                    <DashboardSidebar />
                </div>

                <div className="col-lg-9">
                    <DashboardContent />
                </div>

            </div>

        </div>

    </div>
    );
}

export default Dashboard;
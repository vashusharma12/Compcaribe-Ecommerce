import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import ProfileContent from "../../components/dashboard/ProfileContent";


function Profile() {
    return (
        <div className="dashboard-page my-4">
            <div className="container">
                <div className="row g-4 dashboard-layout">

                    <div className="col-lg-3">
                        <DashboardSidebar />
                    </div>

                    <div className="col-lg-9">
                        <ProfileContent />
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Profile;
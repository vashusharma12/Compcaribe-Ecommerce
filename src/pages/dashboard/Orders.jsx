import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import OrdersContent from "../../components/dashboard/OrdersContent";


function Orders() {
    return (
        <div className="dashboard-page my-4">
            <div className="container">
                <div className="row g-4 dashboard-layout">

                    <div className="col-lg-3">
                        <DashboardSidebar />
                    </div>

                    <div className="col-lg-9">
                        <OrdersContent />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Orders;
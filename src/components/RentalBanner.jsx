import { Link } from "react-router-dom";

const RentalBanner = () => {
    return (
        <div>
            <section className="banner">
                <div className="container">
                    <div className="rental_banner">
                        <div className="banner_info">
                            <h2>For All Your Rental Equipment Needs</h2>
                            <p>Quality Equipment, Flexible Terms, Exceptional Support, Fast Delivery.</p>
                            <div className="cta_btn">
                                <Link to="/laptop" className="btn btn-primary me-2" href="rent_deals.html">Take On Rent <i className="fa-solid fa-arrow-right-long"></i></Link>
                                <Link to="/shop-index/contact" className="btn btn-outline-light" href="contact.html">Contact Now <i className="fa-solid fa-arrow-right-long"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RentalBanner;
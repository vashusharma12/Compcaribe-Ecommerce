import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg">
                        <div className="footer_col">
                            <h4>Need Help?</h4>
                            <ul>
                                <li><Link to="/shop-index/faq">Frequently Asked Questions</Link></li>
                                <li><Link to="/shop-index/contact">Contact Us</Link></li>
                                <li><Link to="/shop-index/delivery-info">Delivery Information</Link></li>
                                <li><Link to="/shop-index/warranty-info">Warranty & Returns Information</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg">
                        <div className="footer_col">
                            <h4>Information</h4>
                            <ul>
                                <li><Link to="/">Rental</Link></li>
                                <li><Link to="/shop-index">Shop</Link></li>
                                <li><Link to="/shop-index/about-us">About Us</Link></li>
                                <li><Link to="/shop-index/privacy-policy">Privacy And Cookie Policy</Link></li>
                                <li><Link to="/shop-index/terms-condition">Website Terms And Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg">
                        <div className="footer_col">
                            <h4>Rental Categories</h4>
                            <ul>
                                <li><Link to="/laptop">Laptop Rental</Link></li>
                                <li><Link to="/tablet">Tablet PC Rental</Link></li>
                                <li><Link to="/computer">Computer Rental</Link></li>
                                <li><Link to="/monitor">Monitor Rental</Link></li>
                                <li><Link to="/printer">Printer Rental</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg">
                        <div className="footer_col">
                            <h4>Shop Categories</h4>
                            <ul>
                                <li><Link to="/shop-index/monitor-shop">Monitors & Displays</Link></li>
                                <li><Link to="/shop-index/desktop-shop">Desktop</Link></li>
                                <li><Link to="/shop-index/laptop-shop">Laptops</Link></li>
                                <li><Link to="/shop-index/servers-shop">Servers & Racks</Link></li>
                                <li><Link to="/shop-index/office-shop">Office Components</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg">
                        <div className="footer_col followus">
                            <h4>Follow Us</h4>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook"></i> Facebook</a>
                                </li>
                                <li>
                                    <a href="https://x.com/" target="_blank"><i className="fa-brands fa-x-twitter"></i> X</a>
                                </li>
                                <li>
                                    <a href="https://in.linkedin.com/" target="_blank"><i className="fa-brands fa-linkedin"></i> Linkedin</a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/" target="_blank"><i className="fa-brands fa-youtube"></i> Youtube</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer_bottom">
                    Copyright © 1996 - 2026 CompCaribe. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer;
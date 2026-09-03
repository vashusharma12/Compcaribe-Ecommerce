import { Link } from "react-router-dom";

const ShopBanner = () => {
    return (
        <div>
            <section className="banner shop_view">
                <div className="container">
                    <div className="shop_banner">
                        <div className="shop_slider">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <Link to="/shop-index" href="shop_product-grid.html"><img src="/images/shop_slide1.png" className="d-block w-100" alt="" /></Link>
                                    </div>
                                    <div className="carousel-item">
                                        <Link to="/shop-index" href="shop_product-grid.html"><img src="/images/shop_slide2.png" className="d-block w-100" alt="" /></Link>
                                    </div>
                                    <div className="carousel-item">
                                        <Link to="/shop-index" href="shop_product-grid.html"><img src="/images/shop_slide1.png" className="d-block w-100" alt="" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="promotion_banner"><Link to="/shop-index" href="shop_product-grid.html"><img src="/images/promo_banner.png" className="d-block w-100" alt="" /></Link></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ShopBanner;
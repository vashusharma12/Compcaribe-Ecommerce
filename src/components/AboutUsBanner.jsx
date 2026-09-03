import AboutBannerImg from "../../public/images/about_banner.jpg"

const Aboutusbanner = () => {
    return (
        <div>
            <div className="inner_banner">
                <img src={AboutBannerImg} alt="" />
            </div>
            <div className="about_info shop_view container">
                <div className="page_title">
                    <h2>About CompCaribe</h2>
                </div>
                <p>At <strong>CompCaribe</strong>, we are committed to providing top-quality equipment rental and purchase solutions designed to meet the diverse needs of our customers. From cutting-edge technology and office systems to industrial tools and construction machinery, we offer a comprehensive range of products to support businesses and individuals across various industries.</p>
                <br />
                <p>With a strong focus on <strong>quality, reliability, and customer satisfaction</strong>, we ensure that every piece of equipment is well-maintained, tested, and ready for immediate use. Our flexible rental plans and transparent pricing make it easy for clients to access the tools and equipment they need — without unnecessary costs or delays.</p>
                <br />
                <p>Our professional team brings years of industry experience and technical expertise, ensuring every customer receives the right solution, on time, every time.</p>
            </div>
        </div>

    )
}

export default Aboutusbanner;
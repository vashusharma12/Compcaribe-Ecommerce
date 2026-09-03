import { Link } from "react-router-dom";

const ContactBlock = () => {
    return (
        <div>
            <section>
                <div className="container">
                    <div className="contact_block">
                        <div className="page_title"><h2>Ready to Start?  We Can Help.</h2></div>
                        <p>Whether You Need to Rent Or Buy, Our Global Team of Experts is Available to Help.</p>
                        <br />
                        <p><Link to="/shop-index/contact" className="btn btn-outline-light" href="contact.html">Contact Us <i className="fa-solid fa-arrow-right-long"></i></Link></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactBlock;
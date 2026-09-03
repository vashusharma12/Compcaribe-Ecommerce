import RentalBanner from "../../components/RentalBanner";
import Rentalcategories from "../../components/RentalCategories";
import RentalWorks from "../../components/RentalWorks";
import ContactBlock from "../../components/ContactBlock";
import PopularProducts from "../../components/RentalPopularProducts";
import HowItWork from "../../components/HowItWorks";

function Home() {
    return (
        <>
            <RentalBanner />
            <Rentalcategories />
            <RentalWorks />
            <ContactBlock />
            <PopularProducts />
            <HowItWork />
        </>
    )
}

export default Home;
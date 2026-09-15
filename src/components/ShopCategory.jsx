import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import products from "../data/products.js";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";

function ShopCategory() {
    const [view, setView] = useState("grid");
    const [selectedBrand, setSelectedBrand] = useState("all");


    const [priceRange, setPriceRange] = useState([0, 500]);
    const [sortOption, setSortOption] = useState("default");

    const { category } = useParams();
    const location = useLocation();


    const isHomePage = location.pathname === "/";
    const isShopPage = location.pathname.includes("shop-index");

    const normalizedCategory = category?.toLowerCase();


    const baseFilteredProducts = products.filter((product) => {
        const productCategory = product.category?.toLowerCase();

        if (isHomePage) {
            return product.type === "rental";
        }

        if (!isShopPage) {
            return (
                product.type === "rental" &&
                productCategory === normalizedCategory
            );
        }

        return (
            product.type === "shop" &&
            productCategory === normalizedCategory
        );
    });


    let filteredProducts = baseFilteredProducts.filter((product) => {
        return (
            (selectedBrand === "all" || product.brand === selectedBrand) &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1]
        );
    });

  
    if (sortOption === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "popular") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

  
    const brands = [
        "all",
        ...new Set(baseFilteredProducts.map((p) => p.brand))
    ];

    return (
        <div id="shop" className={`main_content ${isShopPage ? "shop_view" : ""}`}>
            <div className="product_page container mt-4">
                <div className="row">                  
                    <div className="col-md-4 col-lg-2">
                        <FilterSidebar
                            brands={brands}
                            selectedBrand={selectedBrand}
                            setSelectedBrand={setSelectedBrand}
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    </div>

               
                    <div className="col-md-8 col-lg-10">

                        <div className="head d-flex justify-content-between align-items-center mb-4">

                            <h3 className="text-capitalize m-0 fw-bold">
                                {isHomePage
                                    ? "Rental Products"
                                    : normalizedCategory}
                            </h3>

                            <div className="d-flex align-items-center gap-3">

                                {/* Items per page */}
                                <div className="item_perpage d-flex align-items-center">
                                    <label className="me-2">Items per page:</label>
                                    <select className="form-select w-auto">
                                        <option>8</option>
                                        <option>16</option>
                                        <option>24</option>
                                    </select>
                                </div>

                                {/* View changer */}
                                <div className="view_changer">

                                    <button
                                        className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}
                                        onClick={() => setView("grid")}
                                    >
                                        <i className="fas fa-th-large"></i>
                                    </button>

                                    <button
                                        className={`btn ms-2 ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
                                        onClick={() => setView("list")}
                                    >
                                        <i className="fa-solid fa-list"></i>
                                    </button>

                                </div>

                            </div>
                        </div>

                   
                        <div className="row">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className={
                                            view === "grid"
                                                ? "col-lg-3 col-md-6 col-sm-6  col-6 mb-4"
                                                : "col-12 mb-4"
                                        }
                                    >
                                        <ProductCard product={product} view={view} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center mt-5">
                                    <h5>No products found</h5>
                                    <p className="text-muted">
                                        Try changing filters or price range.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopCategory; 
import {
	Link,
	useParams,
	useNavigate
} from "react-router-dom";

import {
	useState,
	useEffect
} from "react";

import {
	useDispatch
} from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";

import products from "../data/products";


const ProductDetail = () => {

	// ==============================
	// ROUTER & REDUX
	// ==============================

	const { id } = useParams();

	const navigate = useNavigate();

	const dispatch = useDispatch();


	// ==============================
	// PRODUCT
	// ==============================

	const product = products.find(
		(item) => item.id.toString() === id
	);


	// ==============================
	// STATES
	// ==============================

	const [selectedDuration, setSelectedDuration] =
		useState("1 Month");

	const [quantity, setQuantity] =
		useState(1);


	// ==============================
	// PRODUCT GALLERY
	// ==============================

	const gallery = product
		? [
			product.image,
			product.image,
			product.image,
			product.image,
			product.image
		]
		: [];

	const [selectedImage, setSelectedImage] =
		useState(gallery[0]);


	// ==============================
	// RESET WHEN PRODUCT CHANGES
	// ==============================

	useEffect(() => {

		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});

		if (product) {
			setSelectedImage(product.image);
		}

		setQuantity(1);

		setSelectedDuration("1 Month");

	}, [id]);


	// ==============================
	// PRODUCT NOT FOUND
	// ==============================

	if (!product) {

		return (

			<div className="container py-5 text-center">

				<h2>
					Product Not Found
				</h2>

				<Link
					to="/shop-index"
					className="btn btn-secondary mt-3"
				>
					Back to Shop
				</Link>

			</div>

		);

	}


	// ==============================
	// RENTAL DURATION
	// ==============================

	const durationMultiplier = {

		"1 Month": 1,

		"2 Months": 0.9,

		"3 Months": 0.8,

		"6 Months": 0.65

	};


	const durationMonths = {

		"1 Month": 1,

		"2 Months": 2,

		"3 Months": 3,

		"6 Months": 6

	};


	// ==============================
	// BASE PRICE
	// ==============================

	const basePrice =
		Number(product.price || 0);


	// ==============================
	// SAFE QUANTITY
	// ==============================

	const safeQuantity =
		quantity < 1
			? 1
			: quantity;


	// ==============================
	// PRICE PER MONTH
	// ==============================

	const finalPricePerMonth =
		Math.round(
			basePrice *
			durationMultiplier[selectedDuration]
		);


	// ==============================
	// SELECTED MONTHS
	// ==============================

	const selectedMonths =
		durationMonths[selectedDuration];


	// ==============================
	// TOTAL PRICE
	// ==============================

	const totalPrice =
		product.type === "rental"

			? finalPricePerMonth *
			selectedMonths *
			safeQuantity

			: basePrice *
			safeQuantity;


	// ==============================
	// RELATED PRODUCTS
	// ==============================

	const relatedProducts = products
		.filter(
			(item) =>
				item.id !== product.id &&
				item.category === product.category
		)
		.slice(0, 4);


	// ==============================
	// CREATE CART ITEM
	// ==============================

	const createCartItem = () => {

		return {

			id: product.id,

			name: product.name,

			image: product.image,

			// Total price for selected rental duration
			price:
				product.type === "rental"
					? finalPricePerMonth * selectedMonths
					: basePrice,

			// Monthly rental price
			monthlyPrice:
				product.type === "rental"
					? finalPricePerMonth
					: null,

			// Quantity
			quantity: safeQuantity,

			// Rental duration
			duration:
				product.type === "rental"
					? selectedDuration
					: null,

			// Number of months
			months:
				product.type === "rental"
					? selectedMonths
					: null,

			// Product type
			type: product.type

		};

	};


	// ==============================
	// ADD TO CART
	// ==============================

	const handleAddToCart = () => {

		const cartItem = createCartItem();

		dispatch(
			addToCart(cartItem)
		);

		navigate(
			product.type === "rental"
				? "/cart"
				: "/shop-index/cart"
		);

	};


	// ==============================
	// BUY NOW
	// ==============================

	const handleBuyNow = () => {

		const cartItem = createCartItem();

		dispatch(
			addToCart(cartItem)
		);

		navigate(
			product.type === "rental"
				? "/checkout"
				: "/shop-index/checkout"
		);

	};


	return (

		<section className="product_detail_page py-5">

			<div className="container">

				<div className="row g-5">


					{/* ==================================
						LEFT COLUMN
					================================== */}

					<div className="col-lg-7">


						{/* MAIN IMAGE */}

						<div className="border rounded-4 overflow-hidden bg-white mb-3 p-2">

							<img
								src={selectedImage}
								alt={product.name}
								className="img-fluid w-100"
								style={{
									height: "350px",
									objectFit: "contain"
								}}
							/>

						</div>


						{/* GALLERY */}

						<div className="row g-2">

							{gallery.map((img, index) => (

								<div
									className="col-2"
									key={index}
								>

									<img
										src={img}
										alt={product.name}
										className={`img-fluid rounded border ${selectedImage === img
												? "border-primary border-2 p-2"
												: ""
											}`}
										style={{
											cursor: "pointer",
											height: "80px",
											objectFit: "contain",
											background: "#fff"
										}}
										onClick={() =>
											setSelectedImage(img)
										}
									/>

								</div>

							))}

						</div>

					</div>


					{/* ==================================
						RIGHT COLUMN
					================================== */}

					<div className="col-lg-5">

						{/* BRAND */}

						<span className="badge bg-success mb-3">CompCaribe</span>

						{/* PRODUCT NAME */}

						<h4 className="fw-bold mb-3">

							{product.name}

						</h4>

						{/* RATING */}

						<div className="d-flex align-items-center mb-3">

							<div className="text-warning">

								{[1, 2, 3, 4, 5].map((star) => (

									<i
										key={star}
										className={`fa-star ${star <=
												(product.rating || 5)
												? "fa-solid"
												: "fa-regular"
											}`}
									></i>

								))}

							</div>

							<span className="ms-2 text-muted">

								({product.reviews || 24 } Reviews)

							</span>

						</div>


						{/* PRICE */}

						<div className="mb-4">

							{product.oldPrice && (

								<span className="text-decoration-line-through text-muted me-3 fs-5">

									£{product.oldPrice}

								</span>

							)}


							<span className="fs-3 fw-bold title-heading">

								£
								{product.type === "rental"
									? finalPricePerMonth
									: product.price}

							</span>


							{product.type === "rental" && (

								<span className="ms-2 text-muted">

									/ Month

								</span>

							)}

						</div>


						{/* AVAILABILITY */}

						<div className="mb-4">

							<span className="badge bg-success me-2">

								In Stock

							</span>

							<span className="text-success">

								Ready to Dispatch

							</span>

						</div>


						{/* FEATURES */}

						<div className="border rounded-4 p-3 mb-4 bg-white">

							<h6 className="fw-bold mb-3">

								Key Features

							</h6>


							<ul className="list-unstyled mb-0">

								<li className="mb-2">

									<i className="fa-solid fa-check text-success me-2"></i>

									Genuine Product

								</li>


								<li className="mb-2">

									<i className="fa-solid fa-check text-success me-2"></i>

									Fast Delivery Available

								</li>


								<li className="mb-2">

									<i className="fa-solid fa-check text-success me-2"></i>

									Secure Online Payment

								</li>


								<li>

									<i className="fa-solid fa-check text-success me-2"></i>

									Warranty Included

								</li>

							</ul>

						</div>


						{/* ==================================
							RENTAL OPTIONS
						================================== */}

						{product.type === "rental" && (

							<>

								<h5 className="fw-bold mb-3">

									Select Rental Duration

								</h5>


								<div className="row g-3 mb-4">

									{[
										"1 Month",
										"2 Months",
										"3 Months",
										"6 Months"
									].map((duration) => (

										<div
											className="col-6 col-md-3"
											key={duration}
										>

											<div
												className={`border rounded-3 p-2 p-md-3 p-lg-4 text-center ${selectedDuration === duration
														? "border-primary bg-light"
														: ""
													}`}
												style={{
													cursor: "pointer"
												}}
												onClick={() =>
													setSelectedDuration(duration)
												}
											>

												<h6 className="mb-1">
													{duration}
												</h6>

												<strong>
													£
													{Math.round(
														basePrice *
														durationMultiplier[duration]
													)}
												</strong>

												<small className="text-muted d-block mt-1">
													Per Month
												</small>

											</div>

										</div>

									))}

								</div>
							
							</>

						)}


						{/* QUANTITY */}

						<div className="mb-4">

							<label className="form-label fw-semibold">

								Quantity

							</label>


							<input
								type="number"
								min="1"
								className="form-control"
								value={quantity}
								onChange={(e) =>
									setQuantity(
										Number(e.target.value)
									)
								}
							/>

						</div>


						{/* TOTAL */}

						<div className="border rounded-4 p-3 bg-light mb-4">

							<div className="d-flex justify-content-between">

								<span>
									Total Price
								</span>

								<h4 className="fw-bold mb-0">
									£{totalPrice}
								</h4>

							</div>

							{product.type === "rental" && (
								<small className="text-muted d-block mt-1">
									£{finalPricePerMonth}/month × {selectedMonths} month
									{selectedMonths > 1 ? "s" : ""} × {safeQuantity} item
									{safeQuantity > 1 ? "s" : ""}
								</small>
							)}

						</div>


						{/* ACTION BUTTONS */}

						<div className="d-grid gap-3">


							{/* ADD TO CART */}

							<button
								className={`btn btn-lg ${product.type === "rental"
										? "btn-rental"
										: "btn-secondary"
									}`}
								onClick={handleAddToCart}
							>

								<i className="fa-solid fa-cart-shopping me-2"></i>

								Add To Cart

							</button>


							{/* BUY NOW */}

							<button
								className="btn btn-outline-dark"
								onClick={handleBuyNow}
							>

								<i className="fa-solid fa-bolt me-2"></i>

								Buy Now

							</button>

						</div>

						{/* SERVICES */}

						<div className="border rounded-4 p-4 mt-4 bg-white">

							<div className="d-flex mb-3">

								<i className="fa-solid fa-truck-fast fs-4 me-3 text-success"></i>

								<div>

									<h6 className="fw-bold mb-1">

										Fast Delivery

									</h6>

									<small className="text-muted">

										Delivery within 24-48 hours.

									</small>

								</div>

							</div>


							<div className="d-flex mb-3">

								<i className="fa-solid fa-shield-halved fs-4 me-3 text-primary"></i>

								<div>

									<h6 className="fw-bold mb-1">

										Warranty Included

									</h6>

									<small className="text-muted">

										Manufacturer warranty on eligible products.

									</small>

								</div>

							</div>

							<div className="d-flex">

								<i className="fa-solid fa-rotate-left fs-4 me-3 text-danger"></i>

								<div>

									<h6 className="fw-bold mb-1">

										Easy Returns

									</h6>

									<small className="text-muted">

										30-day return policy.

									</small>

								</div>

							</div>

						</div>

					</div>

				</div>


				{/* ==================================
					DESCRIPTION
				================================== */}

				<div className="row mt-5">

					<div className="col-lg-12">

						<div className="card border-0 shadow-sm rounded-4">

							<div className="card-body p-4">

								<h3 className="fw-bold mb-4">

									Product Description

								</h3>


								<p className="text-muted">

									{product.description ||
										"This premium quality product is designed for maximum performance and reliability. Suitable for business, office and home use. Built with high-quality components to ensure long-lasting durability and excellent user experience."}

								</p>


								<hr />


								<h4 className="fw-bold mb-3">

									Specifications

								</h4>


								<div className="row">

									<div className="col-md-6">

										<table className="table">

											<tbody>

												<tr>

													<th>
														Brand
													</th>

													<td>
														{product.brand ||
															"CompCaribe"}
													</td>

												</tr>


												<tr>

													<th>
														Condition
													</th>

													<td>
														New
													</td>

												</tr>


												<tr>

													<th>
														Availability
													</th>

													<td>
														In Stock
													</td>

												</tr>

											</tbody>

										</table>

									</div>


									<div className="col-md-6">

										<table className="table">

											<tbody>

												<tr>

													<th>
														Delivery
													</th>

													<td>
														1-2 Business Days
													</td>

												</tr>


												<tr>

													<th>
														Warranty
													</th>

													<td>
														12 Months
													</td>

												</tr>


												<tr>

													<th>
														Support
													</th>

													<td>
														24/7 Customer Support
													</td>

												</tr>

											</tbody>

										</table>

									</div>

								</div>

							</div>

						</div>

					</div>

				</div>


				{/* ==================================
					RELATED PRODUCTS
				================================== */}

				<div className="mt-5">

					<div className="d-flex justify-content-between align-items-center mb-4">

						<h4 className="fw-bold">
							Related Products
						</h4>


						<Link
							to={
								product.type === "rental"
									? `/${product.category}`
									: `/shop-index/${product.category}`
							}
							className="btn btn-outline-secondary"
						>

							View All

						</Link>

					</div>


					<div className="row g-4">

						{relatedProducts.map((item) => (

							<div
								className="col-lg-3 col-md-6"
								key={item.id}
							>

								<div className="card h-100 shadow-sm border-0 rounded-4">

									<Link
										to={
											item.type === "rental"
												? `/product/${item.id}`
												: `/shop-index/product/${item.id}`
										}
										className="text-decoration-none text-dark"
									>

										<img
											src={item.image}
											alt={item.name}
											className="card-img-top p-3"
											style={{
												height: "180px",
												objectFit: "contain"
											}}
										/>


										<div className="card-body">

											<h6
												className="fw-semibold"
												style={{
													minHeight: "48px"
												}}
											>

												{item.name}

											</h6>


											<div className="d-flex justify-content-between align-items-center mt-3">

												<strong className="fs-5">

													£{item.price}

													{item.type === "rental" && (

														<small className="text-muted">

															{" "}
															/month

														</small>

													)}

												</strong>


												<span className="badge bg-success">

													In Stock

												</span>

											</div>

										</div>

									</Link>

								</div>

							</div>

						))}

					</div>

				</div>

			</div>

		</section>

	);

};


export default ProductDetail;


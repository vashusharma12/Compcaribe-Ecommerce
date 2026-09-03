import { createSlice } from "@reduxjs/toolkit";

// ========================================
// LOAD CART FROM LOCAL STORAGE
// ========================================

const getInitialCart = () => {
    try {
        const savedCart = localStorage.getItem("cart");

        if (!savedCart) {
            return [];
        }

        const parsedCart = JSON.parse(savedCart);

        return Array.isArray(parsedCart)
            ? parsedCart
            : [];

    } catch (error) {
        console.error(
            "Failed to load cart:",
            error
        );

        return [];
    }
};


// ========================================
// INITIAL STATE
// ========================================

const initialState = {
    items: getInitialCart()
};


// ========================================
// CART SLICE
// ========================================

const cartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {

        // ========================================
        // ADD TO CART
        // ========================================

        addToCart: (state, action) => {

            const product = action.payload;

            const existingItem = state.items.find(
                (item) =>
                    item.id === product.id &&
                    item.duration === product.duration
            );

            if (existingItem) {

                existingItem.quantity +=
                    product.quantity || 1;

            } else {

                state.items.push({
                    ...product,
                    quantity:
                        product.quantity || 1
                });

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(state.items)
            );
        },


        // ========================================
        // REMOVE FROM CART
        // ========================================

        removeFromCart: (state, action) => {

            const { id, duration } =
                action.payload;

            state.items = state.items.filter(
                (item) => {

                    if (item.id !== id) {
                        return true;
                    }

                    if (
                        duration !== undefined &&
                        item.duration !== duration
                    ) {
                        return true;
                    }

                    return false;
                }
            );

            localStorage.setItem(
                "cart",
                JSON.stringify(state.items)
            );
        },


        // ========================================
        // UPDATE QUANTITY
        // ========================================

        updateQuantity: (state, action) => {

            const {
                id,
                duration,
                quantity
            } = action.payload;

            const item = state.items.find(
                (item) =>
                    item.id === id &&
                    item.duration === duration
            );

            if (!item) {
                return;
            }

            if (quantity <= 0) {

                state.items =
                    state.items.filter(
                        (item) =>
                            !(
                                item.id === id &&
                                item.duration === duration
                            )
                    );

            } else {

                item.quantity = quantity;

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(state.items)
            );
        },


        // ========================================
        // CLEAR CART
        // ========================================

        clearCart: (state) => {

            state.items = [];

            localStorage.removeItem(
                "cart"
            );
        }

    }

});


export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
} = cartSlice.actions;


export default cartSlice.reducer;
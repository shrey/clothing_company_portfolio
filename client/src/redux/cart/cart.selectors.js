import {createSelector} from 'reselect'

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems =>( cartItems.reduce(
        (accumulatorQuantity,cartItem) =>accumulatorQuantity + cartItem.quantity,
        0
        )) 
)
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
    cartItems.reduce((accumulatorQuantity,cartItem) => 
    accumulatorQuantity + cartItem.quantity * cartItem.price,0)
)
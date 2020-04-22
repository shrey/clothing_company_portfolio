import React from 'react';
import './cart-icon.styles.scss'
import {ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import { connect } from 'react-redux'
import {toggleCartHidden} from "../../redux/cart/cart.action"
const CartIcon = ({toggleCartHidden,itemNumber})=>(
    <div className = "cart-icon" onClick = {toggleCartHidden}>
        <ShoppingIcon className = "shopping-icon"/>
        <span className = "item-count">{itemNumber}</span>
    </div>
)
const mapDispatchToProps = dispatch=>({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})
const mapStateToProps = ({cart: {itemCount}}) =>({
    itemNumber: itemCount
})
export default connect (mapStateToProps,mapDispatchToProps)(CartIcon);
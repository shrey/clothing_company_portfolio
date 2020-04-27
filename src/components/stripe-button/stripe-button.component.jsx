import React from 'react';
import StripeCheckout from 'react-stripe-checkout'
import {clearCart} from '../../redux/cart/cart.action'
import { connect } from 'react-redux';
const StripeCheckoutButton = ({price,clearCart}) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_Yz4UKK0b1DWiJHD5xJxEnle500CfwERHQj';
    const onToken = token =>{
        console.log(token);
        
         clearCart();
         alert('Payment Successful')
    }
    return(
        <StripeCheckout label = "Pay Now" 
        name = "CRWN Clothing Ltd"
        billingAddress
        shippingAddress
        image = 'https://svgshare.com/i/CUz.svg'
        description = {`Your total is $${price}`}
        amount = {priceForStripe}
         panelLabel = 'Pay Now'
        token = {onToken}
        stripeKey = {publishableKey}
        />
)}
const mapDispatchToProps = dispatch =>({
    clearCart: () => dispatch(clearCart())
})
export default connect(null,mapDispatchToProps)(StripeCheckoutButton);
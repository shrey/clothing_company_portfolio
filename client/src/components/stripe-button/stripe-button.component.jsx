  
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {clearCart} from '../../redux/cart/cart.action';
import {connect} from 'react-redux'; 
const StripeCheckoutButton = ({ price,clearCart }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_Yz4UKK0b1DWiJHD5xJxEnle500CfwERHQj';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert('succesful payment');
        clearCart();
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert(
          'There was an issue with your payment! Please make sure you use the provided credit card.'
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch(clearCart())
})
export default connect(null,mapDispatchToProps)(StripeCheckoutButton);

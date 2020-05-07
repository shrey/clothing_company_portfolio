import React from 'react'
import {connect} from 'react-redux';
import {selectIsLoading} from '../../redux/user/user.selectors.js';
import {createStructuredSelector} from 'reselect'
import "./sign-in-and-sign-up.styles.scss";
import StateSpinner from '../../components/with-spinner/state_call_spinner'
import SignIn from "../../components/sign-in/sing-in.component"
import SignUp from "../../components/sign-up/sign-up.component"
const SignInAndSignUpPage = ({isLoading})=>{
    console.log(isLoading);
    return(
    <div>
        
            {
                isLoading?  (<StateSpinner/>)
                : 
                (
                    
                    <div className = "sign-in-and-sign-up">
                        <SignIn/>
                        <SignUp/>
                    </div>
                    
                )
            }
        
    </div>
);}

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsLoading
})
export default connect(mapStateToProps)(SignInAndSignUpPage);
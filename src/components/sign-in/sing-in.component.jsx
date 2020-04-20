import React from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input-component'
import CustomButton from '../custom-button/custom-button.component';
import {signInWithGoogle,auth} from '../../firebase/firebase.utils'

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = event =>{
        const {value,name} = event.target;
        this.setState({[name]: value});
    }
    handleSubmit = async event =>{
        event.preventDefault();
        const {email, password} = this.state;
        console.log(event);
        console.log(email);
        console.log(password);
        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        }catch(error){
            console.log(error.message);
        }
        
    }
    render(){
        
        return(
        
        <div className = "sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit = {this.handleSubmit}>
                    <FormInput name = "email" type = "email" handleChange = {this.handleChange} value = {this.state.email} label = "email" required/>
                    
                    <FormInput name = "password" type = "password" value = {this.state.password} handleChange = {this.handleChange} label = "password" required/>
                    
                    <div className = "buttons">
                    <CustomButton type = "submit">
                        SIGN IN 
                    </CustomButton>
                    <CustomButton onClick = {signInWithGoogle} isGoogleSignIn >Sign In With Google</CustomButton>
                   
                    </div>
                    
                    
                </form>
            </div>
        )
    }
}
export default SignIn;
import React,{useState} from 'react';
import "./sign-up.styles.scss";
import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button.component';
import {auth,createUserProfileDocument} from "../../firebase/firebase.utils";
import {connect} from 'react-redux'
import {signUpStart} from '../../redux/user/user.action'
const SignUp = ({signUpStart}) =>{
    const [userCredentials,setCredentials] = useState({displayName: '', email: '', password: '', confirmPassword: ''})
    const {email,password,displayName, confirmPassword} = userCredentials;
    const handleSubmit = async (event)=>{
        
        event.preventDefault(); 
        
        if(password !== confirmPassword){
            alert("Passwords don't match");
             return;
        }
        try{
            const emailPasswordAndName = {email,password,displayName};
            
            signUpStart(emailPasswordAndName);
        }catch(error){
            console.log(error);
            return;
        }
        
        // try{
        //     const {user} = await auth.createUserWithEmailAndPassword(email,password);
        //     createUserProfileDocument(user,{displayName}) 
        //     this.setState({
        //         displayName: '',
        //         email :'',
        //         password: '',
        //         confirmPassword: ''
        //     })
            
        // }catch(error){
        //     console.log(error);
        // }
    }
    const handleChange = (event)=>{
        
        const {name,value} = event.target;
        setCredentials({...userCredentials, [name]: value})
      
    }
    
        
        return(
            <div className = "sign-up">
                <h2 className = 'title'>
                    I do not have an account
                </h2>
                <span>Sign Up with your email and password </span>
                <form className = "sign-up-form" onSubmit = {handleSubmit}>
                    <FormInput 
                    type = "text" 
                    name = "displayName" 
                    value = {displayName} 
                    onChange = {handleChange} 
                    label = "Display Name"/>
                    <FormInput 
                    type = "email" 
                    name = "email" 
                    value = {email} 
                    onChange = {handleChange} 
                    label = "email"/>
                    <FormInput 
                    type = "password" 
                    name = "password" 
                    value = {password} 
                    onChange = {handleChange} 
                    label = "Password"/>
                    <FormInput 
                    type = "password" 
                    name = "confirmPassword" 
                    value = {confirmPassword} 
                    onChange = {handleChange} 
                    label = "Confirm Password "/>
                    <CustomButton type = "submit">Sign Up</CustomButton> 
                </form>
            </div>
        )
    }

const mapDispatchToProps = dispatch =>({
    signUpStart: (emailPasswordAndName) => dispatch(signUpStart(emailPasswordAndName))
})
export default connect(null,mapDispatchToProps)(SignUp);

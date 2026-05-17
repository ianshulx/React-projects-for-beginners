import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import icon from '../../assets/logo.png'
import AboutAuth from './AboutAuth'
import './Auth.css'
import { signup,login } from '../../actions/auth'
const Auth = () => {


//Server Side Code 
    const [isSignup,setIsSignup]=useState(false)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('') 
    const handleSwitch = () =>{
        setIsSignup(!isSignup)
    }
    
    const dispatch = useDispatch()
    const navigate =useNavigate()  


    const handleSubmit =(e)=>{
        e.preventDefault()
        if(isSignup){
            if(!name||!email || !password ){
                alert("Enter Full Details to SignUP")
            }
            dispatch(signup({name,email,password},navigate))


        }
        else{
            if(!email || !password ){
                alert("Enter Full Details to LogIn")
            }
            dispatch(login({email,password },navigate))
        }
        console.log({name,email,password})
    }

//Front End Code

    return (
        <section className='auth-section'>
            { isSignup && <AboutAuth/> }
            <div className='auth-container'>
                { !isSignup && <img src={icon} alt='stack overflow'></img>}
                <form onSubmit={handleSubmit}>
                    { 
                        isSignup && (
                        <label htmlFor='name'>
                            <h4>Display</h4>
                            <input type="text" name="name" id="Display" placeholder='Name to Display..' onChange={(e)=>{setName(e.target.value)}}/>
                        </label>
                        )
                    }

                    <label htmlFor='email'>
                        <h4>Email</h4>
                        <input type="email" name="email" id="email" placeholder='Email..' onChange={(e)=>{setEmail(e.target.value)}}/>
                    </label>

                    <label htmlFor='password'>
                        <div style={{display:"flex",justifyContent:"space-between"}}>

                            <h4>Password</h4>
                           {!isSignup && 
                           <p style={{ color:"#007ac6"  , fontSize:"14px"}}>
                            Forget Password?
                            </p>}
                        </div>
                        
                        <input type="password" name="password" id="password" placeholder='Password..' onChange={(e)=>{setPassword(e.target.value)}}/>

                        {isSignup && 
                        <p style={{color:"#666767",fontSize:"13px"}}>Password Must Contain atleast 8 characters 
                         including it must contain<br/> atleast one number 
                         Uppercase , Lowercase and Special Character
                        </p>}

                    </label>

                    {isSignup && <label htmlFor="check">
                        <input type="checkbox" name ="check" id="check"/>
                        <p style={{fontSize:"13px"}}>I Accept the terms and contain of StackOverFlow 
                        for the service <br></br>and everything else described in the privacy Policy and Data <br></br>processing Agreement  </p>
                    </label>}


                    <button type="submit" className='auth-btn' >{isSignup? 'Sign up':'Log in'}</button>
                    
                    {isSignup && (
                        <p style={{color:"#666767",fontSize:"13px"}}>
                            By Clicking "Sign Up", you agree to our
                            <span style={{color:"#007ac6"}}> terms of Service </span>,
                            <span style={{color:"#007ac6"}}> privacy policy</span><br/> and cookie policy.
                        </p>
                    )}

                </form>

                <p>
                    {isSignup? 'Already Have an Account ?':"Don't have an account ?"}
                    <button type="button" className='handle-switch-btn' onClick={handleSwitch}>{isSignup? "Log in":"Sign up"}</button>
                </p>
            </div>
        </section>
    )
}

export default Auth
import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/authContext'
import './login.css';
import NavbarWhite from '../../NavbarWhite';
import Footer from '../../Footer';

const Login = () => {
    const [curclick,setClick] = useState("Women");
  const [women,setWomen] = useState('clicked');
  const [men,setMen] = useState('notclicked');
  const [kid,setKid] = useState('notclicked');

  const handelwomen = ()=> {
    setWomen('clicked')
    setMen('notclicked')
    setKid('notclicked')
    setClick("Women")
  }
  const handelmen = ()=> {
    setMen('clicked')
    setWomen('notclicked')
    setKid('notclicked')
    setClick("Men")
  }
  const handelkid = ()=> {
    setKid('clicked')
    setMen('notclicked')
    setWomen('notclicked')
    setClick("Kid")
  }



    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('') // Clear previous errors
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithEmailAndPassword(email, password)
            } catch (error) {
                setErrorMessage(error.message)
                setIsSigningIn(false)
            }
        }
    }

    // Handle Google sign-in
    const onGoogleSignIn = async (e) => {
        e.preventDefault()
        setErrorMessage('') // Clear previous errors
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithGoogle()
            } catch (error) {
                setErrorMessage(error.message)
                setIsSigningIn(false)
            }
        }
    }

    // If the user is already logged in, redirect to the home page
    if (userLoggedIn) {
        return <Navigate to='/home' replace={true} />
    }

    return (
    <>
      <div className='topbar'>
        <div className='inner-topbar'>
            <ul className='topbar-list'>
                <li className={women} onClick={handelwomen} id='topbar-category-list'>WOMEN</li>
                <li className={men} onClick={handelmen} id='topbar-category-list'>MEN</li>
                <li className={kid} onClick={handelkid} id='topbar-category-list'>KIDS</li>
            </ul>
            <ul className='topbar-list'>
                <li id='topbar-option-list'><a href='/'>TRACK ORDER</a></li>
                <li id='topbar-option-list'><a href='/'>CONTACT US</a></li>
                <li id='topbar-option-list'><i className="fa fa-mobile-phone"></i>  <a href='https://play.google.com/store/apps/details?id=com.thesouledstore'>DOWNLOAD APP</a></li>
            </ul>
        </div>
      </div>
        <NavbarWhite></NavbarWhite>
        <div className="login-container">
            <h2>Login with The Souled Store</h2>
            <div className="tabs">
                <Link to="/login" className="tab-button active">LOGIN</Link>
                <Link to="/register" className="tab-button">REGISTER</Link>
            </div>

            <div className="login-content">
                <div className="social-buttons">
                    {/* Google button */}
                    <button
                        disabled={isSigningIn}
                        onClick={onGoogleSignIn}
                        className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium ${
                            isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'
                        }`}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_17_40)">
                                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>

                <p className="or-text">- OR -</p>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm text-gray-600 font-bold">Email</label>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="phone-input"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 font-bold">Password</label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="phone-input"
                        />
                    </div>

                    {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}

                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className={`proceed-button ${
                            isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'
                        }`}
                    >
                        {isSigningIn ? 'Signing In...' : 'Proceed'}
                    </button>
                </form>

                <p className="new-user">
                    New User? <Link to="/register" className="hover:underline font-bold">Create account</Link>
                </p>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}

export default Login

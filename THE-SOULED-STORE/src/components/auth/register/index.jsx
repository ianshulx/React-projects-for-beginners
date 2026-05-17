import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import Footer from '../../Footer'
import NavbarWhite from '../../NavbarWhite'

const Register = () => {
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

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
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
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <div className="login-container">
            <h2>Register with The Souled Store</h2>
            <div className="tabs">
                <Link to="/login" className="tab-button">LOGIN</Link>
                <Link to="/register" className="tab-button active">REGISTER</Link>
            </div>

            <div className="login-content">
                <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="phone-input"
                                />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="phone-input"
                                />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                                className="phone-input"
                            />
                        </div>

                    {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}

                    <button
                            type="submit"
                            disabled={isRegistering}
                            className={`proceed-button ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Register'}
                        </button>

                     </form>

                <p className="new-user">
                Already have an account? {'   '}
                <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Login</Link>
                </p>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}

export default Register
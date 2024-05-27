import { useState } from 'react';
import './login.scss'
import { useNavigate } from 'react-router-dom';
import { Login } from '../../Services/axiosCreateUser';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { userLogin } from '../../redux/action/userLogin';
import { ImSpinner2 } from "react-icons/im";


const LoginUser = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showhidePassword, setShowHidePassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleInputEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleInputPassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {

        setIsLoading(true)

        const response = await Login(email, password)
        console.log('>>>check response: ', response)
        if (response && response.EC === 0) {
            dispatch(userLogin(response))
            toast.success(response.EM)
            setIsLoading(false)
            navigate('/')
        }
        if (response && response.EC !== 0) {
            toast.error(response.EM)
            setIsLoading(false)
            return;
        }
    }

    const handleBack = () => {
        navigate('/')
    }

    const NavigateRigister = () => {
        navigate('/register')
    }

    const handleShowHidePass = () => {
        setShowHidePassword(!showhidePassword)
    }

    return (
        <div className="login-man">
            <div className="login-header">
                Don't have an account yet?
                <button className='btn-signup' onClick={() => { NavigateRigister() }}>Sign up</button>
            </div>
            <div className="title">
                ReactHook
            </div>
            <div className="wellcome">
                Hello, who’s this?
            </div>
            <div className="form-content col-4 mx-auto">
                <div className="form-group  ">
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        className="form-control "
                        value={email}
                        onChange={(event) => { handleInputEmail(event) }}
                        disabled={isLoading}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                        type={showhidePassword === false ? 'password' : 'text'}
                        className="form-control"
                        value={password}
                        onChange={(event) => { handleInputPassword(event) }}
                        disabled={isLoading}
                    />
                    <div className='showhide'>
                        <label className='show-hide' htmlFor="">
                            <label >
                                Show password
                            </label>
                            <input
                                id="check"
                                type="checkbox"
                                value={true}
                                onChange={() => { handleShowHidePass() }}
                            />
                        </label>
                    </div>
                </div>
                <div className='forgot-password '>
                    <span >Forgot password?</span>
                </div>
                <div >
                    <button
                        className='btn-login mx-auto'
                        onClick={() => { handleLogin() }}
                        disabled={isLoading}
                    >
                        {isLoading === true && <ImSpinner2 className='loader-icon' />}
                        <span>Log in</span>
                    </button>
                </div>
                {isLoading === false
                    &&
                    <div className='back_to_home'>
                        <span onClick={() => { handleBack() }}>&#60;&#60; Go back home</span>
                    </div>
                }

            </div>
        </div>
    )
}

export default LoginUser;
import { useState } from 'react';
import './login.scss'
import { useNavigate } from 'react-router-dom';
import { Login } from '../../Services/axiosCreateUser';
import { toast } from 'react-toastify';

const LoginUser = (props) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleInputEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleInputPassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {

        const response = await Login(email, password)
        console.log('>>>check response: ', response)

        if (response && response.EC === 0) {
            navigate('/')
            toast.success(response.EM)
        }
        if (response && response.EC !== 0) {
            toast.error(response.EM)
            return;
        }
    }

    const handleBack = () => {
        navigate('/')
    }

    return (
        <div className="login-man">
            <div className="login-header">
                Don't have an account yet?
                <button className='btn-signup'>Sign up</button>
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
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => { handleInputPassword(event) }}
                    />
                </div>
                <div className='forgot-password '>
                    <span >Forgot password?</span>
                </div>
                <div >
                    <button className='btn-login mx-auto' onClick={() => { handleLogin() }}>Log in</button>
                </div>
                <div className='back_to_home'>
                    <span onClick={() => { handleBack() }}>&#60;&#60; Go back home</span>
                </div>
            </div>
        </div>
    )
}

export default LoginUser;
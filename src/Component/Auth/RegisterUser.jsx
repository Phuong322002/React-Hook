
import { useState } from 'react';
import './register.scss'
import { Register } from '../../Services/axiosCreateUser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";


const RegisterUser = (props) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [showhidePassword, setShowHidePassword] = useState(false)

    const inputEmail = (event) => {
        setEmail(event.target.value)
    }

    const inputPassword = (event) => {
        setPassword(event.target.value)
    }

    const inputUserName = (event) => {
        setUserName(event.target.value)
    }

    const handleShowHidePass = () => {
        setShowHidePassword(!showhidePassword)
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };



    const handleRegister = async () => {

        const isEmail = validateEmail(email)
        // if (!isEmail) {
        //     toast.error('email invalid')
        //     return
        // }
        console.log('>>chack emailll', isEmail)

        if (email === '') {
            toast.error('You have not entered your email yet')
            return
        }
        if (password.length < 6) {
            toast.error('The password not enought 6 chapter')
            return;
        }



        const response = await Register(email, userName, password)
        console.log('>> check register: ', response)



        if (response && +response.EC === 0) {
            toast.success(response.EM)
            navigate('/login')
        }
        if (response && +response.EC !== 0) {
            toast.error(response.EM);
            return;
        }
    }

    const handleBack = () => {
        navigate('/')
    }

    return (
        <>
            <div className="register-main">
                <div className='header-register'>
                    Already have an account
                    <button className='btn-back-login'>Log in</button>
                </div>
                <div className="title-resgister">
                    ReactHook - Register
                </div>
                <div className="wellcome-register">
                    Hello
                </div>
                <div className="form-content col-4 mx-auto">
                    <div className="form-group ">
                        <label htmlFor="">Email (*)</label>
                        <input
                            type="email"
                            className="form-control "
                            value={email}
                            onChange={(event) => { inputEmail(event) }}
                        />

                    </div>
                    <div className="form-group pass">
                        <label htmlFor="">Password (*)</label>
                        <input
                            type={showhidePassword === false ? 'password' : 'text'}
                            className="form-control"
                            value={password}
                            onChange={(event) => { inputPassword(event) }}
                        />

                        <span className='icon-eye' onClick={() => { handleShowHidePass() }}>
                            {showhidePassword === false ? <IoEyeSharp /> : <IoMdEyeOff />}
                        </span>

                        {/* <div className='showhide'>
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
                        </div> */}

                    </div>

                    <div className="form-group">
                        <label htmlFor="">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={userName}
                            onChange={(event) => { inputUserName(event) }}

                        />
                    </div>

                    <div >
                        <button className='btn-register mx-auto' onClick={() => { handleRegister() }}>Sign up</button>
                    </div>
                    <span className='back_to_home' onClick={() => { handleBack() }}>&#60;&#60; Go back home</span>
                </div>
            </div>
        </>
    )
}

export default RegisterUser;
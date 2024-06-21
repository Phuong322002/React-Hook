import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LogoutUser } from '../../Services/axiosCreateUser';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { LogOutUserAction } from '../../redux/action/LogoutUserAction';
import { MdOutlineLanguage } from "react-icons/md";
import { useTranslation, Trans } from 'react-i18next';


const Header = () => {

    const dispatch = useDispatch()
    const { t, i18n } = useTranslation();
    console.log('i18n: ', i18n.languages)


    // hook useSelector dùng để lấy data bên redux 
    const account = useSelector((state) => state?.user?.account)

    /// state?.user? (cụm này là status)
    const isAuthecated = useSelector((state) => state?.user?.isAuthecated)

    console.log('>> Check isAuthecated:', isAuthecated)

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignUp = () => {
        navigate('/register')
    }

    const handleLogOut = async () => {

        console.log('>>check account: ', account)

        const response = await LogoutUser(account.email, account.refresh_token)
        console.log('response log out: ', response)
        if (response.EC === 0) {
            dispatch(LogOutUserAction())
            navigate('/')
            toast.success(response.EM)
        } else {
            toast.error(response.EM);
            return;
        }
    }


    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to="/" className='navbar-brand'>React-Hook</Link>
                {/* <Navbar.Brand href="/">React-Hook</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>{t('headerHome.home')}</NavLink>
                        <NavLink to='user' className='nav-link'>{t('headerHome.user')}</NavLink>
                        <NavLink to='/admin' className='nav-link'>{t('headerHome.admin')}</NavLink>
                        {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/user">Users</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link> */}
                    </Nav>
                    <Nav>
                        <NavDropdown title={i18n.language === 'vi' ? 'Vietnamese' : 'English'} id="basic-nav-dropdown2" className='language1'>
                            {/* <NavDropdown.Item >Log in</NavDropdown.Item> */}
                            <NavDropdown.Item onClick={() => { handleChangeLanguage('vi') }}>VietNames</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { handleChangeLanguage('en') }}>English</NavDropdown.Item>
                        </NavDropdown>
                        <MdOutlineLanguage style={{ marginTop: '13px', marginRight: '10px' }} />
                    </Nav>
                    <Nav>
                        {isAuthecated === false
                            ?
                            <>
                                <button className='btn-signin' onClick={() => { handleLogin() }} >Log in</button>
                                <button className='btn-signup' onClick={() => { handleSignUp() }}>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Setting" id="basic-nav-dropdown" className='setting'>
                                {/* <NavDropdown.Item >Log in</NavDropdown.Item> */}
                                <NavDropdown.Item onClick={() => { handleLogOut() }}>Log out</NavDropdown.Item>
                                <NavDropdown.Item >Profile</NavDropdown.Item>

                            </NavDropdown>
                        }
                    </Nav>



                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
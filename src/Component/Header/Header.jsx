import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { actionUserLogOut } from '../../redux/action/userLogout';

const Header = () => {

    const dispatch = useDispatch()


    // hook useSelector dùng để lấy data bên redux 
    const account = useSelector((state) => state?.user?.account)

    /// state?.user? (cụm này là status)
    const isAuthecated = useSelector((state) => state?.user?.isAuthecated)

    console.log('>>check account: ', account)
    console.log('>> Check isAuthecated:', isAuthecated)

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignUp = () => {
        navigate('/register')
    }

    const handleLogOut = () => {
        console.log('isAuthecatedd', isAuthecated)
        dispatch(actionUserLogOut())
        navigate('/')
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to="/" className='navbar-brand'>React-Hook</Link>
                {/* <Navbar.Brand href="/">React-Hook</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='user' className='nav-link'>User</NavLink>
                        <NavLink to='/admin' className='nav-link'>Admin</NavLink>
                        {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/user">Users</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link> */}
                    </Nav>
                    <Nav>
                        {isAuthecated === false
                            ?
                            <>
                                <button className='btn-signin' onClick={() => { handleLogin() }} >Log in</button>
                                <button className='btn-signup' onClick={() => { handleSignUp() }}>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
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
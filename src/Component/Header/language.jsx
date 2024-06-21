
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MdOutlineLanguage } from "react-icons/md";
import './language.scss'
import { useTranslation, Trans } from 'react-i18next';


const Language = () => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <div className='main'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    {/* <Navbar.Brand href="/">React-Hook</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav>
                            <NavDropdown title={i18n.language === 'vi' ? 'Vietnamese' : 'English'} id="basic-nav-dropdown" className='language'>
                                {/* <NavDropdown.Item >Log in</NavDropdown.Item> */}
                                <NavDropdown.Item onClick={() => { handleChangeLanguage('vi') }}>VietNames</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { handleChangeLanguage('en') }}>English</NavDropdown.Item>

                            </NavDropdown>
                            <div className='icon-language'>
                                <MdOutlineLanguage />
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default Language
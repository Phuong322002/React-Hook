import { Link } from "react-router-dom";
import videoHomepage from '../../assets/video-homepage.mp4'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate()
    const isAuthecated = useSelector((state) => state?.user?.isAuthecated)

    const navigateSignIn = () => {
        navigate('/login')
    }

    const navigateListQuiz = () => {
        navigate('user')
    }

    return (
        <div>
            <video autoPlay muted loop >
                <source src={videoHomepage} />
            </video>
            <div className="content-container">
                <div className="title">There's a better way to ask</div>
                <div className="text"> You don't want to make a boring form. And your audience won't answer one.
                    Create a typeform instead-and make everyone happy</div>
                <div>
                    {isAuthecated === false
                        ?
                        <button className="btn-start" onClick={() => { navigateSignIn() }}>Get's started. It's fress</button>
                        :
                        <button className="btn-start" onClick={() => { navigateListQuiz() }}>
                            Let's Go
                        </button>
                    }
                </div>
            </div>

        </div>
    )
}

export default HomePage;
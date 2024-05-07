import { Link } from "react-router-dom";
import videoHomepage from '../../assets/video-homepage.mp4'

const HomePage = () => {

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
                    <button className="btn-start">Get's started. It's fress</button>
                </div>
            </div>

        </div>
    )
}

export default HomePage;
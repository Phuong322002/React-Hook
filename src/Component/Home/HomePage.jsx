import { Link } from "react-router-dom";
import videoHomepage from '../../assets/video-homepage.mp4'

const HomePage = () => {

    return (
        <div>
            <video autoPlay muted loop >
                <source src={videoHomepage} />
            </video>
        </div>
    )
}

export default HomePage;
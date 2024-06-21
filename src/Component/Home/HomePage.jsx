import { Link } from "react-router-dom";
import videoHomepage from '../../assets/video-homepage.mp4'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
const HomePage = () => {

    // const { t } = useTranslation();
    const { t, i18n } = useTranslation();
    console.log('i18n: ', i18n.language)
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
                <div className="title">
                    {/* There's a better way to ask */}
                    {t('homepage.title')}
                </div>
                <div className="text">
                    {t('homepage.text')}
                </div>
                <div>
                    {isAuthecated === false
                        ?
                        <button className="btn-start" onClick={() => { navigateSignIn() }}>{t('homepage.btnStart')}</button>
                        :
                        <button className="btn-start" onClick={() => { navigateListQuiz() }}>
                            {t('homepage.doingQuiz')}
                        </button>
                    }
                </div>
            </div>

        </div>
    )
}

export default HomePage
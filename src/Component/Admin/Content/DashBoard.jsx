import { useEffect, useState } from 'react';
import './DashBoard.scss'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { getOverview } from '../../../Services/axiosCreateUser';
import { useTranslation, Trans } from 'react-i18next';


const Dashboard = (props) => {
    const [dataOverview, setDataOverview] = useState({})

    const { t } = useTranslation()

    const data = [
        {
            "name": t('dashboard.quizzes'),
            "Qz": dataOverview?.others?.countQuiz,
        },
        {
            "name": t('dashboard.Questions'),
            "Qs": dataOverview?.others?.countQuestions,
        },
        {
            "name": t('dashboard.Answers'),
            "Ans": dataOverview?.others?.countAnswers,
        }
    ]

    useEffect(() => {
        fetchGetOverview()
    }, [])

    const fetchGetOverview = async () => {
        const response = await getOverview()
        console.log('>>check overview: ', typeof response)
        if (response && response.EC === 0) {
            setDataOverview(response.DT)
        }
    }

    console.log('dataOverview: ', dataOverview)


    return (
        <div className='dashboard-container'>
            <div className='title-dashboard'>
                {t('dashboard.title')}
            </div>
            <div className='content-dashboard'>
                <div className='left-dashboard'>
                    <div className='child'>
                        <span className='title-1'>{t('dashboard.child1')}</span>
                        <span className='title-2'>{dataOverview && dataOverview.users && dataOverview.users.total ? dataOverview.users.total : '0'}</span>

                    </div>
                    <div className='child'>
                        <span className='title-1'>{t('dashboard.child2')}</span>
                        <span className='title-2'>{dataOverview && dataOverview.others && dataOverview.others.countQuiz ? dataOverview.others.countQuiz : '0'}</span>

                    </div>
                    <div className='child'>
                        <span className='title-1'>{t('dashboard.child3')}</span>

                        {/* nếu giá trị là undefine thì gán giá trị mặc định là số 0 */}
                        <span className='title-2'>{dataOverview?.others?.countQuestions ?? '0'}</span>

                    </div>
                    <div className='child'>
                        <span className='title-1'>{t('dashboard.child4')}</span>
                        <span className='title-2'>{dataOverview?.others?.countAnswers ?? '0'}</span>

                    </div>
                </div>

                <div className='right-dashboard'>
                    <ResponsiveContainer width="95%" height='100%'>
                        <BarChart width={730} height={250} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#e60f0f" />
                            <Bar dataKey="Qs" fill="#fffa1c" />
                            <Bar dataKey="Ans" fill="#10df49" />

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;
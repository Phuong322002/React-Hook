import { useEffect, useState } from "react"
import { getListQuiz } from "../../Services/axiosCreateUser"
import './listquiz.scss'
import { NavLink, useNavigate } from "react-router-dom"
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const ListQuiz = (props) => {

    const navigate = useNavigate()

    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        getDataListUser()
    }, [])

    const getDataListUser = async () => {
        const response = await getListQuiz()
        console.log('check data list quiz: ', response)
        if (response && response.EC === 0) {
            setListQuiz(response.DT)
        }

    }
    const NavigateDeltailQuiz = (quiz) => {
        console.log('quizz', quiz)
        //đoạn code dưới có thể gửi state qua component có đường dẫn trong hàm navigate()
        navigate(`/quiz/${quiz.id}`, { state: { quizdescription: quiz.description } })

    }
    console.log('>>> lisQuiz: ', listQuiz)

    return (
        <>
            <div className="breadcrumb" style={{ marginLeft: "50px", marginTop: '10px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="#"><NavLink to='/'> Home </NavLink></Breadcrumb.Item>
                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                        <NavLink to='user' end>User</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active><NavLink to='/admin'>Admin</NavLink></Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="list-quiz-container container">
                {listQuiz && listQuiz.length > 0 &&
                    listQuiz.map((quiz, index) => {
                        return (
                            <div key={`${index}-quiz`} className="card " style={{ width: '18rem' }}>
                                <img src={`data:image/png;base64,${quiz.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {quiz.id}</h5>
                                    <p className="card-text">{quiz.description}</p>
                                    <button className="btn btn-primary" onClick={() => { NavigateDeltailQuiz(quiz) }}>Go</button>
                                </div>
                            </div >
                        )
                    })

                }
                {listQuiz && listQuiz.length === 0 &&
                    <div>You don't have any quiz...</div>
                }
            </div>
        </>
    )
}

export default ListQuiz
import { useEffect, useState } from "react"
import { getListQuiz } from "../../Services/axiosCreateUser"
import './listquiz.scss'
import { useNavigate } from "react-router-dom"

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

    return (
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
    )
}

export default ListQuiz
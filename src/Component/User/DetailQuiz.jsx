import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDetailQuiz } from "../../Services/axiosCreateUser"

const DetailQuiz = () => {

    const param = useParams()
    console.log('param', param.id)
    const quizID = param.id

    //lấy detail quiz ta gọi API
    useEffect(() => {
        getDataDetailQuiz()
    }, [quizID]) // mỗi lần cái quizID này thay đổi thì nó chạy vào hàm useEffeact này

    const getDataDetailQuiz = async () => {
        const response = await getDetailQuiz(quizID)
        console.log('>> check detail quiz: ', response)
    }


    return (
        <div>
            detail quiz
        </div>
    )
}

export default DetailQuiz
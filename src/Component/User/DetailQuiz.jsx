import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDetailQuiz } from "../../Services/axiosCreateUser"
import _ from 'lodash'
import './detail.scss'
import { useLocation } from "react-router-dom"
import Question from "./Question"
const DetailQuiz = () => {

    const param = useParams() // lấy paramas trên đường link URL 
    console.log('param', param)
    const quizID = param.id

    //lấy state của hàm navigate() truyền sang
    const location = useLocation()
    console.log('location', location)
    let title = location.state.quizdescription

    const [dataQuiz, setdataQuiz] = useState([])
    const [currQuiz, setCurrQuiz] = useState(0)
    const [disab, setdisab] = useState(false)

    //lấy detail quiz ta gọi API
    useEffect(() => {
        getDataDetailQuiz()
    }, [quizID]) // mỗi lần cái quizID này thay đổi thì nó chạy vào hàm useEffeact này

    const getDataDetailQuiz = async () => {
        const response = await getDetailQuiz(quizID)
        console.log('>> check detail quiz: ', response)
        if (response && response.EC === 0) {
            const data_raw = response.DT
            const data = _.chain(data_raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (id), `value` is the array of objects
                .map((value, key) => {
                    console.log('value: ', value, 'key: ', key)
                    let aw = []
                    let qustionsDescription = '';
                    let image = ''
                    value.forEach((item, index) => {
                        if (index === 0) {
                            qustionsDescription = item.description;
                            image = item.image
                        }
                        console.log('item answers: ', item)
                        item.answers.isSelected = false
                        aw.push(item.answers)
                    })
                    return {
                        qustionsId: key,
                        answers: aw,
                        qustionsDescription: qustionsDescription,
                        image: image
                    }
                })
                .value()
            console.log('check data raw: ', data)
            setdataQuiz(data)
        }
    }

    console.log('dataQuiz', dataQuiz)

    // const handlePrev = () => {

    // }

    // const handleNext = () => {
    //     console.log('currquizz', currQuiz + 1, dataQuiz.length)
    //     if (dataQuiz.length > currQuiz + 1) {
    //         setCurrQuiz(currQuiz + 1)

    //     } else if (dataQuiz.length <= currQuiz + 1) {
    //         setdisab(true)
    //     }
    //     else {
    //         return
    //     }

    // }

    useEffect(() => {
        // Disable the "Next" button if the current question is the last one
        if (currQuiz >= dataQuiz.length - 1) {
            setdisab(true)
        } else {
            setdisab(false)
        }
    }, [currQuiz, dataQuiz.length])


    const handlePrev = () => {

        if (currQuiz > 0) {
            setCurrQuiz(currQuiz - 1)
        }
    }

    const handleNext = () => {
        if (currQuiz < dataQuiz.length - 1) {
            setCurrQuiz(currQuiz + 1)
        }
    }
    console.log('vv', dataQuiz)


    //3) lúc này khi ta click vào ô check box thì hàm này sẽ chạy đồng thời chuyền id của trả lời và id của câu hỏi
    const handleCheckBox = (answerId, questionId) => {

        //4) ta clone lại data quiz để cập nhật lại state của nó(state của dataquiz) 
        let dataQuizClone = _.cloneDeep(dataQuiz)
        console.log('vv1', dataQuiz)

        console.log('dataQuizClone', dataQuizClone)
        let dataclone2 = [...dataQuiz]
        console.log('vv2', dataclone2)

        //5) Ta tìm question(câu hỏi) mà ta đã click check box
        let question = dataQuizClone.find((item) => { return +item.qustionsId === +questionId })

        //6) nhờ vào câu hỏi bên trên đã tìm thì ta tìm những câu trả lời đã được click trong câu hỏi đó nhận biết qua answerId đã đc truyền 
        if (question && question.answers) {
            console.log('question:', question)
            // 7) map sẽ lặp qua từng phần tử và xuất ra mảng mới chứa những câu trả lời. Trong đó là những câu trả lười đã đc click và chưa đc click, 
            //mảng này giống với mảng data quiz clone nhưng khác ở chỗ là isSelected đã đc thay đổi do hàm handleCheckBox() có id answer chuyền sang = với id answers trong câu hỏi đã tìm thấy ở bước 5
            let filterAnswers = question.answers.map((ans, index) => {
                if (+ans.id === +answerId) {
                    //8) Nếu điều kiện trên đúng thì gán lại ans.isSelected trong obj có answer mà ta click
                    ans.isSelected = !ans.isSelected
                }
                // return về mảng mới mà ans.isSelected đã được gán lại giá trị do điều kiện ở trên
                return ans
            })
            console.log('filterAnswers', filterAnswers)
            //9) sau khi có mảng mới đã cập nhật câu trả lời nào đã đc tick, ta gán lại mảng mới đó vào mảng câu hỏi to(question)
            question.answers = filterAnswers
        }

        //10) sau đó tìm index của câu hỏi trong list dataquizclone. 
        let index = dataQuizClone.findIndex((item) => { return +item.qustionsId === +questionId })
        //11) Nếu có index thì ta gán lại câu hỏi to(bước 9) tại chỉ số index tìm được ở trên(bước 10). chỉ số tìm đc bởi điều kiện đúng sẽ là chỉ số của mảng dataQuizClone
        if (index > -1) {
            console.log('indexx: ', index)
            console.log('cc', dataQuizClone[index])
            dataQuizClone[index] = question
            //11) Cuối cùng update dataQuiz
            setdataQuiz(dataQuizClone)
        }

    }

    return (
        <div className="detail-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizID}: {location && title}
                </div>
                <hr />
                <div className="body-content">
                    <Question
                        handleCheckBox={handleCheckBox}
                        dataQuiz={dataQuiz && dataQuiz.length > 0
                            ?
                            dataQuiz[currQuiz]
                            :
                            []
                        }

                        currQuiz={currQuiz}

                    />
                </div>
                <div className="footer">
                    {/* {currQuiz + 1 } */}
                    <button className="btn btn-info btn-prev"
                        onClick={() => { handlePrev() }}
                        disabled={currQuiz === 0 ? true : false}
                    >
                        Prev
                    </button>

                    <button
                        className="btn btn-warning btn-next"
                        onClick={() => { handleNext() }}
                        disabled={disab}
                    >
                        Next
                    </button>

                    <button
                        className="btn btn-danger btn-finish"
                    // onClick={() => { handleNext() }}
                    // disabled={disab}
                    >
                        Finish
                    </button>
                </div>
            </div>

            <div className="right-content">
                count-down
            </div>

        </div>
    )
}

export default DetailQuiz
import _ from 'lodash'
import './question.scss'

const Question = (props) => {

    const { dataQuiz, currQuiz, handleCheckBox } = props

    console.log('>> check data question: ', dataQuiz)
    console.log('>> check currQuiz', currQuiz)
    if (_.isEmpty(dataQuiz)) {
        return;
    }

    const handleOnchangeInPutCheckBox = (event, answersId, questionID) => {
        console.log('Check envent check box', event.target.checked)

        console.log('>> check id:', answersId, questionID)
        //2) bắn id câu trả lời và id câu hỏi sang lớp cha để cập nhật lại trạng thái của check bõx
        handleCheckBox(answersId, questionID)
    }

    return (
        <>
            {dataQuiz.image ? <div className="q-body">
                <img src={`data:image/png;base64,${dataQuiz.image}`} alt="" />
            </div>
                :
                <div className="q-body">
                </div>}

            <div className="qustion">
                Qestion {currQuiz + 1}: {dataQuiz.qustionsDescription}
            </div>
            <div className="answers">
                {dataQuiz && dataQuiz.answers.length > 0 &&
                    dataQuiz.answers.map((answer, index) => {
                        console.log('answerr', answer, index)
                        return (
                            <div className="answer-chill" key={`${index}-answer`}>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        checked={answer.isSelected}
                                        //1) lấy ra value check, lấy id của câu trả lời khi ckick check box, lấy được id của câu hỏi
                                        onChange={(event) => { handleOnchangeInPutCheckBox(event, answer.id, dataQuiz.qustionsId) }} />
                                    <label class="form-check-label" >
                                        {answer.description}
                                    </label>
                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </>
    )
}

export default Question;
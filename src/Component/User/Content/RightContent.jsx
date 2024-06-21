import CountDown from "./countDown"
import { useRef } from "react"

const RightContent = (props) => {

    const refDiv = useRef([])


    const { dataQuiz, handleSubmit, setCurrQuiz, currQuiz } = props
    console.log('check q: ', dataQuiz)
    console.log('Check current quiz: ', currQuiz)

    const TimesUp = () => {
        handleSubmit()
    }



    const classGroup = (question, index) => {
        if (question && question.answers) {
            const checkAllIsSelected = question.answers.some((ans) => {
                return ans.isSelected === true
            })
            if (checkAllIsSelected === true) {

                return 'question selected'
            }

        }

        return 'question'
    }

    const handleOnClickQuestionBox = (index, question) => {


        console.log('refDiv: ', refDiv.current)

        if (refDiv && refDiv.current) {
            refDiv.current.forEach((el) => {
                if (el && el.className === 'question clicked') {
                    el.className = 'question'
                }
            })
        }

        setCurrQuiz(index)
        if (question && question.answers) {
            const checkAllIsSelected = question.answers.some((ans) => {
                return ans.isSelected === true
            })
            if (checkAllIsSelected === true) {
                return
            }

        }
        refDiv.current[index].className = 'question clicked'


    }



    return (
        <>
            <div className="main-timer">
                <CountDown
                    TimesUp={TimesUp}
                />
            </div>
            <div className="content">
                {dataQuiz && dataQuiz.length > 0 && dataQuiz.map((q, index) => {
                    console.log('q box: ', q)
                    return (
                        <div
                            className={classGroup(q, index)}
                            onClick={() => { handleOnClickQuestionBox(index, q) }}
                            ref={ref => refDiv.current[index] = ref}
                        >
                            {index + 1}
                        </div>
                    )
                })}


            </div >
        </>
    )
}

export default RightContent
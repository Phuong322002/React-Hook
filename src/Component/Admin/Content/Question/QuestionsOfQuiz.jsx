import { useState } from 'react';
import Select from 'react-select';
import './question.scss'
import { FaFolderPlus } from "react-icons/fa";
import { FaFolderMinus } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

const QuestionOfQuiz = () => {



    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuestion, setSelectedQuestion] = useState('')
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'answer  1',
                    isCorrect: false
                }
            ]
        }

    ])

    console.log('>>questions: ', questions)

    const handleAddRemoveQuestion = (type, id) => {
        console.log(type, id)
        const questionClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            let newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            console.log(questionClone)
            questionClone.push(newQuestion)
            setQuestions(questionClone)
        }

        if (type === 'REMOVE') {
            const arrNew = questionClone.filter((question, index) => {
                return question.id !== id
            })
            setQuestions(arrNew)
        }
    }

    const handleAddRemoveAnswer = (type, idQuestion, idAnswer) => {
        console.log(type, idQuestion)
        const questionClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            let newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            const index = questionClone.findIndex((q, index) => {
                return q.id === idQuestion
            })
            console.log('INDEX: ', index)
            console.log('>>check mm:', questionClone[index].answers)
            questionClone[index].answers.push(newAnswer)
            console.log('>>check clone: ', questionClone)
            setQuestions(questionClone)
        }

        if (type === 'REMOVE') {
            console.log(type, idQuestion, idAnswer)
            const index = questionClone.findIndex((question, index) => {
                return question.id === idQuestion
            })
            console.log('index2: ', index)

            /// gán mảng mới cho mảng answers khi xóa
            questionClone[index].answers = questionClone[index].answers.filter((ans, index) => {
                return ans.id !== idAnswer
            })
            setQuestions(questionClone)
        }
    }

    return (
        <div className="question-container">
            <div className="title-question">
                Manage Questions:
            </div>
            <hr />
            <div className="question-selected">
                <label className='lable-select'>Select Quiz:</label>
                <Select
                    defaultValue={selectedQuestion}
                    onChange={setSelectedQuestion}
                    options={options}
                />
            </div>
            <div className='body-content'>
                <label className='label-add-question'>Add question: </label>

                {questions && questions.length > 0 && questions.map((question, index) => {
                    console.log('object question: ', question)
                    return (
                        <div className='my-3'>
                            <div className='question-content'>
                                <div className="form-floating mb-3 input-add">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={question.description}
                                    />
                                    <label>Question {index + 1}</label>
                                </div>
                                <div className='upload-image'>
                                    <label htmlFor="upload-image" className='label-upload'> <FaImage style={{ color: 'green', fontSize: '20px' }} /> </label>
                                    <input type="file" id='upload-image' hidden />
                                </div>
                                <span className='display-file'>
                                    0 file is upload
                                </span>
                                <span
                                    style={{ marginTop: '12px', color: 'red', fontSize: '25px', marginLeft: '30px', cursor: 'pointer' }}
                                    onClick={() => { handleAddRemoveQuestion('ADD', '') }}
                                >
                                    <FaFolderPlus />
                                </span>

                                {questions.length > 1 &&
                                    <span
                                        style={{ marginTop: '12px', color: 'green', fontSize: '25px', marginLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => { handleAddRemoveQuestion('REMOVE', question.id) }}
                                    >
                                        <FaFolderMinus />
                                    </span>
                                }
                            </div>

                            {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                console.log('check ans: ', answer)
                                return (
                                    <div className='answer-content'>
                                        <div className='checkbox-answer'>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                            />
                                        </div>
                                        <div className="form-floating mb-3 input-answer ">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="name@example.com"
                                                value={answer.description}
                                            />
                                            <label>Answer {index + 1}</label>
                                        </div>
                                        <span
                                            className='add-answer'
                                            onClick={() => { handleAddRemoveAnswer('ADD', question.id) }}
                                        >
                                            <FiPlusCircle />
                                        </span>

                                        {question.answers.length > 1 &&
                                            <span
                                                className='remove-answer'
                                                onClick={() => { handleAddRemoveAnswer('REMOVE', question.id, answer.id) }}
                                            >
                                                <AiOutlineMinusCircle />
                                            </span>
                                        }

                                    </div>
                                )
                            })}


                        </div>
                    )
                })}



            </div>
        </div>
    )
}

export default QuestionOfQuiz
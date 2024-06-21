import { useEffect, useState } from 'react';
import Select from 'react-select';
import './UpdateQA.scss'
import { FaFolderPlus } from "react-icons/fa";
import { FaFolderMinus } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { getDataQuiz, getQuestionAnswer, postUpsertQuizWithQA } from '../../../../Services/axiosCreateUser';
import { toast } from 'react-toastify';

const UpdateQA = () => {



    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuestion, setSelectedQuestion] = useState('')

    console.log('>>check SELECTED: ', selectedQuestion)
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,

                }
            ]
        }

    ])
    const [statusLighBoxPreview, setStatusLighBoxPreview] = useState(false)
    const [dataImagePreview, setDataPreview] = useState({})
    const [listQuiz, setListQuiz] = useState([])


    useEffect(() => {
        fetchDataListQuiz()
    }, [])

    const fetchDataListQuiz = async () => {
        const response = await getDataQuiz()
        console.log('>>check respons list quiz: ', response)
        if (response && response.EC === 0) {
            console.log('>>Check sele: ', response.DT)

            const newArrQuiz = response.DT.map((quiz, index) => {
                return {
                    value: quiz.id,
                    label: `${quiz.id} - ${quiz.description}`
                }
            })
            console.log('>> check new arr: ', newArrQuiz)
            setListQuiz(newArrQuiz)
        }
    }

    console.log('listQuiz: ', listQuiz)

    // return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    //Usage example:
    urltoFile('data:text/plain;base64,aGVsbG8=', 'hello.txt', 'text/plain')
        .then(function (file) { console.log(file); });

    useEffect(() => {
        if (selectedQuestion && selectedQuestion.value) {
            fetchDataQuestionAnswer()
        }
    }, [selectedQuestion])

    const fetchDataQuestionAnswer = async () => {
        const response = await getQuestionAnswer(selectedQuestion.value)

        console.log('check data question and answer:  ', response)

        if (response && response.EC === 0) {
            console.log('response.DT.qa', response.DT)
            const newArr = [];
            for (let i = 0; i < response.DT.qa.length; i++) {
                console.log('response.DT.qa[i]: ', response.DT.qa)
                const q = response.DT.qa[i]
                if (response && response.DT.qa[i].imageFile) {
                    q.imageName = `Question - ${q.id}`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question - ${q.id}`, 'image/png')
                }
                newArr.push(q)
            }

            console.log('newArr: ', newArr)
            setQuestions(newArr)
        }
    }

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
                        isCorrect: false,
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
                isCorrect: false,
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

    const handleOnChangeQuestion = (e, idQuestion) => {
        const questionClone = _.cloneDeep(questions);
        console.log('check daa: ', questionClone)
        const index = questionClone.findIndex((q, index) => {
            return q.id === idQuestion
        })

        questionClone[index].description = e.target.value
        setQuestions(questionClone)

    }

    const handleOnChangeImgFile = (e, idQuestion) => {
        console.log(e.target.files[0], idQuestion)
        const questionClone = _.cloneDeep(questions)
        const index = questionClone.findIndex((q) => {
            return q.id === idQuestion
        })
        questionClone[index].imageFile = e.target.files[0]
        questionClone[index].imageName = e.target.files[0].name
        setQuestions(questionClone)
    }

    const handleOnChangeCheckBox = (e, idQuestion, idAnswer) => {


        console.log(e.target.checked, idQuestion, idAnswer)
        const questionClone = _.cloneDeep(questions)


        questionClone.forEach((q) => {
            if (e.target.checked === true) {
                q.selectedCheckBox = q.selectedCheckBox + 1
            } else {
                q.selectedCheckBox = 0
            }

        })


        const index = questionClone.findIndex((q) => {
            return q.id === idQuestion
        })
        questionClone[index].answers = questionClone[index].answers.map((answer, index) => {

            if (answer.id === idAnswer) {
                answer.isCorrect = e.target.checked;
            }
            return answer
        })
        setQuestions(questionClone)
    }
    console.log('test check question: ', questions)



    const handleOnchangeInputAnswer = (e, idQuestion, idAnswer) => {
        const questionClone = _.cloneDeep(questions)
        const index = questionClone.findIndex((q) => {
            return q.id === idQuestion
        })
        questionClone[index].answers = questionClone[index].answers.map((answer, index) => {
            if (answer.id === idAnswer) {
                answer.description = e.target.value
            }
            return answer
        })
        setQuestions(questionClone)
    }




    const handleDisplayLightbox = (event, idQuestion) => {
        setStatusLighBoxPreview(true)
        console.log(idQuestion)

        const questionClone = _.cloneDeep(questions)

        const index = questionClone.findIndex((q) => {
            return q.id === idQuestion
        })

        if (index > -1) {
            setDataPreview({
                title: questionClone[index].imageName,
                image: questionClone[index].imageFile
            })
        }


    }

    console.log('DataPreview: ', dataImagePreview.image)

    const handleCreateQuestion = async () => {
        console.log('>>questions: ', questions, 'selectedQuestion', selectedQuestion)

        // validate seleted
        if (_.isEmpty(selectedQuestion)) {
            toast.error('You must to choise option of select!');
            return;
        }

        // validate question
        for (let i = 0; i < questions.length; i++) {
            let isValidQuestion = true;
            let isValidQ = 0;
            if (questions[i].description === '') {
                isValidQuestion = false;
                isValidQ = i
            }
            console.log('isValidQuestion', isValidQuestion)
            if (isValidQuestion === false) {
                toast.error(`The question at ${isValidQ + 1} is empty`);
                break;
            }

            if (questions[i].selectedCheckBox <= 0) {
                toast.error('you must have a answer correct!')
                return
            }

        }

        // validate answer
        let isValidAnswer = true;
        let isValQ = 0, isValA = 0
        for (let i = 0; i < questions.length; i++) {
            console.log('question[i]', questions[i])
            for (let j = 0; j < questions[i].answers.length; j++) {
                // console.log('anss', questions[i].answers[j])
                if (questions[i].answers[j].description === '') {
                    isValidAnswer = false
                    isValA = j
                    // break;
                }
            }
            isValQ = i
            if (isValidAnswer === false) {
                toast.error(`The answer ${isValA + 1} at question ${isValQ + 1} is empty!`)
                return
            }
        }

        const questionClone = _.cloneDeep(questions)

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

        console.log(questionClone)
        const newArr = [];
        for (let i = 0; i < questionClone.length; i++) {
            console.log('questionClone[i]: ', questionClone[i])
            if (questionClone[i] && questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile)
            }
            newArr.push(questionClone[i])
        }
        console.log('>>>>Check newArr: ', newArr, '>>>>check quesClone: ', questionClone)
        const response = await postUpsertQuizWithQA({
            quizId: selectedQuestion.value,
            questions: newArr
        })
        console.log('response: ', response)
        if (response && response.EC === 0) {
            toast(response.EM)
            fetchDataQuestionAnswer()
        }
    }

    console.log('qq: ', questions)

    return (
        <div className="question-container">
            <div className="question-selected">
                <label className='lable-select'>Select Quiz:</label>
                <Select
                    defaultValue={selectedQuestion}
                    onChange={setSelectedQuestion}
                    options={listQuiz}
                />
            </div>
            <div className='body-content'>
                <label className='label-add-question'>Add question: </label>
                {/* QUESTION */}
                {questions && questions.length > 0 && questions.map((question, index) => {
                    console.log('object question: ', question)
                    return (
                        <div key={`q-${question.id}`} className='my-3'>
                            <div className='question-content'>
                                <div className="form-floating mb-3 input-add">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={question.description}
                                        onChange={(event) => { handleOnChangeQuestion(event, question.id) }}
                                    />
                                    <label>Question {index + 1}</label>
                                </div>
                                <div className='upload-image'>
                                    <label htmlFor={`${question.id}`} className='label-upload'> <FaImage style={{ color: 'green', fontSize: '20px' }} /> </label>
                                    <input
                                        type="file"
                                        id={`${question.id}`}
                                        hidden
                                        onChange={(event) => { handleOnChangeImgFile(event, question.id) }}
                                    />
                                </div>
                                <span className='display-file'>
                                    {question && question.imageFile
                                        ?
                                        <span
                                            onClick={(event) => { handleDisplayLightbox(event, question.id) }}
                                        >
                                            {question.imageName}
                                        </span>

                                        :
                                        '0 file is upload'
                                    }

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


                            {/* ANSWER */}
                            {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                console.log('check ans: ', answer)
                                return (
                                    <div className='answer-content'>
                                        <div className='checkbox-answer'>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={answer.isCorrect}
                                                onChange={(event) => { handleOnChangeCheckBox(event, question.id, answer.id) }}
                                            />
                                        </div>
                                        <div className="form-floating mb-3 input-answer ">
                                            <input
                                                type="email"
                                                className="form-control"
                                                // className="form-control"
                                                placeholder=''
                                                value={answer.description}
                                                onChange={(event) => { handleOnchangeInputAnswer(event, question.id, answer.id) }}
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
            {questions && questions.length > 0 &&
                <div className='btn-create-question' >
                    <button
                        className='btn btn-danger'
                        onClick={() => { handleCreateQuestion() }}
                    >
                        Create Question
                    </button>
                </div>
            }
            {statusLighBoxPreview === true &&
                <Lightbox
                    image={URL.createObjectURL(dataImagePreview.image)}
                    title={dataImagePreview.title}
                    onClose={() => setStatusLighBoxPreview(false)}
                    backdrop='static'
                />
            }

        </div>
    )
}

export default UpdateQA
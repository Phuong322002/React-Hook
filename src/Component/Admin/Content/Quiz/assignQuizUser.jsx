import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { getDataQuiz, getUser, postAssignQuizToUser } from '../../../../Services/axiosCreateUser';
import './assignQuiz.scss';
import { toast } from 'react-toastify';


const AssignQuizUser = (props) => {


    const selectInputRefQuestion = useRef();
    const selectInputRefUser = useRef();


    const [selectedQuestion, setSelectedQuestion] = useState('')
    const [selectedUser, setSelectedUser] = useState('')

    const [listQuiz, setListQuiz] = useState([])
    const [listUser, setListUser] = useState([])



    useEffect(() => {
        fetchDataListQuiz();
        fetchDataListUser()
    }, [])

    const fetchDataListQuiz = async () => {
        const response = await getDataQuiz()
        console.log('>>check respons list quiz: ', response)
        if (response && response.EC === 0) {
            console.log('>>Check sele: ', response.DT)

            const newArrQuiz = response.DT.map((quiz, index) => {
                return {
                    value: quiz.id,
                    label: `${quiz.id} - ${quiz.name}`
                }
            })
            console.log('>> check new arr: ', newArrQuiz)
            setListQuiz(newArrQuiz)
        }
    }

    const fetchDataListUser = async () => {
        const response = await getUser()
        console.log('>>check respons list quiz: ', response)
        if (response && response.EC === 0) {
            console.log('>>Check sele: ', response.DT)

            const newArrUser = response.DT.map((user, index) => {
                return {
                    value: user.id,
                    label: `${user.id} - ${user.username} - ${user.email}`
                }
            })
            console.log('>> check new arr: ', newArrUser)
            setListUser(newArrUser)
        }
    }

    console.log('selectedQuestion: ', selectedQuestion)

    const clearSeleted = () => {
        setSelectedQuestion(selectInputRefQuestion.current.clearValue())
        setSelectedUser(selectInputRefUser.current.clearValue())
    }

    const handleAssignQuiz = async () => {
        const response = await postAssignQuizToUser(selectedQuestion.value, selectedUser.value)

        console.log('Check response assign quiz: ', response)

        if (response && response.EC === 0) {
            toast.success(response.EM);
            clearSeleted()
        }
        if (response && response.EC !== 0) {
            toast.error(response.EM);
            return;
        }
    }


    return (
        <div className='assign-quiz row'>
            <div className="question-selected">
                <label className='lable-select'>Select Quiz:</label>
                <Select
                    defaultValue={selectedQuestion}
                    onChange={setSelectedQuestion}
                    options={listQuiz}
                    ref={selectInputRefQuestion}
                />
            </div>
            <div className="user-selected">
                <label className='lable-select'>Select User:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                    ref={selectInputRefUser}
                />
            </div>
            <div className='mt-3'>
                <button
                    className='btn btn-warning'
                    onClick={() => { handleAssignQuiz() }}
                >
                    Assign User
                </button>
            </div>
        </div>
    )
}

export default AssignQuizUser;
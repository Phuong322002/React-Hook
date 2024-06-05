import { useState } from "react"

const TableQuiz = (props) => {

    const { setShowModalQuiz, listQuiz, statusView, setStatusView, setQuizInfor, setShowModalUpdatequiz, setQuizView } = props

    console.log('list: ', listQuiz)


    const handleView = (quiz) => {
        console.log('>> check quiz view: ', quiz)
        setStatusView(true)
        setQuizView(quiz)
    }

    const handleDeleteQuiz = (quiz) => {
        console.log('>>cehck quiz delete: ', quiz)
        setShowModalQuiz(true)
        setQuizInfor(quiz)
    }

    const handleUpdateQuiz = (quiz) => {
        setShowModalUpdatequiz(true)
        setQuizInfor(quiz)
    }

    return (
        <>
            <div className="header-table">
                List Quiz:
            </div>
            <div>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">NO</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Difficulty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listQuiz && listQuiz.length > 0 && listQuiz.map((quiz, index) => {
                            console.log('quizz: ', quiz)
                            return (
                                <tr>
                                    <td scope="row">{quiz.id}</td>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { handleView(quiz) }}>View</button>
                                        <button className="btn btn-danger mx-3" onClick={() => { handleUpdateQuiz(quiz) }} >Edit</button>
                                        <button className="btn btn-warning" onClick={() => { handleDeleteQuiz(quiz) }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                        {listQuiz && listQuiz.length === 0 &&
                            <tr>
                                <td colSpan='5'>
                                    No Information
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default TableQuiz;
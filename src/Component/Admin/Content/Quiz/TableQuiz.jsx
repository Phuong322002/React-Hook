

const TableQuiz = (props) => {

    const { listQuiz, statusView, setStatusView } = props

    console.log('list: ', listQuiz)

    const handleView = () => {
        setStatusView(true)
    }

    return (
        <div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Difficulty</th>
                        <th></th>
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
                                    <button className="btn btn-primary" onClick={() => { handleView() }}>View</button>
                                    <button className="btn btn-danger mx-3">Edit</button>
                                    <button className="btn btn-warning">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableQuiz;
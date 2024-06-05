import { useState, useRef, useEffect } from 'react';
import './quiz.scss';
import Select from 'react-select';
import { CreateQuiz } from '../../../../Services/axiosCreateUser';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { getDataQuiz } from '../../../../Services/axiosCreateUser';
import ViewQuiz from './ViewQuiz';
import Accordion from 'react-bootstrap/Accordion';

import ManageDeletequiz from "./ManageDeleteQuiz"
import ManageUpdatequiz from './ManageUpdateQuiz';


const ManageQuiz = (props) => {

    const [nameQuiz, setNameQuiz] = useState('');
    const [description, setDescriptionQuiz] = useState('');
    const [type, setType] = useState("");
    const [quizImage, setQuizImage] = useState(null);
    const [statusView, setStatusView] = useState(false)
    // giúp reset lại file ảnh về rỗng khi gọi AIP tạo thành công
    const fileInputRef = useRef(''); // Create a ref for the file input

    const [listQuiz, setListQuiz] = useState([])
    const [quizView, setQuizView] = useState({})

    const [showModalDeleteQuiz, setShowModalQuiz] = useState(false)
    const [quizInfor, setQuizInfor] = useState({})
    const [showModalUpdateQuiz, setShowModalUpdatequiz] = useState(false)

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    useEffect(() => {
        fetchGetDataQuizAll()
    }, [])

    const fetchGetDataQuizAll = async () => {
        let response = await getDataQuiz()
        console.log('>>> check dataquiz: ', response)
        if (response && response.EC === 0) {
            setListQuiz(response.DT)
        }

    }

    const handleImageQuiz = (event) => {
        setQuizImage(event.target.files[0]);
    };

    const handleCreateQuiz = async (event) => {
        event.preventDefault();
        let response = await CreateQuiz(description, nameQuiz, type.value, quizImage);

        if (response && response.EC === 0) {
            toast.success(response.EM);
            setNameQuiz('');
            setDescriptionQuiz('');
            setType(""); // Reset the type to empty string
            setQuizImage(null);

            // giúp reset lại file ảnh về rỗng khi gọi AIP tạo thành công
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset the file input
            }
            await fetchGetDataQuizAll()
        } else {
            toast.error(response.EM);
            return;
        }
    };

    console.log('list quiz: ', listQuiz)


    console.log('Check obj quiz: ', quizInfor)

    console.log('>> check view: ', quizView)

    const resetUpdateQuiz = () => {
        setQuizInfor({})
    }

    return (
        <div className="quiz-container">

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="quiz-content">
                            <form>
                                <fieldset className="border rounded-3 p-3 field-set">
                                    <legend className="float-none w-auto px-3">
                                        Add Quiz
                                    </legend>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder=""
                                            value={nameQuiz}
                                            onChange={(event) => setNameQuiz(event.target.value)}
                                        />
                                        <label htmlFor="floatingInput">Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder=""
                                            value={description}
                                            onChange={(event) => setDescriptionQuiz(event.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Description</label>
                                    </div>
                                    <div className="select-type my-3">
                                        <Select
                                            placeholder='Quiz type...'
                                            value={type}
                                            onChange={setType}
                                            options={options}
                                        />
                                    </div>

                                    <div className="image-quiz my-3">
                                        <label htmlFor="idimagequiz">Upload Image</label>
                                        <input
                                            type="file"
                                            id="idimagequiz"
                                            className="form-control"
                                            onChange={handleImageQuiz}
                                            // giúp reset lại file ảnh về rỗng khi gọi AIP tạo thành công
                                            ref={fileInputRef} // Attach ref to the file input
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-warning"
                                            onClick={handleCreateQuiz}
                                        >
                                            Create Quiz
                                        </button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


            <div className="list-detail ">
                <TableQuiz
                    setShowModalQuiz={setShowModalQuiz}
                    listQuiz={listQuiz}
                    statusView={statusView}
                    setStatusView={setStatusView}
                    setQuizInfor={setQuizInfor}
                    setShowModalUpdatequiz={setShowModalUpdatequiz}
                    setQuizView={setQuizView}

                />
            </div>
            <ViewQuiz
                statusView={statusView}
                setStatusView={setStatusView}
                quizView={quizView}
            />
            <ManageDeletequiz
                setShowModalQuiz={setShowModalQuiz}
                showModalDeleteQuiz={showModalDeleteQuiz}
                quizInfor={quizInfor}
                fetchGetDataQuizAll={fetchGetDataQuizAll}
            />
            <ManageUpdatequiz
                showModalUpdateQuiz={showModalUpdateQuiz}
                setShowModalUpdatequiz={setShowModalUpdatequiz}
                quizInfor={quizInfor}
                fetchGetDataQuizAll={fetchGetDataQuizAll}
                resetUpdateQuiz={resetUpdateQuiz}
            />
        </div>

    );
};

export default ManageQuiz;
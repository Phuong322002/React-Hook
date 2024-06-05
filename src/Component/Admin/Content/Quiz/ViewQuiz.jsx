
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegTimesCircle } from "react-icons/fa";
import { BsCloudPlusFill } from "react-icons/bs";
import _ from 'lodash'
import { set } from 'nprogress';

const ViewQuiz = (props) => {


    const { statusView, setStatusView, quizView } = props

    console.log('quizview: ', quizView)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('EASY');
    const [imageQuiz, setImange] = useState('')

    useEffect(() => {
        console.log('img: ', quizView.image)
        if (_.isEmpty(quizView) === false) {
            setName(quizView.name);
            setDescription(quizView.description);
            setDifficulty(quizView.difficulty);
            if (quizView.image) {
                setImange(`data:image/png;base64,${quizView.image}`)
            }
        }

    }, [quizView])


    const handleClose = () => {
        setStatusView(false)
    }



    return (
        <>



            <Modal
                show={statusView}
                // onHide={handleClose}
                size='lg'
                backdrop='static'
            >
                <Modal.Header >
                    <Modal.Title>View Quiz: </Modal.Title><FaRegTimesCircle style={{ fontSize: '25px' }} onClick={() => { handleClose() }} />
                </Modal.Header>
                <Modal.Body>
                    <div className='body-update-quiz'>
                        <form className="row g-3">
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Name</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={name}
                                    disabled
                                // onChange={(event) => { handleInputOnchangeName() }}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Difficulty</label>
                                <select
                                    name="" id=""
                                    className="form-select"
                                    value={difficulty}
                                    disabled
                                >
                                    <option value="EASY">EASY</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HARD">HARD</option>
                                </select>
                            </div>

                            <div className='pre-image'>
                                {imageQuiz !== undefined ?
                                    <img src={imageQuiz} alt="" />
                                    :
                                    'image preview'
                                }
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewQuiz




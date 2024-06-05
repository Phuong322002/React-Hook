import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegTimesCircle } from "react-icons/fa";
import { BsCloudPlusFill } from "react-icons/bs";
import './quiz.scss'
import _ from 'lodash'

import { toast } from 'react-toastify';

import { updateQuiz } from '../../../../Services/axiosCreateUser';

const ManageUpdatequiz = (props) => {

    const { showModalUpdateQuiz, setShowModalUpdatequiz, quizInfor, fetchGetDataQuizAll, resetUpdateQuiz } = props

    console.log('>>>Check data update quiz: ', quizInfor)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('EASY');
    const [imagePreview, setImagePreview] = useState('');
    const [imga, setImga] = useState('')

    const handleClose = () => {
        setName('');
        setDescription('');
        setDifficulty('EASY');
        setImagePreview('')
        setImga('')
        resetUpdateQuiz()
        setShowModalUpdatequiz(false)


    }

    useEffect(() => {

        if (_.isEmpty(quizInfor) === false) {
            setName(quizInfor.name);
            setDescription(quizInfor.description);
            setDifficulty(quizInfor.difficulty);
            if (quizInfor.image) {
                setImagePreview(`data:image/png;base64,${quizInfor.image}`)
            }
        }
    }, [quizInfor])

    const handleUploadImagePreview = (event) => {
        console.log('>>Check image preview: ', event.target.files)
        //lấy được ảnh ở file
        setImagePreview(URL.createObjectURL(event.target.files[0]))
        //file ảnh
        setImga(event.target.files[0])
    }

    console.log('imagePreview: ', imagePreview)

    const handleInputName = (event) => {
        console.log('>> check event name: ', event.target.value)
        setName(event.target.value)
    }

    const handleInputDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleDifficulty = (event) => {
        setDifficulty(event.target.value)
    }

    const handleSubmitUpdateQuiz = async () => {

        const response = await updateQuiz(quizInfor.id, description, name, difficulty, imga)

        console.log('>>>> Check response update: ', response)

        if (response && response.EC === 0) {
            toast.success(response.EM)
            setShowModalUpdatequiz(false)
            await fetchGetDataQuizAll()
        }
        if (response && response.EC !== 0) {
            toast.error(response.EM);
            return
        }


    }
    return (
        <>


            <Modal
                show={showModalUpdateQuiz}
                // onHide={handleClose}
                size='lg'
                backdrop='static'
            >
                <Modal.Header >
                    <Modal.Title>Update Quiz: </Modal.Title><FaRegTimesCircle style={{ fontSize: '25px' }} onClick={() => { handleClose() }} />
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
                                    onChange={(event) => { handleInputName(event) }}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={description}
                                    onChange={(event) => { handleInputDescription(event) }}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Difficulty</label>
                                <select
                                    name="" id=""
                                    className="form-select"
                                    value={difficulty}
                                    onChange={(event) => { handleDifficulty(event) }}
                                >
                                    <option value="EASY">EASY</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HARD">HARD</option>
                                </select>
                            </div>
                            <div>
                                <label className='upload-image-label' htmlFor="id-image"><BsCloudPlusFill color='green' />Upload New file Image</label>
                                <input
                                    type="file"
                                    id='id-image'
                                    hidden
                                    onChange={(event) => { handleUploadImagePreview(event) }}
                                />
                            </div>

                            <div className='pre-image'>
                                {imagePreview
                                    ?
                                    <img src={imagePreview} alt="" />
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
                    <Button variant="primary" onClick={() => { handleSubmitUpdateQuiz() }}>
                        Submit Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ManageUpdatequiz;
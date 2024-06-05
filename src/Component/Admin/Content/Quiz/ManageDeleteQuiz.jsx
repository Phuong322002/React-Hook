import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegTimesCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

import { deleteQuiz } from '../../../../Services/axiosCreateUser';

const ManageDeletequiz = (props) => {

    const { showModalDeleteQuiz, setShowModalQuiz, quizInfor, fetchGetDataQuizAll } = props


    const handleClose = () => {
        setShowModalQuiz(false)
    }

    const handfleComfirmDeleteQuiz = async () => {

        console.log('Check quiz infor: ', quizInfor.id)

        const response = await deleteQuiz(quizInfor.id)

        console.log('>> check response delete quiz: ', response)

        if (response && response.EC === 0) {
            toast.success(response.EM)
            setShowModalQuiz(false)
            await fetchGetDataQuizAll()
        }
        if (response && response.EC !== 0) {
            toast.error(response.EM)
        }
    }

    return (
        <>

            <Modal
                show={showModalDeleteQuiz}
                backdrop='static'
            >
                <Modal.Header >
                    <Modal.Title>Delete Quiz: </Modal.Title><FaRegTimesCircle style={{ fontSize: '25px' }} onClick={() => { handleClose() }} />
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this quiz? <b>id = {quizInfor.id}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleClose() }}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => { handfleComfirmDeleteQuiz() }}
                    >
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ManageDeletequiz;
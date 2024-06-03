import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";


const ModalSumit = (props) => {

    const { statusModalSubmit, setStatusModalSubmit, dataResult } = props

    console.log('>>check Data result: ', dataResult)

    const handleCanCel = () => {
        setStatusModalSubmit(false)
    }

    const handleResult = () => {
    }

    return (
        <>
            <Modal
                show={statusModalSubmit}
                // onHide={handleClose} 
                animation={false}>
                <Modal.Header >
                    <Modal.Title>YOUR RESULT</Modal.Title><GrClose style={{ cursor: 'pointer' }} onClick={() => { handleCanCel() }} />
                </Modal.Header>
                <Modal.Body>Total Question: <b>{dataResult.countTotal}</b></Modal.Body>
                <Modal.Body>The answer is correct: <b>{dataResult.countCorrect}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleResult() }}  >
                        Show Answer
                    </Button>
                    <Button variant="secondary" onClick={() => { handleCanCel() }} >
                        cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSumit;
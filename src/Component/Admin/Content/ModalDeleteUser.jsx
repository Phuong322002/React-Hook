import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrClose } from "react-icons/gr";
import { DeleteUser } from '../../../Services/axiosCreateUser'
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {

    const { statusModalDelete, setStatusModalDelete, objUserDelete, fetchGetDataUserWithPaginate, pageCurrent } = props


    const handleCanCel = () => {
        setStatusModalDelete(false)
    }

    const handleDeleteUser = async () => {
        console.log('fetchGetDataUserWithPaginate', fetchGetDataUserWithPaginate)

        //gửi request lên server
        const res = await DeleteUser(objUserDelete.id)
        console.log('ll', res)
        // nhận lại những response từ phía server
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setStatusModalDelete(false)
            pageCurrent(1)
            await fetchGetDataUserWithPaginate(1)
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM)
            return;
        }
    }

    return (
        <>
            <Modal
                show={statusModalDelete}
                // onHide={handleClose} 
                animation={false}>
                <Modal.Header >
                    <Modal.Title>Delete User </Modal.Title><GrClose style={{ cursor: 'pointer' }} onClick={() => { handleCanCel() }} />
                </Modal.Header>
                <Modal.Body>Are you sure will delete this user? <b>email: {objUserDelete && objUserDelete.email ? objUserDelete.email : ''}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleCanCel() }} >
                        cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleDeleteUser() }}  >
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
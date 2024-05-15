import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalManage.scss'
import { FcPlus } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { AxiosCreateUser } from '../../../Services/axiosCreateUser';

const ModalManageUserCreate = (props) => {
    const { show, handleShowHide } = props

    console.log('show', show)

    // // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [avatar, setAvatar] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    console.log('role', role)

    const handleUploadImage = (event) => {

        if (event.target && event.target.files && event.target.files[0]) {
            // URL.createObjectURL(event.target.files[0]) dòng code này sẽ lấy được ảnh từ dưới file của máy tính lên
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setAvatar(event.target.files[0])
        }
        console.log('upload image', URL.createObjectURL(event.target.files[0]))
    }

    const handleDisplayModal = () => {
        handleShowHide(show)
        setEmail('')
        setPassword('')
        setUsername('')
        setRole('USER')
        setAvatar('')
        setPreviewImage('')

    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleCreateUser = async () => {
        //khi gửi data lên phía server thì Validate
        // 1) validate
        const isEmail = validateEmail(email)
        console.log('isEmail', isEmail)
        // if (!isEmail) {
        //     toast.error('email invalid')
        //     return
        // }
        if (password.length < 6) {
            toast.error('Password must have more than 6 characters')
            return;
        }

        // 2) gọi API gửi dữ liệu lên server
        console.log('role1', role)
        //nhận được cục data từ file axiosCreateUser
        const data = await AxiosCreateUser(email, password, username, role, avatar)

        console.log('res', data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleDisplayModal()
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
            return
        }

    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add user
            </Button> */}

            <Modal
                show={show}
                // onHide={handleClose}
                size="xl"
                backdrop='static'
                className='modal-main'
            >
                <Modal.Header >
                    <Modal.Title>Modal heading</Modal.Title> <FaTimes onClick={() => { handleDisplayModal() }} />
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                onChange={(e) => { return setEmail(e.target.value) }}
                                value={email}

                            />
                        </div>

                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(e) => { return setPassword(e.target.value) }}
                                value={password}
                            />
                        </div>

                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">User name</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => { return setUsername(e.target.value) }}
                                value={username}
                            />
                        </div>
                        <div className="col-md-4">
                            <label for="inputState" className="form-label">Role</label>
                            <select
                                id="inputState"
                                className="form-select"
                                onChange={(e) => { return setRole(e.target.value) }}
                            >
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <div className='upload-file'>
                                <label className='lable-update-img' htmlFor="idUpdateImg"><FcPlus />Upload file image</label>
                            </div>
                            <input
                                type="file"
                                hidden
                                id='idUpdateImg'
                                onChange={(e) => { handleUploadImage(e) }}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage
                                ?
                                <img src={previewImage} alt="" />
                                :
                                'image preview'
                            }

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleDisplayModal() }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleCreateUser() }}>
                        {/* <Button> */}
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalManageUserCreate;
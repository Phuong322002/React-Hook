import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalManage.scss'
import { FcPlus } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { AxiosCreateUser } from '../../../Services/axiosCreateUser';
import _ from 'lodash'
import { PutUpdateUser } from '../../../Services/axiosCreateUser';

const ModalViewDetailUser = (props) => {
    const { showView, setStatusView, viewUser, resetViewUser } = props

    console.log('data user ob', viewUser)
    console.log('show', showView)

    // // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('USER')
    const [avatar, setAvatar] = useState('')
    const [previewImage, setPreviewImage] = useState('')


    console.log('wwww', role)

    useEffect(() => {
        // console.log('bb', viewUser.email)
        console.log('show1', props.show)

        if (!_.isEmpty(viewUser) && showView === true) {
            setEmail(viewUser.email)
            // setPassword(viewUser.password)
            setUsername(viewUser.username)
            console.log('viewUser.role', viewUser.role)
            setRole(viewUser.role)
            setAvatar('')
            if (viewUser.image) {
                setPreviewImage(`data:image/jpeg;base64,${viewUser.image}`)
            }
        }
    }, [viewUser]) //Mỗi lần updateAUser thì tao muốn cái đống shit kia phải cập nhật lại state của chính bản thân nó, chính là cái đống shit trong hàm useEffect()

    console.log('rolee', role)
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            // URL.createObjectURL(event.target.files[0]) dòng code này sẽ lấy được ảnh từ dưới file của máy tính lên
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setAvatar(event.target.files[0])
        }
        console.log('upload image', event.target.files[0])
    }

    const handleDisplayModal = () => {
        // console.log('all', showView)
        setStatusView()
        // setEmail('')
        // setPassword('')
        setUsername('')
        setRole('USER')
        setAvatar('')
        setPreviewImage('')
        //reset update user
        resetViewUser()


    }

    // const handleUpdateUser = async () => {
    //     //khi gửi data lên phía server thì Validate
    //     // 1) validate
    //     // const isEmail = validateEmail(email)
    //     // console.log('isEmail', isEmail)
    //     // // if (!isEmail) {
    //     // //     toast.error('email invalid')
    //     // //     return
    //     // // }
    //     // if (password.length < 6) {
    //     //     toast.error('Password must have more than 6 characters')
    //     //     return;
    //     // }

    //     // 2) gọi API gửi dữ liệu lên server
    //     console.log('role1', role)
    //     //gửi cục data lên file axiosCreateUser và kiểm tra nếu thành công or thất bại  nó sẽ đều nhận lại cục data mà server gửi về và chia ra 2 trường hợp ở dưới
    //     const response = await PutUpdateUser(updateAUser.id, username, role, avatar)
    //     console.log('res11', response)
    //     // response.EC === 0 
    //     if (response && response.EC === 0) {
    //         toast.success(response.EM)
    //         handleDisplayModal()
    //         //sau khi tạo(create) thành công user thì tiếp theo ta lấy data mới về bằng cách gọi lại hàm lấy data của component cha từ việc gọi API vs method get
    //         // Đây là hàm lấy data
    //         await fetchGetDataUserAll()
    //     }
    //     if (response && response.EC !== 0) {
    //         toast.error(response.EM)
    //         return;
    //     }

    // }
    console.log('emaill', email)
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Add user
            </Button> */}

            <Modal
                show={showView}
                // onHide={handleClose}
                size="xl"
                backdrop='static'
                className='modal-main'
            >
                <Modal.Header >
                    <Modal.Title>Update a user</Modal.Title> <FaTimes onClick={() => { handleDisplayModal() }} />
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                // onChange={(e) => { return setEmail(e.target.value) }}
                                value={email}
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                // onChange={(e) => { return setPassword(e.target.value) }}
                                value={password}
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">User name</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => { return setUsername(e.target.value) }}
                                value={username}
                                disabled
                            />
                        </div>
                        <div className="col-md-4">
                            <label for="inputState" className="form-label">Role</label>
                            <select
                                id="inputState"
                                className="form-select"
                                onChange={(e) => { return setRole(e.target.value) }}
                                value={role}
                                disabled
                            >
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            {/* <div className='upload-file'>
                                <label className='lable-update-img' htmlFor="idUpdateImg"><FcPlus />Upload file image</label>
                            </div> */}
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

                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalViewDetailUser;
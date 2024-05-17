import ModalManageUserCreate from "./ModelManageUserCreate";
import { FcPlus } from "react-icons/fc";
import TableComponent from "./TableComponent";
import { useEffect, useState } from "react";
import { getUser } from "../../../Services/axiosCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {

    const [statusModal, setStatusModal] = useState(false)
    const [listUser, setListUser] = useState([])
    const [statusModalUpdate, setStatusModalUpdate] = useState(false)
    const [updateAUser, setUpdateAUser] = useState({})

    console.log('updateAUser', updateAUser)

    const handleShowHide = (statusModal) => {
        setStatusModal(!statusModal)
    }
    console.log('statusModal', setStatusModal)

    console.log('listUser', listUser)
    //để get data từ phía back-end về ta dùng hàm usEffect
    // Không viết async và await trong hàm useEffect lên tách chúng ra
    useEffect(() => {
        fetchGetDataUserAll()
    }, [])
    //cục data này có được từ việc gọi API bên axiosCreateUser với hàm getUser
    const fetchGetDataUserAll = async () => {
        const res = await getUser()
        console.log('ccsdas', res.DT)
        if (res.EC === 0) {
            setListUser(res.DT)

        }
    }

    const handleShowHideModalUpdate = (user) => {
        console.log('vcxv', statusModalUpdate)
        setStatusModalUpdate(!statusModalUpdate)
        if (user) {
            setUpdateAUser(user)
        }
    }
    console.log('?', updateAUser)
    return (
        <div className="manage-user-main">
            <div className="title" >
                ManageUser
            </div>
            <div className="manage-user-content">
                <div className="add-new-user">
                    <button className="btn btn-primary btn-icon " onClick={() => { handleShowHide() }} > <FcPlus /> Add new user</button>

                </div>
                <div className="table-users-container">
                    <TableComponent
                        listUser={listUser}
                        statusModalUpdate={statusModalUpdate}
                        handleShowHideModalUpdate={handleShowHideModalUpdate}
                        updateAUser={updateAUser}

                    />
                </div>
                <ModalManageUserCreate
                    show={statusModal}
                    handleShowHide={handleShowHide}
                    fetchGetDataUserAll={fetchGetDataUserAll}
                />
                <ModalUpdateUser
                    show1={statusModalUpdate}
                    handleShowHide123={handleShowHideModalUpdate}
                    fetchGetDataUserAll={fetchGetDataUserAll}
                    updateAUser={updateAUser}
                />

            </div>
        </div>
    )
}

export default ManageUser;
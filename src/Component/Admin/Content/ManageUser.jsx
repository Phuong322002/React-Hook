import { useState } from "react";
import ModalManageUserCreate from "./ModelManageUserCreate";
import { FcPlus } from "react-icons/fc";
import TableComponent from "./TableComponent";

const ManageUser = (props) => {

    const [statusModal, setStatusModal] = useState(false)

    const handleShowHide = (statusModal) => {
        setStatusModal(!statusModal)
    }
    console.log('statusModal', setStatusModal)
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
                    <TableComponent />
                </div>
                <ModalManageUserCreate
                    show={statusModal}
                    handleShowHide={handleShowHide}
                />

            </div>
        </div>
    )
}

export default ManageUser;
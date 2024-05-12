import ModalManageUserCreate from "./ModelManageUserCreate";

const ManageUser = (props) => {

    return (
        <div className="manage-user-main">
            <div className="title" >
                ManageUser
            </div>
            <div className="manage-user-content">
                <div>
                    <ModalManageUserCreate />
                </div>
                <div>
                    table
                </div>
            </div>
        </div>
    )
}

export default ManageUser;
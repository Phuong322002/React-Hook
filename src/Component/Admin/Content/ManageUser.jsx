import ModalManageUserCreate from "./ModelManageUserCreate";
import { FcPlus } from "react-icons/fc";
import TableComponent from "./TableComponent";
import { useEffect, useState } from "react";
import { PaginateTable, getUser } from "../../../Services/axiosCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewDetailUser from "./ModalViewDetailUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableWithPaginate from "./TableWithPaginate";

const ManageUser = (props) => {

    const LIMIT_USER = 6;

    const [pageCount, setPageCount] = useState(0);
    const [pagePaginate, setPagePaginate] = useState(1)


    const [statusModal, setStatusModal] = useState(false)
    const [listUser, setListUser] = useState([])
    const [statusModalUpdate, setStatusModalUpdate] = useState(false)
    const [updateAUser, setUpdateAUser] = useState({})
    const [statusView, setStatusView] = useState(false)
    const [viewUser, setViewUser] = useState({})
    const [statusModalDelete, setStatusModalDelete] = useState(false)
    const [objUserDelete, setObjUserDelete] = useState({})

    console.log('list user', listUser)
    console.log('updateAUser', updateAUser)

    const handleShowHide = (statusModal) => {
        setStatusModal(!statusModal)
    }
    console.log('statusModal', setStatusModal)

    console.log('listUser', listUser)
    //Để get data từ phía back-end về ta dùng hàm usEffect, tại sao phải dùng hàm useEffect đó là để check xem DOM đã được gán vào chưa,
    //nếu DOM đã đc gán thì chạy xong mà render tiếp theo sẽ chạy hàm useEfect đó là lý do tại sao get data về thì sử dụng hàm useEffect
    // Không viết async và await trong hàm useEffect lên tách chúng ra
    useEffect(() => {
        // fetchGetDataUserAll()
        fetchGetDataUserWithPaginate(pagePaginate)
    }, [])


    //Hàm này để lấy data bên server và khi có data thì đưa data đó cho state của react quản lý data đó, 
    //cục data này có được từ việc gọi API bên axiosCreateUser với hàm getUser
    const fetchGetDataUserAll = async () => {
        // resquest được gửi lên server
        const res = await getUser()
        console.log('ccsdas', res.DT)
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

    const fetchGetDataUserWithPaginate = async (page) => {
        const response = await PaginateTable(page, LIMIT_USER)
        console.log('response', response.DT.users)
        if (response && response.DT && response.DT.users) {
            setListUser(response.DT.users)
            setPageCount(response.DT.totalPages)
        } else {
            setListUser([])
        }
    }

    const handleShowHideModalUpdate = (user) => {
        console.log('vcxv', statusModalUpdate)
        setStatusModalUpdate(!statusModalUpdate)
        if (user) {
            setUpdateAUser(user)
        }
    }

    const resetUpdateUser = () => {
        setUpdateAUser({})

    }
    const resetViewUser = () => {
        setViewUser({})

    }

    const handleShowHideViewUSer = (user) => {
        setStatusView(true)
        console.log('vc', user)
        if (user) {
            setViewUser(user)
        }
    }

    const handleShowHideModalDeleteUser = (user) => {
        setStatusModalDelete(true)
        if (user) {
            setObjUserDelete(user)
        }
    }

    const test = (m) => {
        console.log('vv', m)
        setPagePaginate(m)
    }

    console.log('?', pagePaginate)
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
                    {/* <TableComponent
                        listUser={listUser}
                        statusModalUpdate={statusModalUpdate}
                        handleShowHideModalUpdate={handleShowHideModalUpdate}
                        updateAUser={updateAUser}
                        handleShowHideViewUSer={handleShowHideViewUSer}
                        handleShowHideModalDeleteUser={handleShowHideModalDeleteUser}
                    /> */}

                    <TableWithPaginate
                        listUser={listUser}
                        statusModalUpdate={statusModalUpdate}
                        handleShowHideModalUpdate={handleShowHideModalUpdate}
                        updateAUser={updateAUser}
                        handleShowHideViewUSer={handleShowHideViewUSer}
                        handleShowHideModalDeleteUser={handleShowHideModalDeleteUser}
                        pageCount={pageCount}
                        fetchGetDataUserWithPaginate={fetchGetDataUserWithPaginate}
                        test={test}
                    />
                </div>
                <ModalManageUserCreate
                    show={statusModal}
                    handleShowHide={handleShowHide}
                    fetchGetDataUserAll={fetchGetDataUserAll}
                    fetchGetDataUserWithPaginate={fetchGetDataUserWithPaginate}
                    pagePaginate={pagePaginate}
                />

                <ModalUpdateUser
                    show1={statusModalUpdate}
                    handleShowHide123={handleShowHideModalUpdate}
                    // fetchGetDataUserAll={fetchGetDataUserAll}
                    fetchGetDataUserWithPaginate={fetchGetDataUserWithPaginate}
                    updateAUser={updateAUser}
                    resetUpdateUser={resetUpdateUser}
                    pagePaginate={pagePaginate}
                />

                <ModalViewDetailUser
                    showView={statusView}
                    viewUser={viewUser}
                    setStatusView={setStatusView}
                    resetViewUser={resetViewUser}
                />

                <ModalDeleteUser
                    statusModalDelete={statusModalDelete}
                    setStatusModalDelete={setStatusModalDelete}
                    objUserDelete={objUserDelete}
                    // fetchGetDataUserAll={fetchGetDataUserAll}
                    fetchGetDataUserWithPaginate={fetchGetDataUserWithPaginate}
                    pagePaginate={pagePaginate}
                    setPagePaginate={setPagePaginate}
                />
            </div>
        </div>
    )
}

export default ManageUser;
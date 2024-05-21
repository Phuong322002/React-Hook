
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


const TableWithPaginate = (props) => {


    const { listUser, handleShowHideModalUpdate, handleShowHideViewUSer,
        handleShowHideModalDeleteUser, pageCount, fetchGetDataUserWithPaginate,
        pageCurrent, pagePaginateCurr } = props

    const displayModalUpdate = (user) => {
        handleShowHideModalUpdate(user)
    }

    const displayModalView = (user) => {
        handleShowHideViewUSer(user)
    }

    const handleDeleteUSer = (user) => {
        handleShowHideModalDeleteUser(user)
    }

    const handlePageClick = (event) => {
        // setPagePaginate(+event.selected + 1)
        pageCurrent(+event.selected + 1)
        fetchGetDataUserWithPaginate(+event.selected + 1)
        console.log(`User requested page number ${event.selected}`);
    };


    return (
        <>
            <table className="table  table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Avtive</th>

                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((user, index) => {
                        return (
                            <tr key={`key-user-${index}`}>
                                <td >{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => { displayModalView(user) }}>View</button>
                                    <button className="btn btn-warning mx-3" onClick={() => { displayModalUpdate(user) }}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => { handleDeleteUSer(user) }}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={'5'}>Not Found User</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className='paginate-list-user'>
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    //forcePage={pagePaginateCurr - 1} dòng code này sẽ giúp thanh paginate của back về trang 1
                    forcePage={pagePaginateCurr - 1}
                />
            </div>

        </>
    )

}

export default TableWithPaginate;
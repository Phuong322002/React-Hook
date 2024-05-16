

const TableComponent = (props) => {

    const { listUser } = props


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
                                    <button className="btn btn-info">View</button>
                                    <button className="btn btn-danger mx-3">Delete</button>
                                    <button className="btn btn-warning">Edit</button>
                                </td>
                            </tr>
                        )
                    })}
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>Not Found User</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )

}

export default TableComponent;
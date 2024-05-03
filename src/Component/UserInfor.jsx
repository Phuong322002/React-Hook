import React, { useState } from "react";
import AddUserComponent from "./AddUserComponent";
import DisplayComponent from "./DisplayComponent";


const UserComponent = () => {

    let initialListUser = [
        { id: 1, name: 'Phuong', age: 10 },
        { id: 2, name: 'Hoa', age: 20 },
        { id: 3, name: 'CHi', age: 40 },
    ]

    const [listUser, setListUser] = useState(initialListUser)

    const createUser = (newUser) => {
        const listUserCopy = [...listUser]
        setListUser([...listUserCopy, newUser])
        // this.setState({
        //     listUser: [...listUserCopy, newUser]
        // })
    }
    const hanldelete = (user) => {
        // const { listUser } = this.state
        let listUserCopy = [...listUser]
        listUserCopy = listUserCopy.filter((item) => {
            return item.id !== user.id
        })
        setListUser(listUserCopy)
        // this.setState({
        //     listUser: listUserCopy
        // })
    }

    return (
        <div>
            <AddUserComponent createUser={createUser} />
            <DisplayComponent listUser={listUser} hanldelete={hanldelete} />
        </div>
    )
}


// class UserComponent extends React.Component {

//     state = {
//         listUser: [
//             { id: 1, name: 'Phuong', age: 10 },
//             { id: 2, name: 'Hoa', age: 20 },
//             { id: 3, name: 'CHi', age: 40 },
//         ]
//     }

//     createUser = (newUser) => {
//         const listUserCopy = [...this.state.listUser]
//         this.setState({
//             listUser: [...listUserCopy, newUser]
//         })
//     }


//     hanldelete = (user) => {
//         const { listUser } = this.state
//         let listUserCopy = [...listUser]
//         listUserCopy = listUserCopy.filter((item) => {
//             return item.id !== user.id
//         })
//         this.setState({
//             listUser: listUserCopy
//         })
//     }


//     render() {
//         const { listUser, status } = this.state

//         return (
//             <div>
//                 <AddUserComponent createUser={this.createUser} />
//                 <DisplayComponent listUser={listUser} hanldelete={this.hanldelete} />
//             </div>
//         )
//     }
// }

export default UserComponent;